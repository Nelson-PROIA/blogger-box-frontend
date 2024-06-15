import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WritePostFormComponent } from './write-post-form.component';

describe('WritePostFormComponent', () => {
  let component: WritePostFormComponent;
  let fixture: ComponentFixture<WritePostFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WritePostFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WritePostFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
