import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLogged: boolean = false;
 

  constructor(public authService: AuthService, private router: Router) {}
  role:string|null=''

  ngOnInit() {
    this.role=localStorage.getItem('role')
    this.isLogged = this.authService.isLoggedIn();
  }

 

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
    this.isLogged = false;
    this.ngOnInit();
  }

  login() {
    this.router.navigate(['/login']);
  }
}
