try {
  const user = await loginService.login({ username, password });
  setUser(user);
  setUsername("");
  setPassword("");
} catch (exception) {
  setErrorMessage("Wrong credentials");
  setTimeout(() => {
    setErrorMessage(null);
  }, 5000);
}
