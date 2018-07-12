import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../../services/reservation/reservation.service';
import { LoginService } from '../../services/login/login.service';
import { ReservationModel } from '../../models/reservation.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  code: string;
  reservations: ReservationModel[];

  constructor(private reservationService: ReservationService, private loginService: LoginService) { }

  ngOnInit() {
    if (this.checkActiveReservations()) {
      alert('User got reservations!');
    } else {
      // should get new code everytime
      this.reservationService.demandNewCode(localStorage.getItem('sessionId')).then(code => this.code = code);
    }
  }

  checkActiveReservations() {
    this.reservationService.checkActiveReservations(this.loginService.currentUser).then(reservations => {
      this.reservations = reservations;
      if (reservations.length > 0) {
        // The user has got active reservations
        return true;
      } else {
        return false;
      }
    });
  }

}
