const pageContainer = document.getElementById("page-container");

const pages = {
  dashboard: `
    <header><h1>Real-Time Dashboard</h1></header>
    <section class="card-grid">
      <div class="card"><h3>Active Users</h3><p id="activeUsers">0</p></div>
      <div class="card"><h3>Revenue</h3><p>$<span id="revenue">0</span></p></div>
      <div class="card"><h3>Server Load</h3><p><span id="load">0%</span></p></div>
    </section>
    <section class="chart-section"><canvas id="liveChart"></canvas></section>
    <section class="user-table">
      <h2>User Management</h2>
      <table id="userTable">
        <thead><tr><th>Name</th><th>Email</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody></tbody>
      </table>
    </section>
  `,
  users: `
    <header><h1>User Directory</h1></header>
    <section class="user-table">
      <table>
        <thead><tr><th>Name</th><th>Email</th><th>Status</th></tr></thead>
        <tbody>
          <tr><td>Jane Doe</td><td>jane@example.com</td><td>Active</td></tr>
          <tr><td>Mike Ross</td><td>mike@demo.com</td><td>Inactive</td></tr>
          <tr><td>Rosa Lee</td><td>rosa@mail.com</td><td>Active</td></tr>
        </tbody>
      </table>
    </section>
  `
};

let settings = JSON.parse(localStorage.getItem("settings")) || {
  theme: "light",
  notifications: true,
  refreshInterval: 5000
};
let users = JSON.parse(localStorage.getItem("users")) || [];
let chart, autoAddUserInterval;

// === Settings ===
function applySettings() {
  document.body.className = settings.theme === "dark" ? "dark" : "";
}

// === Toast Notification ===
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

// === Auto User Generation ===
function getRandomName() {
  const names = ["Alice", "Bob", "Charlie", "Dana", "Eli", "Frank", "Grace", "Hank"];
  return names[Math.floor(Math.random() * names.length)];
}
function getRandomEmail(name) {
  const domains = ["example.com", "mail.com", "demo.org"];
  return `${name.toLowerCase()}@${domains[Math.floor(Math.random() * domains.length)]}`;
}
function autoAddUser() {
  const name = getRandomName();
  const email = getRandomEmail(name);
  const status = Math.random() > 0.5 ? "Active" : "Inactive";
  users.push({ name, email, status });
  renderUsers();
  if (settings.notifications) showToast(`New user added: ${name}`);
}

// === Render Users ===
function renderUsers() {
  const tbody = document.querySelector("#userTable tbody");
  if (!tbody) return;
  tbody.innerHTML = "";
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
    tbody.appendChild(row);
  });
  localStorage.setItem("users", JSON.stringify(users));
}

// === Metric Simulation ===
function simulateMetrics() {
  const activeCount = users.filter(u => u.status === "Active").length;
  const activeUsers = document.getElementById("activeUsers");
  const revenue = document.getElementById("revenue");
  const load = document.getElementById("load");
  if (activeUsers) activeUsers.textContent = activeCount;
  if (revenue && load) {
    if (activeCount === 0) {
      revenue.textContent = "0.00";
      load.textContent = "0%";
    } else {
      revenue.textContent = (Math.random() * 10000).toFixed(2);
      load.textContent = `${Math.floor(Math.random() * 100)}%`;
    }
  }
}
setInterval(simulateMetrics, 2000);

// === Chart ===
function updateChart() {
  if (!chart) return;
  const now = new Date().toLocaleTimeString();
  const data = chart.data;
  if (data.labels.length > 20) {
    data.labels.shift();
    data.datasets[0].data.shift();
  }
  data.labels.push(now);
  data.datasets[0].data.push(Math.floor(Math.random() * 100));
  chart.update();
}
setInterval(updateChart, 1000);
function initChart() {
  const ctx = document.getElementById("liveChart");
  if (!ctx) return;
  chart = new Chart(ctx.getContext("2d"), {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: 'Traffic',
        borderColor: '#3b82f6',
        data: [],
        fill: false,
      }]
    },
    options: {
      animation: false,
      responsive: true,
      scales: {
        x: { display: false },
        y: { beginAtZero: true }
      }
    }
  });
}

// === Change Status / Delete ===
function changeStatus(index, status) {
  users[index].status = status;
  renderUsers();
}
function deleteUser(index) {
  users.splice(index, 1);
  renderUsers();
}

// === Settings Page ===
function renderSettingsPage() {
  pageContainer.innerHTML = `
    <header><h1>System Settings</h1></header>
    <section class="card-grid">
      <div class="card">
        <h3>Theme</h3>
        <select id="themeSelect">
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>
      <div class="card">
        <h3>Notifications</h3>
        <input type="checkbox" id="notificationsToggle" ${settings.notifications ? 'checked' : ''}>
      </div>
      <div class="card">
        <h3>Data Refresh Interval (ms)</h3>
        <input type="number" id="refreshInterval" value="${settings.refreshInterval}" min="1000">
      </div>
      <div class="card">
        <h3>Export / Import</h3>
        <button id="exportBtn">Export Data</button>
        <input type="file" id="importInput" accept=".json"/>
      </div>
      <button id="saveSettings">Save Settings</button>
    </section>
  `;

  document.getElementById("themeSelect").value = settings.theme;
  document.getElementById("themeSelect").addEventListener("change", e => {
    settings.theme = e.target.value;
    applySettings();
  });

  document.getElementById("saveSettings").addEventListener("click", () => {
    settings.notifications = document.getElementById("notificationsToggle").checked;
    settings.refreshInterval = parseInt(document.getElementById("refreshInterval").value);
    localStorage.setItem("settings", JSON.stringify(settings));
    clearInterval(autoAddUserInterval);
    autoAddUserInterval = setInterval(autoAddUser, settings.refreshInterval);
    showToast("Settings saved.");
  });

  document.getElementById("exportBtn").addEventListener("click", () => {
    const data = { users, settings };
    const blob = new Blob([JSON.stringify(data)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "dashboard_data.json";
    a.click();
  });

  document.getElementById("importInput").addEventListener("change", e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = evt => {
      const data = JSON.parse(evt.target.result);
      users = data.users || users;
      settings = data.settings || settings;
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("settings", JSON.stringify(settings));
      applySettings();
      renderUsers();
      clearInterval(autoAddUserInterval);
      autoAddUserInterval = setInterval(autoAddUser, settings.refreshInterval);
      showToast("Data imported.");
    };
    reader.readAsText(file);
  });
}

// === Page Loader ===
function loadPage(name) {
  pageContainer.classList.remove("show");
  setTimeout(() => {
    if (name === "settings") {
      renderSettingsPage();
    } else {
      pageContainer.innerHTML = pages[name] || "<p>Page not found.</p>";
      if (name === "dashboard") {
        initChart();
        renderUsers();
      }
    }
    pageContainer.classList.add("show");
  }, 300);
}

document.querySelectorAll("[data-page]").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    loadPage(e.target.dataset.page);
  });
});

// === Init ===
applySettings();
autoAddUserInterval = setInterval(autoAddUser, settings.refreshInterval);
loadPage("dashboard");
