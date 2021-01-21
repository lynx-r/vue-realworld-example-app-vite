import { ArticlesService, TagsService } from 'common/api.service'
import { FETCH_ARTICLES, FETCH_TAGS } from 'store/actions.type'
import { FETCH_END, FETCH_START, SET_TAGS } from 'store/mutations.type'
import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { HomeStateInterface } from './state';

const actions: ActionTree<HomeStateInterface, StateInterface> = {
  [FETCH_ARTICLES]({ commit }, params) {
    commit(FETCH_START);
    return ArticlesService.query(params.type, params.filters)
      .then(({ data }: any) => {
        commit(FETCH_END, data);
      })
      .catch((error: any) => {
        throw new Error(error);
      });
  },
  [FETCH_TAGS]({ commit }) {
    return TagsService.get()
      .then(({ data }: any) => {
        commit(SET_TAGS, data.tags);
      })
      .catch((error: any) => {
        throw new Error(error);
      });
  }};

export default actions;
