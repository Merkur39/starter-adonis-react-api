import { ProtectedRoute } from '#guards/ProtectedRoute'
import { PublicRoute } from '#guards/PublicRoute'
import { Home } from '#pages/Home'
import { Layout } from '#pages/Layout'
import { Login } from '#pages/Login'
import { createBrowserRouter, Navigate } from 'react-router'

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: '/',
            element: <Home />,
          },
        ],
      },
      {
        element: <PublicRoute />,
        children: [
          {
            path: 'login',
            element: <Login />,
          },
        ],
      },
      {
        path: '*',
        element: <Navigate to="/" replace />,
      },
    ],
  },
])

export { router }
