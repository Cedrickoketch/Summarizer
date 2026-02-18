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
        data = request.get_json()
        if not data or not data.get('text'):
            return jsonify({"error": "No text provided"}), 400
        
        text = data['text'][:2000]  # Limit length
        
        # ✅ NO OLLAMA - Simple extractive summary
        sentences = text.split('. ')
        if len(sentences) <= 3:
            summary = text[:300] + "..."
        else:
            summary = '. '.join(sentences[:3]) + "."
        
        print(f"✅ Summary generated: {len(summary)} chars")
        return jsonify({'summary': summary})
        
    except Exception as e:
        print(f"💥 ERROR: {e}")
        return jsonify({"error": str(e)}), 500
