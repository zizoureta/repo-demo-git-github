export const initialState = { cart: [] };

let state = { ...initialState, cart: [...initialState.cart] };
const listeners = [];

export function subscribe(callback) {
  listeners.push(callback);

  return function unsubscribe() {
    const listenerIndex = listeners.indexOf(callback);
    if (listenerIndex !== -1) {
      listeners.splice(listenerIndex, 1);
    }
  };
}

export function dispatch(action) {
  if (!action || typeof action.type !== 'string') {
    return state;
  }

  if (action.type === 'ADD_TO_CART') {
    state = { ...state, cart: [...state.cart, action.payload] };
  }

  if (action.type === 'REMOVE_FROM_CART') {
    state = {
      ...state,
      cart: state.cart.filter((item) => item.id !== action.payload)
    };
  }

  listeners.slice().forEach((listener) => listener(state));
  return state;
}

export function getState() {
  return state;
}
