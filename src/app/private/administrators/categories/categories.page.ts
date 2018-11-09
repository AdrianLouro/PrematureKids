import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../../../services/http.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {

  categories: any[];

  constructor(private router: Router,
    private http: HttpService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.loadCategories();
  }

  loadCategories(): any {
    this.http.get('/categories').subscribe((res: any) => {
      this.categories = res;
    },
      err => console.log(err)
    );
  }

  navigateToCategory(id: any) {
    this.router.navigate(['private', 'administrators', 'category', id]);
  }

  navigateToCreateCategory() {
    this.router.navigate(['private', 'administrators', 'create-category']);
  }

}
