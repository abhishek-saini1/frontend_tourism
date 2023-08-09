import { Component, OnInit } from '@angular/core';
import { GalleryService } from 'src/app/Services/gallery.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-imagefetch',
  templateUrl: './imagefetch.component.html',
  styleUrls: ['./imagefetch.component.css']
})
export class ImagefetchComponent implements OnInit {
  images: any[] = [];

  constructor(private imageService: GalleryService, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.getImages();
  }

  getImages() {
    this.imageService.getImages().subscribe(
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
  
  
  
  
}
