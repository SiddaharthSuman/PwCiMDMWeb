import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LoginService {

  private readonly ERROR_ILLEGAL_CHARS = 'The username or password you have entered has illegal characters in it, please enter valid data!';
  private readonly ERROR_USERNAME_PASSWORD_INCORRECT = 'The username or password you have entered is incorrect!';

  private readonly METHOD_LOGIN_WEB_USER = 'loginWebUser';
  private readonly METHOD_CHECK_SESSION_ID = 'checkSessionId';

  registerURL = 'https://pwcimdm-server.000webhostapp.com/registration.php';

  isLoggedIn: boolean;

  constructor(private http: HttpClient) { }

  loginUser(username: string, password: string): Promise<string> {
    const body = { 'method': this.METHOD_LOGIN_WEB_USER, 'data': { 'username': username, 'password': password } };
    return this.http.post(this.registerURL, JSON.stringify(body), { responseType: 'text' }).toPromise().then(response => {
      if (response === this.ERROR_ILLEGAL_CHARS) {
        return Promise.reject(this.ERROR_ILLEGAL_CHARS);
      } else if (response === this.ERROR_USERNAME_PASSWORD_INCORRECT) {
        return Promise.reject(this.ERROR_USERNAME_PASSWORD_INCORRECT);
      } else {
        return Promise.resolve(response);
      }
    }, error => {
      return Promise.reject(error);
    });
  }

  checkLoggedInUser(sessionId: string): Promise<boolean> {
    const body = { 'method': this.METHOD_CHECK_SESSION_ID, 'data': { 'sessionId': sessionId } };
    return this.http.post(this.registerURL, JSON.stringify(body), { responseType: 'text' }).toPromise().then(response => {
      if (response === 'true') {
        return Promise.resolve(true);
      } else if (response === 'false') {
        return Promise.resolve(false);
      } else {
        return Promise.resolve(false);
      }
    }, error => {
      return Promise.resolve(false);
    });
  }
}
