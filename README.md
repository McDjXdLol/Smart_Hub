# 🎮 Play Hub

So yeah... this is my little **Flask + frontend project** that basically acts like a Smart TV UI —  
but without buying any overpriced HDMI stick or "smart" nonsense.  
I just grabbed an old mini PC, installed a minimal system with a browser,  
and boom — custom SmartTV powered by Flask and JavaScript 😎

---

## 🧠 Overview
**Play Hub** is a simple web dashboard built with:
- **Frontend:** HTML + TailwindCSS + Vanilla JS  
- **Backend:** Flask (Python)

The idea is to have a clean, fullscreen media launcher that runs in any browser.  
It displays system stats, opens media apps (like YouTube, Netflix, Steam Link),  
and lets you change the background or toggle some settings — all stored in a local JSON file on the backend.

---

## ⚙️ How it works
- The **frontend** calls Flask endpoints:
  - `POST /app/<app_name>` → so this is the main thing, just calls the backend to do things
  - `GET /stats` → returns JSON with CPU, RAM, and Disk usage
  - `GET /get_settings` → loads saved user settings (background, stats toggle, etc.)
  - `POST /save_settings` → saves new settings in backend storage (JSON)
- Updates run every second to keep system stats fresh.
- User preferences (like background or visibility of stats) are applied live and persist between sessions.

---

## 🖥️ Features
- 📊 **Live system stats** (CPU, RAM, Disk)
- 🧩 **Customizable UI** (choose background color, gradient, or image)
- ⚙️ **Settings panel** with toggle switches and color pickers
- 🚀 **Quick app launcher** for YouTube, Netflix, Stremio, Steam Link, and Desktop mode
- 💤 **Idle screen** that appears after inactivity (shows clock, etc.)
- 💾 **Persistent settings** saved through Flask

---

## 🧩 Frontend logic
All logic lives in plain JavaScript:
- Fetches system stats every second from `/stats`
- Syncs user settings via `/get_settings` and `/save_settings`
- Dynamically changes UI background and visibility of system info
- Handles idle mode (auto “sleep screen” after no activity)

---

## 🛠️ Setup
1. Clone the repo:
   ```bash
   git clone https://github.com/yourusername/playhub.git
   cd playhub
   ```
2. Install Flask:
   ```bash
   pip install flask psutil pyautogui
   ```
3. Run the backend:
   ```bash
   python main.py
   ```
4. Open your browser and go to:
   ```arduino
   http://localhost:5000
   ```

## 🖼️ Screenshots

| Main Hub UI | Remote Control Page |
|-------------|-------------|
| The main dashboard with app tiles and live system stats    | A separate controller page you can use from your phone or another device |
| <img width="1280" height="720" alt="mainhubUI" src="https://github.com/user-attachments/assets/ec2113f9-7f23-4c78-bf7a-eaf26f13c7ee" />   | <img width="1280" height="720" alt="remoteUI" src="https://github.com/user-attachments/assets/a85f8556-c711-4fbf-9776-78cb76035a01" />   |

---

## 🧱 Folder Structure
Just to give you an idea of how it’s laid out:
```bash
playhub/
├── static/
│ └── icon.ico
├── templates/
│ ├── index.html
│ └── remote.html
├── plugins/
│ ├── desktop.py
│ ├── remote.py
│ ├── stats.py
│ ├── steamlink.py
│ └── stremio.py
├── app.py
└── settings.json
```

- `static/` → just icon :)
- `templates/` → HTML templates for Flask  
- `plugins/` → all of the subpages for flask (almost all)
- `app.py` → Flask backend (routes, API, stats logic)  
- `settings.json` → stores user preferences (background, toggles, etc.)

---

## 🧑‍💻 Tech Stack
- **Frontend:** TailwindCSS, Font Awesome, Vanilla JavaScript  
- **Backend:** Flask (Python)  
- **Data:** Simple JSON-based settings  
- **System stats:** via `psutil`

---

## 📝 License
Yep, it is on [MIT LICENSE](LICENSE) 👍
