import React from "react";
import { Grid, Segment, Divider } from "semantic-ui-react";
import UserPicture from "./UserPicture";
import UserDesc from "./UserDesc";
import UserInfo from "./UserInfo";
import UserTable from "./UserTable";
import { useSelector, useDispatch } from "react-redux";
import useFirestoreDoc from "../../app/hooks/useFirestoreDoc";
import { listenToProfileFromFirestore } from "../../app/firestore/firestoreService";
import { listenToSelectedProfile } from "../profileActions";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Redirect } from "react-router-dom";

export default function UserCard({ match }) {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.selectedProfile);
  const { loading, error } = useSelector((state) => state.async);

  useFirestoreDoc({
    query: () => listenToProfileFromFirestore(match.params.id),
    data: (profile) => dispatch(listenToSelectedProfile(profile)),
    deps: [match.params.id, dispatch],
  });

  if (loading || (!profile && !error))
    return <LoadingComponent content='Loading profile...' />;

  if (error) return <Redirect to='/error' />;

  return (
    <Segment>
      <Grid>
        <Grid.Column width={5}>
          <UserPicture profile={profile} />
          <Divider hidden />
          <UserDesc profile={profile} />
        </Grid.Column>
        <Grid.Column width={10}>
          <UserInfo profile={profile} />
          <Divider hidden />
          <UserTable profile={profile} />
        </Grid.Column>
      </Grid>
    </Segment>
  );
}
