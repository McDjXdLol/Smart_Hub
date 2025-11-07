// --- MODULE: GLOBAL STATE ---
let showStats = true;
let backgroundType = 'color';
let backgroundColorValue = '#111827';
let backgroundImageValue = '';


// --- MODULE: SETTINGS ---
let currentIndex = 0;
let options = [];
let isEditingInput = false;

// Function to open settings modal
function openSettings() {
    const modal = document.getElementById("settings-modal");
    const content = document.getElementById("settings-content");
    modal.classList.remove("hidden");

    setTimeout(() => {
        content.classList.remove("opacity-0", "scale-95");
        content.classList.add("opacity-100", "scale-100");
        content.focus();
    }, 50);

    enableSettingsKeyboardNav();
}

// Function to close settings modal
function closeSettings() {
    const modal = document.getElementById("settings-modal");
    const content = document.getElementById("settings-content");
    content.classList.add("opacity-0", "scale-95");
    setTimeout(() => {
        modal.classList.add("hidden");
    }, 200);
    disableSettingsKeyboardNav();
}

// Function to refresh the list of options
function optionsList() {
    options = Array.from(document.querySelectorAll('#settings-content .settings-option'));
    const closeButton = document.getElementById('close-settings-button');
    if (closeButton) {
        options.push(closeButton);
    }

    if (currentIndex >= options.length) {
        currentIndex = options.length > 0 ? options.length - 1 : 0;
    } else if (currentIndex < 0) {
        currentIndex = 0;
    }
}

// Functions to enable/disable keyboard navigation
function enableSettingsKeyboardNav() {
    optionsList();
    if (options.length === 0) return;
    highlightOption(options[currentIndex]);
    document.addEventListener("keydown", handleKey);
}

// Disable keyboard navigation
function disableSettingsKeyboardNav() {
    options.forEach(opt => removeHighlight(opt));
    document.getElementById('bg-color-input').blur();
    document.getElementById('bg-image-input').blur();
    document.removeEventListener("keydown", handleKey);
    isEditingInput = false;
}

// Keyboard navigation handler
function handleKey(e) {
    if (!options.length) return;

    let current = options[currentIndex];

    if (isEditingInput) {
        const activeInputId = backgroundType === 'color' ? 'bg-color-input' : 'bg-image-input';
        const activeInput = document.getElementById(activeInputId);

        if (['ArrowUp', 'ArrowDown'].includes(e.key)) {
            e.preventDefault();
            return;
        }

        if (e.key === "Escape") {
            e.preventDefault();
            activeInput.blur();
            isEditingInput = false;
            currentIndex = options.findIndex(el => el.id === 'bg-type-setting');
            if (currentIndex === -1) currentIndex = 0; // Fallback
            highlightOption(options[currentIndex]);
        }
        return;
    }


    if (e.key === "ArrowDown") {
        e.preventDefault();
        removeHighlight(current);
        currentIndex = (currentIndex + 1) % options.length;
        highlightOption(options[currentIndex]);
    }
    else if (e.key === "ArrowUp") {
        e.preventDefault();
        removeHighlight(current);
        currentIndex = (currentIndex - 1 + options.length) % options.length;
        highlightOption(options[currentIndex]);
    }
    else if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        e.preventDefault();
        if (current.id === 'bg-type-setting') {
            const isColorSelected = document.getElementById('bg-color').checked;

            let newRadioId = (e.key === "ArrowRight") ? 'bg-image' : 'bg-color';

            if (e.key === "ArrowRight" && isColorSelected) {
                newRadioId = 'bg-image';
            } else if (e.key === "ArrowLeft" && !isColorSelected) {
                newRadioId = 'bg-color';
            } else {
                return;
            }

            const newRadio = document.getElementById(newRadioId);
            if (newRadio && !newRadio.checked) {
                newRadio.checked = true;
                newRadio.dispatchEvent(new Event("change"));
                highlightOption(current);
            }
        }
    }
    else if (e.key === "Enter") {
        e.preventDefault();
        current = options[currentIndex];

        if (current.id === 'close-settings-button') {
            closeSettings();
            return;
        }

        const checkbox = current.querySelector("input[type='checkbox']");

        if (checkbox) {
            checkbox.checked = !checkbox.checked;
            checkbox.dispatchEvent(new Event("change"));
            return;
        }

        if (current.id === 'bg-type-setting') {
            removeHighlight(current);

            const inputToFocus = backgroundType === 'color' ?
                document.getElementById('bg-color-input') :
                document.getElementById('bg-image-input');

            if (inputToFocus) {
                inputToFocus.focus();
                inputToFocus.select();
                isEditingInput = true;
            }
            return;
        }
    }
}

