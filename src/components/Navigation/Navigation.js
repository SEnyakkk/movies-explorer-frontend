import BarLogin from "./BarLogin/BarLogin";
import { useLocation } from "react-router-dom";
import BarProfile from "./BarProfile/BarProfile";
import { useContext, useState } from "react";
import "./Navigation.css"
import BarBurger from "./BarBurger/BarBurger";
import {CurrentUserContext} from "../../context/CurrentUserContext";

function Navigation() {
  const location = useLocation();
  const user = useContext(CurrentUserContext);

  const [burgerActive, setBurgerActive] = useState(false);

  function handleBurger() {
    setBurgerActive((show) => !show)
  }

  function getType() {
    if (location.pathname === '/' && !user.isLoggedIn ) {
      return "BarLogin"
    } else {
      return "BarProfile"
    }
  }

  const navType = getType()

  return (
    <>
      {{
        BarLogin: <BarLogin />,
        BarProfile: <>
          <BarProfile />
          <BarBurger onClose={handleBurger} active={burgerActive} />
        </>
      }[navType]}
    </>
  )
}

export default Navigation