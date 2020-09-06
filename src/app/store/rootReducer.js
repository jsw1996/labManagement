import {combineReducers} from 'redux'
import testReducer from '../../features/sandbox/testReducer'
import profileReducer from '../../features/profileReducer'
import modalReducer from '../common/modals/modalReducer';
import authReducer from '../../features/auth/authReducer';
import asyncReducer from '../async/asyncReducer';
import userReducer from '../../features/users/userPage/userReducer';

const rootReducer = combineReducers({
    test: testReducer,
    profile: profileReducer,
    modals: modalReducer,
    auth: authReducer,
    async: asyncReducer,
    user: userReducer
})

export default rootReducer;