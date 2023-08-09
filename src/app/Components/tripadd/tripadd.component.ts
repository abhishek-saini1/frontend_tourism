import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Trips, TripsService } from 'src/app/Services/trips.service';
import { GalleryService } from 'src/app/Services/gallery.service';
import {  Router } from '@angular/router';
@Component({
  selector: 'app-tripadd',
  templateUrl: './tripadd.component.html',
  styleUrls: ['./tripadd.component.css']
})
export class TripaddComponent {
  constructor(private TripsService:TripsService, private sanitizer: DomSanitizer,private gallery:GalleryService,private router:Router){}
  trips: Trips[] = [];
  images: any[] = [];

  // ... (existing code)

  ngOnInit(): void {
    this.getTrips();
    this.getImages();

  }

  getTrips(): void {
    this.TripsService.gettrips().subscribe(
      (data) => {
        this.trips = data;
      },
      (error) => {
        console.error('Error fetching trips:', error);
      }
    );
  }


  getImages() {
    this.gallery.getImages().subscribe(
      (data: any[]) => {
        this.images = data;
        console.log('Image data:', this.images); // Check the image data
      },
      (error) => {
        console.error('Error fetching images', error);
      }
    );
  }
  

  sanitizeImage(imageData: string): SafeResourceUrl {
    const imageUrl = 'data:image/jpeg;base64,' + imageData;
    return this.sanitizer.bypassSecurityTrustResourceUrl(imageUrl);
  }

  book(){
    this.router.navigateByUrl('/booking')
  }
  searchTerm: string = ''; 
  search() {
    if (this.searchTerm.trim() === '') {
      // If the search term is empty, show all trips
      this.getTrips();
      return;
    }

    // Filter trips based on search term
    this.trips = this.trips.filter(trip => {
      return (
        trip.destination.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        trip.tDetails.toLowerCase().includes(this.searchTerm.toLowerCase())
        // Add more fields to search if needed
      );
    });
  }
}
