import React, { useState, useEffect, useRef } from 'react';
import SignUp from "../Components/SignUp";
import { useAuthLogin } from "../Context/AuthProvider";
import { app } from "../api/axiosconfig";
import '../StylesPages/Login.scss';


export const Login = () => {

  const LOGIN_URL = '/login';
  
  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLInputElement>(null);

  const [password, setPassword] = useState<string>("");
  const [errMsg, setErrMsg] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [switchLoginSign, setSwitchLogSign] = useState<boolean>(false);

  const { toggle, switchLogin, email, setEmail, setUsrEmail,
    setAuth } = useAuthLogin();

  //console.log(errRef)
  console.log("errMsg: ", errMsg);

  useEffect(() => {
    userRef.current?.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleLogSign = () => {
    setSwitchLogSign(!switchLoginSign);
  }

  const emailLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const passwordLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await app.post(LOGIN_URL, JSON.stringify({email, password}),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: false
        }
      )
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      console.log(response?.data);
      setAuth({ email, password, roles, accessToken});
      setUsrEmail(email);
      setEmail('');
      setPassword('');
      toggle();
      setSuccess(true);
      console.log("login ok")
      } catch (error: any) {
        if (!error?.response) {
          console.error("Hello error");
          setErrMsg("No response from server");
        } else if (error.response?.message === 400) {
          setErrMsg('Wrong password');
          console.log(error.response);
          console.log(error.response.headers);
          console.log(error.response.data);
          console.log(error.response.status);
        } else if (error.response?.status === 404) {
          console.log('Error 404', error.response?.status);
          setErrMsg('Error 404');
        } else {
          setErrMsg('Login Failed...');
        }
        errRef.current?.focus();
      };
  };

  return (
    <div className="mainlogin">

      <div className="anima-intro">
      </div>


      <div className="login">

        <h1>Wellcome !</h1>

        {switchLoginSign ? (

          <SignUp />

        ) : (

        <div className="frame">
          <form onSubmit={(e) => handleSubmit(e)}>

              <h2 className="login--h2">Login</h2>

              <div className="subframe">
                <label>User email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => emailLogin(event)}
                  autoComplete="off"
                  required
                  placeholder="email" 
                  className="login--input"
                />
              </div>

              <div className="subframe">
                <label>Password:</label>
                <input
                  type="password"
                  value={password}
                  onChange={passwordLogin}
                  required
                  placeholder="Password" 
                  className="login--input"
                />
              </div>

              <div className="divbtn--login">
                <button type="submit" className="btn--login">
                  Sign In
                </button>
              </div>

          </form>

          <div>
            {success ? (
              <div className="loginok">
                <p>Login Successfully !</p>
              </div>
              ) : (
              <div className="notification">
                <p>Not LoggedIn</p>
              </div>
            )}

            {success && !switchLogin ? (
              <div>
                <h5
                  style={{
                    width: "20%",
                    margin: "auto",
                    marginTop: "20px",
                    padding: "10px",
                    textAlign: "center",
                    borderRadius: "15px",
                    background: "green",
                    color: "white"
                  }}
                >
                  Success Login !
                </h5>

              </div>

              ) : (
              <>
                <div className="overflow--div">
                  {errMsg && (
                    <div style={{textAlign: "center"}}>
                      <h4>Wrong Password !</h4>
                    </div>
                    )}
                </div>
                <h5
                  ref={errRef}
                  style={{
                    width: "20%",
                    margin: "auto",
                    marginTop: "20px",
                    padding: "10px",
                    textAlign: "center",
                    borderRadius: "15px",
                    background: "lightpink",
                    color: errMsg ? 'red' : 'white'
                  }}
                  aria-live="assertive">
                    {errMsg ? `${errMsg}` : "Not logged"}
                </h5>
              </>
            )}
            
            <div className="div--subscribe--btn">
              <button className="subscribe--btn" onClick={handleLogSign}>
                Subscribe
              </button>
            </div>

          </div>
        </div>
        )}
      </div>
    </div>
  )
}