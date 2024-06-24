import './header.css'
import logoArgentBank from '../../img/argentBankLogo.png'

export default function header() {

    return <nav class="main-nav">
        <a class="main-nav-logo" href="./index.html">
        <img
            class="main-nav-logo-image"
            src={logoArgentBank}
            alt="Argent Bank Logo"
        />
        <h1 class="sr-only">Argent Bank</h1>
        </a>
        <div>
        <a class="main-nav-item" href="./signin">
            <i class="fa fa-user-circle"></i>
            Sign In
        </a>
        </div>
    </nav>

}
