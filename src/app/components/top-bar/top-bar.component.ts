import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { NavigationEnd } from '@angular/router';

@Component({
    selector: 'app-top-bar',
    templateUrl: './top-bar.component.html',
    styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent {

    currentRoute!: string;

    constructor(private router: Router) {
        this.router.events.subscribe((event) => {
          if (event instanceof NavigationEnd) {
            this.currentRoute = this.router.url;
          }
        });
      }

      isNotPostsRoute() {
        return this.currentRoute && !this.currentRoute.includes('/posts');
      }

      goToCategories(): void {
        this.router.navigate(['categories'])
      }

    goToWritePost(): void {
        this.router.navigate(['write-post'])
    }

    goToHome(): void {
        this.router.navigate(['/']);
    }
    
}