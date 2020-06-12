import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { AppContext } from "./libs/contextLib";
import { Auth } from "aws-amplify";
import { onError } from "./libs/errorLib";
import logo from "./logo.png"


import Routes from "./Routes";
import "./App.css";


function App() {

  const history = useHistory();
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [userTracks, setUserTracks] = useState();

  /* Check if user is Logged in */
  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    }
    catch (e) {
      if (e !== 'No current user') {
        if(e){
          onError(e);
        }
      }
    }

    setIsAuthenticating(false);
  }

  /* Logout */
  async function handleLogout() {
    await Auth.signOut();
    userHasAuthenticated(false);
    history.push("/login");
  }

  /* Device screen sizes for styling and UI bugs */
const innerWidth = window.innerWidth;
const innerHeight = window.innerHeight;

/*Return*/
  return (
  (  !isAuthenticating &&
    <div className="App container" style={{width: innerWidth, height: innerHeight, background: "hsl(0, 0%, 97%)"}}>
      <Navbar fluid collapseOnSelect>
        <Navbar.Header style={{display: "flex", alignItems: "baseline"}}>
            <Link to="/"><img style={{height: "25px", width: "145px", marginTop: "13px"}} src={logo} /> </Link>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            {isAuthenticated
              ? <> 
              <NavItem ><Link style={{color: "coral"}} to={"/"}>Your Tracks</Link></NavItem>
              <NavItem onClick={handleLogout}>Logout</NavItem>
              </>
              : <>
                <LinkContainer to="/signup">
                  <NavItem>Signup</NavItem>
                </LinkContainer>
                <LinkContainer to="/login">
                  <NavItem>Login</NavItem>
                </LinkContainer>
              </>
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <AppContext.Provider
        value={{ isAuthenticated, userHasAuthenticated, userTracks, setUserTracks }}
      >
        <Routes />
      </AppContext.Provider>
    </div>)
  );
}

export default App;