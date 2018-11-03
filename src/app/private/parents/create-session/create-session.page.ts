import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HttpService } from '../../../services/http.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { ActivatedRoute } from '@angular/router';
import { DateService } from '../../../services/date.service';

@Component({
  selector: 'app-create-session',
  templateUrl: './create-session.page.html',
  styleUrls: ['./create-session.page.scss'],
})
export class CreateSessionPage implements OnInit {

  createSessionForm: FormGroup;
  assignmentId: any;

  constructor(private location: Location,
    private http: HttpService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private dateService: DateService,
    private authService: AuthenticationService) {
    this.initCreateSessionForm();
  }

  initCreateSessionForm() {
    this.createSessionForm = this.formBuilder.group({
      date: ['', Validators.required],
      parentNotes: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.assignmentId = params['assignmentId'];
    });
  }

  createSession() {
    this.http.post('/sessions', {
      date: this.dateService.ionDateTimeDateToUTC(this.createSessionForm.value['date']),
      parentNotes: this.createSessionForm.value['parentNotes'],
      parentId: this.authService.getUserId(),
      assignmentId: this.assignmentId
    }).subscribe((res: any) => {
      this.location.back();
    },
      err => console.log(err)
    );
  }

}
