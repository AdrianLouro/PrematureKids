import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../../../services/http.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.page.html',
  styleUrls: ['./doctors.page.scss'],
})
export class DoctorsPage implements OnInit {

  doctors: any[];

  constructor(private router: Router,
    private http: HttpService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.loadDoctors();
  }

  ionViewDidEnter() {
    document.addEventListener('backbutton', (event) => { }, false);
  }

  loadDoctors(): any {
    this.http.get('/doctors').subscribe((res: any) => {
      this.doctors = res;
    },
      err => console.log(err)
    );
  }

  navigateToDoctor(id: any) {
    this.router.navigate(['private', 'shared', 'doctor-profile', id]);
  }

  navigateToCreateDoctor() {
    this.router.navigate(['private', 'administrators', 'create-doctor']);
  }

}
