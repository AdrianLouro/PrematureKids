import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-assignment',
  templateUrl: './create-assignment.page.html',
  styleUrls: ['./create-assignment.page.scss'],
})
export class CreateAssignmentPage implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }

  createAssignment() {
    this.location.back();
  }

}
