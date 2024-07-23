

# Wildlife Spotter

Welcome to the Wildlife Spotter project! This application allows users to spot and identify wildlife, track their achievements, and view their profile details. The project is built using React for the frontend, Django for the backend, and includes integration with MongoDB and PostgreSQL.

## Features

- **User Authentication**: Register, log in, and manage user accounts.
- **Wildlife Detection**: Upload images to identify wildlife species using a trained model.
- **Profile Management**: View and update user profiles and achievements.
- **Achievements Tracking**: Track and display user achievements based on the number of animals spotted.

## Tech Stack

- **Frontend**: React, React Router v6, Styled-Components
- **Backend**: Django 3.0.3, Djongo for MongoDB, PostgreSQL
- **APIs**: Custom API endpoints for user authentication, wildlife detection, and profile management.
- **Database**: PostgreSQL (for relational data), MongoDB (for unstructured data)
- **ML**: Custom CNN and InceptionV3

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (for frontend development)
- [Python](https://www.python.org/) (for backend development)
- [PostgreSQL](https://www.postgresql.org/) (for relational database)
- [MongoDB](https://www.mongodb.com/) (for unstructured data)

### Frontend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/SKcric07/Wildlife-Spotter.git
   cd wildlife-spotter-fe
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

   The frontend will be accessible at `http://localhost:3000`.

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/SKcric07/Wildlife-Spotter.git
   cd wildlife-spotter-be
   ```

2. Set up a virtual environment and install dependencies:
   ```bash
   python -m venv env
   source env/bin/activate  # On Windows use `env\Scripts\activate`
   pip install -r requirements.txt
   ```

3. Configure your database settings in `settings.py` for PostgreSQL and MongoDB.

4. Apply migrations:
   ```bash
   python manage.py migrate
   ```

5. Start the Django development server:
   ```bash
   python manage.py runserver
   ```
6. please do create .env file, client_secrets.json which are configs with passwords hence cannot push it to git 

   The backend will be accessible at `http://localhost:8000`.


## Contributing

Feel free to open issues or submit pull requests. Please ensure that your contributions adhere to the project's coding standards and include tests where applicable.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any questions or inquiries, please contact the project maintainer at [capstonepid011@gmail.com].
