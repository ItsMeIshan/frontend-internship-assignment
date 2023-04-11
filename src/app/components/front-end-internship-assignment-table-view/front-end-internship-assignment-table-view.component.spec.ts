import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FrontEndInternshipAssignmentTableViewComponent } from './front-end-internship-assignment-table-view.component';

describe('FrontEndInternshipAssignmentTableViewComponent', () => {
  let component: FrontEndInternshipAssignmentTableViewComponent;
  let fixture: ComponentFixture<FrontEndInternshipAssignmentTableViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FrontEndInternshipAssignmentTableViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(
      FrontEndInternshipAssignmentTableViewComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
