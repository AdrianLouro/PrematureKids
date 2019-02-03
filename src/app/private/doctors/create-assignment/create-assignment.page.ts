import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { HttpService } from '../../../services/http.service';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IonicSelectableComponent } from 'ionic-selectable';

@Component({
  selector: 'app-create-assignment',
  templateUrl: './create-assignment.page.html',
  styleUrls: ['./create-assignment.page.scss'],
})
export class CreateAssignmentPage implements OnInit {

  @ViewChild('exerciseSelect') selectComponent: IonicSelectableComponent;

  childId: any;
  createAssignmentForm: FormGroup;
  exercises: any[];

  constructor(private location: Location,
    private http: HttpService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authService: AuthenticationService) {
    this.initCreateAssignmentForm();
  }

  initCreateAssignmentForm() {
    this.createAssignmentForm = this.formBuilder.group({
      exercise: ['', Validators.required],
      notes: ['', Validators.required],
      exerciseFrequency: ['', Validators.required],
      exerciseDuration: ['', Validators.required],
      feedbackFrequency: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.childId = params['childId'];
      this.loadExercises();
    });
  }

  loadExercises() {
    this.http.get('/exercises').subscribe((res: any) => {
      this.exercises = res;
    },
      err => console.log(err)
    );
  }

  createAssignment() {
    this.http.post('/assignments', {
      childId: this.childId,
      doctorId: this.authService.getUserId(),
      exerciseId: this.createAssignmentForm.value['exercise'].id,
      notes: this.createAssignmentForm.value['notes'],
      exerciseFrequency: this.createAssignmentForm.value['exerciseFrequency'],
      exerciseDuration: this.createAssignmentForm.value['exerciseDuration'],
      feedbackFrequency: this.createAssignmentForm.value['feedbackFrequency'],
      state: 'en curso'
    }).subscribe((res: any) => {
      this.location.back();
    },
      err => console.log(err)
    );
  }

}
