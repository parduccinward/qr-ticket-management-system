import { Link } from "react-router-dom"

const Missing = () => {
    return (
        <div className="login-center">
            <article style={{ padding: "100px" }}>
                <h1>Oops!</h1>
                <p>Pagina no encontrada</p>
                <div className="missing-link">
                    <Link to="/">Volver al login</Link>
                </div>
            </article>
        </div>
    )
}

export default Missing