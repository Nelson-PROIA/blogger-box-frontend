import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteCategoryFormComponent } from './complete-category-form.component';

describe('CompleteCategoryFormComponent', () => {
  let component: CompleteCategoryFormComponent;
  let fixture: ComponentFixture<CompleteCategoryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompleteCategoryFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompleteCategoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
