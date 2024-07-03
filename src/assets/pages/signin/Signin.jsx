import './signin.css'
import { regexEmail, regexPassword } from '../../components/regex/regex';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Signin () {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!regexEmail(email)) {
            setErrorMessage("Adresse email incorrecte");
            return;
        }
        if (!regexPassword(password)) {
            setErrorMessage("Mot de passe non conforme");
            return;
        }
        setErrorMessage("")
        try {
            const response = await fetch("http://localhost:3001/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email, password}),
            });
            if (response.ok) {
                const userData = await response.json();
                console.log(userData)
                navigate('/user');
            } 
        } catch (error) {
            console.error(error);
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