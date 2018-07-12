import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReservationModel } from '../../models/reservation.model';
import { LoginUserModel } from '../../models/login-user.model';

@Injectable()
export class ReservationService {

  private readonly ERROR_ILLEGAL_CHARS = 'The username or password you have entered has illegal characters in it, please enter valid data!';
  private readonly ERROR_USERNAME_ALREADY_EXISTS = 'This username has already been taken!';

  private readonly METHOD_GET_ACTIVE_RESERVATIONS = 'getActiveWebReservations';
  private readonly METHOD_GET_NEW_CODE = 'getNewCode';

  reservationURL = 'https://pwcimdm-server.000webhostapp.com/admin/reservation.php';

  constructor(private http: HttpClient) { }

  checkActiveReservations(user: LoginUserModel): Promise<ReservationModel[]> {
    const body = { 'method': this.METHOD_GET_ACTIVE_RESERVATIONS, 'data': { 'id': user.id, 'linkId': user.linkedUserId } };
    return this.http.post<ReservationModel[]>(this.reservationURL, JSON.stringify(body)).toPromise();
  }

  demandNewCode(sessionId: string): Promise<string> {
    const body = { 'method': this.METHOD_GET_NEW_CODE, 'data': { 'sessionId': sessionId } };
    return this.http.post(this.reservationURL, JSON.stringify(body), { responseType: 'text' }).toPromise();
  }
}