// Function to highlight an option
function highlightOption(el) {
    options.forEach(opt => removeHighlight(opt));

    document.getElementById('bg-type-selector').classList.remove('bg-type-selector-focus');

    if (el.id === 'bg-type-setting') {
        document.getElementById('bg-type-selector').classList.add('bg-type-selector-focus');
        el.scrollIntoView({ block: "nearest", behavior: "smooth" });
    } else if (el.id === 'close-settings-button') {
        el.classList.add("active-focus");
        el.scrollIntoView({ block: "nearest", behavior: "smooth" });
    } else {
        el.classList.add("settings-option", "active-focus");
        el.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
}


// Function to remove highlight from an option
function removeHighlight(el) {
    el.classList.remove("ring-2", "ring-blue-500", "scale-[1.02]", "active-focus");
}


// Function to toggle stats visibility
function toggleStats() {
    const statsContainer = document.getElementById('stats-container');
    const checkbox = document.getElementById('toggle-stats');

    showStats = checkbox.checked;

    if (statsContainer) {
        statsContainer.style.display = showStats ? 'flex' : 'none';
    }
    saveSettings();
}

// Function to change background type
function changeBackgroundType(type) {
    backgroundType = type;

    const colorSettings = document.getElementById('bg-color-settings');
    const imageSettings = document.getElementById('bg-image-settings');

    colorSettings.classList.add('hidden');
    imageSettings.classList.add('hidden');

    if (type === 'color') {
        colorSettings.classList.remove('hidden');
        changeBackground(backgroundColorValue, 'color', false);
    } else {
        imageSettings.classList.remove('hidden');
        changeBackground(backgroundImageValue, 'image', false);
    }

    console.log(`[SETTINGS] Background type changed to: ${type}`);
    saveSettings();

    isEditingInput = false;
}

// Function to change background value
function changeBackground(value, type, updateInput = true) {
    const body = document.body;

    if (type === 'color') {
        backgroundColorValue = value;
        body.style.backgroundImage = 'none';
        body.style.background = value;

        if (updateInput) {
            document.getElementById('bg-color-input').value = value;
        }

        console.log(`[SETTINGS] Changed background to color/gradient: ${value}`);

    } else if (type === 'image') {
        backgroundImageValue = value;
        if (value.startsWith('http')) {
            body.style.background = `url('${value}') center center/cover no-repeat fixed`;
        } else {
            body.style.background = backgroundColorValue;
        }

        if (updateInput) {
            document.getElementById('bg-image-input').value = value;
        }

        console.log(`[SETTINGS] Background image changed: ${value}`);
    }
    saveSettings();
}

// Function to initialize settings from backend
async function initializeSettings() {
    try {
        const res = await fetch('/get_settings');
        const settings = await res.json();

        showStats = settings.showStats;
        backgroundType = settings.backgroundType;
        backgroundColorValue = settings.backgroundColorValue;
        backgroundImageValue = settings.backgroundImageValue;

        document.getElementById('toggle-stats').checked = showStats;
        toggleStats();

        document.getElementById(`bg-${backgroundType}`).checked = true;
        changeBackgroundType(backgroundType);

        if (backgroundType === "color") {
            changeBackground(backgroundColorValue, "color", false);
        } else {
            changeBackground(backgroundImageValue, "image", false);
        }

        console.log("[INIT] Settings initialized with default/mock values.");
    } catch (err) {
        console.error("[INIT] Error while loading settings:", err);
    }
}
// Function to save settings to backend
function saveSettings() {
    const data = {
        showStats,
        backgroundType,
        backgroundColorValue,
        backgroundImageValue
    };
    fetch('/save_settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then(res => res.json())
        .then(r => console.log('[SETTINGS] Settings saved', r))
        .catch(e => console.error('[SETTINGS] Error while saving:', e));
}


// --- MODULE: STATS (PC Statistics) ---
function updateStatGauge(id, label, value) {
    const textElement = document.getElementById(`${id}_stat_txt`);
    const rangeElement = document.getElementById(`${id}_stat`);

    if (textElement) {
        textElement.innerText = `${label}: ${value}%`;
    }
    if (rangeElement) {
        rangeElement.value = value;

        rangeElement.style.setProperty('--progress-width', `${value}%`);

        // Set color based on value
        let color;
        if (value >= 80) {
            color = '#EF4444'; // Red
        } else if (value >= 50) {
            color = '#F59E0B'; // Amber
        } else {
            color = '#3B82F6'; // Blue
        }
        rangeElement.style.setProperty('--progress-color', color);
    }
}

// Initial fetch and update every second (Mocked)
setInterval(() => {
    // Mock data for display
    const data = {
        cpu: Math.floor(Math.random() * 30) + 10,
        ram: Math.floor(Math.random() * 40) + 20,
        disk: Math.floor(Math.random() * 50) + 5
    };

    // Update each gauge
    updateStatGauge('cpu', 'CPU', data.cpu);
    updateStatGauge('ram', 'RAM', data.ram);
    updateStatGauge('disk', 'Disk', data.disk);

}, 1000)


// --- MODULE: IDLE SCREEN ---
let idleTime = 0;
const idleLimit = 60; // seconds before showing idle screen
let overlayVisible = false;
let idleOverlayElement = null;
let clockIntervalId = null;

// Function to hide the idle screen
function hideIdleScreen() {
    idleTime = 0;
    if (idleOverlayElement) {
        idleOverlayElement.remove();
        idleOverlayElement = null;
    }
    if (clockIntervalId) {
        clearInterval(clockIntervalId);
        clockIntervalId = null;
    }
    overlayVisible = false;
}

// Function to reset idle timer and hide overlay if visible
const resetIdle = () => {
    // Tylko resetuj timer, jeśli ustawienia nie są otwarte
    const settingsModal = document.getElementById('settings-modal');
    const isSettingsOpen = settingsModal && !settingsModal.classList.contains('hidden');

    if (!isSettingsOpen) {
        idleTime = 0;
    }

    if (overlayVisible) {
        hideIdleScreen();
    }
};

// Function to update the clock every second
const updateClock = () => {
    const now = new Date();
    const clockElement = document.getElementById('clock');
    if (clockElement) {
        clockElement.innerText =
            now.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    }
};

// Function to show the idle screen with clock
function showIdleScreen() {

    if (overlayVisible) return; // If already visible, do nothing

    // Create the overlay element
    idleOverlayElement = document.createElement('div');
    idleOverlayElement.id = 'idle-overlay';
    idleOverlayElement.className = 'fixed inset-0 flex items-center justify-center bg-black bg-opacity-95 text-white text-9xl cursor-pointer z-[9999]';
    idleOverlayElement.innerHTML = `<div id="clock">--:--:--</div>`;
    document.body.appendChild(idleOverlayElement);

    overlayVisible = true;

    // Start updating the clock every second
    updateClock();
    clockIntervalId = setInterval(updateClock, 1000);

    // Add event listeners to hide the overlay on interaction
    idleOverlayElement.addEventListener('click', hideIdleScreen);
    idleOverlayElement.addEventListener('touchstart', hideIdleScreen);
}


// Increment idle time every second
setInterval(() => {
    idleTime++;
    if (idleTime >= idleLimit) {
        showIdleScreen();
    }
}, 1000);

// Reset idle timer on user interactions
['mousemove', 'keydown', 'click', 'touchstart'].forEach(event => {
    document.addEventListener(event, resetIdle);
});


// --- MODULE: APP NAVIGATION (HOME SCREEN) ---
document.addEventListener('DOMContentLoaded', () => {
    const appItems = document.querySelectorAll('.app-item');
    let currentFocusIndex = 0;

    initializeSettings();

    if (appItems.length === 0) return;

    const updateFocus = (newIndex) => {
        if (appItems[currentFocusIndex]) {
            appItems[currentFocusIndex].classList.remove('focused');
        }
        currentFocusIndex = newIndex;
        appItems[currentFocusIndex].classList.add('focused');
    };
    updateFocus(0); // Initial focus on the first item


    // Handle keyboard navigation 
    document.addEventListener('keydown', (event) => {

        // Check if settings modal is open
        const settingsModal = document.getElementById('settings-modal');
        const isSettingsOpen = settingsModal && !settingsModal.classList.contains('hidden');

        // Zablokuj domyślne przewijanie i inne akcje dla strzałek/Enter/Escape
        if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Enter', 'Escape'].includes(event.key)) {
            event.preventDefault();
        }

        if (document.getElementById('idle-overlay') || isSettingsOpen) {

            // Disable navigation when idle overlay or settings modal is open
            return;
        }

        // -- Navigation Logic --
        if (event.key === 'ArrowRight') {
            const newIndex = (currentFocusIndex + 1) % appItems.length;
            updateFocus(newIndex);
        } else if (event.key === 'ArrowLeft') {
            const newIndex = (currentFocusIndex - 1 + appItems.length) % appItems.length;
            updateFocus(newIndex);
        } else if (event.key === 'Enter') {
            const focusedElement = appItems[currentFocusIndex];
            window.location.href = focusedElement.href;
        }
    });
});
