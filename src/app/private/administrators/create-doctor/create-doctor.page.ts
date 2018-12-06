import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../../../services/http.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-doctor',
  templateUrl: './create-doctor.page.html',
  styleUrls: ['./create-doctor.page.scss'],
})
export class CreateDoctorPage implements OnInit {

  createDoctorForm: FormGroup;
  emailAlreadyRegistered = false;
  boardNumberAlreadyRegistered = false;

  constructor(private formBuilder: FormBuilder,
    private http: HttpService,
    private location: Location) {
    this.initCreateDoctorForm();
  }

  initCreateDoctorForm() {
    this.createDoctorForm = this.formBuilder.group({
      name: ['', Validators.required],
      boardNumber: ['', Validators.required],
      telephone: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
    });
  }

  ngOnInit() {
  }

  createDoctor() {
    this.http.post('/doctors', this.createDoctorForm.value).subscribe((res: any) => {
      this.location.back();
    },
      err => {
        if (err.status === 409) {
          this.emailAlreadyRegistered = err.error === 'email';
          this.boardNumberAlreadyRegistered = err.error === 'boardNumber';
        }
      }
    );
  }

}
