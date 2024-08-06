import React, { useState, useEffect }  from 'react'
import { regexString } from '../regex/regex'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom'
import './editUser.css'
import { editUserName } from '../../redux/actions/userEditActions'


/**
 * Edit user component : if user select edit name, he can change firstname and lastname
 *
 * @category Components
 * @component
 * @returns { React.Component } A React component
 */
export default function EditUser() {
    const dispatch = useDispatch()
    const token = useSelector((state) => state.login.token)
    const firstName = useSelector((state) => state.user.firstname)
    const lastName = useSelector((state) => state.user.lastname)
    
    const [errorMessage, setErrorMessage] = useState('')
    const EDIT_PROFILE_BASE_URL = `${process.env.REACT_APP_BASE_URL}user/profile`
    const [display, setDisplay] = useState(true)

    const handleClickCancel = ()=> {
        setDisplay(true)
    }

    const handleSubmitEditProfile = async(event) => {
        event.preventDefault()
        const formData = new FormData(event.target)
        const newFirstName = formData.get('firstNameInput')
        const newLastName = formData.get('lastNameInput')
        if(regexString(newFirstName) && regexString(newLastName))
        {
            try {
                    const response = await fetch(EDIT_PROFILE_BASE_URL, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`,
                        },
                        body: JSON.stringify({ firstName: newFirstName, lastName: newLastName })
                    })
                    if (response.ok) {
                        const userProfilUpdate = await response.json()
                        switch (userProfilUpdate.status) {
                            case 400:
                                setErrorMessage("Invalid Fiels")
                                break
                            case 500:
                                setErrorMessage("Internal Server Error")
                                break
                            case 200:
                                dispatch(editUserName(userProfilUpdate.body))
                                setDisplay(true)
                                break
                            default:
                                setErrorMessage('Please log in')
                                break
                        }
                    } else {
                        setErrorMessage('An error occurred. Please try again.');
                    }
            } catch (error) {
                console.error(error)
            }
        } else {
            setErrorMessage('Names must be at least 3 characters long.');
        }
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
                    <form className="edit-user-form" onSubmit={handleSubmitEditProfile}>
                        <div className="edit-user-content">
                            <div className="edit-user-firstname">
                                <input className="edit-user-input" type="text" id="firstname" defaultValue={firstName} name="firstNameInput"/>
                                <div className='edit-button-format'>
                                    <button className="edit-button-userfirst edit-button-user" type="submit">Save</button>
                                </div>
                            </div>
                            <div className="edit-user-lastname">
                                <input className="edit-user-input" type="text" id="lastname" defaultValue={lastName} name="lastNameInput"/>
                                <button className="edit-button-userlast edit-button-user" type="button" onClick={handleClickCancel}>Cancel</button>
                            </div>
                        </div>
                        { errorMessage }
                    </form>
                </section>
            </>
        }
    </>
  
}

