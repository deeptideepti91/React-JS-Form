import React, { useState } from 'react';

// Form component to add new users
const AddUserForm = ({ addUser }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate form inputs
    if (!name || !email || !phone) {
      alert('Please fill in all fields.');
      return;
    }
    // Add new user
    addUser({ name, email, phone });
    // Clear form fields
    setName('');
    setEmail('');
    setPhone('');
  };

  return (
    <form onSubmit={handleSubmit} className='box'>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="tel"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <button type="submit" className='btn'>Add User</button>
    </form>
  );
};

// User list component
const UserList = ({ users, deleteUser, editUser }) => {
  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>
          <button onClick={() => editUser(user.id)} className='button'>Edit</button>
          <button onClick={() => deleteUser(user.id)} className='button'>Delete</button>
        </div>
      ))}
    </div>
  );
};

const App = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  // Add new user
  const addUser = (user) => {
    const newUser = {
      ...user,
      id: Math.random().toString(),
    };
    setUsers([...users, newUser]);
  };

  // Delete user
  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  // Edit user
  const editUser = (id) => {
    setEditingUser(id);
  };

  return (
    <div>
      <h1>User Management Application</h1>
      <AddUserForm addUser={addUser} />
      <UserList users={users} deleteUser={deleteUser} editUser={editUser} />
    </div>
  );
};

export default App;
