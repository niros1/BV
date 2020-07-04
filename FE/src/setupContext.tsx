import React from 'react';
import { UserStore } from './store/users';
// import { createStore, Stores } from './createStore';

export class RootStore<T> {
  constructor(stores: T) {
    const combined = Object.keys(stores).reduce((acc: any, item: string) => {
      return {
        ...acc,
        // @ts-ignore
        [item]: stores[item].init(this),
      };
    }, {});
    Object.assign(this, { ...combined });
  }
}
export interface Stores {
  users: UserStore;
}


export const createStore = () => {
  return new RootStore<Stores>({
    users: new UserStore(),
  });
}

export const store = createStore() as Stores;

let storeContext = React.createContext(store);

export const StoreProvider: React.FunctionComponent<{ externalStores?: Stores }> = ({ externalStores, children }) => {
  storeContext = React.createContext(externalStores || store);

  return <storeContext.Provider value={externalStores || store}>{children}</storeContext.Provider>;
};

export const useStore = () => {
  const _store = React.useContext(storeContext);
  // @ts-ignore
  window.myStore = _store;
  if (!_store) {
    throw new Error('You have forgotten to use StoreProvider, go fish');
  }
  return _store;
};
