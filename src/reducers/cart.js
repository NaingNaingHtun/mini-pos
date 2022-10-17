const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_PRODUCT": {
      //we need to check if the product has already been added to the cart
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
          quantity: newState[productIndex].quantity++,
        };
        return newState;
      } else {
        //product is the new product, then add to the cart
        return [...state, action.payload];
      }
    }

    case "REMOVE_PRODUCT": {
      return state.filter((product) => product.id !== action.payload);
    }

    case "INCREASE_QUANTITY": {
      return state.map((product) => {
        if (product.id === action.payload) {
          return { ...product, quantity: product.quantity++ };
        } else {
          return product;
        }
      });
    }
    case "DECREASE_QUANTITY": {
      //when decreasing the quantity, reaching to the quantity of 0 should remove the product
      let currentProduct = {};
      let newState = [...state];
      let productIndex = null;
      //getting the current product to see if we should remove the product or decrease quantity
      newState.forEach((product, index) => {
        if (product.id === action.payload) {
          currentProduct = product;
          productIndex = index; //for updating later
        }
      });

      //if the quantity is zero when we decreased,then we will do nothing and just remove the product
      if (currentProduct.quantity - 1 === 0) {
        return newState.filter((product) => product.id !== action.payload);
      } else {
        //the quantity is still decreasable
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
