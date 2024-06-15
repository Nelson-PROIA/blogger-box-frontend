import { Component, HostListener, OnInit, ViewChild } from '@angular/core'

import { Category } from '../../data/category';

import { ElementRef } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { CategoryService } from '../../services/category.service';

@Component({
    selector: 'app-category-list',
    templateUrl: './category-list.component.html',
    styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  @ViewChild('scrollToTop') scrollToTopRef?: ElementRef;
    @ViewChild('scrollToEnd') scrollToEndRef?: ElementRef;

    showTopButton = false;
    showBottomButton = false;

    categories: Category[] = [];

    constructor(private categoryService: CategoryService, private viewportScroller: ViewportScroller) { }

    ngOnInit(): void {
        this.loadCategories();
    }

    loadCategories(): void {
        this.categoryService.getCategories().subscribe(categories => {
            this.categories = categories;
        });
    }
    
    @HostListener('window:scroll')
    checkVisibility() {
      const scrollTop = window.scrollY;
      const scrollHeight = document.body.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
  
      this.showTopButton = scrollTop > 0;
      this.showBottomButton = scrollTop < scrollHeight - clientHeight;
    }
    
      scrollToTop() {
        this.viewportScroller.scrollToPosition([0, 0]);
      }
    
      scrollToEnd() {
        this.viewportScroller.scrollToPosition([0, document.body.scrollHeight]);
      }

      deleteCategory(categoryId: string) {
        this.categories = this.categories.filter(category => category.id !== categoryId);
      }
  
      updateCategory(category: Category) {
        const correspondPost = this.categories.find(c => c.id === category.id);
  
        if (correspondPost) {
          correspondPost.name = category.name;
        }
      }

}
