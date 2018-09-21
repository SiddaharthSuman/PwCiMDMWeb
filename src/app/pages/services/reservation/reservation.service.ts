import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReservationModel } from '../../models/reservation.model';
import { LoginUserModel } from '../../models/login-user.model';
import { DeviceModel } from '../../models/device.model';
import { environment } from '../../../../environments/environment';

@Injectable()
export class ReservationService {

  private readonly ERROR_ILLEGAL_CHARS = 'The username or password you have entered has illegal characters in it, please enter valid data!';
  private readonly ERROR_USERNAME_ALREADY_EXISTS = 'This username has already been taken!';
  private readonly ERROR_NO_SUCH_DEVICE = 'There is no such device!';

  private readonly METHOD_GET_ACTIVE_RESERVATIONS = 'getActiveWebReservations';
  private readonly METHOD_GET_NEW_CODE = 'getNewCode';
  private readonly METHOD_GET_DEVICE_BY_ID = 'getDeviceByTableId';
  private readonly METHOD_RELEASE_DEVICE = 'releaseDevice';

  reservationURL = environment.domain + '/admin/reservation.php';
  adminURL = environment.domain + '/admin/admin.php';

  constructor(private http: HttpClient) { }

  checkActiveReservations(user: LoginUserModel): Promise<ReservationModel[]> {
    const body = { 'method': this.METHOD_GET_ACTIVE_RESERVATIONS, 'data': { 'id': user.id, 'linkId': user.linkedUserId } };
    return this.http.post<ReservationModel[]>(this.reservationURL, JSON.stringify(body)).toPromise();
  }

  demandNewCode(sessionId: string): Promise<string> {
    const body = { 'method': this.METHOD_GET_NEW_CODE, 'data': { 'sessionId': sessionId } };
    return this.http.post(this.reservationURL, JSON.stringify(body), { responseType: 'text' }).toPromise();
  }

  fetchDeviceById(id: number): Promise<DeviceModel> {
    const body = { 'method': this.METHOD_GET_DEVICE_BY_ID, 'data': { 'id': id } };
    return this.http.post(this.adminURL, JSON.stringify(body), { responseType: 'text' }).toPromise().then(response => {
      if (response === this.ERROR_NO_SUCH_DEVICE) {
        return Promise.reject(this.ERROR_NO_SUCH_DEVICE);
      } else {
        try {
          const device = <DeviceModel>JSON.parse(response);
          return Promise.resolve(device);
        } catch {
          return Promise.reject('An error occured while converting to json: ' + response);
        }
      }
    });
  }

  releaseDevice(reservation: ReservationModel){
    const body = { 'method': this.METHOD_RELEASE_DEVICE, 'data': { 'reservation': reservation } };
    return this.http.post(this.reservationURL, JSON.stringify(body), { responseType: 'text' }).toPromise();
  }
}
