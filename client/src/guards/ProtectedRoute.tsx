import { useAppUserStore } from '#store'
import { Navigate, Outlet } from 'react-router'

function ProtectedRoute() {
  const user = useAppUserStore.use.user()
  const loading = useAppUserStore.use.loading()

  if (loading) {
    return null
  }

  if (!user) {
    const search = location.search
    return <Navigate to={`/login${search}`} replace />
  }

  return <Outlet />
}

export { ProtectedRoute }
