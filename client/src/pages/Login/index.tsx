import { LoginButton } from '#components/Button'

function Login() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-6 bg-white rounded shadow">
        <h1 className="text-xl mb-4">Connectez-vous</h1>
        <LoginButton provider="twitch" />
      </div>
    </div>
  )
}

export { Login }
