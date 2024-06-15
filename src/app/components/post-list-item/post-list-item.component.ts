import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

import { Post, PostWithoutCreatedDate } from '../../data/post';
import { ConfirmationModalService } from '../../services/confirmation-modal.service';
import { ModalService } from '../../services/modal.service';
import { EditPostModalComponent } from '../edit-post-modal/edit-post-modal.component';
import { PostService } from '../../services/post.service';
import { UtilsService } from '../../services/utils.service';
import { ToastService } from '../../services/toast.service';
/**
 * Component to display a single post item.
 */
@Component({
  selector: 'app-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.css'],
  providers: [DatePipe]
})
export class PostListItemComponent implements OnInit {

  /** 
   * Input property to receive the post data. 
   */
  @Input() post!: Post;

  @Output() postDeleted = new EventEmitter<string>();
  @Output() postUpdated = new EventEmitter<Post>();

  formattedCreatedDate!: string;

  constructor(
    private postService: PostService,
    private confirmationModalService: ConfirmationModalService,
    private modalService: ModalService,
    private utilsService: UtilsService,
    private toastService: ToastService,
    private router: Router) {}

    ngOnInit(): void {
      this.formattedCreatedDate = this.utilsService.formatCreatedDate(this.post.createdDate);
    }

  delete() {
    var confirmationResultSubscription = this.confirmationModalService.confirmationResult$.subscribe(result => {
      if (result) {
        this.deletePost();
      }

      confirmationResultSubscription.unsubscribe();
    });

    this.confirmationModalService.requestConfirmation('Confirm deletion', 'Are you sure you want to delete this post?', 'Delete', 'danger');
  }

  deletePost() {
    this.postService.deletePost(this.post.id).subscribe({
      next: () => {
        this.postDeleted.emit(this.post.id);
        this.toastService.showSuccessToast('Post successfully deleted!');
      },
      error: (err) => {
        this.toastService.showErrorToast(err.error)
      }
    });
  }

  edit() {
    this.modalService.requestComponent(EditPostModalComponent, { 'post': this.post, 'postUpdated': this.postUpdated });
  }

  navigateToPostDetail(postId: string): void {
    this.router.navigate(['/posts', postId]);
  }

}
