import { Link } from "react-router-dom";
import headerLogo from "../../images/logo.svg";
import "./Logo.css"

function Logo() {
  return (
    <Link to="/" className='logo link'>
      <img src={headerLogo} alt="Лого" className="logo__img" />
    </Link>
  )
}

export default Logo