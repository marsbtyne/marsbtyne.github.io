import * as actionTypes from '../actions/actionTypes';

const initialState = {
  fridges: [],
  loading: false,
  submitted: false,
  currentFridge: null
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
    case actionTypes.GET_FRIDGE:
      return {
        ...state,
        currentFridge: action.data,
        loading: false
      }
    case actionTypes.ADD_FRIDGE_START:
      return {
        ...state,
        loading: true,
        submitted: false
      }
    case actionTypes.ADD_FRIDGE:
      const newFridge = {
        ...action.data,
        id: action.id,
        confirmed: false
      }
      return {
        ...state,
        fridges: state.fridges.concat(newFridge),
        loading: false,
        submitted: true
      }
    case actionTypes.CHECK_FRIDGE:
      return {
        ...state,
        currentFridge: action.data
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
        fridges: updatedFridges,
        currentFridge: {
          ...state.currentFridge,
          confirmed: true
        }
      }
    default: 
      return state;
  }
}

export default reducer;