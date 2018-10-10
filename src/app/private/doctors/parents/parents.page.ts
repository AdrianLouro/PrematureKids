import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-parents',
  templateUrl: './parents.page.html',
  styleUrls: ['./parents.page.scss'],
})
export class ParentsPage implements OnInit {

  parents: any[];

  constructor(private router: Router) { }

  ngOnInit() {
    this.loadParents();
  }

  loadParents() {
    this.parents = [1, 2, 3, 4, 5];
  }

  filterParents(event: any) {
    this.parents = Array.from(Array(Math.max(0, 5 - event.target.value.length)).keys());
  }

  navigateToParent() {
    this.router.navigate(['private', 'shared', 'parent-profile']);
  }

}
