import { Component, OnInit } from '@angular/core';
import { Feedback, FeedbackService } from 'src/app/Services/feedback.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
constructor(private FeedbackService:FeedbackService){}
  images:string[]=[
    'assets/1.webp',
    'assets/2.webp',
    'assets/3.webp',
    
    


  ]
  feedbacks: Feedback[] = [];
  ngOnInit(): void {
    this.loadFeedbacks();
  }
  backgroundImageUrl = 'assets/7.webp';
  favIcons = [
    { iconUrl: 'assets/9.webp'  },
    { iconUrl: 'assets/13.webp' }
  ];

  loadFeedbacks(): void {
    this.FeedbackService.fetch().subscribe(
      (feedbacks) => {
        this.feedbacks = feedbacks;
      },
      (error) => {
        console.error('Error fetching feedbacks:', error);
      }
    );
  }
 
}
