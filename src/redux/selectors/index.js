export const getFridges = state => state.fridges;

export const getCurrentFridge = state =>
  state.fridges.find(f => f.id == state.currentFridge)