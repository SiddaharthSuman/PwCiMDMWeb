import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoggedIn: boolean;
  constructor(private service: LoginService, private router: Router) { }

  ngOnInit() {
  }

  loginUser(username: string, password: string) {
    console.log(username, password);

    if (username.trim().length === 0 || password.trim().length === 0) {
      alert('Please enter username and password both!');
      return;
    }

    this.service.loginUser(username, password).then(response => {
      try {
        const code = JSON.parse(response);
        localStorage.setItem('sessionId', code.code);
        this.isLoggedIn = true;
        this.router.navigate(['/Home']);
      } catch {
        console.log('Error while converting response to json: ' + response);
      }
    }, error => console.log(error));
  }
}
