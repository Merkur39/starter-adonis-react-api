import { useAppUserStore } from '#store'

function Home() {
  const user = useAppUserStore.use.user()
  const logout = useAppUserStore.use.logout()

  const handleLogout = async () => {
    await logout()
  }

  // TODO
  return (
    <div className="profile-container">
      <h1>Profil utilisateur</h1>
      {user && (
        <div>
          <strong>User ID :</strong> {user.id}
        </div>
      )}

      {/* {provider && (
        <div className="profile">
          <img src={provider.avatar} alt="Avatar Twitch" />
          <div>
            <strong>Twitch :</strong> {provider.username}
          </div>
          <div>
            <strong>Provider ID :</strong> {provider.providerUserId}
          </div>
        </div>
      )} */}
      <button onClick={handleLogout}>Se déconnecter</button>
    </div>
  )
}

export { Home }
