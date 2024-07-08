export const storeUserProfile = (userProfile) => {
    return {
      type: 'STORE_USER_PROFILE',
      payload: userProfile,
    }
}