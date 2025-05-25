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
  `,
  settings: `
    <header><h1>System Settings</h1></header>
    <section class="card-grid">
      <div class="card"><h3>Theme</h3><p>Light Mode</p></div>
      <div class="card"><h3>Notifications</h3><p>Enabled</p></div>
      <div class="card"><h3>Data Refresh</h3><p>Every 5 seconds</p></div>
    </section>
  `
};

let chart, users = JSON.parse(localStorage.getItem("users")) || [];

function renderUsers() {
  const table = document.querySelector("#userTable tbody");
  if (!table) return;
  table.innerHTML = "";
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
    table.appendChild(row);
  });
  localStorage.setItem("users", JSON.stringify(users));
}

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
}
setInterval(autoAddUser, 5000);

function changeStatus(index, newStatus) {
  users[index].status = newStatus;
  renderUsers();
}

function deleteUser(index) {
  users.splice(index, 1);
  renderUsers();
}

function simulateMetrics() {
  const activeCount = users.filter(u => u.status === "Active").length;
  const activeUsersEl = document.getElementById("activeUsers");
  const revenue = document.getElementById("revenue");
  const load = document.getElementById("load");

  if (activeUsersEl) activeUsersEl.textContent = activeCount;
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

function loadPage(name) {
  pageContainer.classList.remove("show");
  setTimeout(() => {
    pageContainer.innerHTML = pages[name] || "<p>Page not found.</p>";
    pageContainer.classList.add("show");
    if (name === "dashboard") {
      initChart();
      renderUsers();
    }
  }, 300);
}

document.querySelectorAll("[data-page]").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    loadPage(e.target.dataset.page);
  });
});

// Initial page
loadPage("dashboard");
