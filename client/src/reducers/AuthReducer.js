export const AuthReducer = (state, action) => {
    const {type, payload: {isAuthenticated, user, isUser, isEployer}} = action

    switch(type){
        case 'SET_AUTH':
            return {
                ...state,
                authLoading: false,
                isAuthenticated,
                user,
                isUser,
                isEployer
            }
            default:
                return state
    }
}
