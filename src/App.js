import React, { useState } from 'react';
import Dropzone from 'react-dropzone';

import './App.css'; // Import the CSS file for styling

function App() {
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleFileUpload = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0];
      const fileExtension = selectedFile.name.split('.').pop();
      if (fileExtension.toLowerCase() === 'stl') {
        setFile(selectedFile);
        setErrorMessage('');
        saveFile(selectedFile); // Call the function to save the file
      } else {
        setErrorMessage('Please select an STL file.');
      }
    }
  };

  const saveFile = (file) => {
    const formData = new FormData();
    formData.append('file', file);

    return fetch('http://127.0.0.1:5000/api/upload', {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          console.log('File saved successfully');
          // Handle success, e.g., display a success message to the user
        } else {
          console.error('Error saving file');
          // Handle error, e.g., display an error message to the user
        }
      })
      .catch((error) => {
        console.error('Error saving file:', error);
        // Handle error, e.g., display an error message to the user
      });
  };

  const sendContactDetails = (name, email, message, file) => {
    const data = {
      name,
      email,
      message,
      file,
    };

    return fetch('http://127.0.0.1:5000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Contact details saved successfully');
          // Handle success, e.g., display a success message to the user
        } else {
          console.error('Error saving contact details');
          // Handle error, e.g., display an error message to the user
        }
      })
      .catch((error) => {
        console.error('Error saving contact details:', error);
        // Handle error, e.g., display an error message to the user
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email) {
      setErrorMessage('Please fill in the email field.');
      return;
    }

    // Call the saveFile function and pass the file
    saveFile(file);

    // Call the sendContactDetails function and pass the contact details
    sendContactDetails(name, email, message, String(file));

    // Reset form fields
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="container">
      <h1 className="title">STL File Uploader</h1>
      <div className="upload-section">
        <Dropzone onDrop={handleFileUpload} accept=".stl">
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()} className="dropzone">
              <input {...getInputProps()} />
              {file ? (
                <p>Selected file: {file.name}</p>
              ) : (
                <p>Drag and drop an STL file here, or click to select a file</p>
              )}
            </div>
          )}
        </Dropzone>
        {errorMessage && <p className="error">{errorMessage}</p>}
      </div>
      <div className="contact-form">
        <h2>Contact Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              style={{ resize: 'none' }} // Set resize property to none
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default App;
