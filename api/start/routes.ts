/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import HealthCheck from '@ioc:Adonis/Core/HealthCheck'
import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.post('/login', 'Authentication/LoginController.index')
Route.post('/register', 'Authentication/RegisterController.index')

Route.group(() => {
  Route.resource('/employees', 'EmployeesController')
  Route.resource('/scores', 'ScoresController')
  Route.resource('/scores_of_employees', 'ScoresOfEmployeesController')
  Route.get('/logout', 'Authentication/LogoutController.index')
}).middleware('auth:api')

Route.get('health', async ({ response }) => {
  const report = await HealthCheck.getReport()

  return report.healthy ? response.ok(report) : response.badRequest(report)
})
