import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, filter } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';

enum SearchType {
  author,
  title,
}
@Component({
  selector: 'front-end-internship-assignment-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  bookSearch: FormControl;
  searchType: SearchType;
  isChecked: boolean;
  searchResult?: any;
  isSearchPerformed: boolean;
  showLoading: boolean;
  p: number;
  pageLimit: number;
  totalItems: number;
  offSet: number;
  showError: boolean;
  errorMessage: string;
  constructor(private apiService: ApiService) {
    this.isChecked = false;
    this.bookSearch = new FormControl('');
    this.searchType = SearchType.title;
    this.isSearchPerformed = false;
    this.showLoading = false;
    this.showError = false;
    this.p = 1;
    this.pageLimit = 10;
    this.offSet = 0;
    this.totalItems = 0;
    this.errorMessage = '';
  }

  trendingSubjects: Array<any> = [
    { name: 'JavaScript' },
    { name: 'CSS' },
    { name: 'HTML' },
    { name: 'Harry Potter' },
    { name: 'Crypto' },
  ];
  handleOnline() {
    this.showError = false;
    this.errorMessage = '';
  }
  handleOffline() {
    this.showError = true;

    this.errorMessage = 'Please Check your Internet Connection.';
    this.showLoading = false;
  }

  ngOnInit(): void {
    this.userIsOnline();
    this.bookSearch.valueChanges
      .pipe(debounceTime(400))
      .subscribe((value: string) => {
        if (!value.length) {
          this.isSearchPerformed = false;
          this.showError = false;
          this.errorMessage = '';
          return;
        }
        this.getSearchResults(value);
      });
  }
  ngOnDestroy() {
    window.removeEventListener('online', this.handleOnline);
    window.removeEventListener('offline', this.handleOffline);
  }
  handleSearchTypeChange(e: any) {
    console.log(e);
  }
  getSearchResults(value: string) {
    this.isSearchPerformed = true;
    this.showLoading = true;
    this.apiService
      .get(
        `/search.json?${this.isChecked ? 'author' : 'title'}=${value}&limit=${
          this.pageLimit
        }&offset=${(this.p - 1) * this.pageLimit + 1}`
      )
      .subscribe((res: any) => {
        if (!res) {
          this.showLoading = false;
          this.showError = true;
          this.errorMessage = 'Currently Unavailable, Please Try Again Later';
        }
        if (res?.docs.length == 0) {
          this.showLoading = false;
          this.showError = true;
          this.errorMessage = 'Oops! No data Found for this Search';
        } else {
          this.showError = false;
          this.errorMessage = '';
          this.totalItems = Math.ceil(res.numFound / this.pageLimit);
          console.log(res);
          this.showLoading = false;
          this.searchResult = res;
        }
      });
  }
  emptySearch() {
    this.bookSearch.setValue('');
  }
  pageChanged(event: any) {
    this.p = event;
    this.getSearchResults(this.bookSearch.value);
  }
  userIsOnline() {
    window.addEventListener('online', this.handleOnline);
    window.addEventListener('offline', this.handleOffline);
  }
}
