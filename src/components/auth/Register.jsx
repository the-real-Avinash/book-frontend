import React, { useState } from 'react';
import { register } from '../../services/api';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      alert('Registration successful');
    } catch (err) {
      alert(err.response.data || 'Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Register</h1>
      <input
        type="text"
        placeholder="Username"
        value={formData.username}
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
