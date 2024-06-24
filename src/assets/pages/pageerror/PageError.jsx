import {useRouteError} from 'react-router-dom'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import './pageError.css'

export default function PageError() {
    const error = useRouteError()
    return <>
        <Header/>
        <div className='pe'>
            <p className='pe__number'>404</p>
            <h2 className='pe__title'>Oups! La page que vous demandez n'existe pas.</h2>
            <p className='pe__content'>{error?.error?.toString() ?? error?.toString()}</p>
            <a href="/" className='pe__link'>Retourner sur la page d’accueil</a>
        </div>
        <Footer/>
    </>
}