import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs';
import {ICart} from './cart'


@Injectable({
    providedIn: 'root'
})
export class CartService {

    private cart = new Subject<ICart>();

    constructor() { 
        this.cart.next( <ICart>({samples: []}) );
    }
    
    getCartObservable() {
        return this.cart.asObservable();
    }
    
    updateCart(newCart: ICart) {
        this.cart.next(newCart);
    }
}
