/* =============================================================
   SUMMER LUXE · ENHANCEMENT LAYER (JS)  v 26.05.16
   -------------------------------------------------------------
   Pairs with summer-luxe-enhance.css. Vanilla, no deps.
   - Top scroll progress bar
   - Right-edge section progress indicator
   - Stat count-up
   - Process rail draw on view
   - Per-image scan reveal + corner-marker scan layer injection
   - Review star fill animation
   - Section reveal class
   - Hero parallax
   ============================================================= */
(function () {
    'use strict';
    if (window.__enhLoaded) return;
    window.__enhLoaded = true;

    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ---------- helpers ----------
    function $(sel, root) { return (root || document).querySelector(sel); }
    function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

    // ---------- 1. Scroll progress bar (top edge) ----------
    function initScrollProgress() {
        var bar = document.createElement('div');
        bar.className = 'enh-scroll-progress';
        document.body.appendChild(bar);
        var raf = null;
        function tick() {
            raf = null;
            var h = document.documentElement;
            var max = (h.scrollHeight - h.clientHeight) || 1;
            var p = Math.max(0, Math.min(1, h.scrollTop / max));
            bar.style.setProperty('--p', (p * 100).toFixed(2) + '%');
        }
        window.addEventListener('scroll', function () {
            if (!raf) raf = requestAnimationFrame(tick);
        }, { passive: true });
        tick();
    }

    // ---------- 2. Section progress indicator (right edge) ----------
    function initSectionProgress() {
        // Choose sections to mark — work for both main (.luxe-section) and
        // landings (.section with an id).
        var sections = $all('main > section, body > section').filter(function (s) {
            return s.offsetHeight > 200 && (s.classList.contains('luxe-section') || s.classList.contains('section'));
        });
        if (sections.length < 3) return;

        var nav = document.createElement('nav');
        nav.className = 'enh-progress';
        nav.setAttribute('aria-label', 'Section progress');
        var dotMap = [];
        sections.forEach(function (sec) {
            var id = sec.id || '';
            var dot = document.createElement('a');
            dot.className = 'enh-progress-dot';
            dot.href = '#' + (id || '');
            if (!id) dot.removeAttribute('href');
            dotMap.push({ el: dot, sec: sec });
            nav.appendChild(dot);
        });
        document.body.appendChild(nav);
        requestAnimationFrame(function () { nav.classList.add('enh-visible'); });

        function onScroll() {
            var midline = window.scrollY + window.innerHeight * 0.35;
            var active = null;
            for (var i = 0; i < dotMap.length; i++) {
                var top = dotMap[i].sec.offsetTop;
                if (top <= midline) active = dotMap[i];
            }
            dotMap.forEach(function (d) { d.el.classList.toggle('enh-active', d === active); });
        }
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    // ---------- 3. Stat count-up ----------
    function initCountUp() {
        var cells = $all('.luxe-stats-cell');
        if (!cells.length) return;
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                if (!e.isIntersecting) return;
                io.unobserve(e.target);
                e.target.classList.add('enh-counted');
                var numEl = e.target.querySelector('.luxe-stats-num');
                if (!numEl) return;
                var txt = numEl.textContent.trim();
                // Parse a leading integer (e.g. "2016", "10", "1:1", "05")
                var m = txt.match(/^(\d+)/);
                if (!m) return;
                var finalN = parseInt(m[1], 10);
                if (isNaN(finalN) || finalN < 2) return;
                var suffix = txt.slice(m[1].length); // ":1", "YR" (wrapped in span), etc
                // Preserve any inner span (like luxe-stats-suffix)
                var suffixHTML = '';
                var suffixSpan = numEl.querySelector('.luxe-stats-suffix');
                if (suffixSpan) suffixHTML = suffixSpan.outerHTML;
                else suffixHTML = suffix;

                if (reduce) return;
                var start = performance.now();
                var dur = 1100;
                function tick(now) {
                    var t = Math.min(1, (now - start) / dur);
                    var eased = 1 - Math.pow(1 - t, 3);
                    var v = Math.floor(eased * finalN);
                    // pad to original digit count for "2016", "10", "05" preservation
                    var padded = String(v);
                    if (m[1].length > 1 && /^0/.test(m[1])) {
                        padded = padded.padStart(m[1].length, '0');
                    }
                    numEl.innerHTML = padded + suffixHTML;
                    if (t < 1) requestAnimationFrame(tick);
                }
                requestAnimationFrame(tick);
            });
        }, { threshold: 0.4 });
        cells.forEach(function (c) { io.observe(c); });
    }

    // ---------- 4. Process rail draw on view ----------
    function initProcessRail() {
        var rails = $all('.luxe-process, .process-steps');
        if (!rails.length) return;
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                if (e.isIntersecting) {
                    e.target.classList.add('enh-drawn');
                    io.unobserve(e.target);
                }
            });
        }, { threshold: 0.25 });
        rails.forEach(function (r) { io.observe(r); });
    }

    // ---------- 5. Image scan reveal ----------
    function initScanReveal() {
        var hosts = $all(
            '.luxe-ba-card, .luxe-event-card, .luxe-gallery-card, ' +
            '.ba-card, .event-card, .interior-grid figure'
        );
        if (!hosts.length) return;

        hosts.forEach(function (h) {
            h.classList.add('enh-reveal-ready');
            // Inject the scan layer onto the img-wrap if present, else onto host
            var scanHost = h.querySelector('.img-wrap') || h;
            // Avoid double inject
            if (!scanHost.querySelector('.enh-scan')) {
                var scan = document.createElement('span');
                scan.className = 'enh-scan';
                scanHost.appendChild(scan);
            }
        });

        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                if (!e.isIntersecting) return;
                io.unobserve(e.target);
                var card = e.target;
                // Stagger by sibling index for elegant cascade
                var sIdx = 0;
                var prev = card.previousElementSibling;
                while (prev) { sIdx++; prev = prev.previousElementSibling; }
                var delay = Math.min(sIdx, 8) * 70;
                setTimeout(function () {
                    card.classList.add('enh-revealed');
                    setTimeout(function () {
                        card.classList.add('enh-reveal-done');
                    }, 1300);
                }, delay);
            });
        }, { threshold: 0.18 });
        hosts.forEach(function (h) { io.observe(h); });
    }

    // ---------- 6. Review star fill ----------
    function initReviewStars() {
        // Reviews are rendered AFTER our script in the main page,
        // so observe the track for mutations.
        var track = document.getElementById('reviewTrack');
        if (!track) return;
        var seen = new WeakSet();
        function processCards() {
            var cards = $all('.luxe-review-card', track);
            cards.forEach(function (card) {
                if (seen.has(card)) return;
                seen.add(card);
                var starsEl = card.querySelector('.stars');
                if (starsEl) starsEl.setAttribute('data-stars', starsEl.textContent);
                // Reveal on view
                var io = new IntersectionObserver(function (entries) {
                    entries.forEach(function (e) {
                        if (e.isIntersecting) {
                            e.target.classList.add('enh-revealed');
                            io.unobserve(e.target);
                        }
                    });
                }, { threshold: 0.2 });
                io.observe(card);
            });
        }
        // Initial + mutation-listened
        processCards();
        var mo = new MutationObserver(processCards);
        mo.observe(track, { childList: true });
    }

    // ---------- 7. Hero parallax (main only) ----------
    function initHeroParallax() {
        var fig = document.querySelector('.luxe-hero-figure img');
        if (!fig) return;
        if (reduce) return;
        var raf = null;
        function tick() {
            raf = null;
            var y = window.scrollY || 0;
            // Limit to first 800px scroll; max 28px movement
            var p = Math.min(1, y / 800);
            var off = -p * 28;
            fig.style.setProperty('--enh-parallax-y', off.toFixed(1) + 'px');
        }
        window.addEventListener('scroll', function () {
            if (!raf) raf = requestAnimationFrame(tick);
        }, { passive: true });
        tick();
    }

    // ---------- 8. Section reveal class for landings ----------
    function initSectionReveal() {
        var sections = $all('section.section, section.luxe-section');
        if (!sections.length) return;
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                if (e.isIntersecting) {
                    e.target.classList.add('enh-section-in');
                    io.unobserve(e.target);
                }
            });
        }, { threshold: 0.05 });
        sections.forEach(function (s) { io.observe(s); });
    }

    // ---------- 8b. ORPHAN .luxe-fade RESCUE ----------
    // Some elements (.luxe-why-card et al.) have .luxe-fade baked into HTML
    // but are NOT in the existing inline observer's selector list — they stay
    // hidden forever. Sweep all unobserved .luxe-fade and reveal them.
    function initOrphanFade() {
        var orphans = $all('.luxe-fade:not(.visible)');
        if (!orphans.length) return;
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                if (e.isIntersecting) {
                    e.target.classList.add('visible');
                    io.unobserve(e.target);
                }
            });
        }, { threshold: 0.08 });
        orphans.forEach(function (el) { io.observe(el); });
        // Safety net: force-show anything still not visible after 2s
        setTimeout(function () {
            $all('.luxe-fade:not(.visible)').forEach(function (el) {
                el.classList.add('visible');
            });
        }, 2000);
    }

    // ---------- 9. Add "FRAME" plate labels to interior cards on landings ----------
    // DISABLED — user requested no added text overlays.
    function initInteriorLabels() { /* no-op */ }

    // ---------- 10. BA card metadata enrichment (landings) ----------
    // DISABLED — user requested no added text overlays.
    function initBaCardBadges() { /* no-op */ }

    // ---------- 11. CHAMPAGNE CURSOR FOLLOWER (desktop) ----------
    function initCursor() {
        if (window.matchMedia('(hover: none)').matches) return;
        if (window.innerWidth < 1100) return;
        var ring = document.createElement('div');
        ring.className = 'enh-cursor';
        document.body.appendChild(ring);
        var x = window.innerWidth / 2, y = window.innerHeight / 2;
        var raf = null;
        function tick() {
            raf = null;
            ring.style.transform = 'translate(' + x + 'px, ' + y + 'px) translate(-50%, -50%)';
        }
        document.addEventListener('mousemove', function (e) {
            x = e.clientX; y = e.clientY;
            if (!ring.classList.contains('enh-ready')) ring.classList.add('enh-ready');
            if (!raf) raf = requestAnimationFrame(tick);
        });
        document.addEventListener('mousedown', function () { ring.classList.add('enh-down'); });
        document.addEventListener('mouseup',   function () { ring.classList.remove('enh-down'); });
        // Expand on hovering interactive elements
        var hoverSel = 'a, button, .luxe-btn, .luxe-link, .luxe-ba-card, .luxe-event-card, .luxe-gallery-card, .luxe-faq-item, .luxe-services-row, [role="button"], input, select, textarea';
        document.addEventListener('mouseover', function (e) {
            if (e.target.closest(hoverSel)) ring.classList.add('enh-hover');
        });
        document.addEventListener('mouseout', function (e) {
            if (e.target.closest(hoverSel)) ring.classList.remove('enh-hover');
        });
    }

    // ---------- 12. MAGNETIC CTA (primary buttons attract cursor) ----------
    function initMagnetic() {
        if (window.matchMedia('(hover: none)').matches) return;
        if (reduce) return;
        var targets = $all('.luxe-btn.gold, .luxe-btn:not(.outline)');
        targets.forEach(function (btn) {
            var rect = null;
            btn.addEventListener('mouseenter', function () { rect = btn.getBoundingClientRect(); });
            btn.addEventListener('mousemove', function (e) {
                if (!rect) rect = btn.getBoundingClientRect();
                var cx = rect.left + rect.width / 2;
                var cy = rect.top + rect.height / 2;
                var dx = (e.clientX - cx) * 0.25;
                var dy = (e.clientY - cy) * 0.25;
                btn.style.transform = 'translate(' + dx.toFixed(1) + 'px, ' + dy.toFixed(1) + 'px)';
            });
            btn.addEventListener('mouseleave', function () {
                rect = null;
                btn.style.transform = '';
            });
        });
    }

    // ---------- 13. HERO SCROLL CUE ----------
    function initScrollCue() {
        var hero = document.querySelector('.luxe-hero');
        if (!hero) return;
        if (hero.querySelector('.enh-scroll-cue')) return;
        var cue = document.createElement('div');
        cue.className = 'enh-scroll-cue';
        hero.appendChild(cue);
        // Hide cue once user scrolls
        function onScroll() {
            if (window.scrollY > 200) {
                cue.style.opacity = '0';
                window.removeEventListener('scroll', onScroll);
            }
        }
        window.addEventListener('scroll', onScroll, { passive: true });
    }

    // ---------- 14. NAV — current section indicator ----------
    function initNavCurrent() {
        var links = $all('.luxe-nav-links a[href^="#"]');
        if (!links.length) return;
        var pairs = links.map(function (a) {
            var id = a.getAttribute('href').slice(1);
            return { a: a, sec: id ? document.getElementById(id) : null };
        }).filter(function (p) { return p.sec; });
        if (!pairs.length) return;
        function onScroll() {
            var midline = window.scrollY + window.innerHeight * 0.35;
            var active = null;
            pairs.forEach(function (p) {
                if (p.sec.offsetTop <= midline) active = p;
            });
            pairs.forEach(function (p) {
                p.a.classList.toggle('enh-current-section', p === active);
            });
        }
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    // ---------- 15. SECTION HEADING WRAP — wrap h2 inner words for slide reveal ----------
    function initHeadingWrap() {
        var heads = $all('.luxe-section-head h2, .section-header h2');
        heads.forEach(function (h) {
            if (h.dataset.enhWrapped) return;
            h.dataset.enhWrapped = '1';
            // Wrap content in single <span> so CSS transform works on it
            var inner = h.innerHTML.trim();
            if (!inner) return;
            // Only wrap if no element children would be split awkwardly
            var span = document.createElement('span');
            span.innerHTML = inner;
            span.style.display = 'inline-block';
            h.innerHTML = '';
            h.appendChild(span);
        });
    }

    // ---------- 16. CHART.JS palette override ----------
    function initChartTheme() {
        var trial = 0;
        var iv = setInterval(function () {
            trial++;
            if (window.Chart && window.Chart.defaults) {
                var c = window.Chart;
                c.defaults.font = c.defaults.font || {};
                c.defaults.font.family = "'JetBrains Mono', 'Cormorant Garamond', serif";
                c.defaults.font.size = 11;
                c.defaults.color = '#5A6F7C';
                c.defaults.borderColor = 'rgba(201,168,118,0.18)';
                // Plugin: override colors after dataset creation
                c.register({
                    id: 'enhPalette',
                    beforeInit: function (chart) {
                        var ds = chart.data && chart.data.datasets;
                        if (!ds) return;
                        var palette = [
                            { stroke: '#0A1F2E', fill: 'rgba(10,31,46,0.08)' },
                            { stroke: '#C9A876', fill: 'rgba(201,168,118,0.12)' }
                        ];
                        ds.forEach(function (d, i) {
                            var p = palette[i % palette.length];
                            d.borderColor = p.stroke;
                            d.backgroundColor = p.fill;
                            d.pointBackgroundColor = p.stroke;
                            d.pointBorderColor = p.stroke;
                            d.borderWidth = 1.5;
                            d.tension = 0.32;
                            d.pointRadius = 3;
                        });
                    }
                });
                clearInterval(iv);
            }
            if (trial > 40) clearInterval(iv); // 8s max
        }, 200);
    }

    // ---------- 17. RETURN-TO-TOP BUTTON ----------
    function initToTop() {
        var btn = document.createElement('button');
        btn.className = 'enh-totop';
        btn.setAttribute('aria-label', 'Back to top');
        btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 4v16M5 11l7-7 7 7"/></svg>';
        document.body.appendChild(btn);
        btn.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
        });
        function onScroll() {
            if (window.scrollY > 1200) btn.classList.add('enh-visible');
            else btn.classList.remove('enh-visible');
        }
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    // ---------- 18. CARD 3D TILT (mouse-driven, max 3°) ----------
    function initCardTilt() {
        if (window.matchMedia('(hover: none)').matches) return;
        if (reduce) return;
        var sel = '.luxe-ba-card, .luxe-event-card, .luxe-why-card, .specialty-card';
        var cards = $all(sel);
        cards.forEach(function (card) {
            var rect = null;
            card.addEventListener('mouseenter', function () { rect = card.getBoundingClientRect(); });
            card.addEventListener('mousemove', function (e) {
                if (!rect) rect = card.getBoundingClientRect();
                var nx = (e.clientX - rect.left) / rect.width;   // 0..1
                var ny = (e.clientY - rect.top)  / rect.height;  // 0..1
                var rx = (0.5 - ny) * 3;
                var ry = (nx - 0.5) * 3;
                card.style.transform = 'perspective(900px) rotateX(' + rx.toFixed(2) + 'deg) rotateY(' + ry.toFixed(2) + 'deg) translateY(-4px)';
            });
            card.addEventListener('mouseleave', function () {
                rect = null;
                card.style.transform = '';
            });
        });
    }

    // ---------- 19. IMAGE FADE-IN ON LOAD ----------
    function initImageFade() {
        var imgs = $all('img');
        imgs.forEach(function (img) {
            if (img.complete && img.naturalWidth > 0) {
                img.classList.add('enh-img-loaded');
                return;
            }
            img.classList.add('enh-img-pending');
            img.addEventListener('load', function () {
                img.classList.remove('enh-img-pending');
                img.classList.add('enh-img-loaded');
            });
            img.addEventListener('error', function () {
                img.classList.remove('enh-img-pending');
            });
        });
    }

    // ---------- boot ----------
    function boot() {
        try {
            // Page-load curtain overlay (CSS-driven, removed after animation)
            var curtain = document.createElement('div');
            curtain.className = 'enh-curtain';
            document.body.appendChild(curtain);
            setTimeout(function () { curtain.remove(); }, 1700);
        } catch (e) {}
        try { initScrollProgress(); } catch (e) {}
        try { initSectionProgress(); } catch (e) {}
        try { initCountUp(); } catch (e) {}
        try { initProcessRail(); } catch (e) {}
        try { initScanReveal(); } catch (e) {}
        try { initReviewStars(); } catch (e) {}
        try { initHeroParallax(); } catch (e) {}
        try { initSectionReveal(); } catch (e) {}
        try { initOrphanFade(); } catch (e) {}
        try { initInteriorLabels(); } catch (e) {}
        try { initBaCardBadges(); } catch (e) {}
        try { initCursor(); } catch (e) {}
        try { initMagnetic(); } catch (e) {}
        try { initScrollCue(); } catch (e) {}
        try { initNavCurrent(); } catch (e) {}
        try { initHeadingWrap(); } catch (e) {}
        try { initChartTheme(); } catch (e) {}
        try { initToTop(); } catch (e) {}
        try { initCardTilt(); } catch (e) {}
        try { initImageFade(); } catch (e) {}
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }
})();
