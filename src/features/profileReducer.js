import {
  CREATE_PROFILE,
  UPDATE_PROFILE,
  DELETE_PROFILE,
  FETCH_PROFILES,
  LISTEN_TO_SELECTED_PROFILE,
} from "./profileConstants";

const initialState = {
  profiles: [],
  moreProfiles: false,
  selectedProfile: null,
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
        profiles: [...state.profiles, ...payload.profiles],
        moreProfiles: payload.moreProfiles,
      };
    case LISTEN_TO_SELECTED_PROFILE:
      return {
        ...state,
        selectedProfile: payload,
      };
    default:
      return state;
  }
}
