export const AuthReducer = (state, action) => {
    const {type, payload: {isAuthenticated, user, isUser, isEmployer}} = action

    switch(type){
        case 'SET_AUTH':
            return {
                ...state,
                authloading: false,
                isAuthenticated,
                user,
                isUser,
                isEmployer
            }
            default:
                return state
    }
}
