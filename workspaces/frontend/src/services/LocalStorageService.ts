import { Subject } from 'rxjs';

const subject = new Subject<number>();

export class LocalStorageService {
  static checkIfUserIsInLocalStorage() {
    const localStorageUser = localStorage.getItem('userLogged');
    return localStorageUser ? true : false;
  }

  static setUserInLocalStorage(email: string) {
    localStorage.setItem('userLogged', email);
    subject.next(1);
  }

  static removeUserFromLocalStorage() {
    localStorage.removeItem('userLogged');
  }

  static getUserFromLocalStorage() {
    return localStorage.getItem('userLogged');
  }

  static subscribeToChanges() {
    return subject;
  }
}
//subscribe to changes, will return the subject
