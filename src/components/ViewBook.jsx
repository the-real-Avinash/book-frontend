import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

function ViewBook() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`${API_BASE_URL}/books/${id}`)
      .then(response => setBook(response.data))
      .catch(err => setError(err.response?.data || 'Error fetching book'));
  }, [id]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Book Details</h2>
      <p><strong>Title:</strong> {book.title}</p>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Genre:</strong> {book.genre}</p>
      <p><strong>Published Year:</strong> {book.publishedYear}</p>
    </div>
  );
}

export default ViewBook;