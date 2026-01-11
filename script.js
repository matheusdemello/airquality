/* Checklist persistence (localStorage) */
(function () {
  const root = document.querySelector('[data-checklist="nest"]');
  if (!root) return;

  const key = "akshumkar_nest_checklist_v1";
  const checkboxes = Array.from(root.querySelectorAll('input[type="checkbox"]'));
  const status = document.getElementById("status");
  const reset = document.getElementById("reset");

  function load() {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return;
      const state = JSON.parse(raw);
      checkboxes.forEach(cb => {
        if (typeof state[cb.id] === "boolean") cb.checked = state[cb.id];
      });
      updateStatus();
    } catch (_) {}
  }

  function save() {
    const state = {};
    checkboxes.forEach(cb => { state[cb.id] = cb.checked; });
    try { localStorage.setItem(key, JSON.stringify(state)); } catch (_) {}
    updateStatus();
  }

  function updateStatus() {
    if (!status) return;
    const done = checkboxes.filter(cb => cb.checked).length;
    status.textContent = `${done}/${checkboxes.length} completed`;
  }

  checkboxes.forEach(cb => cb.addEventListener("change", save));

  if (reset) {
    reset.addEventListener("click", () => {
      checkboxes.forEach(cb => { cb.checked = false; });
      save();
    });
  }

  load();
})();
