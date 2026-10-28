# Fruit List

A small full-stack app for adding, viewing, and deleting fruit. The React interface calls an Express API, which stores fruit documents in MongoDB through Mongoose.

## Features

- Load the fruit list from MongoDB
- Add a fruit by name
- Delete a fruit by its MongoDB document ID
- Keep the interface synchronized with the API responses

## Stack

- Frontend: React, Vite, Axios, Tailwind CSS
- Backend: Node.js, Express, Mongoose, CORS
- Database: MongoDB

## Requirements

Install a current Node.js LTS release with npm. MongoDB must be installed and running locally, or a MongoDB-compatible URI must be configured in `backend/index.js`.

The current backend connects to `mongodb://127.0.0.1:27017/todo`. It uses the `todo` database and the `fruit` collection. The API listens on port `5000`.

## Run Locally

Open two terminals from the project directory.

### 1. Start the backend

```powershell
cd backend
npm install
node index.js
```

The server starts at `http://localhost:5000`. Keep this terminal running. On a successful connection, it logs `DB Connected`.

### 2. Start the frontend

In the second terminal:

```powershell
cd frontend
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

## API

Base URL: `http://localhost:5000`

| Method | Path | Purpose | Successful response |
| --- | --- | --- | --- |
| `GET` | `/fruitlist` | Read all fruit documents | JSON array of fruit documents |
| `POST` | `/addfruit` | Add a fruit | `201` and the created document |
| `DELETE` | `/fruit/:id` | Delete a fruit by MongoDB `_id` | JSON array of remaining fruit documents |

Create request body:

```json
{
  "entervalue": "Mango"
}
```

A fruit document has this shape:

```json
{
  "_id": "MongoDB-generated-id",
  "name": "Mango"
}
```

Delete errors return `400` for an invalid MongoDB ID, `404` when no fruit matches the ID, and `500` if the server cannot complete the operation.

## Frontend Checks

Run these from the `frontend` directory:

```powershell
npm run lint
npm run build
npm run preview
```

The backend currently does not define a test script.
