import React, { Fragment } from "react";
import { Container } from "semantic-ui-react";
import Navbar from "../../features/Nav/Navbar";
import UserDashboard from "../../features/UserDashboard";
import { Route, useLocation } from "react-router-dom";
import UserCard from "../../features/Single/UserCard";
import Homepage from "../../features/Homepage/Homepage";
import Sandbox from "../../features/sandbox/Sandbox";
import Manager from "../../features/Single/Manager";
import ModalManager from '../common/modals/ModalManager';
import {ToastContainer} from 'react-toastify';
import ErrorComponent from '../common/errors/ErrorComponent';
import AccountPage from "../../features/auth/AccountPage";
import { useSelector } from "react-redux";
import LoadingComponent from "./LoadingComponent";
import UserPage from '../../features/users/userPage/UserPage';

export default function App() {
  const { key } = useLocation();
  const {initialized} = useSelector(state => state.async);

  if (!initialized) return <LoadingComponent content='Loading app...' />

  return (
    <>
      <ModalManager />
      <ToastContainer position='bottom-right' hideProgressBar />
      <Route exact path='/' component={Homepage} />
      <Route
        path={"/(.+)"}
        render={() => (
          <Fragment>
            <Navbar />
            <Container className='main'>
              <Route exact path='/members' component={UserDashboard} />
              <Route path='/manage/:id' component={Manager} key={key} />
              <Route path='/createMember' component={Manager} />
              <Route exact path='/sandbox' component={Sandbox} />
              <Route path='/members/:id' component={UserCard} />
              <Route path='/account' component={AccountPage} />
              <Route path='/user/:id' component={UserPage} />
              <Route path='/error' component={ErrorComponent} />
            </Container>
          </Fragment>
        )}
      />
    </>
  );
}
