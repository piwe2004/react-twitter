import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<h1>Home Page</h1>} />
      <Route path="/posts" element={<h1>Post List Page</h1>} />
      <Route path="/post/:id" element={<h1>Post Detail Page</h1>} />
      <Route path="/post/new" element={<h1>Post Write Page</h1>} />
      <Route path="/profile" element={<h1>Profile Page</h1>} />
      <Route path="/profile/edit" element={<h1>Profile Edit Page</h1>} />
      <Route path="/notifications" element={<h1>Notifications Page</h1>} />
      <Route path="/search" element={<h1>Search Page</h1>} />
      <Route path="/user/login" element={<h1>Login Page</h1>} />
      <Route path="/user/signup" element={<h1>Sign Page</h1>} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
}

export default App;
