import { useAppUserStore } from '#store'
import { Navigate, Outlet } from 'react-router'

const PublicRoute = () => {
  const user = useAppUserStore.use.user()
  const loading = useAppUserStore.use.loading()

  if (loading) {
    return null
  }

  return !user ? <Outlet /> : <Navigate to="/" replace />
}

export { PublicRoute }
