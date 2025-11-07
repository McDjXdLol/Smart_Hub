from flask import request, jsonify
import json, os

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


def register(app):
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
