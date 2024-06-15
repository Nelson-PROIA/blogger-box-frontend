import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../../services/category.service';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-complete-category-form',
  templateUrl: './complete-category-form.component.html',
  styleUrl: './complete-category-form.component.css'
})
export class CompleteCategoryFormComponent implements OnInit {

  @Input() initialData: any = { name: '' };

  @Output() formSubmit = new EventEmitter<any>();

  completeCategoryForm!: FormGroup;

  constructor(private fb: FormBuilder, private toastService: ToastService) {}

  ngOnInit(): void {
    this.completeCategoryForm = this.fb.group({
      name: [
        this.initialData.name,
        [Validators.required, Validators.minLength(5), Validators.maxLength(30)]
      ]
    });
  }

  onSubmit(): void {
    if (this.completeCategoryForm.valid && this.hasFormChanged()) {
      this.formSubmit.emit(this.completeCategoryForm.value);
    } else if (!this.hasFormChanged()) {
      this.toastService.showToast('No changes were detected!', 'warning');
    } else {
      this.markFormControlsTouched();
    }
  }

  hasFormChanged(): boolean {
    const formValue = this.completeCategoryForm.value;

    return formValue.name !== this.initialData.name;
  }

  markFormControlsTouched(): void {
    Object.keys(this.completeCategoryForm.controls).forEach(field => {
      const control = this.completeCategoryForm.get(field);

      if (control) {
        control.markAsTouched({ onlySelf: true });
      }
    });
  }

  get name() {
    return this.completeCategoryForm.controls['name'];
  }

}
