import { createStore } from 'vuex'
import home from './home'
import { HomeStateInterface } from './home/state'

// import example from './module-example';
// import { ExampleStateInterface } from './module-example/state';

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export interface StateInterface {
  // Define your own store structure, using submodules if needed
  // example: ExampleStateInterface;
  // Declared as unknown to avoid linting issue. Best to strongly type as per the line above.
  home: HomeStateInterface
}

export default createStore({
  modules: {
    home
  },
})