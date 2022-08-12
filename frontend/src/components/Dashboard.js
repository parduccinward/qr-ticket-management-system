import Navbar from "./Navbar";
import "./pages.css";

const Dashboard = () => {
    return (
        <div className="layout-container">
            <Navbar/>
            <section className="dashboard-message">
                <h1>Welcome back! 👋</h1>
            </section>
        </div>
    )
}

export default Dashboard
