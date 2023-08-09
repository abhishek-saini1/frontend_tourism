import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
export interface Feedback{
  name:string,
  feedBackTitle:string
}
@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http:HttpClient) { }

  upload(data:any):Observable<any>{
    return this.http.post('https://localhost:7226/api/FeedBacks',data);
  }

  fetch():Observable<any[]>{
return this.http.get<any[]>('https://localhost:7226/api/FeedBacks');
  }
}
