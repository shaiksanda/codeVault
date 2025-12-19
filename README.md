# CodeVault

A full-stack web application for securely storing, organizing, and managing code snippets. Users can register, log in, create, view, update, and delete snippets with syntax highlighting and filtering capabilities.

## Features

- **User Authentication**: Secure registration, login, and logout with JWT tokens and password hashing.
- **Snippet Management**: Create, read, update, and delete code snippets.
- **Filtering and Search**: Filter snippets by programming language and search by title.
- **Syntax Highlighting**: Display code with syntax highlighting using Prism.
- **Responsive Design**: Mobile-friendly UI built with React.
- **Protected Routes**: Access control for authenticated users only.
- **Error Handling**: Comprehensive error messages and loading states.

## Tech Stack

### Frontend
- React 19
- Vite
- Redux Toolkit (RTK Query)
- React Router DOM
- React Syntax Highlighter
- React Toastify
- Lucide React (icons)
- CSS (responsive design)

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT (JSON Web Tokens)
- bcrypt (password hashing)
- CORS
- Express Validator

## Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd codeVault
   ```

2. **Backend Setup**:
   - Navigate to the backend directory:
     ```bash
     cd backend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file in the backend directory with the following variables:
     ```
     MONGO_URI=<your-mongodb-connection-string>
     JWT_SECRET=<your-jwt-secret-key>
     PORT=6000
     ```
   - Start the backend server:
     ```bash
     npm start
     ```

3. **Frontend Setup**:
   - Navigate to the frontend directory:
     ```bash
     cd ../frontend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file in the frontend directory with the following variable:
     ```
     VITE_API_URL=<your-backend-api-url, e.g., http://localhost:6000>
     ```
   - Start the development server:
     ```bash
     npm run dev
     ```

4. **Access the Application**:
   - Open your browser and go to `http://localhost:5173` (default Vite port).

## Usage

1. **Home Page**: Landing page with app description and login/signup links.
2. **Signup/Login**: Create an account or log in to access the vault.
3. **Code Vault**: View all snippets, apply filters, and create new ones.
4. **Snippet Details**: Click on a snippet to view full details, copy code, or delete.
5. **Create Snippet**: Use the popup to add new code snippets with title, language, and code.

## API Endpoints

### User Routes
- `POST /user/register` - Register a new user
- `POST /user/login` - Login user
- `POST /user/logout` - Logout user

### Snippet Routes (Protected)
- `POST /snippet/create` - Create a new snippet
- `GET /snippet/all-snippets` - Get all snippets (with optional filters: `?language=<lang>&search=<query>`)
- `GET /snippet/:snippetId` - Get a specific snippet
- `PUT /snippet/update/:snippetId` - Update a snippet
- `DELETE /snippet/delete/:snippetId` - Delete a snippet

## Project Structure

```
codeVault/
├── backend/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── configDb.js
│   ├── index.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── store.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## Contributing

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make changes and test thoroughly.
4. Submit a pull request with a clear description.

