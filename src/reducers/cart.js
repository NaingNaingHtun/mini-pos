const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_PRODUCT": {
      //first we gonna check if the product has already been added, if so we will update its quantity
      //otherwise we will add it to the cart
      let productExisted = false;
      let productIndex = null;
      state.forEach((product, index) => {
        if (action.payload.id === product.id) {
          productExisted = true;
          productIndex = index;
        }
      });

      //if product is already been added, then we will increase its quantity
      if (productExisted) {
        const newState = [...state];
        newState[productIndex] = {
          ...newState[productIndex],
          quantity: newState[productIndex].quantity + 1,
        };
        return newState;
      } else {
        //product is the new product, then add it to the cart
        return [...state, action.payload];
      }
    }

    case "REMOVE_PRODUCT": {
      return state.filter((product) => product.id !== action.payload);
    }

    case "INCREASE_QUANTITY": {
      return state.map((product) => {
        if (product.id === action.payload) {
          return { ...product, quantity: product.quantity + 1 };
        } else {
          return product;
        }
      });
    }
    //when decreasing quantity, we need to check if the quantity is 1,
    //if so, the user can not decrease anymore
    case "DECREASE_QUANTITY": {
      //first we gonna get the current product and then check if the quantity is 1
      let currentProduct = {};
      let newState = [...state];
      let productIndex = null;
      newState.forEach((product, index) => {
        if (product.id === action.payload) {
          currentProduct = product;
          productIndex = index; //for updating later
        }
      });

      //if the quantity is 1, user can not decrease anymore, just return the previous quantity
      if (currentProduct.quantity === 1) {
        return newState;
      } else {
        //the quantity is still decreasable, then decrease it
        newState[productIndex] = {
          ...newState[productIndex],
          quantity: newState[productIndex].quantity - 1,
        };
        return newState;
      }
    }

    case "SET_QUANTITY": {
      return state.map((product) => {
        if (product.id === action.payload.id) {
          return { ...product, quantity: action.payload.quantity };
        } else {
          return product;
        }
      });
    }

    case "EMPTY_CART": {
      return [];
    }
    default: {
      return state;
    }
  }
};

export default reducer;
