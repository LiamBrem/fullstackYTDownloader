from flask import Flask, request, jsonify
import pytube

app = Flask(__name__)

@app.route('/download', methods=['POST'])
def download():
    url = request.form.get('url')
    if not url:
        return jsonify({'error': 'No URL provided'})

    try:
        video = pytube.YouTube(url)
        stream = video.streams.get_highest_resolution()
        file_path = stream.download()
        return jsonify({'success': True, 'file_path': file_path})
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)