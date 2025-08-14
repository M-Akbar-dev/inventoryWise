import { RESET_FILTER, SET_FILTER } from "../Constants";

 
export const setFilter = (filterData) => ({
  type: SET_FILTER,
  payload: filterData,
});

export const resetFilter = () => ({
  type: RESET_FILTER,
});
