import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { GalleryService } from 'src/app/Services/gallery.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent {
  selectedFile: File | null = null;
  images: any[] = []; // Initialize the images array

  constructor(private imageService: GalleryService) { }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadImage() {
    if (!this.selectedFile) {
      return;
    }

    const formData = new FormData();
    formData.append('image', this.selectedFile);

    this.imageService.uploadImage(formData).subscribe(
      (response) => {
        console.log('Image uploaded successfully', response);
        this.selectedFile = null;
        alert('Image uploaded successfully');
      },
      (error) => {
        console.error('Error uploading image', error);
      }
    );
  }
}
