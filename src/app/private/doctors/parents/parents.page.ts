import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../../../services/http.service';
import { AuthenticationService } from '../../../services/authentication/authentication.service';

@Component({
  selector: 'app-parents',
  templateUrl: './parents.page.html',
  styleUrls: ['./parents.page.scss'],
})
export class ParentsPage implements OnInit {

  parents: any[];

  constructor(private router: Router,
    private authService: AuthenticationService,
    private http: HttpService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.loadParents();
  }

  loadParents() {
    this.http.get('/doctors/' + this.authService.getUserId() + '/parents').subscribe((res: any) => {
      this.parents = res;
    },
      err => console.log(err)
    );
  }

  navigateToParent(id: any) {
    this.router.navigate(['private', 'shared', 'parent-profile', id]);
  }

}
