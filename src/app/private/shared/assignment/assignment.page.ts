import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { Location } from '@angular/common';
import { AlertController, ToastController } from '@ionic/angular';
import { HttpService } from '../../../services/http.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.page.html',
  styleUrls: ['./assignment.page.scss'],
})
export class AssignmentPage implements OnInit {

  authenticatedAsParent = false;
  iAmAuthor = false;
  segment = 'info';
  assignment: any;
  sessions: any[];
  editAssignmentForm: FormGroup;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private location: Location,
    private http: HttpService,
    private route: ActivatedRoute,
    private alertController: AlertController,
    private toastController: ToastController,
    private authService: AuthenticationService) {
    this.authenticatedAsParent = this.authService.isAuthenticatedAs('parent');
    this.initEditAssignmentForm();
  }

  initEditAssignmentForm() {
    this.editAssignmentForm = this.formBuilder.group({
      doctorId: ['', Validators.required],
      date: ['', Validators.required],
      notes: ['', Validators.required],
      exerciseFrequency: ['', Validators.required],
      exerciseDuration: ['', Validators.required],
      feedbackFrequency: ['', Validators.required],
      state: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.route.params.subscribe(params => {
      this.loadAssignment(params['id']);
      this.loadSessions(params['id']);
    });
  }

  loadAssignment(assignmentId: any) {
    this.http.get('/assignments/' + assignmentId).subscribe((res: any) => {
      this.assignment = res;
      this.iAmAuthor = this.assignment.doctor.id === this.authService.getUserId();
      this.setAssignment();
    },
      err => console.log(err)
    );
  }

  setAssignment() {
    this.editAssignmentForm.setValue({
      doctorId: this.assignment.doctor.id,
      date: new Date(this.assignment.date).toISOString(),
      notes: this.assignment.notes,
      exerciseFrequency: this.assignment.exerciseFrequency,
      exerciseDuration: this.assignment.exerciseDuration,
      feedbackFrequency: this.assignment.feedbackFrequency,
      state: this.assignment.state
    });
  }

  loadSessions(assignmentId: any) {
    this.http.get('/assignments/' + assignmentId + '/sessions').subscribe((res: any) => {
      this.sessions = res;
    },
      err => console.log(err)
    );
  }

  editAssignment() {
    this.http.put('/assignments/' + this.assignment.id, this.editAssignmentForm.value).subscribe((res: any) => {
      this.presentToast();
    },
      err => console.log(err)
    );
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'The assignment has been edited.',
      cssClass: 'primary',
      showCloseButton: true,
      closeButtonText: 'OK'
    });
    toast.present();
  }

  removeAssignment() {
    this.presentConfirmationAlert();
  }

  async presentConfirmationAlert() {
    const alert = await this.alertController.create({
      header: 'Are you sure you want to delete this assignment?',
      message: 'It will be permanently deleted!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'danger',
          handler: () => {
          }
        }, {
          text: 'Delete assignment',
          handler: () => {
            this.http.delete('/assignments/' + this.assignment.id).subscribe((res: any) => {
              this.location.back();
            },
              err => console.log(err)
            );
          }
        }
      ]
    });

    await alert.present();
  }
  navigateToSession(id: any) {
    this.router.navigate(['private', 'shared', 'session', id]);
  }

  navigateToCreateSession() {
    this.router.navigate(['private', 'parents', 'create-session']);
  }

  navigateToOpinion() {
    this.router.navigate(['private', 'parents', 'opinion', { exerciseId: this.assignment.exercise.id }]);
  }

}
