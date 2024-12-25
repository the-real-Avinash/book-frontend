import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import BookList from "./components/BookList";
import AddBook from "./components/AddBook";
import EditBook from "./components/EditBook";
import ViewBook from "./components/ViewBook";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
// import Dashboard from "./components/Dashboard";
import PrivateRoute from "./components/auth/PrivateRoute";
import "./index.css";

const App = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <Router>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4 bg-blue-300">Book Management</h1>
        <nav className="mb-4 flex justify-between items-center">
          <div>
            <Link to="/" className="mr-4 text-blue-500 hover:underline">
              Home
            </Link>
            <Link to="/add" className="mr-4 text-blue-500 hover:underline">
              Add Book
            </Link>
            {/* <Link to="/dashboard" className="text-blue-500 hover:underline">
              Dashboard
            </Link> */}
          </div>
          {localStorage.getItem("token") ? (
            <button
              onClick={handleLogout}
              className="text-red-500 hover:underline"
            >
              Logout
            </button>
          ) : (
            <div>
              <Link to="/login" className="mr-4 text-blue-500 hover:underline">
                Login
              </Link>
              <Link to="/register" className="text-blue-500 hover:underline">
                Register
              </Link>
            </div>
          )}
        </nav>
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
          {/* <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          /> */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
