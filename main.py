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


if __name__ == "__main__":
    load_plugins()  # Load all the plugins
    app.run(host="0.0.0.0", debug=True, port=5000)  # Start the server
    print("[INFO] Server started!")
