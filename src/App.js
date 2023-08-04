import React, { useState } from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import eyeSymbol from './eye.png';
import './App.css';

function App() {
  const [diagnosis, setDiagnosis] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const handleDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];

    
    const formData = new FormData();
    formData.append('image', file);

    try {
     
      const response = await axios.post('http://localhost:5000/app/predict', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      
      const { diagnosis } = response.data;
      setDiagnosis(diagnosis);

     
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
       <div className="container">
      <div className="header">
        <h1 className="title">Diabetic Retinopathy Detection</h1>
        <p className="sub-title">This is a model which tells you if you have Diabetic Retinopathy or not.</p>
        <p className="sub-title">It has an accuracy of 73 percent.</p>
      </div>
      <div className="content">
        <div className="left-container">
          <Dropzone onDrop={handleDrop}>
            {({ getRootProps, getInputProps }) => (
              <div className="upload-box" {...getRootProps()}>
                <input {...getInputProps()} />
                {selectedImage ? (
                  <img src={selectedImage} alt="Selected" className="selected-image" />
                ) : (
                  <div className="upload-content">
                    <p>Click here to upload an image</p>
                    <button className="upload-button">Upload</button>
                  </div>
                )}
              </div>
            )}
          </Dropzone>
          {diagnosis && (
            <div className="result">
              <h2>Diagnosis Result:</h2>
              <p>{diagnosis}</p>
            </div>
          )}
        </div>
        <div className="right-container">
          <img src={eyeSymbol} alt="Eye Symbol" className="eye-symbol" />
        </div>
      </div>
      </div>
    </div>
  );
}

export default App;
