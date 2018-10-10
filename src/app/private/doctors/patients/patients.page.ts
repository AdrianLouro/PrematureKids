import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.page.html',
  styleUrls: ['./patients.page.scss'],
})
export class PatientsPage implements OnInit {

  patients: any[];

  constructor(private router: Router) { }

  ngOnInit() {
    this.loadPatients();
  }

  loadPatients() {
    this.patients = [1, 2, 3, 4, 5];
  }

  filterPatients(event: any) {
    this.patients = Array.from(Array(Math.max(0, 5 - event.target.value.length)).keys());
  }

  navigateToPatient() {
    this.router.navigate(['private', 'shared', 'child']);
  }

  navigateToAddPatient() {
    this.router.navigate(['private', 'doctors', 'add-patient']);
  }

}
