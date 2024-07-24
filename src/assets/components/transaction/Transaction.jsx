/**
 * Transaction component : Show a transaction
 *
 * @category Components
 * @component
 * @returns { React.Component } A React component
 */
export default function Transaction ({content, sum, balance}) {

    return <>
        <section className="account">
            <div className="account-content-wrapper">
                <h3 className="account-title">{content}</h3>
                <p className="account-amount">{sum}</p>
                <p className="account-amount-description">{balance}</p>
            </div>
            <div className="account-content-wrapper cta">
                <button className="transaction-button">View transactions</button>
            </div>
        </section>
    </>
}