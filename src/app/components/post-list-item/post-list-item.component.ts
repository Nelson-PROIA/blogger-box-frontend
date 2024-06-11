import { Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common';

import { Post } from '../../data/post';

/**
 * Component to display a single post item.
 */
@Component({
  selector: 'app-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.css'],
  providers: [DatePipe]
})
export class PostListItemComponent {

  /** 
   * Input property to receive the post data. 
   */
  @Input() post!: Post;

  /**
   * Constructor injecting DatePipe for date formatting.
   * 
   * @param {DatePipe} datePipe Angular's DatePipe module.
   */
  constructor(private datePipe: DatePipe) {}

  /**
   * Format the created date of the post.
   * 
   * @param {Date} createdDate The creation date of the post.
   * @returns {string} Formatted string representing the creation date.
   */
  formatCreatedDate(createdDate: Date): string {
    const currentDate = new Date();
    const differenceInDays = Math.floor((currentDate.getTime() - createdDate.getTime()) / (1000 * 3600 * 24));

    if (differenceInDays === 0) {
      return 'Posted today';
    } else if (differenceInDays === 1) {
      return 'Posted yesterday';
    } else if (differenceInDays < 7) {
      return `Posted ${differenceInDays} days ago`;
    } else if (differenceInDays === 7) {
      return 'Posted 1 week ago';
    } else {
      const formattedDate = this.datePipe.transform(createdDate, 'medium');
      return formattedDate || '';
    }
  }

}
