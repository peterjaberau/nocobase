import { setup, fromPromise, assign, sendTo } from 'xstate';
import { data } from './config';

export const addToCartBtnMachine = setup({
  actions: {
    addToCart: sendTo(
      ({ system }) => system.get('cartIcon'),
      ({ event }: any) => ({ type: 'ADD_TO_CART', product: event.product }),
    ),
    reduceFromCart: sendTo(
      ({ system }) => system.get('cartIcon'),
      ({ event }: any) => ({ type: 'REDUCE_FROM_CART', product: event.product }),
    ),
    addCount: assign({
      productCount: ({ context }) => context.productCount + 1,
    }),
    reduceCount: assign({
      productCount: ({ context }) => context.productCount - 1,
    }),
    syncCount: assign({
      productCount: ({ event, system }) => {
        const cart = system.get('cartIcon').getSnapshot().context.cart;
        const isInCart = cart.find((item) => item.id === event.productId);
        if (isInCart) {
          return isInCart.count;
        }
        return 0;
      },
    }),
  },
}).createMachine({
  initial: 'notActive',
  context: {
    //Private state for the button. We sync the product count of the item in the cart with the product count within the button machine
    //Any further interaction is independent, since we want each component to be able to has its own state and control its behavior.
    productCount: 0,
  },
  states: {
    notActive: {
      on: {
        ADD_PRODUCT_COUNT: {
          target: 'active',
          actions: ['addToCart', 'addCount'],
        },
        SYNC_COUNT: {
          actions: ['syncCount'],
        },
      },
      always: {
        guard: ({ context }) => context.productCount > 0,
        target: 'active',
      },
    },
    active: {
      on: {
        ADD_PRODUCT_COUNT: {
          target: 'active',
          actions: ['addToCart', 'addCount'],
        },
        REDUCE_PRODUCT_COUNT: [
          {
            guard: ({ context }) => context.productCount === 1,
            actions: ['reduceFromCart', 'reduceCount'],
            target: 'notActive',
          },
          {
            guard: ({ context }) => context.productCount > 1,
            actions: ['reduceFromCart', 'reduceCount'],
            target: 'active',
          },
        ],
      },
    },
  },
});

export const addToFavMachine = setup({
  actions: {
    addToCart: sendTo(
      ({ system }) => system.get('favIcon'),
      ({ event }: any) => ({ type: 'ADD_TO_FAVORITES', product: event.product }),
    ),
    removeFromCart: sendTo(
      ({ system }) => system.get('favIcon'),
      ({ event }: any) => ({ type: 'REMOVE_FROM_FAVORITES', product: event.product }),
    ),
    sync: assign({
      isInFavorites: ({ event, system }) => {
        const favorites = system.get('favIcon').getSnapshot().context.favorites;
        const isInCount = favorites.find((product) => product.id === event.productId);
        if (isInCount) {
          return true;
        }
        return false;
      },
    }),
  },
}).createMachine({
  initial: 'inactive',
  context: {
    isInFavorites: false,
  },
  states: {
    inactive: {
      on: {
        ADD_OR_REMOVE_FAVORITE: {
          target: 'active',
          actions: ['addToCart'],
        },
        SYNC: {
          actions: ['sync'],
        },
      },
      always: {
        guard: ({ context }) => context.isInFavorites === true,
        target: 'active',
      },
    },
    active: {
      on: {
        ADD_OR_REMOVE_FAVORITE: {
          target: 'inactive',
          actions: ['removeFromCart', 'sync'],
        },
      },
    },
  },
});

