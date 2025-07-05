// Toggle submenu
function toggleMenu(e) {
  if (e) e.preventDefault();
  const menu = document.getElementById("submenu");
  menu.style.display = (menu.style.display === "block") ? "none" : "block";
}

// Toggle dark/light mode
window.onload = function () {
  const darkModeEnabled = localStorage.getItem("darkMode") === "true";
  if (darkModeEnabled) {
    document.body.classList.add("dark-mode");
  }
};

// Toggle dark mode and save to localStorage
function toggleTheme(e) {
  if (e) e.preventDefault();

  const isDark = document.body.classList.toggle("dark-mode");
  localStorage.setItem("darkMode", isDark);
}


// Fullscreen toggle
function toggleFullscreen(e) {
  if (e) e.preventDefault();
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

// Toggle preview
function togglePreview(e) {
  if (e) e.preventDefault();
  const preview = document.getElementById("previewBox");
  preview.style.display = (preview.style.display === "block") ? "none" : "block";
}

// Spellcheck toggle
function toggleSpellcheck(e) {
  if (e) e.preventDefault();
  const editor = document.getElementById("editor");
  editor.spellcheck = !editor.spellcheck;
  alert("Spellcheck is now " + (editor.spellcheck ? "ON" : "OFF"));
}

// Word and character count
const editor = document.getElementById("editor");
const wordCount = document.getElementById("wordCount");
const charCount = document.getElementById("charCount");

editor.addEventListener("input", () => {
  const text = editor.value.trim();
  wordCount.textContent = "Words: " + (text === "" ? 0 : text.split(/\s+/).length);
  charCount.textContent = "Characters: " + text.length;
});

// Close menu if clicked outside
document.addEventListener("click", (e) => {
  const menu = document.getElementById("submenu");
  const button = document.querySelector(".menu-button");
  if (!menu.contains(e.target) && !button.contains(e.target)) {
    menu.style.display = "none";
  }
});

// Keyboard shortcuts
document.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.shiftKey) {
    switch (e.key.toLowerCase()) {
      case "f":
        toggleFullscreen(e);
        break;
      case "m":
        toggleTheme(e);
        break;
      case "o":
        togglePreview(e);
        break;
      case "k":
        toggleSpellcheck(e);
        break;
    }
  }
});

// copy feature
document.getElementById("copyBtn").addEventListener("click", () => {
  const editor = document.getElementById("editor");
  const text = editor.value;

  navigator.clipboard.writeText(text)
    .then(() => alert("Text copied to clipboard!"))
    .catch((err) => alert("Failed to copy text: " + err));
});
let syncEnabled = false;

// 🧠 Word & Character Count Function
function updateCounts() {
  const text = document.getElementById("editor").value;
  const wordCount = text.trim().split(/\s+/).filter(w => w.length > 0).length;
  const charCount = text.length;

  document.getElementById("wordCount").textContent = "Words: " + wordCount;
  document.getElementById("charCount").textContent = "Characters: " + charCount;
}

// 🚀 On Page Load
window.onload = function () {
  const editor = document.getElementById("editor");

  // 🌙 Restore Dark Mode
  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
  }

  // 🔁 Restore Sync & Content
  if (localStorage.getItem("syncEnabled") === "true") {
    syncEnabled = true;
    const saved = localStorage.getItem("syncedText");
    if (saved) editor.value = saved;

    const btn = document.getElementById("syncToggle");
    btn.textContent = "Syncing…";
    btn.classList.add("syncing");
  }

  updateCounts(); // ✅ Count words/characters after loading
};

// 🟩 Toggle Dark Mode
function toggleTheme(e) {
  if (e) e.preventDefault();
  const isDark = document.body.classList.toggle("dark-mode");
  localStorage.setItem("darkMode", isDark);
}

// 🟩 Toggle Fullscreen
function toggleFullscreen(e) {
  if (e) e.preventDefault();
  const doc = document.documentElement;
  if (!document.fullscreenElement) {
    doc.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

// 🟩 Toggle Submenu
function toggleMenu(e) {
  if (e) e.preventDefault();
  const submenu = document.getElementById("submenu");
  submenu.style.display = submenu.style.display === "block" ? "none" : "block";
}

// 🟩 Toggle Preview
function togglePreview(e) {
  if (e) e.preventDefault();
  const preview = document.getElementById("previewBox");
  preview.style.display = preview.style.display === "block" ? "none" : "block";
}

// 🟩 Toggle Spellcheck
function toggleSpellcheck(e) {
  if (e) e.preventDefault();
  const editor = document.getElementById("editor");
  editor.spellcheck = !editor.spellcheck;
}

// 🟩 Toggle Sync
document.getElementById("syncToggle").addEventListener("click", () => {
  syncEnabled = !syncEnabled;
  const btn = document.getElementById("syncToggle");

  if (syncEnabled) {
    btn.textContent = "Syncing…";
    btn.classList.add("syncing");
    localStorage.setItem("syncEnabled", "true");
    localStorage.setItem("syncedText", document.getElementById("editor").value);
  } else {
    btn.textContent = "Turn on sync";
    btn.classList.remove("syncing");
    localStorage.setItem("syncEnabled", "false");
    localStorage.removeItem("syncedText");
  }
});

// 🧠 Update on Input
document.getElementById("editor").addEventListener("input", () => {
  updateCounts();
  if (syncEnabled) {
    localStorage.setItem("syncedText", document.getElementById("editor").value);
  }
});

