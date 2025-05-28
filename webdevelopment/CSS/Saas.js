// === Updated Saas.js ===
const userTableBody = document.querySelector("#userTable tbody");
let users = JSON.parse(localStorage.getItem("users")) || [];
let settings = JSON.parse(localStorage.getItem("settings")) || {
  theme: "light",
  notifications: true,
  refreshInterval: 5000
};

// === Apply Theme ===
function applySettings() {
  document.body.className = settings.theme === "dark" ? "dark" : "";
}
applySettings();

function getRandomName() {
  const names = [
    "Alice", "Bob", "Charlie", "Dana", "Eli", "Frank", "Grace", "Hank",
    "Tom", "Timmy", "Mary", "Dave", "Barry", "Billy", "Sara", "David",
    "Brendon", "Mikey", "Conor", "Austin", "Danny", "Ally", "Carly",
    "Ivy", "Jack", "Kara", "Liam", "Mona", "Nina", "Omar", "Paul",
    "Quinn", "Rita", "Sam", "Tina", "Uma", "Vince", "Wendy", "Xander",
    "Yara", "Zane", "Amber", "Brian", "Celia", "Derek", "Erin", "Felix",
    "Gina", "Harold", "Isla", "Jonas", "Kylie", "Leon", "Maya", "Nate",
    "Olga", "Perry", "Queenie", "Ray", "Sophie", "Ursula", "Victor",
    "Willow", "Yosef"
  ];
  return names[Math.floor(Math.random() * names.length)];
}

function getRandomEmail(name) {
  const domains = [
    "example.com", "mail.com", "demo.org", "gmail.com", "yahoo.com",
    "outlook.com", "protonmail.com", "icloud.com", "company.org",
    "business.net", "corpmail.co", "startup.io"
  ];
  return `${name.toLowerCase()}@${domains[Math.floor(Math.random() * domains.length)]}`;
}

function getRandomAmountSpent() {
  return parseFloat((Math.random() * 500 + 50).toFixed(2)); // $50 - $550
}

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

function autoAddUser() {
  const name = getRandomName();
  const email = getRandomEmail(name);
  const status = Math.random() > 0.5 ? "Active" : "Inactive";
  const amountSpent = getRandomAmountSpent();
  users.push({ name, email, status, amountSpent });
  renderUsers();
  if (settings.notifications) showToast(`New user added: ${name}`);
}
let autoAddUserInterval = setInterval(autoAddUser, settings.refreshInterval);

// === Auto Remove Some Users ===
function autoRemoveUsers() {
  if (users.length === 0) return;
  const countToRemove = Math.floor(Math.random() * 5) + 1; // Remove 1-5 users
  users.splice(0, countToRemove);
  renderUsers();
}
setInterval(autoRemoveUsers, 10000);

const activeUsersElem = document.getElementById("activeUsers");
const revenueElem = document.getElementById("revenue");
const loadElem = document.getElementById("load");

function simulateMetrics() {
  const activeUsers = users.filter(u => u.status === "Active");
  const totalRevenue = activeUsers.reduce((sum, u) => sum + u.amountSpent, 0);
  const serverLoad = Math.min(100, (totalRevenue * 0.01).toFixed(0));

  if (activeUsersElem) activeUsersElem.textContent = activeUsers.length;
  if (revenueElem) revenueElem.textContent = totalRevenue.toFixed(2);
  if (loadElem) loadElem.textContent = `${serverLoad}%`;

  updateChart(totalRevenue);
}
setInterval(simulateMetrics, 1000);

// Chart
const ctx = document.getElementById('liveChart')?.getContext('2d');
let chartData = {
  labels: [],
  datasets: [{
    label: 'Revenue ($)',
    borderColor: '#3b82f6',
    data: [],
    fill: false,
  }]
};

const liveChart = ctx ? new Chart(ctx, {
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
}) : null;

function updateChart(value) {
  const now = new Date().toLocaleTimeString();
  if (chartData.labels.length > 20) {
    chartData.labels.shift();
    chartData.datasets[0].data.shift();
  }
  chartData.labels.push(now);
  chartData.datasets[0].data.push(value);
  liveChart?.update();
}

function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add("show"), 100);
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

renderUsers();