import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../../services/reservation/reservation.service';
import { LoginService } from '../../services/login/login.service';
import { ReservationModel } from '../../models/reservation.model';
import { DeviceModel } from '../../models/device.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  activeReservation: ReservationModel;
  code: string;
  reservations: ReservationModel[];
  isAlreadyInReservation: boolean;
  reservedDevice: DeviceModel;

  constructor(private reservationService: ReservationService, private loginService: LoginService) { }

  async ngOnInit() {
    if (await this.checkActiveReservations()) {
      //
      console.log('we should get this later');
      this.isAlreadyInReservation = true;
      this.activeReservation = this.reservations[0];
      this.reservationService.fetchDeviceById(this.activeReservation.device).then(deviceData => {
        this.reservedDevice = deviceData;
      }, error => alert(error));
    } else {
      // should get new code everytime
      this.reservationService.demandNewCode(localStorage.getItem('sessionId')).then(code => this.code = code);
    }
  }

  async checkActiveReservations() {
    this.reservations = await this.reservationService.checkActiveReservations(this.loginService.currentUser);
    // .then(reservations => {
    //   this.reservations = reservations;
    //
    // });
    console.log('we should get this first');
    if (this.reservations.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  releaseDevice() {
    console.log('Device Released!');
  }

}
