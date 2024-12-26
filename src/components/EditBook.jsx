import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchBookById, updateBook } from "../services/api"; // Import API service functions

function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate(); // Use navigate for programmatic navigation
  const [book, setBook] = useState({
    title: "",
    author: "",
    genre: "",
    publishedYear: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch book details using the service function
    fetchBookById(id)
      .then((response) => setBook(response.data))
      .catch((err) => setError(err.response?.data || "Error fetching book details."));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update the book using the service function
    updateBook(id, book)
      .then(() => navigate("/")) // Redirect to home after successful update
      .catch((err) => setError(err.response?.data || "Error updating book."));
  };

  if (error) {
    return (
      <div className="text-center mt-4">
        <p className="text-red-600 font-medium">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-white border border-gray-300 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Edit Book</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Title
          </label>
          <input
            type="text"
            value={book.title}
            onChange={(e) => setBook({ ...book, title: e.target.value })}
            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter book title"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Author
          </label>
          <input
            type="text"
            value={book.author}
            onChange={(e) => setBook({ ...book, author: e.target.value })}
            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter author name"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Genre
          </label>
          <input
            type="text"
            value={book.genre}
            onChange={(e) => setBook({ ...book, genre: e.target.value })}
            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter book genre"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Published Year
          </label>
          <input
            type="number"
            value={book.publishedYear}
            onChange={(e) => setBook({ ...book, publishedYear: e.target.value })}
            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter published year"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white text-lg font-medium py-3 rounded-lg transition duration-200"
        >
          Update Book
        </button>
      </form>
    </div>
  );
}

export default EditBook;
