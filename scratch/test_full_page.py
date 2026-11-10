import http.server
import socketserver
import threading
import subprocess
import time

httpd = socketserver.TCPServer(('127.0.0.1', 8094), http.server.SimpleHTTPRequestHandler)
t = threading.Thread(target=httpd.serve_forever)
t.daemon = True
t.start()
time.sleep(1)

edge = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
cmd = [
    edge,
    '--headless',
    '--disable-gpu',
    '--virtual-time-budget=10000',
    '--dump-dom',
    'http://127.0.0.1:8094/index.html'
]
out = subprocess.check_output(cmd).decode('utf-8')
print("DOM test - Cat tabs count:", out.count('class="cat-tab'))
print("DOM test - Product cards count:", out.count('class="product-card'))
httpd.shutdown()

