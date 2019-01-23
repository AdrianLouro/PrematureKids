import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../../../services/http.service';
import { AuthenticationService } from '../../../services/authentication/authentication.service';

@Component({
  selector: 'app-parent-assignments',
  templateUrl: './parent-assignments.page.html',
  styleUrls: ['./parent-assignments.page.scss'],
})
export class ParentAssignmentsPage implements OnInit {

  assignments: any[];
  pendingAssignments: any[];
  finishedAssignments: any[];
  segment: string;

  constructor(private router: Router,
    private authService: AuthenticationService,
    private http: HttpService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.loadAssignments();
  }

  loadAssignments() {
    this.http.get('/parents/' + this.authService.getUserId() + '/assignments').subscribe((res: any) => {
      this.assignments = res;
      this.segment = 'en curso';
    },
      err => console.log(err)
    );
  }

  navigateToAssignment(id: any) {
    this.router.navigate(['private', 'shared', 'assignment', id]);
  }

}
