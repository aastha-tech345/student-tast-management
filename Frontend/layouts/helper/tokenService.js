export const AuthToken = () => {
  const accessToken = localStorage.getItem("access-token");
  return accessToken;
};
export const UserRole = () => {
  //   const role = localStorage.getItem("role") || "admin";
  const role = "admin";
  return role;
};
export const removeUserToken = () => {
  localStorage.removeItem("access-token");
  localStorage.removeItem("refresh-token");
  return true;
};
