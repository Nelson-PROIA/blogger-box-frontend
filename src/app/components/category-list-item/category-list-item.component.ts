import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { ConfirmationModalService } from '../../services/confirmation-modal.service';
import { ModalService } from '../../services/modal.service';
import { EditPostModalComponent } from '../edit-post-modal/edit-post-modal.component';
import { Category } from '../../data/category';
import { CategoryService } from '../../services/category.service';
import { ToastService } from '../../services/toast.service';
import { EditCategoryModalComponent } from '../edit-category-modal/edit-category-modal.component';

@Component({
  selector: 'app-category-list-item',
  templateUrl: './category-list-item.component.html',
  styleUrls: ['./category-list-item.component.css']
})
export class CategoryListItemComponent {

  @Input() category!: Category;

  @Output() categoryDeleted = new EventEmitter<string>();
  @Output() categoryUpdated = new EventEmitter<Category>();

  constructor(
    private categoryService: CategoryService,
    private confirmationModalService: ConfirmationModalService,
    private modalService: ModalService,
    private toastService: ToastService,
    private router: Router) {}

  requestDelete() {
    var confirmationResultSubscription = this.confirmationModalService.confirmationResult$.subscribe(result => {
      if (result) {
        this.delete();
      }

      confirmationResultSubscription.unsubscribe();
    });

    this.confirmationModalService.requestConfirmation('Confirm deletion', 'Are you sure you want to delete this category?', 'Delete', 'danger');
  }

  delete() {
    this.categoryService.deleteCategory(this.category.id).subscribe({
      next: () => {
        this.categoryDeleted.emit(this.category.id);
        this.toastService.showSuccessToast('Category successfully deleted!');  
      },
      error: (err) => {
        this.toastService.showErrorToast(err.error);
      }
    });
  }

  edit() {
    this.modalService.requestComponent(EditCategoryModalComponent, { 'category': this.category, 'categoryUpdated': this.categoryUpdated });
  }

  seeRelatedPosts(): void {
    this.router.navigate(['/categories', this.category.id, 'posts'])
  }

}
