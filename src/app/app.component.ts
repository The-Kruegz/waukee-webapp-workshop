import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    
    pages = ["login", "user lookup", "catalog"];
    currentPage;
    title = 'sample-app';
    
    ngOnInit() {

        this.currentPage = this.pages[2];
    }
    
    goToPreviousPage() {
        let currentPageIndex = this.pages.indexOf(this.currentPage);
        if (currentPageIndex != 0) {
            let newPageIndex = currentPageIndex - 1;
            this.currentPage = this.pages[newPageIndex]
        }
    }
    
    goToNextPage() {
        let currentPageIndex = this.pages.indexOf(this.currentPage);
        if (currentPageIndex != (this.pages.length - 1)) {
            let newPageIndex = currentPageIndex + 1;
            this.currentPage = this.pages[newPageIndex]
        }
    }
}
