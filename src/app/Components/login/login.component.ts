import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private authservice: AuthService, private router: Router) { }

  formGroup!: FormGroup;

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.formGroup = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  loginprocess() {
    if (this.formGroup.valid) {
      this.authservice.login(this.formGroup.value).subscribe(
        (res) => {
          const status = res.user.isApproved;
          const token = res.token;

          const decodedToken: any = jwt_decode(token);
          console.log(decodedToken);

          // Access the 'role' claim from the decoded token
          const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
          console.log('Role:', role);
          localStorage.setItem('role',role);


          // Store the token in localStorage for later use
          localStorage.setItem('token', token);

          if (role === 'Admin') {
            alert('Login successful as Admin');
            this.router.navigateByUrl('/home');
          } else if (role === 'Traveler') {
            alert('Login successful as Traveler');
            this.router.navigateByUrl('/home');
          } else if (role === 'TravelAgent') {
            if (status) {
              alert('Login successful as Approved Agent');
              this.router.navigateByUrl('/home');
            } else {
              alert('Agent registered but not approved yet.');
            }
          } else {
            alert('Unknown role');
          }

          // Set the token and userRole in the AuthService for easy access
          this.authservice.setToken(token);
          this.authservice.setUserRole(role);
        },
        (error) => {
          console.error(error);
          alert('An error occurred during login.');
          console.log(error.status);
          console.log(error.error);
        }
      );
    }
  }
}
