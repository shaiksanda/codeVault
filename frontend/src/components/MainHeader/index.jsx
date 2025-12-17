import { Link } from "react-router-dom"
import CreateSnippetPopup from "../CreateSnippetPopup"

const MainHeader = () => {
  return (
    <header className='flex-header-wrapper'>
      <div>
        <Link to="/code-vault"><img className='logo-header' src="https://res.cloudinary.com/dq4yjeejc/image/upload/v1765696484/code_vault_1_skzlz3.webp" alt="logo" /></Link>
      </div>
      <CreateSnippetPopup />
      <button className='button'>Logout</button>
    </header>
  )
}

export default MainHeader
