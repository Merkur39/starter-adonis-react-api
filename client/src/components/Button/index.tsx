import { useAppUserStore } from '#store'
import type { ProviderName } from 'shared'

interface LoginButtonProps {
  provider: ProviderName
}

function LoginButton({ provider }: LoginButtonProps) {
  const login = useAppUserStore.use.login()

  const handleClick = () => {
    login(provider)
  }

  if (provider !== 'twitch') {
    console.error('Unsupported provider:', provider)
    return null
  }

  return (
    <button
      onClick={handleClick}
      className="px-4 py-2 rounded bg-purple-600 text-white hover:bg-purple-700"
    >
      Se connecter avec Twitch
    </button>
  )
}

export { LoginButton }
