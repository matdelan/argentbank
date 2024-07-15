import React, { useState, useEffect }  from 'react'
import { regexString } from '../regex/regex'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom'
import './editUser.css'
import { editUserName } from '../../redux/actions/userEditActions'

export default function EditUser() {
    const dispatch = useDispatch()
    const token = useSelector((state) => state.login.token)
    const initialFirstName = useSelector((state) => state.user.firstname)
    const initialLastName = useSelector((state) => state.user.lastname)

    const [firstName, setFirstName] = useState(initialFirstName);
    const [lastName, setLastName] = useState(initialLastName);
    
    const [errorMessage, setErrorMessage] = useState('')
    const EDIT_PROFILE_BASE_URL = `${process.env.REACT_APP_BASE_URL}user/profile`
    const [display, setDisplay] = useState(true)

    const handleSubmitEditProfile = async(event) => {
        event.preventDefault();
        console.log(initialFirstName + initialLastName)
        console.log(regexString(firstName))
        console.log(regexString(lastName))
        //if(regexString(firstName) && regexString(lastName))
        //{
        console.log('Nom envoyé : '+firstName + lastName)
            
            try {
                    const response = await fetch(EDIT_PROFILE_BASE_URL, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`,
                        },
                        body: JSON.stringify({firstName, lastName})
                    })
                    console.log(response)
                    
                    if (response.ok) {

                        const userProfilUpdate = await response.json()
                        console.log('->')
                        console.log(userProfilUpdate)
                        const userFirstName = userProfilUpdate.body.firstname
                        const userLastName = userProfilUpdate.body.lastname
                        switch (userProfilUpdate.status) {
                            case 400:
                                setErrorMessage("Invalid Fiels")
                                break
                            case 500:
                                setErrorMessage("Internal Server Error")
                                break
                            case 200:
                                dispatch(editUserName(userFirstName, userLastName))
                                setFirstName(userFirstName)
                                setFirstName(userLastName)
                                setDisplay(!display)
                                break
                            default:
                                setErrorMessage('Please log in')
                                break
                        }
                    } 
            } catch (error) {
                console.error(error)
            }
        //}
        //else setErrorMessage('At least 3 characters')
   }

    return <>
        { display ? 
            <>
                <h1>Welcome back<br />{firstName + ' ' + lastName}</h1>
                <button className="edit-button" onClick={()=>setDisplay(!display)}>Edit Name</button>
            </>
            :
            <>
                <h1>Welcome back<br /></h1>
                <section className="edit-user">      
                    <form className="edit-user-form">
                        <div className="edit-user-content">
                            <div className="edit-user-firstname">
                                <input className="edit-user-input" type="text" id="firstname" defaultValue={initialFirstName} onChange={(event) => setFirstName(event.target.value)}/>
                                <button className="edit-button-user" onClick={handleSubmitEditProfile}>Save</button>
                            </div>
                            <div className="edit-user-lastname">
                                <input className="edit-user-input" type="text" id="lastname" defaultValue={initialLastName} onChange={(event) => setLastName(event.target.value)}/>
                                <button className="edit-button-user" onClick={()=>setDisplay(!display)}>Annuler</button>
                            </div>
                        </div>
                        { errorMessage }
                    </form>
                </section>
            </>
        }
    </>
  
}