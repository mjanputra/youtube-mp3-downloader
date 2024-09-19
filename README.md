# youtube-mp3-downloader

## Description

The YouTube MP3 Downloader is a web application that allows users to download the audio from any YouTube video as an MP3 file. The application is built using Flask for the backend and features a clean and modern front-end interface. It uses yt-dlp, a YouTube video downloader library, to extract audio in the best available quality.

## Features

- **Simple User Interface:** Enter the YouTube URL and download the MP3 with a single click.
- **Real-time Progress:** Shows a progress bar and percentage to indicate the download status.
- **Download Link:** Provides a direct download link once the audio has been successfully converted to MP3.

## Requirements

- Python 3.6 or higher
- Flask
- yt-dlp
- FFmpeg (for converting the audio to MP3)

## Usage

1. **Run the Flask application**
   `python main.py`
2. **Download an MP3**

- Enter the YouTube URL in the input field
- Click the "Download MP3" button
- Click on the provided donwload link to save the MP3 file to your device.

## File Details

1. **main.py**
   Handles the backend logic using Flask. It provides the following routes:

- /: Renders the main interface (index.html).
- /download: Accepts a POST request with a YouTube URL and returns a download link for the MP3 file.

2. **index.html**
   The main HTML file that serves the front-end interface for the application. It includes the input field for the YouTube URL, a download button, and a progress bar to show download status.

3. **script.js**
   Contains JavaScript code to handle the frontend logic, such as sending requests to the server to start the download process, showing download progress, and displaying the download link.

4. **style.css**
   Provides the styling for the application, including layout, colors, fonts, and responsiveness. It ensures the UI is user-friendly and visually appealing.
