import { useSelector } from "react-redux"
import { storeUserProfile } from "../../redux/actions/userActions"
import React from 'react'
import { useState } from "react"
import { useDispatch } from 'react-redux';


export default function Profile () {
    const dispatch = useDispatch()
    const envUrl = process.env.BASE_URL
    const connect = useSelector((state) => state.login.connect)
    const token = useSelector((state) => state.login.token)
    const REACT__PROFILE__BASE__URL = 'http://localhost:3001/api/v1/user/profile'
    const [errorMessage, setErrorMessage] = useState('Merci de vous connectez')

    console.log(token)
    const userProfile = async() => {
            try {
                const response = await fetch(REACT__PROFILE__BASE__URL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                })
                console.log(response)
                if (response.ok) {
                    const userData = await response.json()
                    switch (userData.status) {
                        case 400:
                            setErrorMessage("Invalid Fiels")
                            break
                        case 500:
                            setErrorMessage("Internal Server Error")
                            break
                        case 200:
                            console.log(userData.body.firstName)
                            dispatch(storeUserProfile(userData.body))
                        default:
                            setErrorMessage('Merci de vous connectez')
                            break
                    }
                } 
            } catch (error) {
                console.error(error)
            }

    }

    React.useEffect(() => {
        if (token) {
            userProfile();
        }
    }, [token]);
    
    return (
        <div>
          {token ? (
            <p>Token: {token}</p>
          ) : (
            <p>{errorMessage}</p>
          )}
        </div>
      );
}