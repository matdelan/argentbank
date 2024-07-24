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
    const initialFirstName = useSelector((state) => state.user.firstname)
    const initialLastName = useSelector((state) => state.user.lastname)

    const [firstName, setFirstName] = useState(initialFirstName);
    const [lastName, setLastName] = useState(initialLastName);
    
    const [errorMessage, setErrorMessage] = useState('')
    const EDIT_PROFILE_BASE_URL = `${process.env.REACT_APP_BASE_URL}user/profile`
    const [display, setDisplay] = useState(true)

    console.log(firstName + lastName)
    console.log('ini : ' + initialFirstName + initialLastName)
    useEffect(() => {
        setFirstName(initialFirstName);
        setLastName(initialLastName);
    }, [initialFirstName, initialLastName]);

    const handleClickCancel = ()=> {
        setFirstName(initialFirstName);
        setLastName(initialLastName);
        setDisplay(!display)
    }

    const handleSubmitEditProfile = async(event) => {
        event.preventDefault();

        if(regexString(firstName) && regexString(lastName))
        {
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
                                dispatch(editUserName(userProfilUpdate.body))
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
        }
        else setErrorMessage('At least 3 characters')
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
                                <input className="edit-user-input" type="text" id="firstname" value={firstName} onChange={(event) => setFirstName(event.target.value)}/>
                                <div className='edit-button-format'>
                                    <button className="edit-button-userfirst edit-button-user" type="submit">Save</button>
                                </div>
                            </div>
                            <div className="edit-user-lastname">
                                <input className="edit-user-input" type="text" id="lastname" value={lastName} onChange={(event) => setLastName(event.target.value)}/>
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

/*

4 raisons : 
utilisation d'un useEffect sur firstname et lastname,
pb de transmissions d'information avec value de l'input
pb transmissions d'infos sur le reduceur ( les changement à la fin ca passait pas j'ai pas pensé a chager en objet mais remis le body comme avec l'autre fonction est ca a marché comme au début)

avec ces modifs le comportment est normal 

*/