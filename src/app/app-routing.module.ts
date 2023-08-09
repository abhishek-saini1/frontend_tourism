import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { AboutComponent } from './Components/about/about.component';
import { SignupComponent } from './Components/signup/signup.component';
import { BookingComponent } from './Components/booking/booking.component';
import { TripsComponent } from './Components/trips/trips.component';
import { AdminComponent } from './Components/admin/admin.component';
import { AuthGuard } from './auth.guard';
import { GalleryComponent } from './Components/gallery/gallery.component';
import { ImagefetchComponent } from './Components/imagefetch/imagefetch.component';
import { TripaddComponent } from './Components/tripadd/tripadd.component';
import { FeedbackComponent } from './Components/feedback/feedback.component';
const routes: Routes = [
  {path:'',pathMatch:'full',redirectTo:'/home'},

   { path: 'home', component: HomeComponent },
   { path: 'about', component: AboutComponent  },
   { path: 'login', component: LoginComponent },
   { path: 'signup', component: SignupComponent },
   { path: 'booking', component: BookingComponent , canActivate: [AuthGuard], data: { expectedRoles: ['Traveler'] }},
   { path: 'trips', component: TripsComponent , canActivate: [AuthGuard], data: { expectedRoles: ['TravelAgent'] } },
   { path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data: { expectedRoles: ['Admin'] } },
   { path: 'gallery', component: GalleryComponent , canActivate: [AuthGuard], data: { expectedRoles: ['Admin'] }  },
   { path: 'image', component: ImagefetchComponent },
   { path: 'fetchtrip', component: TripaddComponent , canActivate: [AuthGuard], data: { expectedRoles: ['Traveler'] } },
   { path: 'feedback', component: FeedbackComponent },



   

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
