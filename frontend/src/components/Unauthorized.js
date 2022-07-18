import { useNavigate } from "react-router-dom"

const Unauthorized = () => {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    return (
        <section>
            <h1>No autorizado</h1>
            <br />
            <p>Tu no tienes acceso a esta pagina</p>
            <div className="flexGrow">
                <button onClick={goBack}>Ir atras</button>
            </div>
        </section>
    )
}

export default Unauthorized
