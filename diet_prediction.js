document.addEventListener('DOMContentLoaded', () => {
    const calculateBtn = document.getElementById('calculateDietBtn');
    const resultContainer = document.getElementById('dietResult');
    let dietChart = null;

    if (calculateBtn) {
        calculateBtn.addEventListener('click', () => {
            const currentWeight = parseFloat(document.getElementById('currentWeight').value);
            const age = parseInt(document.getElementById('userAge').value);
            const gender = document.querySelector('input[name="gender"]:checked').value;

            if (!currentWeight || !age) {
                alert("체중과 나이를 모두 입력해주세요.");
                return;
            }

            // Calculate Weight Loss
            const rapidPlan = calculateRapidPlan(currentWeight, age, gender);
            const slowPlan = calculateSlowPlan(currentWeight, rapidPlan);

            // Show Result Section
            resultContainer.classList.add('active');

            // Render Chart
            renderChart(currentWeight, rapidPlan, slowPlan);

            // Update Text Summary
            updateSummary(currentWeight, rapidPlan, slowPlan);
        });
    }

    function calculateRapidPlan(weight, age, gender) {
        // Month 1: Based on Age (Image 1)
        let rate = 0.095; // Default 20s (9-10%)
        if (age >= 30 && age < 40) rate = 0.085; // 30s (8-9%)
        if (age >= 40 && age < 50) rate = 0.075; // 40s (7-8%)
        if (age >= 50) rate = 0.065; // 50s (6-7%)

        const lossM1 = weight * rate;
        const m1 = weight - lossM1;

        // Month 2 & 3: Based on Gender (Image 2 - Continuous Phase)
        // Women: 3.5kg/month (avg of 1.5-2kg/2wks)
        // Men: 5.5kg/month (avg of 2.5-3kg/2wks)
        const monthlyLossContinuous = (gender === 'male') ? 5.5 : 3.5;

        const m2 = m1 - monthlyLossContinuous;
        const m3 = m2 - monthlyLossContinuous;

        return [weight, m1, m2, m3];
    }

    function calculateSlowPlan(weight, rapidPlan) {
        // Slow Plan is half of Rapid Plan (User Instruction)
        // Calculate total loss at each step for rapid, then halve it
        const startWeight = rapidPlan[0];

        const lossM1 = (startWeight - rapidPlan[1]) / 2;
        const lossM2 = (startWeight - rapidPlan[2]) / 2; // Cumulative loss halved? Or monthly loss halved?
        // "Slow loss program should be about half of the rapid loss program"
        // Usually implies the *rate* is half. So cumulative loss is half.

        const m1 = startWeight - lossM1;
        const m2 = startWeight - lossM2;

        const lossM3 = (startWeight - rapidPlan[3]) / 2;
        const m3 = startWeight - lossM3;

        return [weight, m1, m2, m3];
    }

    function renderChart(startWeight, rapidData, slowData) {
        const ctx = document.getElementById('dietChart').getContext('2d');

        if (dietChart) {
            dietChart.destroy();
        }

        // Calculate min weight to adjust Y-axis
        const minWeight = Math.min(...rapidData);

        dietChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['시작', '1개월 후', '2개월 후', '3개월 후'],
                datasets: [
                    {
                        label: '급속 감량 프로그램 (집중 관리)',
                        data: rapidData,
                        borderColor: '#D42426', // Red
                        backgroundColor: 'rgba(212, 36, 38, 0.1)',
                        borderWidth: 3,
                        pointBackgroundColor: '#D42426',
                        pointRadius: 5,
                        tension: 0.3,
                        fill: false
                    },
                    {
                        label: '완속 감량 프로그램 (생활 관리)',
                        data: slowData,
                        borderColor: '#165B33', // Green
                        backgroundColor: 'rgba(22, 91, 51, 0.1)',
                        borderWidth: 3,
                        pointBackgroundColor: '#165B33',
                        pointRadius: 5,
                        tension: 0.3,
                        fill: false
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            font: {
                                family: "'NanumBarunGothic', sans-serif",
                                size: 12
                            },
                            padding: 20
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                return context.dataset.label + ': ' + context.parsed.y.toFixed(1) + 'kg';
                            }
                        },
                        backgroundColor: 'rgba(0,0,0,0.8)',
                        padding: 10,
                        cornerRadius: 5
                    }
                },
                scales: {
                    y: {
                        title: {
                            display: true,
                            text: '체중 (kg)'
                        },
                        grid: {
                            color: '#f0f0f0'
                        },
                        ticks: {
                            stepSize: 2
                        },
                        suggestedMin: minWeight - 2
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                },
                animation: {
                    duration: 2000,
                    easing: 'easeOutQuart'
                }
            }
        });
    }

    function updateSummary(startWeight, rapidData, slowData) {
        const rapidTotal = (startWeight - rapidData[3]).toFixed(1);
        const slowTotal = (startWeight - slowData[3]).toFixed(1);

        document.getElementById('rapidTotalLoss').innerText = `-${rapidTotal}kg`;
        document.getElementById('slowTotalLoss').innerText = `-${slowTotal}kg`;

        document.getElementById('rapidFinalWeight').innerText = `${rapidData[3].toFixed(1)}kg`;
        document.getElementById('slowFinalWeight').innerText = `${slowData[3].toFixed(1)}kg`;
    }
});
