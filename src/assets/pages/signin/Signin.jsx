import './signin.css'
import { regexEmail, regexPassword } from '../../components/regex/regex';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { loginSuccess } from '../../redux/actions/loginActions'

/**
 * Sign-in page : permit to allow user credetial for navigation
 *
 * @category Pages
 * @component
 * @returns { React.Component } A React component
 */
export default function Signin () {

    const REACT_LOGIN_BASE_URL=`${process.env.REACT_APP_BASE_URL}user/login`

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (!regexEmail(email)) {
            setErrorMessage("Adresse email incorrecte")
            return
        }
        if (!regexPassword(password)) {
            setErrorMessage("Mot de passe non conforme")
            return
        }
        setErrorMessage("")
        try {
            const response = await fetch(REACT_LOGIN_BASE_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email, 
                    password
                }),
            });
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
                        dispatch(loginSuccess(userData.body.token))
                        navigate('/profile')
                        break
                    default:
                        setErrorMessage("An unknown error occurred");
                        break;
                }
            } 
        } catch (error) {
            console.error(error)
        }
    }

    return <>
        <div className="body">
            <main className="main bg-dark">
                <section className="sign-in-content">
                    <i className="fa fa-user-circle sign-in-icon"></i>
                    <h1>Sign In</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="input-wrapper">
                            <label>Username</label>
                            <input type="text" id="username" onChange={(event) => setEmail(event.target.value)}/>
                        </div>
                        <div className="input-wrapper">
                            <label>Password</label>
                            <input type="password" id="password" onChange={(event) => setPassword(event.target.value)}/>
                        </div>
                        <div className="input-remember">
                            <input type="checkbox" id="remember-me" />
                            <label>Remember me</label>
                        </div>

                        <button className="sign-in-button">Sign In</button>
                        { errorMessage }
                    </form>
                </section>
            </main>
        </div>
    </>
}