import pyautogui, platform, subprocess
from flask import render_template, redirect, url_for


def register(app):
    @app.route("/remote")
    def remote():
        # Render remote control interface
        print("[INFO] Accessing remote control...")
        return render_template("remote.html")

    @app.route("/remote/left_click")
    def left_click():
        # Left arrow key press
        pyautogui.press("left")
        return redirect(url_for("remote"))

    @app.route("/remote/right_click")
    def right_click():
        # Right arrow key press
        pyautogui.press("right")
        return redirect(url_for("remote"))

    @app.route("/remote/up_click")
    def up_click():
        # Up arrow key press
        pyautogui.press("up")
        return redirect(url_for("remote"))

    @app.route("/remote/down_click")
    def down_click():
        # Down arrow key press
        pyautogui.press("down")
        return redirect(url_for("remote"))

    @app.route("/remote/open_home")
    def open_home():
        # This function will close i3 and reload it to show the desktop on Linux and show desktop on Windows
        if platform.system() == "Linux":
            subprocess.run(["i3-msg", "workspace 1"])
            subprocess.run(
                [
                    "i3-msg",
                    '[con_mark=""] mark to_kill; [con_mark="to_kill"] kill; unmark to_kill',
                ]
            )
            subprocess.Popen(["firefox", "--kiosk", "http://localhost:5000"])
            return "Not implemented yet!", 501
        if platform.system() == "Windows":
            return "Not implemented yet!", 501
        return redirect(url_for("remote"))

    @app.route("/remote/vol_up")
    def vol_up():
        # Volume up
        pyautogui.press("volumeup")
        return redirect(url_for("remote"))

    @app.route("/remote/mute")
    def mute():
        # Mute volume
        pyautogui.press("volumemute")
        return redirect(url_for("remote"))

    @app.route("/remote/vol_down")
    def vol_down():
        # Volume down
        pyautogui.press("volumedown")
        return redirect(url_for("remote"))
