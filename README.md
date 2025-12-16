# TypeScript CRUD Operations with JSON Server

A simple demonstration of CRUD (Create, Read, Update, Delete) operations using TypeScript, Fetch API, and JSON Server.

## 1. How to Use JSON Server

JSON Server is a fake REST API that uses a JSON file as a database. It's perfect for prototyping and development.

### Installation

```bash
npm install -D json-server
```

### Setup

1. Create a `db.json` file with your data structure:

```json
{
  "books": [
    {
      "id": "1",
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald"
    }
  ]
}
```

2. Add a script to your `package.json`:

```json
{
  "scripts": {
    "server": "json-server --watch db.json --port 3000"
  }
}
```

### Running JSON Server

```bash
npm run server
```

This will start a REST API server at `http://localhost:3000` with the following endpoints:
- `GET /books` - Get all books
- `GET /books/:id` - Get a single book
- `POST /books` - Create a new book
- `PUT /books/:id` - Update a book
- `DELETE /books/:id` - Delete a book

The `--watch` flag automatically reloads the server when `db.json` changes.

## 2. Implement CRUD Operations with Fetch API

### Create (POST)

```typescript
async function createBook(book: { title: string; author: string }) {
  const response = await fetch('http://localhost:3000/books', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(book),
  });
  
  if (!response.ok) {
    throw new Error('Failed to create book');
  }
  
  return await response.json(); // Returns the created book with ID
}
```

### Read (GET)

```typescript
// Get all books
async function getAllBooks() {
  const response = await fetch('http://localhost:3000/books');
  
  if (!response.ok) {
    throw new Error('Failed to fetch books');
  }
  
  return await response.json();
}

// Get a single book
async function getBook(id: string) {
  const response = await fetch(`http://localhost:3000/books/${id}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch book');
  }
  
  return await response.json();
}
```

### Update (PUT)

```typescript
async function updateBook(id: string, updates: { title?: string; author?: string }) {
  const response = await fetch(`http://localhost:3000/books/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  });
  
  if (!response.ok) {
    throw new Error('Failed to update book');
  }
  
  return await response.json();
}
```

### Delete (DELETE)

```typescript
async function deleteBook(id: string) {
  const response = await fetch(`http://localhost:3000/books/${id}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    throw new Error('Failed to delete book');
  }
  
  // DELETE typically returns 204 No Content, so no body to parse
  return response.status === 204 ? null : await response.json();
}
```

## HTTP Status Codes Reference

- `200` - OK (successful GET, PUT)
- `201` - Created (successful POST)
- `204` - No Content (successful DELETE)
- `400` - Bad Request
- `404` - Not Found
- `500` - Internal Server Error

## Running the Project

1. Start JSON Server:
```bash
npm run server
```

2. In another terminal, start the development server:
```bash
npm run dev
```

3. Open your browser to the URL shown in the terminal (typically `http://localhost:5173`)

## Project Structure

```
├── db.json              # JSON Server database
├── src/
│   ├── main.ts         # Main application logic
│   ├── services/
│   │   └── bookApi.ts  # CRUD API functions
│   └── style.css       # Styles
└── package.json
```

# demo_lektion_2025_12_17_typescript_crud_actions_solution_starter
