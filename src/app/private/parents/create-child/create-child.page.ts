import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-child',
  templateUrl: './create-child.page.html',
  styleUrls: ['./create-child.page.scss'],
})
export class CreateChildPage implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }

  createChild() {
    this.location.back();
  }

}
