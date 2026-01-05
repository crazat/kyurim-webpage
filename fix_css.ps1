$file = "c:\Projects\Kyurim webpage\style.css"
$content = Get-Content $file
$newBlock = @(
    '@media (max-width: 768px) {',
    '    /* Event scroll container mobile adjustments */',
    '    .event-scroll-container {',
    '        padding: 15px 0;',
    '        gap: 15px;',
    '    }',
    '',
    '    .event-item {',
    '        width: 280px;',
    '        height: 370px;',
    '    }',
    '',
    '    /* Review Carousel Mobile Fix: Auto-move + Manual Scroll */',
    '    .review-carousel-container {',
    '        overflow-x: auto;',
    '        -webkit-overflow-scrolling: touch;',
    '        width: 100%;',
    '        overflow-y: hidden;',
    '    }',
    '',
    '    .review-carousel {',
    '        display: flex;',
    '        gap: 15px;',
    '        width: max-content;',
    '        animation: none;',
    '        padding-bottom: 5px;',
    '    }',
    '',
    '    .review-card {',
    '        flex: 0 0 280px !important;',
    '        width: 280px !important;',
    '    }',
    '}'
)

# Keep lines 1 to 1283 (indices 0 to 1282)
$part1 = $content[0..1282]
# Skip lines 1284 to 1331 (indices 1283 to 1330)
# Keep lines 1332 to end (indices 1331 to end)
$part2 = $content[1331..($content.Count - 1)]

$finalContent = $part1 + $newBlock + $part2
$finalContent | Set-Content $file -Encoding UTF8
Write-Host "CSS fixed successfully"
