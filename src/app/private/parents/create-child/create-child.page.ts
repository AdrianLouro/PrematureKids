import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../../services/http.service';
import { AuthenticationService } from '../../../services/authentication/authentication.service';

@Component({
  selector: 'app-create-child',
  templateUrl: './create-child.page.html',
  styleUrls: ['./create-child.page.scss'],
})
export class CreateChildPage implements OnInit {

  private createChildForm: FormGroup;

  constructor(private location: Location,
    private http: HttpService,
    private authService: AuthenticationService,
    private formBuilder: FormBuilder) {
    this.initCreateChildForm();
  }

  initCreateChildForm() {
    this.createChildForm = this.formBuilder.group({
      name: ['', Validators.required],
      gender: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  createChild() {
    this.http.post('/children', {
      name: this.createChildForm.value['name'],
      gender: this.createChildForm.value['gender'],
      dateOfBirth: new Date(
        this.createChildForm.value['dateOfBirth'].year.value,
        this.createChildForm.value['dateOfBirth'].month.value,
        this.createChildForm.value['dateOfBirth'].day.value,
        0,
        0,
        0,
        0
      ),
      parentId: this.authService.getUserId()
    }).subscribe((res: any) => {
      this.location.back();
    },
      err => console.log(err)
    );
  }

}
