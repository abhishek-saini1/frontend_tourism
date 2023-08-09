import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FeedbackService } from 'src/app/Services/feedback.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent  implements OnInit{
constructor(private FeedbackService:FeedbackService,private router:Router){}

ngOnInit(){
  this.Init();

}

formGroup!:FormGroup;
Init(){
  this.formGroup=new FormGroup({
    name:new FormControl('',[Validators.required]),
    feedBackTitle:new FormControl('',[Validators.required]),

  })
}
success(){
  this.FeedbackService.upload(this.formGroup.value).subscribe((res)=>{
    alert("success");
    this.router.navigateByUrl('/home');
  },(error)=>(console.error(error)));
}
}
