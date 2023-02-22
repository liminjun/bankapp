
function AllData(){
  const ctx = React.useContext(UserContext);
  const userData = ctx.users
  const showUsers = userData.map((user, index) => {
    return (
      <tr key={index}>
        <th scope="row">{1+index}</th>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.password}</td>
        <td>{user.balance}</td>
      </tr>
    );
  });

  return (
    <>
    <h5>All Data in Store</h5>
    {/* {JSON.stringify(ctx)}<br/> */}
    <table className="table">
      <thead>
        <tr>
          <td scope="col">#</td>
          <td scope="col">username</td>
          <td scope="col">email</td>
          <td scope="col">password</td>
          <td scope="col">balance</td>
        </tr>
      </thead>
      <tbody>
      {showUsers}
      </tbody>
    </table>
    
    </>
  );
}
