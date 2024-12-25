import React, { useState } from "react";
import { addBook } from "../services/api"; // Import the API function

function AddBook() {
  const [book, setBook] = useState({
    title: "",
    author: "",
    genre: "",
    publishedYear: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addBook(book); // Call the addBook API function
      setBook({ title: "", author: "", genre: "", publishedYear: "" });
      window.location.href = "/"; // Redirect after successful submission
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Add Book</h2>
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
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Book
        </button>
      </form>
    </div>
  );
}

export default AddBook;
