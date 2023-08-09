import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Trips {
  tId: number,
  destination: string,
  tDetails: string,
  ratesPerDay: number,
  ratesPerHour: number,
  ratesPerTourPack: number,
  itinerary: string,
  foodAndAccommodation: string,
  tImage: number[] // Assume `tImage` is an array of numbers representing byte data
}

@Injectable({
  providedIn: 'root'
})
export class TripsService {

  constructor(private http: HttpClient) { }

  upload(data: any): Observable<any> {
    return this.http.post('https://localhost:7226/api/Trips', data);
  }
  

  gettrips(): Observable<Trips[]> {
    return this.http.get<Trips[]>('https://localhost:7226/api/Trips');
  }
}
