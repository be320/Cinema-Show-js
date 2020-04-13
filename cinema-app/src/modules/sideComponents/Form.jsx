import React , {useState,useEffect, useRef} from 'react';

const Form = ({handleForm}) => 
{
const node = useRef();    
const [showLogin,setShowLogin] = useState(true);

const [newUser,setNewUser] = useState({});

const handleShow = (value) => 
{
    setShowLogin(value);
}

const closeAction = e => 
{
    if(!node.current.contains(e.target)){
       handleForm(false);
    }
}

useEffect(()=>{
    document.addEventListener("mousedown", closeAction);

    return () => {
        document.removeEventListener("mousedown",closeAction);
    }

},[]);



const DrawForm = () => 
{
    if(showLogin===true)
    {
        return(
            <div id= "loginForm">
            <div id="login-form-body">
                <div className="text-fields">
                    <i className="fa fa-envelope" style={{color:'white',fontSize: '25px',marginRight: '10px'}}></i>
                    <input type="email" placeholder="Email" id="auth-txt-email" autoComplete="off"
                    name="email"
                    required />
                </div>
                <div className="text-fields">
                    <i className="fa fa-key" style={{color:'white',fontSize: '25px',marginRight: '10px'}}></i>
                    <input type="password" placeholder="Password" id="auth-txt-password" autoComplete="off"
                    name="password"
                    required />
                </div>
                <div id="forgot-pass">
                    Forgot Password ?
                </div>
                    <input type="submit" value="Login" id="login-button" />
                <div className="or">
                    OR
                </div>
                <div className="social">
                    <div className="facebook">
                        <i className="fa fa-facebook" style={{color:'white',backgroundColor: '#3b5998',fontSize: '20px'}}></i>
                    </div>
                    <div className="google">
                        <i className="fa fa-google" style={{color:'#d52121',backgroundColor: 'white',fontSize: '20px'}}></i>
                    </div>
                </div>
                <div className="register-div">
                    <p>Don't have Account ?</p>
                    <h3 className="register-button" id="switchToSignUp" onClick={()=>handleShow(false)} >Sign Up</h3>
                </div>
            </div>
        </div>
        );
    }
    else{
        return(
            <div id="NewUserForm" >
            <div id="signup-form-body">
                <div className="text-fields">
                    <i className="fa fa-user" style={{color:'white',fontSize: '25px',marginRight: '10px'}}></i>
                    <input type="text" placeholder="Name" id="auth-txt-name" autoComplete="off" name="name" required />
                </div>
                <div className="text-fields">
                    <i className="fa fa-envelope" style={{color:'white',fontSize: '25px',marginRight: '10px'}}></i>
                    <input type="email" placeholder="Email" id="auth-txt-email" autoComplete="off" name="email" required />
                </div>
                <div className="text-fields">
                    <i className="fa fa-key" style={{color:'white',fontSize: '25px',marginRight: '10px'}}></i>
                    <input type="password" placeholder="Password" id="auth-txt-password" autoComplete="off" name="password" required />
                </div>
                    <input type="submit" value="Sign Up" id="signup-button" name="submit" />
                <div className="or">
                    OR
                </div>
                <div className="social">
                    <div className="facebook">
                        <i className="fa fa-facebook" style={{color:'white',backgroundColor: '#3b5998',fontSize: '20px'}}></i>
                    </div>
                    <div className="google">
                        <i className="fa fa-google" style={{color:'#d52121',backgroundColor: 'white',fontSize: '20px'}}></i>
                    </div>
                </div>
                <div className="register-div">
                    <p>Already have account ?</p>
                    <h3 className="register-button" id="switchToLogin"  onClick={()=>handleShow(true)} >Login</h3>
                </div>
            </div>

        </div>
        );
    }
}

    return(
        <div id="form-container" >
    <div className="form" ref={node}>
        <img src="./images/auth-logo.PNG" alt="logo" width="200px" height="200px" className="logo" />
        <DrawForm />
    </div>
</div>
    );
}

export default Form;