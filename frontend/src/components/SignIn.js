import { GoogleLogin} from 'react-google-login'
import { useState } from "react"
import { connect } from "react-redux"
import userActions from "../redux/actions/userActions"
import { Link } from "react-router-dom"
import ReactTooltip from "react-tooltip"

const SignIn = ({ logIn }) => {
   const [valueIn, setValueIn] = useState("pat")
   const [errors, setErrors] = useState("")
   const [error, setError] = useState({ errorUno: false, errorDos: false })
   const [userLog, setUserLog] = useState({
      data: { mail: "" },
      password: "",
      google: false,
   })

const userLogin = (e) => {
      setError({ errorUno: false })
      if (e.target.name === "data") {
         setUserLog({ ...userLog, data: { mail: e.target.value } })
      } else {
         setUserLog({ ...userLog, [e.target.name]: e.target.value })
      }
   }
const responseGoogle = (res)=>{
   let newUserWithGoogle ={
      data: { mail: res.profileObj.email },
         password: res.profileObj.googleId,
         flagGoogle: true
   }
   logIn(newUserWithGoogle, validUser)
   .then(res=>{
      if(!res.success){
         setErrors("Debe estar registrado con Google para utilizar este botón")
         setError({ errorDos: true })
      }
   })
}

const validInputHandler = (e)=>{
   setError({ errorUno: false })
      setValueIn(e.target.value)
}

const submitUserLog = ()=>{
   if(!userLog.password.length || !userLog.data.mail.length){
      setError({ errorUno: true })
      setErrors("Todos los campos deben estar completos")
   }
   if(!error.errorUno){
      logIn(userLog, validUser)
      .then(res=>{
         if(!res.success){
            setErrors("Error de autenticación. Por favor, verificar.")
            setError({ errorUno: true })
         }
      })
   }
}
const handleKeyPress = (e) => {
   if (e.key === "Enter") {
      submitUserLog()
   }
}

let validUser = valueIn === "prof" ? "profesional" : "comun";

return(
   <>
   {valueIn === "" && <ReactTooltip id="button_Google" place="right" effect="solid" className={ !errors ? 'notError' : "toolTip"} arrowColor='transparent'> Debe seleccionar tipo de usuario </ReactTooltip>}
   <ReactTooltip id="buttonError" place="top" effect="solid" className={ !errors ? 'notError' : "toolTip"} arrowColor='transparent'> {errors} </ReactTooltip>
   <div className="container">
      <div className="grayContainer">
         <img src="/assets/login.png" alt="" />
          <h3>Por favor, seleccioná si sos paciente o profesional</h3>
          <div className="radio">
             <div>
                <p>Paciente </p>
                <input
                onClick={validInputHandler}
                type="radio"
                name="buttonRol"
                value="pat"
                defaultChecked
              />
             </div>
             <div>
                <p>Profesional </p>
                <input
                onClick={validInputHandler}
                type="radio"
                name="buttonRol"
                value="prof"
              />
             </div>
          </div>
          <div className="inputs">
            <div className="forError">
            <input
              type="email"
              placeholder="E-mail"
              name="data"
              defaultValue={userLog.data.mail}
              onChange={userLogin}
            />
            <div data-tip data-for="buttonError"  className='cross2'>
            {(error.errorUno || error.errorDos) && <img  className='cross2' src="/assets/cross2.png" alt="..."/>}
            </div>
            </div>
            <div className="forError">
            <input
              type="password"
              placeholder="Contraseña"
              name="password"
              defaultValue={userLog.password}
              onChange={userLogin}
              onKeyPress={handleKeyPress}
            />
            <div data-tip data-for="buttonError"  className='cross2'>
            {(error.errorUno || error.errorDos) && <img  className='cross2' src="/assets/cross2.png" alt="..."/>}
            </div>
            </div>
          </div>
         <button id="buttonSign" onClick={submitUserLog}>LOGIN</button>

         {valueIn === "pat" && <div >
            <div>
              <GoogleLogin 
                clientId="253529321992-379gqmcfo48ljen82l34v8fj58gvgk6v.apps.googleusercontent.com"
                buttonText="Ingresar con Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={"single_host_origin"}
                
              />
            </div>
          </div>}
               <p>
                  ¿No tenés cuenta? <Link to="/signup">¡Creala aquí!</Link>
               </p>

      </div>
   </div>
   </>
)

}

const mapDispatchToProps = {
   logIn: userActions.logIn,
}

export default connect(null, mapDispatchToProps)(SignIn)