from flask import Flask, request, jsonify
from flask_cors import CORS
import ollama
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Allow React localhost

MODEL = os.getenv('OLLAMA_MODEL', 'gemma:2b')  # Change in .env

@app.route('/', methods=['GET'])
def home():
    return jsonify({"message": "Text Summarizer API ready! POST to /summarize"})

@app.route('/summarize', methods=['POST'])
def summarize():
    try:
        data = request.json
        text = data.get('text', '').strip()
        
        if not text or len(text) < 10:
            return jsonify({"error": "Please provide text longer than 10 characters"}), 400
        
        # Truncate long text for Gemma
        if len(text) > 8000:
            text = text[:8000] + "\n\n[Text truncated for summarization]"
        
        # Ollama chat with summarization prompt
        response = ollama.chat(
            model=MODEL,
            messages=[
                {
                    'role': 'user',
                    'content': f"""Summarize the following text concisely in 3-5 sentences. Focus on key points, main ideas, and conclusions. Keep it neutral and factual.

Text to summarize:
{text}"""
                }
            ],
            options={
                'temperature': 0.3,  # Low for factual summaries
                'top_p': 0.8
            }
        )
        
        summary = response['message']['content'].strip()
        return jsonify({
            "original_length": len(text),
            "summary": summary,
            "model": MODEL
        })
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    print(f"Starting summarizer with model: {MODEL}")
    print("Ollama should be running at http://localhost:11434")
    app.run(debug=True, port=5000, host='0.0.0.0')
