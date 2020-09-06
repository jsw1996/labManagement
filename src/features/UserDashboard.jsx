import React from "react";
import { Grid } from "semantic-ui-react";
import Filter from "./Filter/Filter";
import { useSelector, useDispatch } from "react-redux";
import LoadingComponent from "../app/layout/LoadingComponent";
import { listenToProfilesFromFirestore, getAllUsers } from "../app/firestore/firestoreService";
import { listenToProfiles } from "./profileActions";
import useFirestoreCollection from "../app/hooks/useFirestoreCollection";
import ListerItem from "./List/ListerItem";
import { listenToAllUser } from "./users/userPage/userActions";

export default function UserDashboard() {
  const dispatch = useDispatch();
  const { profiles } = useSelector((state) => state.profile);
  const { loading } = useSelector((state) => state.async);
//  const {users} = useSelector(state => state.user);

  useFirestoreCollection({
    query: () => listenToProfilesFromFirestore(),
    data: (profiles) => dispatch(listenToProfiles(profiles)),
    deps: [dispatch],
  });

  useFirestoreCollection({
    query: () => getAllUsers(),
    data: (users) => dispatch(listenToAllUser(users)),
    deps: [dispatch],
  });

  if (loading)
    return (
      <>
        <LoadingComponent />
      </>
    );

  return (
    <Grid>
      <Grid.Column width={9}>
        <Grid columns={5} stackable divided='vertically'>
          <Grid.Row>
            {profiles.map((profile) => (
              <ListerItem profile={profile} key={profile.id} />
            ))}
          </Grid.Row>
        </Grid>
      </Grid.Column>
      <Grid.Column width={7}>
        <Filter />
      </Grid.Column>
    </Grid>
  );
}
