import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, filter } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'front-end-internship-assignment-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  bookSearch: FormControl;
  searchResult?: any;
  isSearchPerformed: boolean;
  showLoading: boolean;
  dataNotFound: boolean;
  p: number;
  // pageLimit: number = 10;
  // offSet: number = 0;
  constructor(private apiService: ApiService) {
    this.bookSearch = new FormControl('');
    this.isSearchPerformed = false;
    this.showLoading = false;
    this.dataNotFound = false;
    this.p = 1;
  }

  trendingSubjects: Array<any> = [
    { name: 'JavaScript' },
    { name: 'CSS' },
    { name: 'HTML' },
    { name: 'Harry Potter' },
    { name: 'Crypto' },
  ];

  ngOnInit(): void {
    this.bookSearch.valueChanges
      .pipe(debounceTime(300))
      .subscribe((value: string) => {
        if (!value.length) {
          this.isSearchPerformed = false;
          this.dataNotFound = false;
          return;
        }
        this.getSearchResults(value);
      });
  }
  getSearchResults(value: string) {
    this.isSearchPerformed = true;
    this.showLoading = true;
    this.apiService
      .get(`/search.json?q=${value}&limit=10&offset=1`)
      .subscribe((res: any) => {
        if (res?.docs.length == 0) {
          this.showLoading = false;
          this.dataNotFound = true;
        } else {
          this.dataNotFound = false;
        }
        console.log(res);
        this.showLoading = false;
        this.searchResult = res;
      });
  }
}
