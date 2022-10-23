import { Link } from 'react-router-dom';
import { useAuthLogin } from "../Context/AuthProvider";
import imageLogo from '../assets/images/koala_tree.png';
import '../StylesComponents/NavBar.scss';


export const NavBar:React.FC = () => {
  const { switchLogin, usrEmail, toggle, eraseAll } = useAuthLogin();

  const handleChange = () => {
    toggle()
    eraseAll()
  };

  return (
    <div className="navbar--div">

      <div className="subnavbar">

        <div className="nav--div">
          <img
            className="img--tag"
            width="60px" height="60px"
            src={imageLogo} alt="logo_koala"
          />
        </div>

        <nav className="middlenav--div">
          <li>
            <Link className="tag--link" to='/' >
              Login
            </Link>
          </li>
          <li>
            <Link className="tag--link" to='/PhoneContact' >
              Phone Contacts
            </Link>
          </li>
          <li>
            <Link className="tag--link" to='/MeetingPoint' >
              Meeting Point
            </Link>
          </li>
        </nav>

        {usrEmail ? (
          <span 
            style={{
              margin: "0px 10px",
              padding: "10px",
              fontFamily: "Consolas",
              textShadow: "1px 1px 1px purple",
              background: "steelblue",
              borderRadius: "10px",
              color: "white"
            }}
          >
            {usrEmail}
          </span>

          ) : (
          
          <span
            style={{
              margin: "0px 20px",
              padding: "10px",
              background: "red",
              borderRadius: "10px",
              color: "white"
            }}> &#8614; </span>
          )}

        {switchLogin ? (
          <Link
            to="/"
            style={{
              marginRight: "20px",
              width: "50px", 
              height: "50px", 
              position: "relative", 
              display: "flex", 
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "Consolas",
              fontSize: "0.8rem",
              background: "lightblue",
              textDecoration: "none",
              color: "black", 
              border: "1px solid grey",
              borderRadius: "50%"
            }}

          >
            Login
          </Link>

          ) : (
          
          <Link
            to="/"
            onClick={() => handleChange()}
            style={{
              marginRight: "20px",
              width: "50px", 
              height: "50px", 
              position: "relative", 
              display: "flex", 
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "Consolas",
              fontSize: "0.8rem",
              textDecoration: "none",
              color: "white",
              background: "royalblue",
              border: "1px solid royalblue",
              borderRadius: "50%",
            }}

          >
            Logout
          </Link>
        )}
      </div>
    </div>
  )
}