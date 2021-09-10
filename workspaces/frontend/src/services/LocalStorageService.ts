import { Subject } from 'rxjs';

const subject = new Subject<number>();

export class LocalStorageService {
  static checkIfUserIdIsInLocalStorage() {
    const localStorageUser = localStorage.getItem('userId');
    return localStorageUser ? true : false;
  }

  static setUserIdInLocalStorage(userId: string) {
    localStorage.setItem('userId', userId);
    subject.next(1);
  }

  static removeUserIdFromLocalStorage() {
    localStorage.removeItem('userId');
    subject.next(1);
  }

  static getUserIdFromLocalStorage() {
    return localStorage.getItem('userId');
  }

  static subscribeToChanges() {
    return subject;
  }

  static setProjectIdInLocalStorage(projectId: string) {
    localStorage.setItem('projectId', projectId);
    subject.next(1);
  }

  static getProjectIdFromLocalStorage() {
    return localStorage.getItem('projectId');
  }
}
//subscribe to changes, will return the subject
