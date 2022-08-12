import { Link } from "react-router-dom"

const Missing = () => {
    return (
        <div className="login-center">
            <article style={{ padding: "100px" }}>
                <h1>Oops!</h1>
                <p>Page not found</p>
                <div className="missing-link">
                    <Link to="/">Back to login</Link>
                </div>
            </article>
        </div>
    )
}

export default Missing