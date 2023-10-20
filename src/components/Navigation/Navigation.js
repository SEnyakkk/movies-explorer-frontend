import BarLogin from "./BarLogin/BarLogin";
import BarProfile from "./BarProfile/BarProfile";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import "./Navigation.css"


function Navigation() {
  const location = useLocation();
  const [burgerActive, setBurgerActive] = useState(false);

  function handleBurger() {
    setBurgerActive((e) => !e)
  }

    function getType() {
    if (location.pathname === '/') {
      return "LoginBar"
    } else {
      return "ProfileBar"
    }
  }

  const barType = getType()

  return (
    <>
      {{
        LoginBar: <BarLogin />,
        ProfileBar: <>
          < BarProfile />
          <button type="button" className="header__burger-btn button" onClick={handleBurger} />
          <div className={`header__menu ${burgerActive ? " header__menu_active" : ""}`}>
            <div className="header__blur" onClick={handleBurger}>
              <div className="header__menu-content" onClick={(e) => e.stopPropagation()}>
                <button
                  type="button" className="header__close-button button" onClick={handleBurger}
                />
                <BarProfile burgerActive={burgerActive} />
              </div>
            </div>
          </div>
        </>
      }[barType]}
    </>
  )
}

export default Navigation