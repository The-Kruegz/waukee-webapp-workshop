import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Subscription }   from 'rxjs';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import { ICart } from '../cart';



@Component({
    selector: 'app-cart-review',
    templateUrl: './cart-review.component.html',
    styleUrls: ['./cart-review.component.css']
})
export class CartReviewComponent implements OnInit {

    cart: ICart = <ICart>({samples: []});
    cartSubscription: Subscription;

    constructor(private _cartService: CartService) { }

    ngOnInit() {

        this.cartSubscription = this._cartService.getCartObservable().subscribe(
            data => {
                console.log('new data')
                this.cart = data;
            }
        );
    }
    printCart() {
        console.log(this.cart);
    }

}
