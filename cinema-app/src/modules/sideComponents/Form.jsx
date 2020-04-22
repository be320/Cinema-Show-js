import React, { useState, useEffect, useRef } from "react";

import Logo from "../../assets/images/auth-logo.PNG";
import UserIcon from "@material-ui/icons/Person";
import EmailIcon from "@material-ui/icons/Email";
import PasswordIcon from "@material-ui/icons/VpnKey";
import { SocialIcon } from "react-social-icons";
import { connect } from 'react-redux';
import { addToken, addUser} from '../../redux';
const axios = require('axios')




const LoginForm = ({handleEmail,handlePassword,handleShow,login}) => 
{
  return(
    <div id="loginForm">
    <div id="login-form-body">
      <div className="text-fields">
        <EmailIcon
          style={{
            color: "white",
            fontSize: "25px",
            marginRight: "10px"
          }}
        />

        <input
          type="email"
          placeholder="Email"
          id="auth-txt-email"
          autoComplete="off"
          name="email"
          onChange={handleEmail}
          required
        />
      </div>
      <div className="text-fields">
      <PasswordIcon
          style={{
            color: "white",
            fontSize: "25px",
            marginRight: "10px"
          }}
        />
        <input
          type="password"
          placeholder="Password"
          id="auth-txt-password"
          autoComplete="off"
          name="password"
          onChange={handlePassword}
          required
        />
      </div>
      <div id="forgot-pass">Forgot Password ?</div>
      <input type="submit" value="Login" id="login-button" onClick={login} />
      <div className="or">OR</div>
      <div className="social">
        <div className="facebook">
          <SocialIcon url="http://facebook.com/jaketrent" />
        </div>
        <div className="google">
          <SocialIcon url="http://google.com/jaketrent" />
        </div>
      </div>
      <div className="register-div">
        <p>Don't have Account ?</p>
        <h3
          className="register-button"
          id="switchToSignUp"
          onClick={() => handleShow(false)}
        >
          Sign Up
        </h3>
      </div>
    </div>
  </div>
  );
}


const SignUpForm = ({handleEmail,handlePassword,handleShow,handleName,signup}) => 
{
  return(
    <div id="NewUserForm">
    <div id="signup-form-body">
      <div className="text-fields">
      <UserIcon
          style={{
            color: "white",
            fontSize: "25px",
            marginRight: "10px"
          }}
        />
        <input
          type="text"
          placeholder="Name"
          id="auth-txt-name"
          autoComplete="off"
          name="name"
          onChange={handleName}
          required
        />
      </div>
      <div className="text-fields">
      <EmailIcon
          style={{
            color: "white",
            fontSize: "25px",
            marginRight: "10px"
          }}
        />
        <input
          type="email"
          placeholder="Email"
          id="auth-txt-email"
          autoComplete="off"
          name="email"
          onChange={handleEmail}
          required
        />
      </div>
      <div className="text-fields">
      <PasswordIcon
          style={{
            color: "white",
            fontSize: "25px",
            marginRight: "10px"
          }}
        />
        <input
          type="password"
          placeholder="Password"
          id="auth-txt-password"
          autoComplete="off"
          name="password"
          onChange={handlePassword}
          required
        />
      </div>
      <input
        type="submit"
        value="Sign Up"
        id="signup-button"
        name="submit"
        onClick={signup}
      />
      <div className="or">OR</div>
      <div className="social">
        <div className="facebook">
        <SocialIcon url="http://facebook.com/jaketrent" />
        </div>
        <div className="google">
        <SocialIcon url="http://google.com/jaketrent" />
        </div>
      </div>
      <div className="register-div">
        <p>Already have account ?</p>
        <h3
          className="register-button"
          id="switchToLogin"
          onClick={() => handleShow(true)}
        >
          Login
        </h3>
      </div>
    </div>
  </div>
  );
}



const Form = (props) => {
  const node = useRef();
  const [showLogin, setShowLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  

  const handleShow = value => {
    setShowLogin(value);
  };

  const handleName = e => {
    setName(e.target.value);
  };

  const getUser = async (id) => {
    const user = await axios.get('http://localhost:8080/user/'+id);
    props.addUser(user.data.user)
  }

  const login = () => 
  {
    
    const oldUser = 
    {
      email: email,
      password: password
    }

    let errors = [];

    axios.post(
      'http://localhost:8080/login',oldUser
    ).then( response => {
      props.addToken(response.data.token)
      getUser(response.data.userId);
      props.handleForm(false);
    }).catch( error => {
      errors.push(error.response.data)
      errors.map((e) => {
        console.log(e.msg);
      })
      props.handleForm(false);
      props.handleError(true,errors);
    });
  
  }

  const signup = () => 
  {
    const newUser = 
    {
      name: name,
      email: email,
      password: password
    }

    axios.post(
      'http://localhost:8080/signup',newUser
    ).then( response => {
      props.addToken(response.data.token)
      getUser(response.data.userId);
      props.handleForm(false);
    }).catch( error => {
      const errors = error.response.data.error.data;
      errors.map((e) => {
        console.log(e.msg);
      })
      props.handleForm(false);
      props.handleError(true,errors);
    });

  }

 
  const handleEmail = e => {
    setEmail(e.target.value);
  };
  const handlePassword = e => {
    setPassword(e.target.value);
  };

  const closeAction = e => {
    if (!node.current.contains(e.target)) {
      props.handleForm(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", closeAction);

    return () => {
      document.removeEventListener("mousedown", closeAction);
    };
  }, []);


  return (
    <div id="form-container">
      <div className="form" ref={node}>
        <img
          src={Logo}
          alt="logo"
          width="200px"
          height="200px"
          className="logo"
        />
        {showLogin===true && <LoginForm handleEmail={handleEmail} handlePassword={handlePassword} handleShow={handleShow} login={login} /> }

        {showLogin===false && <SignUpForm handleName={handleName} handleEmail={handleEmail} handlePassword={handlePassword} handleShow={handleShow} signup={signup} /> }

      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  content: state.contentReducer.content,
  token: state.tokenReducer.token,
  user: state.userReducer.user
})

const mapDispatchToProps = {
    addToken,
    addUser
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Form);

