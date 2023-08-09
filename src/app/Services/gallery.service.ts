import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  private baseUrl = 'https://localhost:7226/api/Galleries'; // Replace with your API base URL


  constructor(private http: HttpClient) { }

  uploadImage(imageData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/Upload`, imageData);
  }

  getImages(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }}
