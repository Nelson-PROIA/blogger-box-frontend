// src/app/shared/post-form/complete-post-form/complete-post-form.component.ts
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category, CategoryWithoutId } from '../../../data/category';

import Swal from 'sweetalert2';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-complete-post-form',
  templateUrl: './complete-post-form.component.html',
  styleUrls: ['./complete-post-form.component.css']
})
export class CompletePostFormComponent implements OnInit {

  @Input() categories: Category[] = [];
  @Input() initialData: any = { title: '', category: '', content: '' };

  @Output() formSubmit = new EventEmitter<any>();

  myForm!: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.myForm = this.fb.group({
      title: [
        this.initialData.title,
        [Validators.required, Validators.minLength(5), Validators.maxLength(150)]
      ],
      category: [
        this.initialData.category,
        [Validators.required]
      ],
      content: [
        this.initialData.content,
        [Validators.required, Validators.maxLength(2500)]
      ]
    });

    this.fetchCategories();
  }

  fetchCategories(): void {
    this.categoryService.getCategories().subscribe(
      (categories: Category[]) => {
        this.categories = categories;
      },
      (error) => {
        this.router.navigate(['/']);
      }
    );
  }

  onSubmit(): void {
    if (this.myForm.valid && this.hasFormChanged()) {
      this.checkAndSubmitCategory();
    } else if (!this.hasFormChanged()) {
      Swal.fire({
        icon: 'warning',
        title: 'No changes were detected!',
        toast: true,
        width: '26em',
        position: 'bottom-end',
        showConfirmButton: false,
        timer: 6000,
        timerProgressBar: true,
        showCloseButton: true,
        didOpen: (toast) => {
          toast.addEventListener('click', () => Swal.close());
        }
      });
    } else {
      this.markFormControlsTouched();
    }
  }

  isExistingCategory(): boolean {
    const categoryName = this.myForm.controls['category'].value;
    
    return this.categories.some(category => category.name.toLowerCase() === categoryName.toLowerCase());
  }

  checkAndSubmitCategory(): void {
    const categoryName = this.myForm.controls['category'].value;
    const existingCategory = this.categories.find(category => category.name.toLowerCase() === categoryName.toLowerCase());

    if (existingCategory) {
      this.submitFormWithCategoryId(existingCategory.id);
    } else {
      const newCategory: CategoryWithoutId = { name: categoryName };

      this.categoryService.createCategory(newCategory).subscribe(createdCategory => {
        this.submitFormWithCategoryId(createdCategory.id);
      });
    }
  }

  submitFormWithCategoryId(categoryId: string): void {
    const formValue = { ...this.myForm.value, categoryId: categoryId };
    this.formSubmit.emit(formValue);
  }

  hasFormChanged(): boolean {
    const formValue = this.myForm.value;

    return formValue.title !== this.initialData.title ||
           formValue.category !== this.initialData.category ||
           formValue.content !== this.initialData.content;
  }

  markFormControlsTouched(): void {
    Object.keys(this.myForm.controls).forEach(field => {
      const control = this.myForm.get(field);

      if (control) {
        control.markAsTouched({ onlySelf: true });
      }
    });
  }

  get title() {
    return this.myForm.controls['title'];
  }

  get category() {
    return this.myForm.controls['category'];
  }

  get content() {
    return this.myForm.controls['content'];
  }

}
