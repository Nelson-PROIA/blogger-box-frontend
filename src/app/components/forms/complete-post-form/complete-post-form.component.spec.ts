import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletePostFormComponent } from './complete-post-form.component';

describe('CompletePostFormComponent', () => {
  let component: CompletePostFormComponent;
  let fixture: ComponentFixture<CompletePostFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompletePostFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompletePostFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
