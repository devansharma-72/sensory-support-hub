from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import google.generativeai as genai
import os
import logging
import cv2
import mediapipe as mp
import tempfile
from datetime import datetime, timezone

# Configure minimal logging
logging.basicConfig(level=logging.ERROR)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Configure Gemini
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
assistant_model = genai.GenerativeModel("gemini-2.0-flash")

# Initialize MediaPipe
mp_face_mesh = mp.solutions.face_mesh
face_mesh = mp_face_mesh.FaceMesh(
    static_image_mode=False,
    max_num_faces=1,
    refine_landmarks=True,
    min_detection_confidence=0.5
)

def analyze_eye_contact(video_path: str) -> float:
    """Analyze eye contact percentage from video using pupil (iris) tracking"""
    cap = cv2.VideoCapture(video_path)
    total_frames = 0
    looking_frames = 0
    
    while cap.isOpened():
        success, image = cap.read()
        if not success:
            break
            
        image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        results = face_mesh.process(image_rgb)
        
        if results.multi_face_landmarks:
            landmarks = results.multi_face_landmarks[0].landmark
            left_pupil = landmarks[468]
            right_pupil = landmarks[473]
            avg_x = (left_pupil.x + right_pupil.x) / 2
            
            if 0.35 < avg_x < 0.65:
                looking_frames += 1
            total_frames += 1
    
    cap.release()
    return round((looking_frames / total_frames) * 100, 2) if total_frames > 0 else 0

def generate_neurodivergent_response(prompt: str) -> str:
    """
    Generates AI response tailored for neurodivergent users
    with enhanced safety settings and structured output
    """
    generation_config = {
        "temperature": 0.5,
        "top_p": 1,
        "top_k": 32,
        "max_output_tokens": 512,
        "response_mime_type": "text/plain"
    }

    safety_settings = [
        {"category": "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_NONE"},
        {"category": "HARM_CATEGORY_HATE_SPEECH", "threshold": "BLOCK_NONE"},
        {"category": "HARM_CATEGORY_SEXUALLY_EXPLICIT", "threshold": "BLOCK_NONE"},
        {"category": "HARM_CATEGORY_DANGEROUS_CONTENT", "threshold": "BLOCK_NONE"},
    ]

    try:
        response = assistant_model.generate_content(
            contents=[prompt],
            generation_config=generation_config,
            safety_settings=safety_settings
        )
        return response.text
    except Exception as e:
        logger.error(f"Error generating response: {str(e)}")
        return "I'm sorry, I couldn't generate a response at this time."

@app.route('/api/assistant', methods=['POST'])
def handle_assistant_request():
    try:
        # Log the incoming request
        logger.info(f"Incoming request headers: {request.headers}")
        logger.info(f"Incoming request data: {request.data}")

        # Ensure the request contains JSON data
        if not request.is_json:
            logger.error("Request is not JSON")
            return jsonify({"error": "Request must be JSON"}), 400

        data = request.get_json()
        logger.info(f"Parsed JSON data: {data}")

        # Validate required fields
        if not data:
            logger.error("No data received in request")
            return jsonify({"error": "No data received"}), 400

        if 'user_id' not in data or 'message' not in data:
            logger.error("Missing required fields in request")
            return jsonify({"error": "Missing required fields: user_id and message"}), 400

        user_id = data.get('user_id')
        user_message = data.get('message', '').strip()

        if not user_id or not user_message:
            logger.error("Empty user_id or message")
            return jsonify({"error": "user_id and message cannot be empty"}), 400

        # Generate AI response
        system_prompt = f"""You are Jarvis, specializing in helping neurodivergent individuals.
        Current user message: {user_message}

        Response Guidelines:
        1. Use clear, concrete language with minimal metaphors
        2. Maintain positive, non-judgmental tone
        3. Keep responses under 100 words and in brief"""

        ai_response = generate_neurodivergent_response(system_prompt)

        return jsonify({
            "user_id": user_id,
            "response": " ".join(("\n".join(ai_response.split("**"))).split("*")),
            "timestamp": datetime.now(timezone.utc).isoformat()
        }), 200

    except Exception as e:
        logger.error(f"Error processing request: {str(e)}", exc_info=True)
        return jsonify({"error": "Internal server error"}), 500

@app.route('/api/analyze-video', methods=['POST'])
def analyze_video():
    try:
        if 'video' not in request.files:
            return jsonify({"error": "Video file is required"}), 400

        transcript = request.form.get('transcript', '')
        
        # Save video temporarily
        video_file = None
        try:
            with tempfile.NamedTemporaryFile(delete=False, suffix='.webm') as tmp_file:
                video_file = tmp_file.name
                request.files['video'].save(video_file)
            
            eye_contact = analyze_eye_contact(video_file)
            
            # Generate feedback
            feedback_prompt = f"""Analyze this speech interaction:
            Eye Contact: {eye_contact}%
            Transcript: {transcript}
            
            Provide feedback on:
            1. Communication effectiveness
            2. Eye contact patterns
            3. Speech clarity
            4. Areas for improvement"""
            
            feedback = generate_neurodivergent_response(feedback_prompt)
            
            return jsonify({
                "eyeContact": eye_contact,
                "transcript": transcript,
                "feedback": " ".join(("\n".join(feedback.split("**"))).split("*"))
            })
        finally:
            # Clean up temporary file
            if video_file and os.path.exists(video_file):
                os.unlink(video_file)
                
    except Exception as e:
        logger.error(f"Video analysis error: {str(e)}", exc_info=True)
        return jsonify({"error": "Analysis failed"}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=os.getenv("FLASK_DEBUG", "false").lower() == "true")