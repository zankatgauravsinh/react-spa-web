import React, { useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";
import "./App.css";
import Routes from "./Routes";
import { AppContext } from "./libs/contextLib";
import { useHistory } from "react-router-dom";

function App() {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const history = useHistory();

  function handleLogout() {
    userHasAuthenticated(false);
    history.push("/login");
  }
  useEffect(() => {
    function onLoad() {
      // console.log('Onload ==', isAuthenticating);
      // try {
      //   await Auth.currentSession();
      //   userHasAuthenticated(true);
      // }
      // catch(e) {
      //   if (e !== 'No current user') {
      //     alert(e);
      //   }
      // }
    
      setIsAuthenticating(false);
    }
    onLoad();
  }, []);
  

  return (
    !isAuthenticating && (
    <div className="App container py-3">
      <Navbar collapseOnSelect bg="light" expand="md" className="mb-3">
        <LinkContainer to="/">
          <Navbar.Brand href="/" className="font-weight-bold text-muted">
          SPA
          </Navbar.Brand>
        </LinkContainer>

          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
          <Nav activeKey={window.location.pathname}>
          {isAuthenticated ? 
          (
            <>
                <LinkContainer to="/settings">
                  <Nav.Link>Settings</Nav.Link>
                </LinkContainer>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </> 
          )
          : (
              <>
                <LinkContainer to="/signup">
                  <Nav.Link>Signup</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      
      </Navbar>
      <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
        <Routes />
      </AppContext.Provider>
    </div>
    )
  );
}

export default App;