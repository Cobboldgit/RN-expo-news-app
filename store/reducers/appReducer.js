const initialState = {
  selectedColor: "gold",
  pitch: 1,
  rate: 1,
  rating: 0,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_THEME":
      return { ...state, selectedColor: payload };
    case "SET_PITCH":
      return { ...state, pitch: payload };
    case "SET_RATE":
      return { ...state, rate: payload };
    case "SET_RATING":
      return { ...state, rating: payload };
    default:
      return state;
  }
};
