from flask import jsonify
import psutil


def register(app):
    @app.route("/stats")
    def stats():
        print("[INFO] Fetching system stats...")
        cpu = psutil.cpu_percent(interval=1)
        ram = psutil.virtual_memory().percent
        disk = psutil.disk_usage("/").percent
        uptime = psutil.boot_time()
        return jsonify({"cpu": cpu, "ram": ram, "disk": disk, "uptime": uptime})
