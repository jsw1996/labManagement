import React from 'react';
import { Grid } from 'semantic-ui-react';
import UserHeader from './UserHeader';
import { useDispatch, useSelector } from 'react-redux';
import useFirestoreDoc from '../../../app/hooks/useFirestoreDoc';
import { getUser } from '../../../app/firestore/firestoreService';
import { listenToCurrentUser } from './userActions';
import LoadingComponent from '../../../app/layout/LoadingComponent';

export default function UserProfile({ match }) {
    const dispatch = useDispatch();
    const { currentUser } = useSelector(state => state.user);

    const { loading, error } = useSelector(state => state.async);

    useFirestoreDoc({
        query: () => getUser(match.params.id),
        data: user => dispatch(listenToCurrentUser(user)),
        deps: [dispatch, match.params.id]
    })

    if ((loading && !currentUser) || (!currentUser && !error)) return <LoadingComponent content='Loading user...' />

    return (
        <Grid>
            <Grid.Column width={16}>
                <UserHeader user={currentUser} />
            </Grid.Column>
        </Grid>
    )
}