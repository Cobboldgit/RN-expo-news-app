export const setSelectedColor = (theme) => {
  return {
    type: "SET_THEME",
    payload: theme,
  };
};

export const setPitch = (pitch) => {
  return {
    type: "SET_PITCH",
    payload: pitch,
  };
};

export const setRate = (rate) => {
  return {
    type: "SET_RATE",
    payload: rate,
  };
};

export const setRating = (rating) => {
  return {
    type: "SET_RATING",
    payload: rating,
  };
}
