import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category, CategoryWithoutId } from '../../data/category';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { PostCreation, PostWithoutCreatedDate } from '../../data/post';
import { PostService } from '../../services/post.service';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-write-post-form',
  templateUrl: './write-post-form.component.html',
  styleUrls: ['./write-post-form.component.css']
})
export class WritePostFormComponent implements OnInit {
  
  myForm!: FormGroup;
  categories: Category[] = [];

  constructor(private fb: FormBuilder, private router: Router, private postService: PostService, private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.myForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(150)]],
      category: ['', [Validators.required]],
      content: ['', [Validators.required, Validators.maxLength(2500)]]
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

  isExistingCategory() {
    const categoryName = this.category?.value;

    return this.categories.some(category =>
      category.name.toLowerCase() === categoryName.toLowerCase()
    );
  }

  onSubmit(): void {
    if (this.myForm.valid) {
      const selectedCategoryName = this.myForm.controls['category'].value;
      const selectedCategory = this.categories.find(category => category.name === selectedCategoryName);

      if (this.isExistingCategory() && selectedCategory) {
        this.submitPost(selectedCategory.id);
      } else {
        this.createAndSubmitPost(selectedCategoryName);
      }
    } else {
      this.markFormControlsTouched();
      this.showErrorToast();
    }
  }

  submitPost(categoryId: string): void {
    const postCreation: PostCreation = {
      title: this.title?.value,
      content: this.content?.value,
      categoryId: categoryId
    };

    this.postService.createPost(postCreation).subscribe({
      next: () => {
        this.showSuccessToast();
        this.router.navigate(['/']);
      },
      error: () => {
        this.router.navigate(['/']);
      }
    });
  }

  createAndSubmitPost(newCategoryName: string): void {
    const categoryCreation: CategoryWithoutId = {
      name: newCategoryName
    }

    this.categoryService.createCategory(categoryCreation).pipe(
      switchMap((createdCategory: Category) => {
        this.categories.push(createdCategory);

        const postCreation: PostCreation = {
          title: this.title?.value,
          content: this.content?.value,
          categoryId: createdCategory.id
        };

        return this.postService.createPost(postCreation);
      }),
      catchError(() => {
        this.router.navigate(['/']);

        return of();
      })
    ).subscribe({
      next: () => {
        this.showSuccessToast();
        this.router.navigate(['/']);
      },
      error: () => {
        this.router.navigate(['/']);
      }
    });
  }

  showSuccessToast(): void {
    Swal.fire({
      icon: 'success',
      title: 'Post submitted successfully!',
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
  }

  showErrorToast(): void {
    Swal.fire({
      icon: 'error',
      title: 'Please review your post!',
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
  }

  markFormControlsTouched(): void {
    Object.keys(this.myForm.controls).forEach(field => {
      const control = this.myForm.get(field);
      if (control instanceof FormGroup) {
        Object.keys(control.controls).forEach(innerField => {
          const innerControl = control.get(innerField);
          if (innerControl && !innerControl.valid) {
            innerControl.markAsTouched();
          }
        });
      } else {
        if (control && !control.valid) {
          control.markAsTouched();
        }
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
