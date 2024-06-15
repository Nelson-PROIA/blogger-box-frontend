
import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private datePipe: DatePipe) { }

  /**
   * Format the created date of the post.
   * 
   * @param {Date} createdDate The creation date of the post.
   * @returns {string} Formatted string representing the creation date.
   */
formatCreatedDate(createdDate: Date): string {
    const currentDate = new Date();
    const date = new Date(createdDate);
  
    const differenceInSeconds = Math.floor((currentDate.getTime() - date.getTime()) / 1000);
  
    if (differenceInSeconds < 60) {
      return 'Posted just now';
    }
  
    const differenceInMinutes = Math.floor(differenceInSeconds / 60);
  
    if (differenceInMinutes < 60) {
      return `Posted ${differenceInMinutes} minute${differenceInMinutes > 1 ? 's' : ''} ago`;
    }
  
    const differenceInHours = Math.floor(differenceInMinutes / 60);
  
    if (differenceInHours < 24) {
      return `Posted ${differenceInHours} hour${differenceInHours > 1 ? 's' : ''} ago`;
    }
  
    const differenceInDays = Math.floor(differenceInHours / 24);
  
    if (differenceInDays === 1) {
      return 'Posted yesterday';
    } else if (differenceInDays < 7) {
      return `Posted ${differenceInDays} days ago`;
    } else if (differenceInDays === 7) {
      return 'Posted 1 week ago';
    } else {
      return this.datePipe.transform(createdDate, 'medium') || '';
    }
  } 

}

 