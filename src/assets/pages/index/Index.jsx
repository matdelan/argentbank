import Miniature from '../../components/miniature/Miniature'
import iconChat from '../../img/icon-chat.png'
import iconMoney from '../../img/icon-money.png'
import iconSecurity from '../../img/icon-security.png'
import './index.css'

/**
 * Home page : Show home page
 *
 * @category Pages
 * @component
 * @returns { React.Component } A React component
 */
export default function index() {

    return (
        <main>
            <div className="hero">
                <section className="hero-content">
                <h2 className="sr-only">Promoted Content</h2>
                <p className="subtitle">No fees.</p>
                <p className="subtitle">No minimum deposit.</p>
                <p className="subtitle">High interest rates.</p>
                <p className="text">Open a savings account with Argent Bank today!</p>
                </section>
            </div>
            <section className="features">
                <h2 className="sr-only">Features</h2>
                <Miniature icon={iconChat} title='You are our #1 priority' content='Need to talk to a representative? You can get in touch through our
                    24/7 chat or through a phone call in less than 5 minutes.'/>
                <Miniature icon={iconMoney}title='More savings means higher rates' content='The more you save with us, the higher your interest rate will be!'/>
                <Miniature icon={iconSecurity} title='Security you can trust' content='We use top of the line encryption to make sure your data and money
                    is always safe.'/>
            </section>
        </main>
    )
}