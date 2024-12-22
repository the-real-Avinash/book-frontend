import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import BookList from "./components/BookList";
import AddBook from "./components/AddBook";
import EditBook from "./components/EditBook";
import "./index.css";
import ViewBook from "./components/ViewBook";

const App = () => {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4 bg-blue-300">Book Management</h1>
        <nav className="mb-4">
          <Link to="/" className="mr-4 text-blue-500 hover:underline">
            Home
          </Link>
          <Link to="/add" className="text-blue-500 hover:underline">
            Add Book
          </Link>
        </nav>
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/add" element={<AddBook />} />
          <Route path="/edit/:id" element={<EditBook />} />
          <Route path="/view/:id" element={<ViewBook />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
