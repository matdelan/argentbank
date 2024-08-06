import './header.css'
import logoArgentBank from '../../img/argentBankLogo.png'
import { useSelector } from "react-redux"
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/actions/loginActions'
import { NavLink, useNavigate } from 'react-router-dom';

/**
 * Header component : Show header with connecting status
 *
 * @category Components
 * @component
 * @returns { React.Component } A React component
 */
export default function Header() {

    const connect = useSelector((state) => state.login.connect)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userFirstName = useSelector((state) => state.user.firstname)

    const handleClick = () => {
        dispatch(logout())
        navigate('/')
    }
   
    return <nav className="main-nav">
        <NavLink className="main-nav-logo" to="/">
            <img
                className="main-nav-logo-image"
                src={logoArgentBank}
                alt="Argent Bank Logo"
            />
            <h1 className="sr-only">Argent Bank</h1>
        </NavLink>
            {connect ? (
                <NavLink className="main-nav" to="/profile">
                    <a className="main-nav-item">
                        <i className="fa fa-user-circle"></i>
                        {userFirstName}
                    </a>
                    <div className="main-nav-item" onClick={handleClick}>
                    <i className="fa fa-sign-out"></i>
                    Sign Out
                    </div>
                </NavLink>
                ) : (
                    <NavLink className="main-nav-item" to="/signin">
                        <i className="fa fa-user-circle"></i>
                        <span>SignIn</span>
                    </NavLink>
                )
            }
        
    </nav>
}