import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';

import Login from './pages/Authentication/Login';

const router = createBrowserRouter([
  {
    path: 'auth',
    element: <div />, // Add a dummy wrapper if you don’t have a layout
    children: [
      {
        path: 'login',
        element: <Login />,
      },
    ],
  },
]);

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <>
      <Login />
    </>
  );
}

export default App;
