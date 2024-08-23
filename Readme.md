This project is a full-stack web application that includes a NestJS backend and a React frontend. The backend is responsible for handling API requests, while the frontend provides the user interface.

/fullstack-project
|-- /backend
|-- /frontend
|-- package.json
|-- README.md

Prerequisites
Before you start, make sure you have the following installed on your machine:

Node.js (v18 or later)
npm (Node Package Manager) or Yarn (v1.22.0 or later)

Setup Instructions

1. Clone the Repository
   First, clone the repository to your local machine:

git clone https://github.com/yourusername/fullstack-project.git

cd react-nest-auth-module

2. Install Dependencies
   Install all the dependencies for both the backend and frontend projects using the root package.json:

npm run install:all

3. Environment Configuration
   Make sure to create environment variable files in the backend.

Backend
Create a .env file in the /backend directory with the following variables:

MONGO_URI=mongodb://localhost:27017/yourdb
JWT_SECRET=your_jwt_secret

4. Running the Application
   To start both the backend and frontend servers simultaneously, use the following command:

npm run dev

5. Accessing the Application
   Frontend: Open your browser and go to http://localhost:3000.
   Backend API Documentation (Swagger): Access the Swagger documentation at http://localhost:300/api.

Additional Scripts
Start Backend Only: npm run start:backend
Start Frontend Only: npm run start:frontend
Install Backend Dependencies Only: npm run install:backend
Install Frontend Dependencies Only: npm run install:frontend
