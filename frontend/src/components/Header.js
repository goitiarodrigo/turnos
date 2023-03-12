import { connect } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import userActions from "../redux/actions/userActions";

const Header = ({logOut,valid,user}) => {
  const outHandler = () => {
    logOut();
  };

   return (
      <header>
         <div className="navbar">
            <img src="/assets/logo.png" alt="" />
            <ul>
               <li>
                  <NavLink exact to="/">
                     <p>HOME</p>
                  </NavLink>
               </li>
               <li>
                  <NavLink exact to="/staff">
                     <p>STAFF</p>
                  </NavLink>
               </li>
               {!valid && (
                  <li>
                     <NavLink to="/signup">
                        <p>CREAR CUENTA</p>
                     </NavLink>
                  </li>
               )}
               {!valid && (
                  <li>
                     <NavLink to="/signin">
                        <p>INGRESAR</p>
                     </NavLink>
                  </li>
               )}
               {valid && (
                  <li>
                     <NavLink to="/profile">
                        <p>PERFIL</p>
                     </NavLink>
                  </li>
               )}
               <li>
                  {valid && (
                     <Link onClick={outHandler} to="/">
                        <p>SALIR</p>
                     </Link>
                  )}
               </li>
            </ul>
         </div>
         <div className="headerRigth">
         {((valid && !user.doc) || !valid)  &&
            <button>
               <Link to={valid ? "/appointment" : "/signin"}>
                  SOLICITAR TURNO
               </Link>
            </button>
            }
            {valid && <h4 className="nameHeader">{user.name}</h4>}
            <NavLink to="/profile">
               <div
                  className="logoUser"
                  style={{
                     backgroundImage: `url('${
                        valid
                           ? user.src
                           : "https://i.postimg.cc/DzGJCrT8/customer-icon-23.png"
                     }')`,
                  }}
               ></div>
            </NavLink>
         </div>
      </header>
   )
}
const mapStateToProps = (state) => {
  return {
    valid: state.users.token,
    user: state.users.dataUser,
  };
};

const mapDispatchToProps = {
  logOut: userActions.logOut,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
