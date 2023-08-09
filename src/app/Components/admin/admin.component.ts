import { Component, OnInit } from '@angular/core';
import { Agent, AgentService } from 'src/app/Services/agent.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  agents: Agent[] = [];
  currentAgent: Agent = {
    id: 0,
    username: '',
    password: '',
    fullName: '',
    email: '',
    phone: '',
    isApproved: false
  };
  agent: Agent = {
    id: 0,
    username: '',
    password: '',
    fullName: '',
    email: '',
    phone: '',
    isApproved: false
  };
  isAddFormVisible = false;

  constructor(private agentService: AgentService) {}

  ngOnInit(): void {
    this.loadAgents();
  }

  loadAgents(): void {
    this.agentService.getAgents().subscribe((agents) => {
      this.agents = agents;
    });
  }

  cancelAddForm(): void {
    this.isAddFormVisible = false; 
    this.resetForm();
  }

  showAddForm(): void {
    this.isAddFormVisible = true; 
  }

  resetForm(): void {
    this.currentAgent = {
      id: 0,
      username: '',
      password: '',
      fullName: '',
      email: '',
      phone: '',
      isApproved: false
    };
  }

  editagent(agent: Agent): void {
    this.currentAgent = { ...agent };
    this.currentAgent.isApproved = !this.currentAgent.isApproved; // Toggle the isApproved status
    this.agentService.updateAgent(this.currentAgent).subscribe(() => {
      this.loadAgents();
    });
  }

  addAgent(): void {
    this.agentService.createAgent(this.currentAgent).subscribe(() => {
      this.resetForm();
      this.loadAgents();
      this.isAddFormVisible = false; // Hide the add form after successfully adding an agent
    });
  }
}
