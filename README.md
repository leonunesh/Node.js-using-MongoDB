# Books API - RESTful CRUD Operations

A fully functional RESTful API for managing books with MongoDB, built using Express.js and following the MVC architectural pattern.

## Project Structure

```
├── config/
│   └── db.js                    # Database connection pool initializer
├── controllers/
│   ├── authorsController.js     # Handles author HTTP requests/responses
│   └── booksController.js       # Handles book HTTP requests/responses
├── models/
│   ├── authorsModel.js          # Author MongoDB operations/queries
│   └── booksModel.js            # Book MongoDB operations/queries
├── routes/
│   ├── authorsRoutes.js         # Author API routes
│   └── booksRoutes.js           # Book API routes
├── app.js                       # Application entrypoint (Wires dependencies & boots server)
├── package.json                 # Project dependencies and scripts
└── README.md                    # This file
```

## Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB Atlas
- **Module System**: ES Modules (ESM)

## Installation

1. Install dependencies:
```bash
npm install
```

2. Ensure MongoDB Atlas connection string is set in `app.js`:
```javascript
const uri = 'your-mongodb-connection-string';
```

## Running the Server

Start the server:
```bash
npm start
```

The server will run on `http://localhost:3000`

## API Endpoints

### 1. Create a Book
**POST** `/books`

**Authentication**: Required (Admin key in header)
**Status Code**: `201 Created`

**Request Headers**:
```
x-admin-key: admin-secret-key
Content-Type: application/json
```

**Request Body**:
```json
{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "isbn": "978-0743273565",
  "publishedYear": 1925
}
```

**Response**:
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "isbn": "978-0743273565",
  "publishedYear": 1925,
  "createdAt": "2026-06-18T10:30:00.000Z"
}
```

### 2. Get a Book by ID
**GET** `/books/:id`

**Authentication**: Not required
**Status Code**: `200 OK`

**Example Request**:
```
GET http://localhost:3000/books/507f1f77bcf86cd799439011
```

**Response**:
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "isbn": "978-0743273565",
  "publishedYear": 1925,
  "createdAt": "2026-06-18T10:30:00.000Z"
}
```

### 3. Update a Book (Partial Update)
**PATCH** `/books/:id`

**Authentication**: Required (Admin key in header)
**Status Code**: `200 OK`

**Request Headers**:
```
x-admin-key: admin-secret-key
Content-Type: application/json
```

**Request Body** (partial update):
```json
{
  "publishedYear": 1926
}
```

**Response**:
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "isbn": "978-0743273565",
  "publishedYear": 1926,
  "createdAt": "2026-06-18T10:30:00.000Z"
}
```

### 4. Delete a Book
**DELETE** `/books/:id`

**Authentication**: Required (Admin key in header)
**Status Code**: `204 No Content`

**Request Headers**:
```
x-admin-key: admin-secret-key
```

**Example Request**:
```
DELETE http://localhost:3000/books/507f1f77bcf86cd799439011
```

**Response**: Empty body with status code 204

## Error Responses

### Unauthorized (401)
Missing or invalid admin key:
```json
{
  "error": "Unauthorized: Admin key required"
}
```

### Bad Request (400)
Missing required fields:
```json
{
  "error": "Title and author are required"
}
```

### Not Found (404)
Book not found:
```json
{
  "error": "Book not found"
}
```

### Internal Server Error (500)
Server error:
```json
{
  "error": "Internal server error"
}
```

## Design Patterns

### Dependency Injection
The `BookModel` class accepts the database connection as a constructor argument:
```javascript
const bookModel = new BookModel(db);
```

### MVC Architecture
- **Model**: Handles data operations with MongoDB
- **View**: JSON responses sent to the client
- **Controller**: Routes requests to the model and formats responses

### ES Modules
The project uses modern JavaScript ES Module syntax for all imports and exports:
```javascript
import express from 'express';
export class BooksController { ... }
```

## Testing with cURL

Create a book:
```bash
curl -X POST http://localhost:3000/books \
  -H "x-admin-key: admin-secret-key" \
  -H "Content-Type: application/json" \
  -d '{"title": "1984", "author": "George Orwell", "publishedYear": 1949}'
```

Get a book:
```bash
curl http://localhost:3000/books/507f1f77bcf86cd799439011
```

Update a book:
```bash
curl -X PATCH http://localhost:3000/books/507f1f77bcf86cd799439011 \
  -H "x-admin-key: admin-secret-key" \
  -H "Content-Type: application/json" \
  -d '{"publishedYear": 1950}'
```

Delete a book:
```bash
curl -X DELETE http://localhost:3000/books/507f1f77bcf86cd799439011 \
  -H "x-admin-key: admin-secret-key"
```

## Notes

- The authentication uses a simple header-based key (`x-admin-key: admin-secret-key`). For production, implement OAuth2, JWT, or similar security protocols.
- All timestamps are stored in UTC format.
- The API validates MongoDB ObjectIds before querying the database.
- Partial updates are supported through the PATCH endpoint, allowing modification of specific fields without affecting others.
"# Node.js-using-MongoDB" 
