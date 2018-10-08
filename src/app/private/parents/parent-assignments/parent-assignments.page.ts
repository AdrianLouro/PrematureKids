import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../../../services/http.service';

@Component({
  selector: 'app-parent-assignments',
  templateUrl: './parent-assignments.page.html',
  styleUrls: ['./parent-assignments.page.scss'],
})
export class ParentAssignmentsPage implements OnInit {

  assignments: any[];
  pendingAssignments: any[];
  finishedAssignments: any[];
  segment = 'all';

  constructor(private router: Router,
    private http: HttpService) { }

  ngOnInit() {
    this.loadAssignments();
  }

  loadAssignments() {
    this.assignments = [true, true, false, false, true];
    this.pendingAssignments = this.assignments.filter(assignment => !assignment);
    this.finishedAssignments = this.assignments.filter(assignment => assignment);
  }

  navigateToAssignment() {
    this.router.navigate(['private', 'shared', 'assignment']);
  }

}
