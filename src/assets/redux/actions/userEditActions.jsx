export const editUserName = (userFirstName, userLastName) => {
    return {
        type: 'EDIT_USERNAME',
        payload: {firstname: userFirstName , lastname: userLastName},
    }

}