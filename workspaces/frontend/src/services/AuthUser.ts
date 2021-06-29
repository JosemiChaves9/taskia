export class AuthUser {
  static checkIfUserIsInLocalStorage() {
    const localStorageUser = localStorage.getItem('userLogged');
    return localStorageUser ? true : false;
  }
}
