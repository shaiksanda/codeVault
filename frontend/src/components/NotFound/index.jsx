import { useNavigate } from "react-router-dom";
import './index.css'

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="not-found-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/not-found-blog-img.png"
        alt="not found"
        className="not-found-img"
      />
      <h1 className="error">Not Found</h1>
      <p className="error">Your Request Page is not Found</p>
      <button className="button go-back-button" onClick={() => navigate(-1)}>Go Back</button>
    </div>
  )
}

export default NotFound