function loadAIAssistant() {
  if (document.getElementById('ai-assistant-container')) return;

  const container = document.createElement('div');
  container.id = 'ai-assistant-loader';
  document.body.appendChild(container);

  // Load Font Awesome if needed
  if (!document.querySelector('link[href*="font-awesome"]')) {
    const faLink = document.createElement('link');
    faLink.rel = 'stylesheet';
    faLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    document.head.appendChild(faLink);
  }

  fetch('ai-assistant.html')
    .then(response => response.text())
    .then(html => {
      container.innerHTML = html;

      // Execute scripts from the injected HTML
      const scripts = container.querySelectorAll('script');
      scripts.forEach(script => {
        const newScript = document.createElement('script');
        newScript.textContent = script.textContent;
        document.body.appendChild(newScript);
      });

      // Wait for the assistant container to exist before syncing theme
      const assistantContainer = document.getElementById('ai-assistant-container');
      if (assistantContainer) {
        const syncTheme = () => {
          const isDark = document.body.classList.contains('dark-mode');
          assistantContainer.setAttribute('data-theme', isDark ? 'dark' : 'light');
        };

        // Initial sync
        syncTheme();

        // Re-sync when user toggles theme
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
          themeToggle.addEventListener('change', syncTheme);
        }

        // Watch for class changes in body
        const observer = new MutationObserver(syncTheme);
        observer.observe(document.body, {
          attributes: true,
          attributeFilter: ['class'],
        });
      }
    })
    .catch(error => {
      console.error('Error loading AI assistant:', error);
    });
}

// Trigger on DOM ready
if (document.readyState === 'complete') {
  loadAIAssistant();
} else {
  window.addEventListener('DOMContentLoaded', loadAIAssistant);
}
