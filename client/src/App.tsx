import { router } from '#router'
import { useAppUserStore } from '#store'
import { useEffect } from 'react'
import { RouterProvider } from 'react-router'

function App() {
  const refreshUser = useAppUserStore.use.refreshUser()

  useEffect(() => {
    refreshUser()
  }, [refreshUser])

  return <RouterProvider router={router} />
}

export { App }
