import { MutationTree } from 'vuex'
import JwtService from '~/common/jwt.service'
import { PURGE_AUTH, SET_AUTH, SET_ERROR } from '~/store/mutations.type'
import { AuthStateInterface } from './state'

const mutation: MutationTree<AuthStateInterface> = {
  [SET_ERROR](state, error) {
    state.errors = error;
  },
  [SET_AUTH](state, user) {
    state.isAuthenticated = true;
    state.user = user;
    state.errors = {};
    JwtService.saveToken(state.user.token);
  },
  [PURGE_AUTH](state) {
    state.isAuthenticated = false;
    state.user = {};
    state.errors = {};
    JwtService.destroyToken();
  }
}

export default mutation
