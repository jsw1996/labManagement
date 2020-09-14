import {
  CREATE_PROFILE,
  DELETE_PROFILE,
  UPDATE_PROFILE,
  FETCH_PROFILES,
  LISTEN_TO_SELECTED_PROFILE,
} from "./profileConstants";
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError,
} from "../app/async/asyncReducer";
import {
  dataFromSnapshot,
  fetchProfilesFromFirestore,
} from "../app/firestore/firestoreService";

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
export function fetchProfiles(limit, lastDocSnapshot) {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    try {
      const snapshot = await fetchProfilesFromFirestore(
        limit,
        lastDocSnapshot
      ).get();
      const lastVisible = snapshot.docs[snapshot.docs.length - 1];
      const moreProfiles = snapshot.docs.length >= limit;
      const profiles = snapshot.docs.map((doc) => dataFromSnapshot(doc));
      dispatch({ type: FETCH_PROFILES, payload: { profiles, moreProfiles } });
      dispatch(asyncActionFinish());
      return lastVisible;
    } catch (error) {
      dispatch(asyncActionError());
    }
  };
}

export function listenToSelectedProfile(profile) {
  return {
    type: LISTEN_TO_SELECTED_PROFILE,
    payload: profile,
  };
}