export const cartIconActor = setup({
  actions: {
    addToCart: assign({
      cart: ({ context, event }) => {
        const isInCart = context.cart.find((product) => product.id === event.product.id);
        if (isInCart) {
          return context.cart.map((product) => {
            if (product.id === isInCart.id) return { ...product, count: product.count + 1 };
            return product;
          });
        }
        return context.cart.concat({ ...event.product, count: 1 });
      },
    }),
    reduceFromCart: assign({
      cart: ({ context, event }) => {
        const foundItem = context.cart.find((product) => product.id === event.product.id);
        if (foundItem) {
          if (foundItem.count === 1) {
            return context.cart.filter((product) => product.id !== foundItem.id);
          }
          if (foundItem.count > 1) {
            return context.cart.map((product) => {
              if (product.id === foundItem.id) return { ...product, count: product.count - 1 };
              return product;
            });
          }
        }
        return context.cart;
      },
    }),
    deleteItem: assign({
      cart: ({ context, event }) => {
        const foundItem = context.cart.find((product) => product.id === event.productId);
        if (foundItem) {
          return context.cart.filter((product) => product.id !== foundItem.id);
        }
        return context.cart;
      },
    }),
    syncCount: assign({
      cartCount: ({ context }) => context.cart.map((item) => item.count).reduce((acc, cv) => acc + cv, 0),
    }),
    sendTotalPrice: sendTo(
      ({ system }) => system.get('checkout'),
      ({ context }) => ({
        type: 'UPDATE_PRICE',
        totalPrice: context.cart.map((item) => item.price * item.count).reduce((acc, cv) => acc + cv, 0),
      }),
    ),
    sendUpdatedCart: sendTo(
      ({ system }) => system.get('cart'),
      ({ context }) => ({
        type: 'UPDATE_CART',
        cart: context.cart,
      }),
    ),
  },
}).createMachine({
  context: {
    cart: [],
    cartCount: 0,
  },
  on: {
    ADD_TO_CART: {
      actions: ['addToCart', 'syncCount', 'sendTotalPrice', 'sendUpdatedCart'],
    },
    REDUCE_FROM_CART: {
      actions: ['reduceFromCart', 'syncCount', 'sendTotalPrice', 'sendUpdatedCart'],
    },
    DELETE_ITEM: {
      actions: ['deleteItem', 'syncCount', 'sendTotalPrice', 'sendUpdatedCart'],
    },
  },
});

export const checkoutMachine = setup({
  actions: {
    updatePrice: assign({
      totalPrice: ({ event }) => event.totalPrice.toLocaleString('en-US', { maximumFractionDigits: 2 }),
    }),
  },
}).createMachine({
  context: {
    totalPrice: 0,
  },
  initial: 'modalIdle',
  states: {
    modalIdle: {
      on: {
        TOGGLE: {
          target: 'modalActive',
        },
      },
    },
    modalActive: {
      on: {
        TOGGLE: {
          target: 'modalIdle',
        },
      },
    },
  },
  on: {
    UPDATE_PRICE: {
      actions: ['updatePrice'],
    },
  },
});

export const deleteFromCartBtnMachine = setup({
  actions: {
    sendDeleteEvent: sendTo(
      ({ system }) => system.get('cartIcon'),
      ({ event }: any) => ({ type: 'DELETE_ITEM', productId: event.productId }),
    ),
  },
}).createMachine({
  on: {
    DELETE_ITEM: {
      actions: ['sendDeleteEvent'],
    },
  },
});

export const favIconMachine = setup({
  actions: {
    addToFavorites: assign({
      favorites: ({ event, context }) => {
        const isInFavorites = context.favorites.find((product) => product.id === event.product.id);
        if (isInFavorites) {
          return context.favorites;
        }
        return context.favorites.concat(event.product);
      },
    }),
    removeFromFavorites: assign({
      favorites: ({ event, context }) => context.favorites.filter((product) => product.id !== event.product.id),
    }),
    sendUpdateFavorites: sendTo(
      ({ system }) => system.get('favorites'),
      ({ context }) => ({
        type: 'UPDATE_FAVORITES',
        favorites: context.favorites,
      }),
    ),
  },
}).createMachine({
  context: {
    favorites: [],
  },
  initial: 'inactive',
  states: {
    inactive: {
      on: {
        ADD_TO_FAVORITES: {
          target: 'active',
          actions: ['addToFavorites', 'sendUpdateFavorites'],
        },
      },
    },
    active: {
      on: {
        ADD_TO_FAVORITES: {
          actions: ['addToFavorites', 'sendUpdateFavorites'],
        },
        REMOVE_FROM_FAVORITES: {
          actions: ['removeFromFavorites', 'sendUpdateFavorites'],
        },
      },
      always: {
        guard: ({ context }) => context.favorites.length === 0,
        target: 'inactive',
      },
    },
  },
});

export const themeToggleMachine = setup({
  actions: {
    activateDarkMode: ({ context }) => {
      context.htmlRef.classList.add('dark');
    },
    activateLightMode: ({ context }) => {
      context.htmlRef.classList.remove('dark');
    },
  },
}).createMachine({
  context: {
    htmlRef: document.documentElement,
  },
  initial: 'lightMode',
  states: {
    lightMode: {
      on: {
        TOGGLE: {
          target: 'darkMode',
          actions: 'activateDarkMode',
        },
      },
    },
    darkMode: {
      on: {
        TOGGLE: {
          target: 'lightMode',
          actions: 'activateLightMode',
        },
      },
    },
  },
});

