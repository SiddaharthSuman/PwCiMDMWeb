import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RegistrationService {

  private readonly ERROR_ILLEGAL_CHARS = 'The username or password you have entered has illegal characters in it, please enter valid data!';
  private readonly ERROR_DEVICE_DOESNT_EXIST = 'Specified device does not exist!';
  private readonly ERROR_USERNAME_ALREADY_EXISTS = 'This username has already been taken!';
  private readonly ERROR_PROVIDE_ALL_DETAILS = 'Please provide all the neccessary details first!';

  private readonly METHOD_REGISTER_WEB_USER = 'registerWebUser';
  private readonly METHOD_DEVICE_REGISTRATION_STATUS = 'deviceRegistrationStatus';

  decryptorURL = 'https://pwcimdm-server.000webhostapp.com/decryptor.php';
  registerURL = 'https://pwcimdm-server.000webhostapp.com/registration.php';

  constructor(private http: HttpClient) { }

  registerUser(username: string, password: string) {
    const body = { 'method': this.METHOD_REGISTER_WEB_USER, 'data': { 'username': username, 'password': password } };
    console.log(JSON.stringify(body));
    return this.http.post(this.registerURL, JSON.stringify(body), { responseType: 'text' }).toPromise().then(response => {
        if (response === this.ERROR_ILLEGAL_CHARS) {
            return Promise.reject(this.ERROR_ILLEGAL_CHARS);
        } else if (response === this.ERROR_USERNAME_ALREADY_EXISTS) {
          return Promise.reject(this.ERROR_USERNAME_ALREADY_EXISTS);
        } else {
          return Promise.resolve(response);
        }
    }, error => {
        return Promise.reject(error);
    });
}
}
