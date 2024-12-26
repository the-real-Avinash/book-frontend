import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchBookById } from "../services/api"; // Import the API service function

function ViewBook() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch book details using the service function
    fetchBookById(id)
      .then((response) => setBook(response.data))
      .catch((err) => setError(err.response?.data || "Error fetching book"));
  }, [id]);

  if (error) {
    return (
      <div className="text-center mt-4">
        <p className="text-red-600 font-medium">{error}</p>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="text-center mt-4">
        <p className="text-gray-500 font-medium">Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white border border-gray-300 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Book Details</h2>
      <div className="space-y-4">
        <p className="text-lg text-gray-700">
          <strong className="font-semibold text-gray-800">Title:</strong>{" "}
          {book.title}
        </p>
        <p className="text-lg text-gray-700">
          <strong className="font-semibold text-gray-800">Author:</strong>{" "}
          {book.author}
        </p>
        <p className="text-lg text-gray-700">
          <strong className="font-semibold text-gray-800">Genre:</strong>{" "}
          {book.genre}
        </p>
        <p className="text-lg text-gray-700">
          <strong className="font-semibold text-gray-800">
            Published Year:
          </strong>{" "}
          {book.publishedYear}
        </p>
      </div>
    </div>
  );
}

export default ViewBook;
