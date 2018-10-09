import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-child',
  templateUrl: './create-child.page.html',
  styleUrls: ['./create-child.page.scss'],
})
export class CreateChildPage implements OnInit {

  private createChildForm: FormGroup;

  constructor(private location: Location,
    private formBuilder: FormBuilder) {
    this.initCreateChildForm();
  }

  initCreateChildForm() {
    this.createChildForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      gender: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  createChild() {
    this.location.back();
  }

}
