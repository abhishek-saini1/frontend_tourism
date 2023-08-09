import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { AboutComponent } from './Components/about/about.component';
import { HomeComponent } from './Components/home/home.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './Components/footer/footer.component';
import { SignupComponent } from './Components/signup/signup.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'; 
import { ToastrModule } from 'ngx-toastr';
import { BookingComponent } from './Components/booking/booking.component';
import { TripsComponent } from './Components/trips/trips.component';
import { AdminComponent } from './Components/admin/admin.component';
import { GalleryComponent } from './Components/gallery/gallery.component';
import { ImagefetchComponent } from './Components/imagefetch/imagefetch.component';
import { AuthInterceptorInterceptor } from './auth-interceptor.interceptor';
import { TripaddComponent } from './Components/tripadd/tripadd.component';
import { NgxPrintModule } from 'ngx-print';
import { FeedbackComponent } from './Components/feedback/feedback.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    AboutComponent,
    HomeComponent,
    SignupComponent,
    FooterComponent,
    BookingComponent,
    TripsComponent,
    AdminComponent,
    GalleryComponent,
    ImagefetchComponent,
    TripaddComponent,
    FeedbackComponent,
    
  ],
  imports: [
    CarouselModule.forRoot(),
    FormsModule,
    BrowserAnimationsModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
  ToastrModule,
    AppRoutingModule,
    NgxPrintModule

    
  ],
  providers: [ {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
