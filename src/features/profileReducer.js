import {
  CREATE_PROFILE,
  UPDATE_PROFILE,
  DELETE_PROFILE,
  FETCH_PROFILES,
} from "./profileConstants";

const initialState = {
  profiles: [],
};

export default function profileReducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case CREATE_PROFILE:
      return {
        ...state,
        profiles: [...state.profiles, payload],
      };
    case UPDATE_PROFILE:
      return {
        ...state,
        profiles: [
          ...state.profiles.filter((prf) => prf.id !== payload.id),
          payload,
        ],
      };
    case DELETE_PROFILE:
      return {
        ...state,
        profiles: [...state.profiles.filter((prf) => prf.id !== payload)],
      };
    case FETCH_PROFILES:
      return {
        ...state,
        profiles: payload
      };
    default:
      return state;
  }
}
