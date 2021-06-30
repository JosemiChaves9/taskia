export class LocalStorageService {
  static checkIfUserIsInLocalStorage() {
    const localStorageUser = localStorage.getItem('userLogged');
    return localStorageUser ? true : false;
  }

  static setUserInLocalStorage(email: string) {
    localStorage.setItem('userLogged', email);
  }

  static removeUserFromLocalStorage() {
    localStorage.removeItem('userLogged');
  }

  static getUserFromLocalStorage() {
    return localStorage.getItem('userLogged');
  }
}
