import { Component, OnInit, ViewChild } from '@angular/core';
import { ISample } from '../sample';
import { ICart } from '../cart';
import { CartService } from '../cart.service';
import { MatTable } from '@angular/material';


@Component({
    selector: 'app-sample-specifier',
    templateUrl: './sample-specifier.component.html',
    styleUrls: ['./sample-specifier.component.css']
})
export class SampleSpecifierComponent implements OnInit {

    displayedColumns: string[] = ['name', 'description', 'button'];
    nameInput: string;
    descriptionInput: string;
    cart: ICart = <ICart>({samples: []});

    constructor(private _cartService: CartService) { }

    ngOnInit() {
        
        this._cartService.getCartObservable().subscribe(
            data => {
                this.cart = data;
            }
        );
    }

    @ViewChild(MatTable) table: MatTable<any>;

    removeSample(sample: ISample) {
        this.cart.samples.splice(this.cart.samples.indexOf(sample), 1);
        this._cartService.updateCart(this.cart);
        this.table.renderRows();
    }

    addSample() {
        this.cart.samples.push(<ISample>({name: this.nameInput, description: this.descriptionInput, packages: [], tests: []}));
        this._cartService.updateCart(this.cart);
        this.table.renderRows();
    }

}
