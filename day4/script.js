// ---------- 1. Select Elements ----------
const textarea = document.querySelector("#note-text");
const charCount = document.querySelector("#char-count");
const wordCount = document.querySelector("#word-count");
const clearBtn = document.querySelector("#clear-btn");
const themeToggleBtn = document.querySelector("#theme-toggle");

const DRAFT_KEY = "quicknotes_draft";
const THEME_KEY = "quicknotes_theme";

// ---------- 2. Update Counts & Classes ----------
function updateCounts() {
  const text = textarea.value;
  const length = text.length;

  // Word count: split by whitespace and filter out empty strings
  const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;

  // Display texts
  charCount.textContent = `${length} / 200 characters`;
  wordCount.textContent = `${words} ${words === 1 ? "word" : "words"}`;

  // Reset counter classes first
  charCount.classList.remove("warning", "over");

  // Apply warning (>180) or over (>200) styling
  if (length > 200) {
    charCount.classList.add("over");
  } else if (length > 180) {
    charCount.classList.add("warning");
  }
}

// ---------- 3. Save & Restore Draft ----------
function saveDraft() {
  localStorage.setItem(DRAFT_KEY, textarea.value);
}

function loadDraft() {
  const savedDraft = localStorage.getItem(DRAFT_KEY);
  if (savedDraft !== null) {
    textarea.value = savedDraft;
  }
}

// ---------- 4. Clear Functionality ----------
function clearNote() {
  textarea.value = "";
  localStorage.removeItem(DRAFT_KEY);
  updateCounts();
  textarea.focus();
}

// ---------- 5. Theme Toggle Functionality ----------
function applyTheme(theme) {
  if (theme === "dark") {
    document.body.classList.add("dark");
    themeToggleBtn.textContent = "Light mode";
  } else {
    document.body.classList.remove("dark");
    themeToggleBtn.textContent = "Dark mode";
  }
}

function toggleTheme() {
  const isDark = document.body.classList.toggle("dark");
  const currentTheme = isDark ? "dark" : "light";
  localStorage.setItem(THEME_KEY, currentTheme);
  themeToggleBtn.textContent = isDark ? "Light mode" : "Dark mode";
}

function loadTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY) || "light";
  applyTheme(savedTheme);
}

// ---------- 6. Event Listeners & Initialization ----------

// Input event for live typing, counting, and saving drafts
textarea.addEventListener("input", () => {
  updateCounts();
  saveDraft();
});

// Clear button click event
clearBtn.addEventListener("click", clearNote);

// Escape key shortcut to clear
textarea.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    clearNote();
  }
});

// Theme toggle button click event
themeToggleBtn.addEventListener("click", toggleTheme);

// Initialize on page load
loadTheme();
loadDraft();
updateCounts();