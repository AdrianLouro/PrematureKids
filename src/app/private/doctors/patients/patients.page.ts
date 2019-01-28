import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../../../services/http.service';
import { AuthenticationService } from '../../../services/authentication/authentication.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.page.html',
  styleUrls: ['./patients.page.scss'],
})
export class PatientsPage implements OnInit {

  patients: any[];

  constructor(private router: Router,
    private http: HttpService,
    private authService: AuthenticationService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.loadPatients();
  }

  ionViewDidEnter() {
    document.addEventListener('backbutton', (event) => { }, false);
  }

  loadPatients() {
    this.http.get('/doctors/' + this.authService.getUserId() + '/patients').subscribe((res: any) => {
      this.patients = res;
    },
      err => console.log(err)
    );
  }

  navigateToPatient(id: any) {
    this.router.navigate(['private', 'shared', 'child', id]);
  }

  navigateToAddPatient() {
    this.router.navigate(['private', 'doctors', 'add-patient']);
  }

}
