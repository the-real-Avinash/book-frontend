import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchBooks, deleteBook } from "../services/api";

function BookList() {
  const [books, setBooks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);

  useEffect(() => {
    fetchBooks()
      .then((response) => setBooks(response.data))
      .catch((error) => console.error("Error fetching books:", error));
  }, []);

  const openModal = (id) => {
    setBookToDelete(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setBookToDelete(null);
    setIsModalOpen(false);
  };

  const confirmDeleteBook = () => {
    if (bookToDelete) {
      deleteBook(bookToDelete)
        .then(() => {
          setBooks((prevBooks) =>
            prevBooks.filter((book) => book._id !== bookToDelete)
          );
          closeModal();
        })
        .catch((error) => console.error("Error deleting book:", error));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Book List</h2>
      <ul className="space-y-4">
        {books.map((book) => (
          <li
            key={book._id}
            className="p-6 bg-white border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">{book.title}</h3>
            <p className="text-gray-600">
              <strong>Author:</strong> {book.author}
            </p>
            <p className="text-gray-600">
              <strong>Genre:</strong> {book.genre}
            </p>
            <p className="text-gray-600">
              <strong>Published Year:</strong> {book.publishedYear}
            </p>
            <div className="mt-4 flex space-x-4">
              <Link
                to={`/view/${book._id}`}
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                View
              </Link>
              <Link
                to={`/edit/${book._id}`}
                className="px-4 py-2 bg-yellow-500 text-white text-sm font-medium rounded hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              >
                Edit
              </Link>
              <button
                onClick={() => openModal(book._id)}
                className="px-4 py-2 bg-gray-800 text-white text-sm font-medium rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Confirm Deletion
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this book? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 text-gray-800 font-medium rounded hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                No
              </button>
              <button
                onClick={confirmDeleteBook}
                className="px-4 py-2 bg-red-600 text-white font-medium rounded hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookList;
