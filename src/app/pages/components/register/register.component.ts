import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../../services/registration/registration.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  selectedDeviceType: string;

  constructor(private service: RegistrationService) { }

  ngOnInit() {
  }

  registerUser(username: string, password: string) {
    console.log(username, password);
    if (username.trim().length === 0 || password.trim().length === 0 || !this.selectedDeviceType) {
      alert('Please fill all the fields completely!');
      return;
    }

    this.service.registerUser(username, password).then(response => {

    });
  }

  deviceType(event) {
    this.selectedDeviceType = event.target.value;
  }
}
