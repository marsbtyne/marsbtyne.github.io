import * as actionTypes from '../actions/actionTypes';

const initialState = {
  fridges: [],
  loading: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_FRIDGE_START:
      return {
        ...state,
        loading: true
      }
    case actionTypes.LOAD_FRIDGES:
      return {
        ...state,
        fridges: action.data,
        loading: false
      }
    case actionTypes.ADD_FRIDGE:
      const newFridge = action.data;
      return {
        ...state,
        fridges: state.fridges.concat(newFridge)
      }
    case actionTypes.CONFIRM_FRIDGE:
      const fridges = state.fridges;
      const updatedFridges = fridges.map(f => {
        if (f.id === action.id){
          f.confirmed = true;
        }
        return f;
      });
      return {
        ...state,
        fridges: updatedFridges
      }
    default: 
      return state;
  }
}

export default reducer;