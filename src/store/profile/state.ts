import { Errors, User } from '~/components/models'
import { StateWithModuleName } from '~/store/models'

export interface ProfileStateInterface extends StateWithModuleName {
  errors: Errors,
  profile: User,
}

const state: ProfileStateInterface = {
  moduleName: 'profile',
  errors: {},
  profile: {} as User
}

export default state
