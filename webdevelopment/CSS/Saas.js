const userTableBody = document.querySelector("#userTable tbody");

let users = JSON.parse(localStorage.getItem("users")) || [];

// Random name/email generators
function getRandomName() {
  const names = ["Alice", "Bob", "Charlie", "Dana", "Eli", "Frank", "Grace", "Hank"];
  return names[Math.floor(Math.random() * names.length)];
}

function getRandomEmail(name) {
  const domains = ["example.com", "mail.com", "demo.org"];
  return `${name.toLowerCase()}@${domains[Math.floor(Math.random() * domains.length)]}`;
}

// Render and store users
function renderUsers() {
  userTableBody.innerHTML = "";
  users.forEach((user, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.status}</td>
      <td>
        <button class="activate" onclick="changeStatus(${index}, 'Active')">Activate</button>
        <button class="deactivate" onclick="changeStatus(${index}, 'Inactive')">Deactivate</button>
        <button class="delete" onclick="deleteUser(${index})">Delete</button>
      </td>
    `;
    userTableBody.appendChild(row);
  });
  localStorage.setItem("users", JSON.stringify(users));
}

function changeStatus(index, newStatus) {
  users[index].status = newStatus;
  renderUsers();
}

function deleteUser(index) {
  users.splice(index, 1);
  renderUsers();
}

// Add random user every few seconds
function autoAddUser() {
  const name = getRandomName();
  const email = getRandomEmail(name);
  const status = Math.random() > 0.5 ? "Active" : "Inactive";
  users.push({ name, email, status });
  renderUsers();
}
setInterval(autoAddUser, 5000);

// Dashboard metrics
const activeUsers = document.getElementById("activeUsers");
const revenue = document.getElementById("revenue");
const load = document.getElementById("load");

function simulateMetrics() {
  const activeCount = users.filter(u => u.status === "Active").length;
  activeUsers.textContent = activeCount;
  if (activeCount === 0) {
    revenue.textContent = "0.00";
    load.textContent = "0%";
  } else {
    revenue.textContent = (Math.random() * 10000).toFixed(2);
    load.textContent = `${Math.floor(Math.random() * 100)}%`;
  }
}
setInterval(simulateMetrics, 2000);

// Chart
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

// Initial render
renderUsers();
