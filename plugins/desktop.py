import subprocess, platform, pyautogui
from flask import redirect, url_for


def register(app):
    @app.route("/app/desktop")
    def desktop():
        print("[INFO] Showing desktop...")
        if platform.system() == "Linux":
            subprocess.Popen(["xdotool", "key", "Super+d"])

        elif platform.system() == "Windows":
            pyautogui.hotkey("win", "d")

        else:
            return "Unsupported OS!", 500

        return redirect(url_for("home"))
