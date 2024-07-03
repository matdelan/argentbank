export const regexEmail = (email) => {
    const regex = /^\S+@\S+\.\S+$/;
    return regex.test(email);
};

export const regexPassword = (password) => {
    const regex = /^(?=.*?[a-z])(?=.*?[0-9]).{6,}$/ 
    return regex.test(password);
};