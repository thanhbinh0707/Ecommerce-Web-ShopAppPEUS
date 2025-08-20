import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
// import AdminNavbar from '../components/NavBars';
const Dashboard = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'User', // Default role
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would usually send the form data to the server
    console.log(formData);
    alert('User created: ' + JSON.stringify(formData));
  };

  return (
    <div>
      <div className="d-flex">
        <Sidebar />
        <main className="flex-grow-1 p-4">
          <h2>Create New User</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="role" className="form-label">Role</label>
              <select
                className="form-select"
                id="role"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
              >
                <option value="User">User</option>
                <option value="Admin">Admin</option>
                <option value="Moderator">Moderator</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
