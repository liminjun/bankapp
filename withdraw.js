function Withdraw(){
  const [show, setShow] = React.useState(false);
  const [status, setStatus] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [balance, setBalance] = React.useState(0);
  const ctx = React.useContext(UserContext);
  
  React.useEffect(() => {
    ctx.users.forEach((user) => {
      if (user.name === ctx.loginid) {
        setShow(true);
        setBalance(user.balance);
        return;
      }
    });

    //validate button
    if (show) {
      if(amount) {
        document.getElementById('btn-withdraw').disabled = false;
      } else {
        document.getElementById('btn-withdraw').disabled = true;
      }
    }
  });

  function validateEmpty(field, label) {
    if (!field) {
      setStatus("Error: " + label);
      setTimeout(() => setStatus(''),3000);
      return false;
    }
    return true;
  }

  function validateNumber(field, label) {
    if (!/^\-?[0-9]+$/.test(field)) {
      setStatus("Error: " + label);
      setTimeout(() => {
        setStatus('');
        setAmount('');
      }, 3000);
      return false;
    }
    return true;
  }

  function validateNegative(field, label) {
    if (/^((-[0-9]+)|(0+))$/.test(field)) {
      setStatus("Error: " + label);
      setTimeout(() => {
        setStatus('');
        setAmount('');
      }, 3000);
      return false;
    }
    return true;
  }

  function validateBalance(field, label) {
    if (balance < parseInt(amount)) {
      setStatus("Error: " + label);
      setTimeout(() => {
        setStatus('');
        setAmount('');
      }, 3000);
      return false;
    }
    return true;
  }

  function handleWithdraw() {
    console.log(amount);
    let newBalance = 0;
    if (!validateEmpty(amount, "Amount is empty!")) return;
    if (!validateNumber(amount, "Amount is not a integer!")) return;
    if (!validateNegative(amount, "Amount is negative or zero!")) return;
    if (!validateBalance(amount, "Balance is not enough!")) return;
    let newUsers = ctx.users.map((user) => {
      if (user.name === ctx.loginid) {
        newBalance = user.balance - parseInt(amount);
        user.balance = newBalance;
      }
      return user;
    });
    ctx.users = newUsers;
    console.log(JSON.stringify(ctx.users));

    setBalance(newBalance);
    setStatus("You've successfully withdrew $" + amount);
    setTimeout(() => setStatus(''), 3000);
    setAmount("");
  }
  function goLogin() {
    window.location.href = "#/login";
  }
  return (
    <Card
      bgcolor="primary"
      header="Withdraw"
      status={status}
      body={
        show ? (
          <>
            <h3>Balance: ${balance}</h3>
            <br />
            Amount
            <br />
            <input
              type="input"
              className="form-control"
              id="amount"
              placeholder="Enter Amount"
              value={amount}
              onChange={(e) => setAmount(e.currentTarget.value)}
            />
            <br />
            <button
              id="btn-withdraw"
              type="submit"
              className="btn btn-dark"
              onClick={handleWithdraw}
            >
              Withdraw
            </button>
          </>
        ) : (
          <>
            <h5>Please login first!</h5>
            <button className="btn btn-dark" onClick={goLogin}>Login</button>
          </>
        )
      }
    />
  );
}