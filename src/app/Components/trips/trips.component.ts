import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TripsService, Trips } from 'src/app/Services/trips.service';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})
export class TripsComponent implements OnInit {
  trips: Trips[] = [];
  
  // Initialize an object to store the form data
  newTrip: Trips = {
    tId: 0,
    destination: '',
    tDetails: '',
    ratesPerDay: 0,
    ratesPerHour: 0,
    ratesPerTourPack: 0,
    itinerary: '',
    foodAndAccommodation: '',
    tImage: [] // Initialize with empty array
  };

  constructor(private tripsService: TripsService,private router:Router) {}

  ngOnInit(): void {
    this.getTrips();
  }

  getTrips(): void {
    this.tripsService.gettrips().subscribe(
      (data) => {
        this.trips = data;
      },
      (error) => {
        console.error('Error fetching trips:', error);
      }
    );
  }

  uploadData(): void {
    // Send the form data to the server
    this.tripsService.upload(this.newTrip).subscribe(
      (response) => {
        console.log('Data uploaded successfully:', response);
        // Refresh the trips list after uploading
        alert("Data uploaded successfully");
        this.router.navigateByUrl('/home');
        this.getTrips();
      },
      (error) => {
        console.error('Error uploading data:', error);
        // Log the complete error response
        console.error('Error response:', error.error);
      }
    );
  }
}
