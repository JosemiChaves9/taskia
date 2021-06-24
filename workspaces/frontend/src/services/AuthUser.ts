export class AuthUser {
  static checkIfUserIsInLocalStorage() {
    return localStorage.getItem('userLogged') ? true : false;
  }
}
