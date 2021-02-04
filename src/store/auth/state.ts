import JwtService from '~/common/jwt.service'
import { Errors } from '~/components/models'
import { StateWithModuleName } from '~/store/models'

export interface AuthStateInterface extends StateWithModuleName {
  errors: Errors
  user: any
  isAuthenticated: boolean;
}

const state: AuthStateInterface = {
  moduleName: 'auth',
  errors: null,
  user: {},
  isAuthenticated: !!JwtService.getToken()
}

export default state
