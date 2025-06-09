import React from 'react';
import { createActorContext } from '@xstate/react';
import { createMachine, InspectionEvent, spawnChild } from 'xstate';
import {
  currentParamsMachine,
  productsMachine,
  categoriesMachine,
  productDetailsMachine,
  addToCartBtnMachine,
  addToFavMachine,
  cartIconActor,
  checkoutMachine,
  deleteFromCartBtnMachine,
  favIconMachine,
  themeToggleMachine,
  cartMachine,
  favoritesMachine,
} from './machines';

const rootMachine = createMachine({
  entry: [
    spawnChild(currentParamsMachine, { systemId: 'currentParams' }),
    spawnChild(themeToggleMachine, { systemId: 'theme' }),
    spawnChild(checkoutMachine, { systemId: 'checkout' }),
    spawnChild(cartIconActor, { systemId: 'cartIcon' }),
    spawnChild(favIconMachine, { systemId: 'favIcon' }),
    spawnChild(categoriesMachine, { systemId: 'categories' }),
    spawnChild(productsMachine, { systemId: 'products' }),
    spawnChild(productDetailsMachine, { systemId: 'productDetails' }),
    spawnChild(cartMachine, { systemId: 'cart' }),
    spawnChild(favoritesMachine, { systemId: 'favorites' }),
  ],
});

// https://stately.ai/docs/inspector
export const rootContext = createActorContext(rootMachine, {
  inspect: (inspectionEvent: InspectionEvent) => {
    if (inspectionEvent.type === '@xstate.event' && inspectionEvent.sourceRef === undefined) {
      console.log('---inspectionEvent----', inspectionEvent)

    }
  },

});

const RootContext = ({ children }) => {
  return <rootContext.Provider>{children}</rootContext.Provider>;
};

export default RootContext;
