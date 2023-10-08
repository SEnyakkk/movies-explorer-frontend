import BarProfile from "../BarProfile/BarProfile";

function BarBurger({ onClose, active }) {
  return (
    <>
      <button type="button" className="header__burger-btn button" onClick={onClose} />
      <div className={`header__menu ${active ? " header__menu_active" : ""}`}>
        <div className="header__blur" onClick={onClose}>
          <div className="header__menu-content" onClick={(e) => e.stopPropagation()}>
            <button
              type="button" className="header__close-button button" onClick={onClose}
            />
            <BarProfile name={'burger'}/>
          </div>
        </div>
      </div>
    </>
  );
}

export default BarBurger;