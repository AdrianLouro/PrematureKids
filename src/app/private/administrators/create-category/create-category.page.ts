import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../../../services/http.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.page.html',
  styleUrls: ['./create-category.page.scss'],
})
export class CreateCategoryPage implements OnInit {

  createCategoryForm: FormGroup;
  categoryId: any;

  constructor(private http: HttpService,
    private formBuilder: FormBuilder,
    private location: Location) {
    this.initCreateCategoryForm();
  }

  initCreateCategoryForm() {
    this.createCategoryForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  createCategory() {
    this.http.post('/categories', this.createCategoryForm.value).subscribe((res: any) => {
      this.location.back();
    },
      err => console.log(err)
    );
  }

}
