import React from 'react';
import { StoreProvider } from './setupContext';


export const WithMobx: React.FunctionComponent = ({ children }) => {
  return <StoreProvider>{React.Children.only(children)}</StoreProvider>;
};
