import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BookingService } from 'src/app/Services/booking.service';
import { NgxPrintDirective } from 'ngx-print';
import { jsPDF } from 'jspdf';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
  providers: [NgxPrintDirective]
})
export class BookingComponent {
  @ViewChild ('content',{static:false}) el!:ElementRef
formGroup!:FormGroup;
constructor(private BookingService:BookingService,
  private printDirective: NgxPrintDirective,private router:Router){
}

ngOnInit() {
  this.onload();}
onload(){
  this.formGroup=new FormGroup({
    travelerName:new FormControl('',Validators.required),
    departureDate:new FormControl('',[Validators.required]),
    returnDate:new FormControl('',[Validators.required]),
    destination:new FormControl('',[Validators.required]),
    numberOfTravelers:new FormControl('',[Validators.required,Validators.min(1)]),
    totalPrice:new FormControl('',[Validators.required]),
    accommodation:new FormControl('',[Validators.required]),
    description:new FormControl('',[Validators.required])
  })
// }
// makepdf(){
//   let pdf=new jsPDF('p','pt','a4');
//   pdf.html(this.el.nativeElement,{
//     callback:(pdf)=>{
//       pdf.save("booking.pdf")
//     }
//   })
}

fromsubmit() {
  console.log('Form submission initiated');
  this.BookingService.upload(this.formGroup.value).subscribe(
    (res) => {
      console.log('API response:', res);
      alert('success');
      this.router.navigateByUrl('/feedback');
    },
    (error) => {
      console.error('API error:', error);
    }
  );
}

generatePDF() {
  const doc = new jsPDF();

  // Add border
  doc.setLineWidth(1);
  doc.rect(10, 10, doc.internal.pageSize.width - 20, doc.internal.pageSize.height - 20);

  const formData = this.formGroup.value;

  // Calculate center position for "Invoice" title
  const titleText = 'Invoice';
  const fontSize = 24;
  const titleWidth = doc.getStringUnitWidth(titleText) * fontSize / doc.internal.scaleFactor;
  const titleX = (doc.internal.pageSize.width - titleWidth) / 2;
  
  // Add "Invoice" title in large font
  doc.setFontSize(fontSize);
  doc.text(titleText, titleX, 30);

  // Set initial Y-coordinate for content
  let contentY = 60;

  // Add content to PDF
  doc.setFontSize(12);
  doc.text(`Name: ${formData.travelerName}`, 20, contentY);
  contentY += 10; // Increase Y-coordinate for next line
  doc.text(`Departure Date: ${formData.departureDate}`, 20, contentY);
  contentY += 10;
  doc.text(`Return Date: ${formData.returnDate}`, 20, contentY);
  contentY += 10;
  doc.text(`Destination: ${formData.destination}`, 20, contentY);
  contentY += 10;
  doc.text(`Number of Travelers: ${formData.numberOfTravelers}`, 20, contentY);
  contentY += 10;
  doc.text(`Accommodation: ${formData.accommodation}`, 20, contentY);
  contentY += 10;
  doc.text(`Description: ${formData.description}`, 20, contentY);

  // Save the PDF
  doc.save('feedback_form.pdf');
}
}

