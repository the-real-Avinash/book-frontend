import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import BookList from "./components/BookList";
import AddBook from "./components/AddBook";
import EditBook from "./components/EditBook";
import ViewBook from "./components/ViewBook";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import PrivateRoute from "./components/auth/PrivateRoute";
import "./index.css";

const App = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <header className="bg-blue-500 text-white py-4 shadow-md">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold">
              <Link to="/">Book Management</Link>
            </h1>
            <nav className="flex items-center">
              {localStorage.getItem("token") && (
                <>
                  <Link
                    to="/add"
                    className="px-4 py-2 bg-gray-800 text-white font-semibold rounded shadow hover:bg-gray-700 focus:outline-none focus:ring-2 mr-4"
                  >
                    Add Book
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-gray-800 text-white font-semibold rounded shadow hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  >
                    Logout
                  </button>
                </>
              )}
            </nav>
          </div>
        </header>
        <main className="flex-1 container mx-auto p-4">
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Private Routes */}
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <BookList />
                </PrivateRoute>
              }
            />
            <Route
              path="/add"
              element={
                <PrivateRoute>
                  <AddBook />
                </PrivateRoute>
              }
            />
            <Route
              path="/edit/:id"
              element={
                <PrivateRoute>
                  <EditBook />
                </PrivateRoute>
              }
            />
            <Route
              path="/view/:id"
              element={
                <PrivateRoute>
                  <ViewBook />
                </PrivateRoute>
              }
            />
          </Routes>
        </main>
        <footer className="bg-gray-800 text-white py-4">
          <div className="container mx-auto text-center">
            <p>
              &copy; {new Date().getFullYear()} Book Management. All rights
              reserved.
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
