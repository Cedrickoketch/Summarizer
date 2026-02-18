from flask import Flask, request, jsonify
from flask_cors import CORS
import ollama
import os
import logging

logging.basicConfig(level=logging.DEBUG)

@app.errorhandler(500)
def internal_error(error):
    return f"Error: {str(error)}\n{error}", 500

app = Flask(__name__)
CORS(app)  # ← Only thing needed!

@app.route('/', methods=['GET'])
def home():
    return jsonify({"message": "Summarizer API ready! Use /summarize endpoint"})


@app.route('/summarize', methods=['POST'])
def summarize():
    try:
        data = request.get_json()  # ✅ Safe, handles bad JSON
        if not data:
            return jsonify({"error": "No JSON data"}), 400
            
        text = data.get('text', '').strip()
        if not text:
            return jsonify({"error": "No text provided"}), 400
        
        print(f"Summarizing {len(text)} chars")  # Render logs
        
        response = ollama.chat(model='gemma:2b', messages=[{
            'role': 'user', 
            'content': f'Summarize: {text[:8000]}'
        }])
        
        return jsonify({'summary': response['message']['content']})
        
    except Exception as e:
        print(f"ERROR: {e}")  # Render logs
        return jsonify({"error": str(e)}), 500
