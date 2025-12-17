import type {Book, NewBook, BookUpdates} from "./../types/book"


// C => Create => HTTP-METHOD: POST
// R => Read => HTTP-METHOD: GET
// U => Update => HTTP-METHOD: PUT
// D => Delete => HTTP-METHOD: DELETE

// HTTP-STATUS-CODES:
// 200: OK
// 201: Created
// 204: No Content
// 400: Bad Request
// 401: Unauthorized
// 403: Forbidden
// 404: Not Found
// 500: Internal Server Error


const API_URL = 'http://localhost:3000/books';

// Read all books (GET)
export async function getAllBooks() {
    try {
        const response = await fetch(API_URL);
        if(!response.ok) {
            throw new Error(`Failed to fetch books: ${response.status}`)
        }
        const data = await response.json()
        return await data;

    } catch(error) {
        console.error("Error in getAllBookd", error);
    }
}


// Create a new book (POST)
export async function createBook(book: NewBook) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body:  JSON.stringify(book)   // Vad är det vi vill skicka till servern? 
        });
        if(!response.ok) {
            throw new Error(`Failed to create books: ${response.status}`)
        }
        const data = await response.json()
        return await data;

    } catch(error) {
        console.error("Error in createBook", error);
    }
}



// Update a book (PUT)

export async function updateBook(id: string, book: BookUpdates) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body:  JSON.stringify(book)   // Vad är det vi vill skicka till servern? 
        });
        if(!response.ok) {
            throw new Error(`Failed to update books: ${response.status}`)
        }
        const data = await response.json()
        return await data;

    } catch(error) {
        console.error("Error in updateBook", error);
    }
}



// Delete a book (DELETE)
export async function deleteBook(id: string): Promise<void> {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error(`Failed to delete book: ${response.statusText}`);
        }
    } catch (error: any) {
        console.error('Error in deleteBook:', error);
        throw error;
    }
}


