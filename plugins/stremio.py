import subprocess, platform
from flask import redirect, url_for


def register(app):
    @app.route("/app/stremio")
    def youtube():
        print("[INFO] Launching Stremio...")
        if platform.system() == "Linux":
            subprocess.Popen(["flatpak", "run", "com.stremio.Stremio"])
        if platform.system() == "Windows":
            subprocess.Popen(["stremio"])  # Assuming 'stremio' is in PATH
        else:
            return "Unsupported OS!", 500

        return redirect(url_for("home"))

    @app.route("/app/stremio/close")
    def close_stremio():
        print("[INFO] Closing Stremio...")
        if platform.system() == "Linux":
            subprocess.Popen(["pkill", "stremio"])

        elif platform.system() == "Windows":
            subprocess.Popen(["taskkill", "/IM", "Stremio.exe", "/F"])

        else:
            return "Unsupported OS!", 500

        return redirect(url_for("home"))
