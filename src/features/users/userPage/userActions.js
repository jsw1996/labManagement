const { LISTEN_TO_CURRENT_USER, LISTEN_TO_ALL_USER } = require("./userConstants")

export function listenToCurrentUser(user) {
    return {
        type: LISTEN_TO_CURRENT_USER,
        payload: user
    }
}
export function listenToAllUser(users) {
    return {
        type: LISTEN_TO_ALL_USER,
        payload: users
    }
}