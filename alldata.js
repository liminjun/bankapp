let ctx = []
const showUsers = ctx.map((user, index) => {
    return (
      <div key={index}>
        <h5>{user.name}</h5>
        <p>{user.email}</p>
        <p>{user.password}</p>
        <p>{user.balance}</p>
      </div>
    );
  })

function AllData(){
  ctx = React.useContext(UserContext);
  return (
    <>
    <h5>All Data in Store</h5>
    {/* {JSON.stringify(ctx)}<br/> */}
    {showUsers}
    </>
  );
}
