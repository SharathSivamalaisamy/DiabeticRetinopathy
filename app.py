from flask import Flask, request, jsonify
import tensorflow as tf
from flask_cors import CORS
import numpy as np
import time
from PIL import Image

app = Flask(__name__)
CORS(app, supports_credentials=True)


model = tf.keras.models.load_model('CNN.model')

@app.route('/app/time')
def get_current_time():
    return {'time': time.time()}

@app.route('/app/predict', methods=['POST'])
def predict():
    image_data = request.files['image']
    
   
    img = Image.open(image_data)
    img = img.resize((224, 224))
    img = np.array(img) / 255.0
    img = np.expand_dims(img, axis=0)
    
   
    prediction = model.predict(img)
    
  
    if prediction[0][0] > prediction[0][1]:
        diagnosis = 'Diabetic RetinoPathy'
    else:
        diagnosis = 'No Diabetic RetinoPathy'
    
    result = {
        'diagnosis': diagnosis
    }
    return jsonify(result)

if __name__ == '__main__':
    app.run()
