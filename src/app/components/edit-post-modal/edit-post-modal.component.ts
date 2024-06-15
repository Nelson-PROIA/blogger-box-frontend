import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CompletePostFormComponent } from '../forms/complete-post-form/complete-post-form.component';
import { ModalService } from '../../services/modal.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { PostService } from '../../services/post.service';
import { CategoryService } from '../../services/category.service';
import { Post, PostCreation, PostWithoutCreatedDate } from '../../data/post';
import { ToastService } from '../../services/toast.service';

declare var bootstrap: any; // Declare Bootstrap variable
@Component({
  selector: 'app-edit-post-modal',
  templateUrl: './edit-post-modal.component.html',
  styleUrls: ['./edit-post-modal.component.css']
})
export class EditPostModalComponent implements OnInit {

  @Input() post!: Post;
  @Input() postUpdated!: EventEmitter<Post>;

  @ViewChild(CompletePostFormComponent) completePostFormComponent!: CompletePostFormComponent;

  initialData: any = {};

  constructor(private postService: PostService, private categoryService: CategoryService, private modalService: ModalService, private toastService: ToastService, private router: Router) { }

  ngOnInit(): void {
    this.fetchInitialData();
  }

  fetchInitialData(): void {
    this.initialData = {
      id: this.post.id,
      title: this.post.title,
      category: this.post.category.name,
      content: this.post.content,
      createdDate: this.toIsoString(this.post.createdDate)
    }
  }

  submitForm(formData: any): void {
    const postCreation: PostWithoutCreatedDate = {
      id: this.post.id,
      title: formData.title,
      content: formData.content,
      categoryId: formData.categoryId
    };

    this.postService.updatePost(postCreation).subscribe({
      next: (updatePost) => {
        this.toastService.showSuccessToast("Post successfully updated!");
        this.modalService.close();
        this.postUpdated.emit(updatePost);
      },
      error: () => {
        this.modalService.close();
      }
    });
  }

  triggerFormSubmit(): void {
    if (this.completePostFormComponent) {
      this.completePostFormComponent.onSubmit();
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

  toIsoString(date: Date): string {
    const temp: Date = new Date(date);
    const pad = (number: number) => String(number).padStart(2, '0');

    return `${temp.getFullYear()}-${pad(temp.getMonth() + 1)}-${pad(temp.getDate())} ${pad(temp.getHours())}:${pad(temp.getMinutes())}:${pad(temp.getSeconds())}`;
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

}
