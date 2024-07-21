import logging
import io
import random
import time
from google.auth.transport.requests import Request
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.http import MediaIoBaseUpload, MediaIoBaseDownload
from google.oauth2.credentials import Credentials
import os
import mimetypes
import tempfile

logging.basicConfig(level=logging.INFO)

def get_drive_service():
    SCOPES = ['https://www.googleapis.com/auth/drive.file', 'https://www.googleapis.com/auth/drive.readonly']
    CLIENT_SECRETS_FILE = os.path.join(os.path.dirname(__file__), '../client_secrets.json')
    TOKEN_FILE = 'token.json'
    
    creds = None
    if os.path.exists(TOKEN_FILE):
        creds = Credentials.from_authorized_user_file(TOKEN_FILE, SCOPES)
    
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(CLIENT_SECRETS_FILE, SCOPES)
            creds = flow.run_local_server(port=8000)
        with open(TOKEN_FILE, 'w') as token:
            token.write(creds.to_json())


    service = build('drive', 'v3', credentials=creds, cache_discovery=False)
    
    return service

def list_images():
    service = get_drive_service()
    query = "mimeType='image/jpeg' or mimeType='image/png'"
    results = service.files().list(q=query, fields="files(id, name)", pageSize=50).execute()
    files = results.get('files', [])
    logging.info(f"Found {len(files)} images.")
    for file in files:
        logging.info(f"Image ID: {file.get('id')}, Name: {file.get('name')}")
    return files

def get_random_image_file():
    images = list_images()
    if not images:
        raise Exception('No images found in Google Drive.')

    random_image = random.choice(images)
    file_id = random_image.get('id')
    file_name = random_image.get('name')

    service = get_drive_service()
    request = service.files().get_media(fileId=file_id)

    fh = io.BytesIO()
    downloader = MediaIoBaseDownload(fh, request)

    done = False
    retries = 3
    while not done and retries > 0:
        try:
            while not done:
                status, done = downloader.next_chunk()
                if status:
                    logging.info(f"Download {int(status.progress() * 100)}%.")
                if status is None and done is None:
                    raise Exception('Download returned None values')
            fh.seek(0)
            image_data = fh.read()
            if len(image_data) == 0:
                raise Exception('Downloaded file size is 0 bytes')
            logging.info(f"Downloaded file size: {len(image_data)} bytes")
            return image_data, file_name
        except Exception as e:
            logging.error(f"Error during download: {str(e)}")
            retries -= 1
            time.sleep(1)  
            fh.seek(0)
            fh.truncate(0)  
            if retries == 0:
                raise

    images = list_images()
    if not images:
        raise Exception('No images found in Google Drive.')

    random_image = random.choice(images)
    file_id = random_image.get('id')
    file_name = random_image.get('name')

    service = get_drive_service()
    request = service.files().get_media(fileId=file_id)

    fh = io.BytesIO()
    downloader = MediaIoBaseDownload(fh, request)

    done = False
    retries = 3
    while not done and retries > 0:
        try:
            while not done:
                status, done = downloader.next_chunk()
                if status:
                    logging.info(f"Download {int(status.progress() * 100)}%.")
            fh.seek(0)
            image_data = fh.read()
            if len(image_data) == 0:
                raise Exception('Downloaded file size is 0 bytes')
            logging.info(f"Downloaded file size: {len(image_data)} bytes")
            return image_data, file_name
        except Exception as e:
            logging.error(f"Error during download: {str(e)}")
            retries -= 1
            time.sleep(1)  
            fh.seek(0)
            fh.truncate(0)  
            if retries == 0:
                raise




def upload_file_to_drive(inputfile):
    with tempfile.NamedTemporaryFile(delete=False, suffix='.jpeg' if inputfile.name.lower().endswith('.jpeg') else '.png') as temp_file:
        for chunk in inputfile.chunks():
            temp_file.write(chunk)
        temp_file_path = temp_file.name
    with open(temp_file_path, 'rb') as temp_file:
        file_stream = io.BytesIO(temp_file.read())

    # Check file size and content
    file_stream.seek(0, io.SEEK_END)
    file_size = file_stream.tell()
    print(f"File size before upload: {file_size} bytes")
    
    # Reset stream position for upload
    file_stream.seek(0)

    mime_type, _ = mimetypes.guess_type(inputfile.name)
    if mime_type is None:
        mime_type = 'application/octet-stream'

    service = get_drive_service()
    file_metadata = {'name': inputfile.name, 'mimeType': mime_type}
    media = MediaIoBaseUpload(file_stream, mimetype=mime_type)
    file = service.files().create(body=file_metadata, media_body=media, fields='id').execute()
    file_id = file.get('id')

    print("uploaded successfully")
    # Clean up the temporary file
    os.remove(temp_file_path)
    
    return file_id
