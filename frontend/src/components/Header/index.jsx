import { Link } from "react-router-dom"
import "./index.css"

const Header = () => {
    return (
        <header className="flex-header-wrapper">
            <div>
                <img className="logo-header" src="https://res.cloudinary.com/dq4yjeejc/image/upload/v1765697042/code_vault_3_i5doco.webp" alt="logo" />
            </div>

            <Link to="/login"><button className="button login-button">Login</button></Link>
            <Link to="/signup"><button className="button signup-button">Singup</button></Link>

        </header>
    )
}

export default Header
