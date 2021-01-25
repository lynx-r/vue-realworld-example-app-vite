import { Errors, User } from '~/components/models'

export interface ProfileStateInterface {
  errors: Errors,
  profile: User,
}

function state (): ProfileStateInterface {
  return {
    errors: {},
    profile: {} as User
  }
}

export default state
