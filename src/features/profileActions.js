import {
  CREATE_PROFILE,
  DELETE_PROFILE,
  UPDATE_PROFILE,
  FETCH_PROFILES,
} from "./profileConstants";
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError,
} from "../app/async/asyncReducer";
import { fetchSampleData } from "../app/api/mockApi";

export function createProfile(profile) {
  return {
    type: CREATE_PROFILE,
    payload: profile,
  };
}
export function updateProfile(profile) {
  return {
    type: UPDATE_PROFILE,
    payload: profile,
  };
}
export function deleteProfile(profileId) {
  return {
    type: DELETE_PROFILE,
    payload: profileId,
  };
}
export function loadProfiles() {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    try {
      const profiles = await fetchSampleData();
      dispatch({ type: FETCH_PROFILES, payload: profiles });
      dispatch(asyncActionFinish());
    } catch (error) {
      dispatch(asyncActionError());
    }
  };
}

export function listenToProfiles(profiles) {
  return {
    type: FETCH_PROFILES,
    payload: profiles
  }
}