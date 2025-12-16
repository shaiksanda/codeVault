import Header from "../Header"
import { Link } from "react-router-dom"
import "./index.css"

const Home = () => {
    return (
        <div>
            <Header />
            <main className="hero">
                <div>
                    <img className="hero-image" src="https://res.cloudinary.com/dq4yjeejc/image/upload/v1765855733/dev_space_ia4vit.webp" alt="" />
                </div>
                <div className="hero-content">
                    <h1 className="heading">Your Personal Code Vault</h1>
                    <p className="content">Store, organize, and access all your code snippets in one secure place. Boost your productivity and never lose your work again.</p>
                    <div className="button-center">
                        <Link to="/login"><button className="button hero-button">Go!</button></Link>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Home
