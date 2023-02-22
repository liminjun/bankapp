function Login() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const ctx = React.useContext(UserContext);

  React.useEffect(() => {
  
    
    if (ctx.loginid) {
      setShow(false);
      return;
    }

    //validate button
    if (show) {
      if(name && password) {
        document.getElementById('btn-login').disabled = false;
      } else {
        document.getElementById('btn-login').disabled = true;
      }
    }
  });
  function validateName(username) {
    if(username) {
      if(username.length < 2 || username.length > 20) {
        setStatus("Error: Name is less than 2 characters or more than 20 characters!");
        setTimeout(() => setStatus(''),3000);
        return false;
      }
      return true;
    } else {
      setStatus("Error: Name cannot be empty!");
      setTimeout(() => setStatus(''),3000);
      return false;
    }
  }
  function validatePassword(password) {
    if(password) {
      if(password.length < 6 || password.length > 20) {
        setStatus("Error: Password is less than 8 characters or more than 20 characters!!");
        setTimeout(() => setStatus(''),3000);
        return false;
      }
      return true;
    } else {
      setStatus("Error: Password cannot be empty!");
      setTimeout(() => setStatus(''),3000);
      return false;
    }
  }


  function handleLogin() {
    console.log(name, password);
    if (!validateName(name)) return;
    if (!validatePassword(password)) return;



    ctx.users.forEach((user) => {
      if (name === user.name && password === user.password) {
        ctx.loginid = name;
        return;
      }
    });

    if (ctx.loginid) {
      setShow(false);
    } else {
      setStatus("Invalid account!");
      setTimeout(() => setStatus(''), 3000);
      setName("");
      setPassword("");
    }
  }

  function handleLogout() {
    ctx.loginid = "";
    setShow(true);
  }

  return (
    <Card
      bgcolor="primary"
      header="Login"
      status={status}
      body={
        show ? (
          <>
            Name
            <br />
            <input
              type="input"
              className="form-control"
              id="name"
              placeholder="Enter ame"
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
            />
            <br />
            Password
            <br />
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
            <br />
            <button
              id="btn-login"
              type="submit"
              className="btn btn-dark"
              onClick={handleLogin}
            >
              Login
            </button>
          </>
        ) : (
          <>
            <h5>Welcome {ctx.loginid}</h5>
            <p>You've successfully logged in.</p>
            <button id="btn-logout" type="submit" className="btn btn-primary" onClick={handleLogout}>
              Logout
            </button>
          </>
        )
      }
    />
  );
}