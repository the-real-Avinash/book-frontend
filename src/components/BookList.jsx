import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchBooks, deleteBook } from "../services/api"; // Import functions from api.js

function BookList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Fetch books using the service function
    fetchBooks()
      .then((response) => setBooks(response.data))
      .catch((error) => console.error("Error fetching books:", error));
  }, []);

  const handleDeleteBook = (id) => {
    // Delete book using the service function
    deleteBook(id)
      .then(() => setBooks((prevBooks) => prevBooks.filter((book) => book._id !== id)))
      .catch((error) => console.error("Error deleting book:", error));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Book List</h2>
      <ul>
        {books.map((book) => (
          <li key={book._id} className="mb-4 p-4 border rounded shadow">
            <h3 className="text-xl font-semibold">{book.title}</h3>
            <p>
              <strong>Author:</strong> {book.author}
            </p>
            <p>
              <strong>Genre:</strong> {book.genre}
            </p>
            <p>
              <strong>Published Year:</strong> {book.publishedYear}
            </p>
            <div className="mt-2">
              <Link
                to={`/view/${book._id}`}
                className="text-blue-500 hover:underline mr-2"
              >
                View
              </Link>
              <Link
                to={`/edit/${book._id}`}
                className="text-blue-500 hover:underline mr-2"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDeleteBook(book._id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookList;
