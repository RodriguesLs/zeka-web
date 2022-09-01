export default function signOutToAxios() {
  localStorage.removeItem('@Zeka:token');
  localStorage.removeItem('@Zeka:refreshToken');

  location.href = '/';
}