export const categoriesMachine = setup({}).createMachine({
  context: data.categories,
});

export const productsMachine = setup({
  actions: {
    loadData: assign({
      products: ({ event, spawn }) =>
        event.output.map((product) => ({
          ...product,
          btnMachineRef: spawn(addToCartBtnMachine),
          addToFavBtnRef: spawn(addToFavMachine),
        })),
    }),
    setCategoryName: assign({
      categoryName: ({ event }) => {
        return event.name;
      },
    }),
  },
  actors: {
    productsFetcher: fromPromise(async ({ input }: any) => {
      // const data = await fetch(
      //   `https://fakestoreapi.com/products/category/${input}`
      // );
      // return await data.json();
      if (input) {
        return data.products.filter((item) => item.category === input);
      } else {
        return data.products;
      }
    }),
  },
}).createMachine({
  context: {
    products: undefined,
    categoryName: undefined,
  },
  initial: 'idle',
  states: {
    idle: {
      on: {
        SET_CATEGORY_NAME: {
          actions: 'setCategoryName',
          target: 'fetchingProducts',
        },
      },
    },
    fetchingProducts: {
      invoke: {
        src: 'productsFetcher',
        onDone: {
          actions: ['loadData'],
          target: 'idle',
        },
        input: ({ context }) => context.categoryName,
        onError: {
          actions: ({ event }) => console.log(event),
        },
      },
    },
  },
});

export const productDetailsMachine = setup({
  actors: {
    productFetcher: fromPromise(async ({ input }) => {
      return data.products.find((product) => product.id === input);
      // const data = await fetch(`https://fakestoreapi.com/products/${input}`);
      // return await data.json();
    }),
  },
  actions: {
    loadProduct: assign({
      product: ({ event, spawn }) => ({
        ...event.output,
        btnMachineRef: spawn(addToCartBtnMachine),
        addToFavBtnRef: spawn(addToFavMachine),
      }),
    }),
    loadProductId: assign({
      productId: ({ event }) => event.id,
    }),
  },
}).createMachine({
  context: {
    product: undefined,
    productId: undefined,
  },
  initial: 'idle',
  states: {
    idle: {
      on: {
        SET_PRODUCT_ID: {
          actions: 'loadProductId',
          target: 'fetchingProduct',
        },
      },
    },
    fetchingProduct: {
      invoke: {
        src: 'productFetcher',
        input: ({ context }) => context.productId,
        onDone: {
          actions: 'loadProduct',
          target: 'idle',
        },
        onError: {
          actions: ({ event }) => console.log(event),
        },
      },
    },
  },
});

export const cartMachine = setup({
  actions: {
    updateCart: assign({
      cart: ({ event, spawn }) =>
        event.cart.map((item) => ({
          ...item,
          btnMachineRef: spawn(addToCartBtnMachine),
          addToFavBtnRef: spawn(addToFavMachine),
          deleteBtnMachineRef: spawn(deleteFromCartBtnMachine),
        })),
    }),
  },
}).createMachine({
  context: {
    cart: [],
  },
  on: {
    UPDATE_CART: {
      actions: ['updateCart'],
    },
  },
});

export const favoritesMachine = setup({
  actions: {
    updateFavorites: assign({
      favorites: ({ event, spawn }) =>
        event.favorites.map((item) => ({
          ...item,
          btnMachineRef: spawn(addToCartBtnMachine),
          addToFavBtnRef: spawn(addToFavMachine),
        })),
    }),
  },
}).createMachine({
  context: {
    favorites: [],
  },
  on: {
    UPDATE_FAVORITES: {
      actions: ['updateFavorites'],
    },
  },
});

export const currentParamsMachine = setup({
  actions: {
    setCategory: assign({
      category: ({ event }) => event.category,
      product: null,
    }),
    setProduct: assign(({ context, event }) => {
      return {
        ...context,
        product: {
          id: event.product.id,
        },
        category: {
          name: event.category.name,
        },
      };
    }),
  },
}).createMachine({
  context: {
    product: {
      id: null,
    },
    category: {
      name: null,
    },
  },
  initial: 'initial',
  states: {
    initial: {
      on: {
        CATEGORY_CHANGE: {
          actions: 'setCategory',
        },
        PRODUCT_CHANGE: {
          actions: 'setProduct',
        },
      },
    },
  },
});
