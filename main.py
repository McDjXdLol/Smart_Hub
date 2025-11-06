from flask import Flask, render_template, jsonify, request
import os, importlib, json, pyautogui, threading, time

print("[INFO] Starting server...")

app = Flask(__name__)


@app.route("/")
def home():
    print("[INFO] Serving homepage...")
    return render_template("index.html")


def load_plugins():
    print("[INFO] Loading all the plugins")
    for file in os.listdir("plugins"):
        if file.endswith(".py"):
            print(f"[INFO] Loading {file}...")
            mod = importlib.import_module(f"plugins.{file[:-3]}")
            if hasattr(mod, "register"):
                mod.register(app)
            print(f"[INFO] {file} loaded!")


# ===============================================================
#                     Temponary settings logic
# ===============================================================

SETTINGS_FILE = "settings.json"


# Load and save settings to a JSON file
def load_settings():
    if not os.path.exists(SETTINGS_FILE):
        return {
            "showStats": True,
            "backgroundType": "color",
            "backgroundColorValue": "#111827",
            "backgroundImageValue": "",
        }
    with open(SETTINGS_FILE, "r", encoding="utf-8") as f:
        return json.load(f)


def save_settings(data):
    with open(SETTINGS_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4, ensure_ascii=False)


@app.route("/get_settings", methods=["GET"])
def get_settings():
    return jsonify(load_settings())


@app.route("/save_settings", methods=["POST"])
def save_settings_route():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No data"}), 400
    save_settings(data)
    return jsonify({"status": "ok"})


# ===============================================================


def moveMouseLeft():
    pyautogui.FAILSAFE = False
    while True:
        pyautogui.move(-3000, 0)
        time.sleep(10)


if __name__ == "__main__":
    # threading.Thread(target=moveMouseLeft, daemon=True).start() # Ensures the mouse moves left every 10 seconds
    load_plugins()  # Load all the plugins
    app.run(debug=True, port=5000)  # Start the server
    print("[INFO] Server started!")
