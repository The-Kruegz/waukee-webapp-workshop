import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatTreeModule} from '@angular/material/tree';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';

import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {UserService} from './user.service';
import {CartService} from './cart.service';

import { AppComponent } from './app.component';
import { UserSearchComponent } from './user-search/user-search.component';
import { LoginComponent } from './login/login.component';
import { CatalogComponent } from './catalog/catalog.component';
import { SampleSpecifierComponent } from './sample-specifier/sample-specifier.component';
import { TestSelectorComponent } from './test-selector/test-selector.component';
import { CartReviewComponent } from './cart-review/cart-review.component';

@NgModule({
    declarations: [
        AppComponent,
        UserSearchComponent,
        LoginComponent,
        CatalogComponent,
        SampleSpecifierComponent,
        TestSelectorComponent,
        CartReviewComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        MatInputModule,
        MatFormFieldModule,
        MatAutocompleteModule,
        MatTabsModule,
        MatButtonModule,
        MatTableModule,
        MatTreeModule,
        MatListModule,
        MatDividerModule,
        MatIconModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
    providers: [UserService, CartService],
    bootstrap: [AppComponent]
})
export class AppModule { }
