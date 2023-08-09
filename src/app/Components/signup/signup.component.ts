import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
  formGroup!: FormGroup;
  newagent:any={};
  constructor(private authservice: AuthService,private router:Router) { }
  ngOnInit(): void {
    this.initForm(); // Call the initForm method when the component initializes

  }


  initForm() {
    this.formGroup = new FormGroup({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required, Validators.pattern('[0-9]{10}')]), 
      fullname: new FormControl('', [Validators.required])

    });
  }

  registration() {
    const userRole = this.formGroup.get('role')?.value;

    if (userRole == 'Agent' ) {
      const formData = this.formGroup.value;
      formData.isApproved = false; // Set isApproved to false by default
  
      this.authservice.register(this.formGroup.value).subscribe((res) => {
        alert("register successfully");
        this.router.navigateByUrl('/login');
      }, (error) => {
        console.error(error);
        console.log(error.error);
        console.log(error.status);
      })
    }
    else if (userRole == 'Traveler') {
      this.authservice.registerintraveler(this.formGroup.value).subscribe((res) => {
        alert("register successfully");
        this.router.navigateByUrl('/login');

      }, (error) => {
        console.error(error);
        console.log(error.error);
        console.log(error.status);
      })
    }
  }


}
