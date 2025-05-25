const activeUsers = document.getElementById("activeUsers");
const revenue = document.getElementById("revenue");
const load = document.getElementById("load");

function simulateMetrics() {
  activeUsers.textContent = Math.floor(Math.random() * 500);
  revenue.textContent = (Math.random() * 10000).toFixed(2);
  load.textContent = `${Math.floor(Math.random() * 100)}%`;
}
setInterval(simulateMetrics, 2000);

// Chart.js live update
const ctx = document.getElementById('liveChart').getContext('2d');
let chartData = {
  labels: [],
  datasets: [{
    label: 'Traffic',
    borderColor: '#3b82f6',
    data: [],
    fill: false,
  }]
};

const liveChart = new Chart(ctx, {
  type: 'line',
  data: chartData,
  options: {
    animation: false,
    responsive: true,
    scales: {
      x: { display: false },
      y: { beginAtZero: true }
    }
  }
});

function updateChart() {
  const now = new Date().toLocaleTimeString();
  if (chartData.labels.length > 20) {
    chartData.labels.shift();
    chartData.datasets[0].data.shift();
  }
  chartData.labels.push(now);
  chartData.datasets[0].data.push(Math.floor(Math.random() * 100));
  liveChart.update();
}
setInterval(updateChart, 1000);
