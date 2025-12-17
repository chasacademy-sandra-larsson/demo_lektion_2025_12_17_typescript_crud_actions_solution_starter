import { getAllBooks, createBook, updateBook, deleteBook} from "./lib/bookApi"
import type {Book, NewBook, BookUpdates} from "./types/book"

// DOM Elements
const bookList = document.querySelector<HTMLUListElement>('#book-list')!;
const bookForm = document.querySelector<HTMLFormElement>('#book-form')!;
const titleInput = document.querySelector<HTMLInputElement>('#title')!;
const authorInput = document.querySelector<HTMLInputElement>('#author')!;
const bookIdInput = document.querySelector<HTMLInputElement>('#book-id')!;
const submitBtn = document.querySelector<HTMLButtonElement>('#submit-btn')!;
const cancelBtn = document.querySelector<HTMLButtonElement>('#cancel-btn')!;

// --- CRUD Operations (UI Wrappers) ---

// READ
async function loadBooks() {
    try {
        const books = await getAllBooks();
        renderBooks(books);
    } catch (error) {
        console.error(error);
        alert('Error fetching books. Is JSON Server running?');
    }
}

// CREATE
async function handleAddBook(book: NewBook) {
    try {
        await createBook(book);
        await loadBooks(); // Refresh list
        resetForm();
    } catch (error) {
        console.error(error);
        alert('Failed to add book');
    }
}

// UPDATE
async function handleUpdateBook(id: string, updates: BookUpdates) {
    try {
        await updateBook(id, updates);
        await loadBooks();
        resetForm();
    } catch (error) {
        console.error(error);
        alert('Failed to update book');
    }
}

// DELETE
async function handleDeleteBook(id: string) {
    if (!confirm('Are you sure you want to delete this book?')) return;

    try {
        await deleteBook(id);
        await loadBooks();
    } catch (error) {
        console.error(error);
        alert('Failed to delete book');
    }
}

// --- UI Logic ---

function renderBooks(books: Book[]) {
    bookList.innerHTML = '';
    if (books.length === 0) {
        bookList.innerHTML = '<li>No books found. Add one!</li>';
        return;
    }

    books.forEach((book) => {
        const li = document.createElement('li');
        li.innerHTML = `
      <div class="info">
        <strong>${book.title}</strong><br>
        <span style="font-size: 0.9em; color: #666;">by ${book.author}</span>
      </div>
      <div class="actions">
        <button class="edit-btn" data-id="${book.id}">Edit</button>
        <button class="delete-btn" data-id="${book.id}">Delete</button>
      </div>
    `;
        bookList.appendChild(li);

        // Add event listeners for the buttons immediately
        const editBtn = li.querySelector('.edit-btn')!;
        const deleteBtn = li.querySelector('.delete-btn')!;

        editBtn.addEventListener('click', () => startEditMode(book));
        deleteBtn.addEventListener('click', () => handleDeleteBook(book.id));
    });
}

function startEditMode(book: Book) {
    // Populate form
    titleInput.value = book.title;
    authorInput.value = book.author;
    bookIdInput.value = book.id;

    // UI updates
    submitBtn.textContent = 'Update Book';
    cancelBtn.style.display = 'inline-block';
    window.scrollTo(0, 0); // Scroll to form
}

function resetForm() {
    bookForm.reset();
    bookIdInput.value = '';
    submitBtn.textContent = 'Add Book';
    cancelBtn.style.display = 'none';
}

// Event Listeners
bookForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = titleInput.value;
    const author = authorInput.value;
    const id = bookIdInput.value;

    if (id) {
        // Update mode
        // We include ID in the updates object as well just in case, though usually not needed for the body if in URL
        handleUpdateBook(id, { title, author, id });
    } else {
        // Create mode
        handleAddBook({ title, author });
    }
});

cancelBtn.addEventListener('click', resetForm);

// Initial Load
loadBooks();
