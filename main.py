import os
import yt_dlp
import webbrowser
from flask import Flask, render_template, request, jsonify, send_file
from werkzeug.utils import secure_filename

app = Flask(__name__)

UPLOAD_FOLDER = '/tmp/youtube_downloads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/download', methods=['POST'])
def download():
    youtube_url = request.json['url']
    
    ydl_opts = {
        'format': 'bestaudio/best',
        'postprocessors': [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'mp3',
            'preferredquality': '192',
        }],
        'outtmpl': os.path.join(UPLOAD_FOLDER, '%(title)s.%(ext)s'),
        'progress_hooks': [progress_hook],
    }
    
    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(youtube_url, download=True)
            filename = ydl.prepare_filename(info)
            mp3_filename = os.path.splitext(filename)[0] + '.mp3'
            
        return jsonify({'status': 'success', 'filename': os.path.basename(mp3_filename)})
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 400

@app.route('/download/<filename>')
def download_file(filename):
    return send_file(os.path.join(UPLOAD_FOLDER, filename), as_attachment=True)

def progress_hook(d):
    if d['status'] == 'downloading':
        progress = d['_percent_str']
        print(f"Downloading: {progress}")
    elif d['status'] == 'finished':
        print("Download complete")

def open_browser():
    webbrowser.open_new('http://127.0.0.1:5000')

if __name__ == '__main__':
    import threading
    threading.Timer(1.25, open_browser).start()
    app.run(host='0.0.0.0', port=5000, debug=True)
