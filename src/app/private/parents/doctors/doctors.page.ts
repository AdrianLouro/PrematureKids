import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../../../services/http.service';
import { AuthenticationService } from '../../../services/authentication/authentication.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.page.html',
  styleUrls: ['./doctors.page.scss'],
})
export class DoctorsPage implements OnInit {

  doctors: any[];

  constructor(private router: Router,
    private authService: AuthenticationService,
    private http: HttpService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.loadDoctors();
  }

  loadDoctors(): any {
    this.http.get('/parents/' + this.authService.getUserId() + '/doctors').subscribe((res: any) => {
      this.doctors = res;
    },
      err => console.log(err)
    );
  }

  navigateToDoctor(id: any) {
    this.router.navigate(['private', 'shared', 'doctor-profile', id]);
  }

}
