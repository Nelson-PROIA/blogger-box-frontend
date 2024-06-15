import { Component, EventEmitter, Input, OnInit, ViewChild } from '@angular/core';
import { Category } from '../../data/category';
import { CompleteCategoryFormComponent } from '../forms/complete-category-form/complete-category-form.component';
import { CategoryService } from '../../services/category.service';
import { ToastService } from '../../services/toast.service';
import { ModalService } from '../../services/modal.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-category-modal',
  templateUrl: './edit-category-modal.component.html',
  styleUrl: './edit-category-modal.component.css'
})
export class EditCategoryModalComponent implements OnInit {

  @Input() category!: Category;
  @Input() categoryUpdated!: EventEmitter<Category>;

  @ViewChild(CompleteCategoryFormComponent) CompleteCategoryFormComponent!: CompleteCategoryFormComponent;

  initialData: any = {};

  constructor(private categoryService: CategoryService, private toastService: ToastService, private modalService: ModalService, private router: Router) {}

  ngOnInit(): void {
    this.fetchInitialData();
  }

  fetchInitialData(): void {
    this.initialData = {
      id: this.category.id,
      name: this.category.name
    }
  }

  submitForm(formData: any): void {
    const category: Category = {
      id: this.category.id,
      name: formData.name
    };

    this.categoryService.updateCategory(category).subscribe({
      next: () => {
        this.toastService.showSuccessToast('Category successfully updated!');
        this.categoryUpdated.emit(category);
        this.modalService.close();
      },
      error: () => {
        this.modalService.close();
      }
    });
  }

  triggerFormSubmit(): void {
    if (this.CompleteCategoryFormComponent) {
      this.CompleteCategoryFormComponent.onSubmit();
    }
  }

  exit() {
    Swal.fire({
      title: 'Confirm cancel',
      text: "Are you sure you want to cancel?",
      showCancelButton: true,
      confirmButtonColor: '#0069d9',
      cancelButtonColor: '#f8f9fa',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      customClass: {
        popup: 'confirmation-alert-popup',
        htmlContainer: 'confirmation-alert-html-container',
        title: 'confirmation-alert-title',
        actions: 'confirmation-alert-actions',
        cancelButton: 'confirmation-alert-cancel-button',
        confirmButton: 'confirmation-alert-confirm-button'
    }
    }).then((result) => {
      if (result.isConfirmed) {
        this.modalService.close();
        this.router.navigate(['/']);
      }
    });
  }

}
