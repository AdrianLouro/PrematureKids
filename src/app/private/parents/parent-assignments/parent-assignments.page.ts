import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-parent-assignments',
  templateUrl: './parent-assignments.page.html',
  styleUrls: ['./parent-assignments.page.scss'],
})
export class ParentAssignmentsPage implements OnInit {

  assignments: any[];
  currentAssignments: any[];
  currentTab = 'all';

  constructor(private router: Router) { }

  ngOnInit() {
    this.loadAssignments();
  }
  loadAssignments() {
    this.assignments = [true, true, false, false, true];
    this.currentAssignments = this.assignments;
  }

  navigateToAssignment() {
    this.router.navigate(['private', 'shared', 'assignment']);
  }

  segmentChanged(event: any) {
    this.currentAssignments = event.detail.value === 'all' ? this.assignments :
      this.assignments.filter(assignment =>
        event.detail.value === 'pending' ? !assignment : assignment
      );
  }

}
