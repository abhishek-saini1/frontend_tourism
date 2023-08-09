import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Agent {
  id: number;
  username: string;
  password: string;
  fullName: string;
  email: string;
  phone: string;
  isApproved: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AgentService {
  private apiUrl = 'https://localhost:7226/api/Agent';

  constructor(private http: HttpClient) {}

  getAgents(): Observable<Agent[]> {
    return this.http.get<Agent[]>(this.apiUrl);
  }

  createAgent(agent: Agent): Observable<Agent> {
    return this.http.post<Agent>(this.apiUrl, agent);
  }

  updateAgent(agent: Agent): Observable<Agent> {
    const url = `${this.apiUrl}/${agent.id}`;
    return this.http.put<Agent>(url, agent);
  }

  deleteAgent(agentId: number): Observable<void> {
    const url = `${this.apiUrl}/${agentId}`;
    return this.http.delete<void>(url);
  }
}
