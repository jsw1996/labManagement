import { LISTEN_TO_CURRENT_USER, LISTEN_TO_ALL_USER } from "./userConstants";

const initialState = {
  currentUser: null,
};

export default function userReducer(state = initialState, { type, payload }) {
  switch (type) {
    case LISTEN_TO_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
      };
    case LISTEN_TO_ALL_USER:
      return {
        ...state,
        users: payload,
      };
    default: {
      return state;
    }
  }
}
