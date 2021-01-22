import JwtService from "~/common/jwt.service";
import { Errors } from '~/components/models'

export interface AuthStateInterface {
  errors: Errors
  user: any
  isAuthenticated: boolean;
}

function state (): AuthStateInterface {
  return {
    errors: null,
    user: {},
    isAuthenticated: !!JwtService.getToken()
  }
}

export default state
