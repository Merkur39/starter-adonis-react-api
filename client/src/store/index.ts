import { api } from '#services/axios'
import { createSelectors } from '#store/selectors'
import type { ProviderName, User } from 'shared'
import { create } from 'zustand'
const apiUrl = import.meta.env.VITE_API_URL

interface AppUserSate {
  user: User | null
  loading: boolean
  setUser: (user: User | null) => void
  refreshUser: () => Promise<void>
  logout: () => Promise<void>
  login: (provider: ProviderName) => void
}

const useAppUserStoreBase = create<AppUserSate>((set) => ({
  user: null,
  loading: true,
  setUser: (user) => set({ user }),
  async refreshUser() {
    try {
      set({ loading: true })
      const res = await api.get('/auth/user')
      set({ user: res.data.user ?? null, loading: false })
    } catch {
      set({ user: null, loading: false })
    }
  },
  async logout() {
    try {
      await api.post('/auth/logout')
    } finally {
      set({ user: null })
    }
  },
  login(provider: ProviderName) {
    window.location.href = `${apiUrl}/${provider}/redirect?redirect=${encodeURIComponent('http://localhost:5173')}`
  },
}))

export const useAppUserStore = createSelectors(useAppUserStoreBase)
