/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const UsersController = () => import('#controllers/users_controller')
const TwitchController = () => import('#controllers/providers/twitch_controller')
const AuthController = () => import('#controllers/auth_controller')

router.post('/auth/logout', [AuthController, 'logout']).use(middleware.auth())
router
  .group(() => {
    router.get('/auth/user', [UsersController, 'get'])
  })
  .use(middleware.auth())
  .use(middleware.refreshToken())

router.get('/twitch/redirect', [TwitchController, 'redirect'])
router.get('/twitch/callback', [TwitchController, 'twitchLogin'])
