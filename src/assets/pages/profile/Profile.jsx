import { useSelector } from "react-redux"
import { storeUserProfile } from "../../redux/actions/userActions"
import React, { useState, useEffect }  from 'react'
import { useDispatch } from 'react-redux';
import './profile.css'
import Transaction from "../../components/transaction/Transaction";
import EditUser from "../../components/edituser/EditUser";

export default function Profile () {
    const dispatch = useDispatch()
    const token = useSelector((state) => state.login.token)
    const [firstname, setFirstName] = useState(null) 
    const [lastname, setLastName] = useState(null)
    const PROFILE_BASE_URL = `${process.env.REACT_APP_BASE_URL}user/profile`
    const [errorMessage, setErrorMessage] = useState('Please log in')

    useEffect(() => {
        const userProfile = async() => {
                try {
                    const response = await fetch(PROFILE_BASE_URL, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`,
                        },
                    })
                    if (response.ok) {
                        const userData = await response.json()
                        console.log(userData)
                        setFirstName(userData.body.firstName)
                        setLastName(userData.body.lastName)
                        switch (userData.status) {
                            case 400:
                                setErrorMessage("Invalid Fiels")
                                break
                            case 500:
                                setErrorMessage("Internal Server Error")
                                break
                            case 200:
                                dispatch(storeUserProfile(userData.body))
                                break
                            default:
                                setErrorMessage(userData.status + 'Please log in')
                                break
                        }
                    } 
                } catch (error) {
                    console.error(error)
                }
        }

        if (token) {
            userProfile();
        }
    }, [token, dispatch, PROFILE_BASE_URL]);

    
    return (
        <div>
          {token ? (
            <>
                    <main className="main bg-dark">
                    <div className="header">
                        <EditUser/>
                    </div>
                    <h2 className="sr-only">Accounts</h2>

                    <Transaction content='Argent Bank Checking (x8349)' sum='$2,082.79' balance='Available Balance'/>
                    <Transaction content='Argent Bank Savings (x6712)' sum='$10,928.42' balance='Available Balance'/>
                    <Transaction content='Argent Bank Credit Card (x8349)' sum='$184.30' balance='Current Balance'/>
                    </main>

            </>
          ) : (
            <p>{errorMessage}</p>
          )}
        </div>
      );
}