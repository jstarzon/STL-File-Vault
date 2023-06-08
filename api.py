from flask import Flask, request

app = Flask(__name__)

@app.route('/api/upload', methods=['POST'])
def upload_file():

    if 'file' not in request.files:
        return {'error': 'No file uploaded'}, 400

    file = request.files['file']
    if file.filename == '':
        return {'error': 'No file selected'}, 400

    # Save the file to your desired storage location
    # Modify the code below to suit your storage requirements
    file.save(file.filename)

    return {'message': 'File uploaded successfully'}, 200

@app.route('/api/contact', methods=['POST'])
def save_contact_details():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    message = data.get('message')
    file = data.get('file')

    # Check if the email field is filled
    if not email:
        return {'error': 'Email field is required'}, 400

    # Handle saving the contact details to your desired storage or perform other actions
    # Modify the code below to suit your requirements
    # For example, you can save the details to a database
    # or trigger an email notification

    return {'message': 'Contact details saved successfully'}, 200

if __name__ == '__main__':
    app.run()
