import './header.css'
import logoArgentBank from '../../img/argentBankLogo.png'
import { useSelector } from "react-redux"
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/actions/loginActions'
import { useNavigate } from 'react-router-dom';

export default function Header() {

    const connect = useSelector((state) => state.login.connect)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleClick = () => {
        dispatch(logout())
        navigate('/')
    }

    return <nav className="main-nav">
        <a className="main-nav-logo" href="/">
        <img
            className="main-nav-logo-image"
            src={logoArgentBank}
            alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
        </a>
        <div>
            {connect ? (
                <div className='main-nav'>
                    <a className="main-nav-item" href="./user.html">
                    <i className="fa fa-user-circle"></i>
                    Tony
                    </a>
                    <p className="main-nav-item" onClick={handleClick}>
                    <i className="fa fa-sign-out"></i>
                    Sign Out
                    </p>
                
                </div>
                ) : (
                    <a className="main-nav-item" href="./signin">
                        <i className="fa fa-user-circle"></i>
                        <span>SignIn</span>
                    </a>
                )
            }
        </div>
    </nav>
}