import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import { ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import DefaultLayout from './layout/DefaultLayout';
import Home from './pages/Home/Home';
import Login from './pages/Authentication/Login'

// Temporarily disabled protected route for development
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  // const token = localStorage.getItem('token');
  // if (!token) {
  //   return <Navigate to="/auth/login" replace />;
  // }
  return <>{children}</>;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/auth/login" replace />
  },
  {
    path: '/auth',
    children: [
      {
        path: 'login',
        element: <Login />
      }
    ]
  },
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        path: 'home',
        element: <Home />,
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
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
}

export default App;
