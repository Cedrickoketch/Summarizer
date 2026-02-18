from flask import Flask, request, jsonify
from flask_cors import CORS
import ollama
import os

app = Flask(__name__)
CORS(app)  # ← Only thing needed!

@app.route('/', methods=['GET'])
def home():
    return jsonify({"message": "Summarizer API ready! Use /summarize endpoint"})


@app.route('/summarize', methods=['POST'])
def summarize():
    data = request.json
    text = data.get('text', '').strip()
    
    response = ollama.chat(model='gemma:2b', messages=[{
        'role': 'user', 
        'content': f'Summarize: {text[:8000]}'
    }])
    
    return jsonify({'summary': response['message']['content']})

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
