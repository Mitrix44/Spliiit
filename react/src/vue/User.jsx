function User() {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      Bienvenue {user.numero.value}
    </div>
  );
}

export default User;