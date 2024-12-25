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
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Edit Book</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Title</label>
          <input
            type="text"
            value={book.title}
            onChange={(e) => setBook({ ...book, title: e.target.value })}
            className="border p-2 w-full rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Author</label>
          <input
            type="text"
            value={book.author}
            onChange={(e) => setBook({ ...book, author: e.target.value })}
            className="border p-2 w-full rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Genre</label>
          <input
            type="text"
            value={book.genre}
            onChange={(e) => setBook({ ...book, genre: e.target.value })}
            className="border p-2 w-full rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Published Year</label>
          <input
            type="number"
            value={book.publishedYear}
            onChange={(e) => setBook({ ...book, publishedYear: e.target.value })}
            className="border p-2 w-full rounded"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Update Book
        </button>
      </form>
    </div>
  );
}

export default EditBook;
