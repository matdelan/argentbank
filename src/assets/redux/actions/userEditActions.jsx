export const editUserName = (body) => {
    return {
        type: 'EDIT_USERNAME',
        payload: body,
    }

}