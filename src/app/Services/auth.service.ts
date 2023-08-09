import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userRole: string = '';
  private token: string = '';
  router: any;


  constructor(private http: HttpClient) { }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
  private isApproved: boolean = false; // Define the isApproved property

  login(data: any): Observable<any> {
    const demotoken =this.http.post('https://localhost:7226/api/Token', data)
    
    return demotoken;
    
  }
  getUserRole(): string {
    return this.userRole;
  }



  setUserRole(role: string): void {
    this.userRole = role;
  }

  clearUserRole(): void {
    this.userRole = '';
  }

  setToken(token: string): void {
    this.token = token;
  }

  clearToken(): void {
    this.token = '';
  }


  register(data: any): Observable<any> {
    return this.http.post('https://localhost:7226/api/Agent', data);
  }



  registerintraveler(data: any): Observable<any> {
    return this.http.post('https://localhost:7226/api/Traveler', data);
  }

  // hasValidToken() {
    
  //   console.log()
  //   console.log(this.token)
  //   if (this.token) {
      
  //   }
  //   return true;
  // }

  setIsApproved(isApproved: boolean) {
    this.isApproved = isApproved; // Store the provided isApproved value
  }
}
