export const AuthReducer = (state, action) => {
    const { type, payload: { isAuthenticated, user, isUser, isEmployer, profile, CV } } = action

    switch (type) {
        case 'SET_AUTH':
            return {
                ...state,
                authloading: false,
                isAuthenticated,
                user,
                isUser,
                isEmployer
            }
        case 'PROFILE_LOAD_SUCCESS':
            return {
                ...state,
                profile: profile,
                profileLoading: false,
            }
        case 'CV_UPLOAD_SUCCESS':
            return {
                ...state,
                CV: CV
            }
        default:
            return state
    }
}
