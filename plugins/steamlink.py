import subprocess, platform
from flask import redirect, url_for


def register(app):
    @app.route("/app/steamlink")
    def steamlink():
        print("[INFO] Launching SteamLink...")
        if platform.system() == "Linux":
            subprocess.Popen(["flatpak", "run", "com.valvesoftware.SteamLink"])

        elif platform.system() == "Windows":
            return "SteamLink is not specified!", 404

        else:
            return "Unsupported OS!", 500

        return redirect(url_for("home"))

    @app.route("/app/steamlink/close")
    def close_steamlink():
        print("[INFO] Closing SteamLink...")
        if platform.system() == "Linux":
            subprocess.Popen(["pkill", "steamlink"])

        elif platform.system() == "Windows":
            return "SteamLink is not specified!", 404

        else:
            return "Unsupported OS!", 500

        return redirect(url_for("home"))
