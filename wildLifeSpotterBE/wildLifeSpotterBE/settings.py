from pathlib import Path
import os
from dotenv import load_dotenv

load_dotenv()

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!

SECRET_KEY = os.getenv("WLS_SECRET_KEY")

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = (os.getenv("WLS_DEBUG") == 'True')

ALLOWED_HOSTS = []


# Application definition

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "api",
    "database",
    "rest_framework",
    "corsheaders",
    "djongo"
]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",  
    "django.contrib.sessions.middleware.SessionMiddleware",  
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'api.jwtauthentication.JWTAuthentication',
    ],
}

ROOT_URLCONF = "wildLifeSpotterBE.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "wildLifeSpotterBE.wsgi.application"


# Database
# https://docs.djangoproject.com/en/4.1/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": os.getenv("WLS_DATABASE_ENGINE"),
        "NAME": os.getenv("WLS_DATABASE_NAME"),
        "USER": os.getenv("WLS_DATABASE_USER"),
        "PASSWORD": os.getenv("WLS_DATABASE_PASSWORD"),
        "HOST": os.getenv("WLS_DATABASE_HOST"),
    },
    
    "mongodb": {
        "ENGINE": "djongo",
        "NAME": os.getenv("WLS_MONGO_DB_NAME"),
        "CLIENT": {
            "host": os.getenv("WLS_MONGO_DB_CONNECTION_STRING"),
        }
    },
}

DATABASE_ROUTERS = ['wildLifeSpotterBE.dbrouters.PostgresRouter', 'wildLifeSpotterBE.dbrouters.MongoDBRouter']


# Password validation
# https://docs.djangoproject.com/en/4.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.1/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.1/howto/static-files/

STATIC_URL = "static/"

# Default primary key field type
# https://docs.djangoproject.com/en/4.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

AUTH_USER_MODEL = 'database.User'

# CORS settings
CORS_ORIGIN_ALLOW_ALL = False
# CORS settings
CORS_ORIGIN_ALLOW_ALL = False
CORS_ALLOW_CREDENTIALS = True
CORS_ALLOWED_ORIGINS = [origin.strip() for origin in os.getenv("CORS_ALLOWED_ORIGINS").split(",")]
CSRF_TRUSTED_ORIGINS = [origin.strip() for origin in os.getenv("CORS_ALLOWED_ORIGINS").split(",")]

CORS_ALLOW_HEADERS = [
    'accept',
    'accept-encoding',
    'authorization',
    'content-type',
    'dnt',
    'origin',
    'user-agent',
    'x-csrftoken',
    'x-requested-with',
]
CORS_ALLOW_METHODS = [
    'DELETE',
    'GET',
    'OPTIONS',
    'PATCH',
    'POST',
    'PUT',
]

WLS_JWT_ACCESS_TOKEN_LIFETIME = int(os.getenv('WLS_JWT_ACCESS_TOKEN_LIFETIME'))
WLS_JWT_REFRESH_TOKEN_LIFETIME = int(os.getenv('WLS_JWT_REFRESH_TOKEN_LIFETIME'))
CORS_ALLOWED_ORIGINS = [origin.strip() for origin in os.getenv("CORS_ALLOWED_ORIGINS").split(",")]

CORS_ALLOW_HEADERS = [
    'accept',
    'accept-encoding',
    'authorization',
    'content-type',
    'dnt',
    'origin',
    'user-agent',
    'x-csrftoken',
    'x-requested-with',
]
CORS_ALLOW_METHODS = [
    'DELETE',
    'GET',
    'OPTIONS',
    'PATCH',
    'POST',
    'PUT',
]

WLS_JWT_ACCESS_TOKEN_LIFETIME = int(os.getenv('WLS_JWT_ACCESS_TOKEN_LIFETIME'))
WLS_JWT_REFRESH_TOKEN_LIFETIME = int(os.getenv('WLS_JWT_REFRESH_TOKEN_LIFETIME'))

SAME_SPECIES_BUFFER = int(os.getenv('SAME_SPECIES_BUFFER'))

# settings.py
GOOGLE_DRIVE_CLIENT_ID = os.getenv('GOOGLE_DRIVE_CLIENT_ID')
GOOGLE_DRIVE_CLIENT_SECRET = os.getenv('GOOGLE_DRIVE_CLIENT_SECRET')

# settings.py
EMAIL_BACKEND=os.getenv('WLS_EMAIL_BACKEND')
EMAIL_HOST =os.getenv('WLS_EMAIL_HOST')
EMAIL_PORT =int(os.getenv('WLS_EMAIL_PORT'))
EMAIL_USE_TLS =bool(os.getenv('WLS_EMAIL_USE_TLS'))
EMAIL_HOST_USER =os.getenv('WLS_EMAIL_HOST_USER')
EMAIL_HOST_PASSWORD =os.getenv('WLS_EMAIL_HOST_PASSWORD') 

