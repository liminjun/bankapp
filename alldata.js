
function AllData(){
  const ctx = React.useContext(UserContext);
  const userData = ctx.users
  const showUsers = userData.map((user, index) => {
    return (
      <div key={index}>
        <h5>{user.name} {user.email} {user.password} {user.balance}</h5>
      </div>
    );
  });

  return (
    <>
    <h5>All Data in Store</h5>
    {/* {JSON.stringify(ctx)}<br/> */}
    {showUsers}
    </>
  );
}
