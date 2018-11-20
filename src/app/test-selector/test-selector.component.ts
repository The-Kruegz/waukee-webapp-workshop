import { Component, OnInit, ViewChild } from '@angular/core';
import { ISample } from '../sample';
import { ICart } from '../cart';
import { ITest } from '../test';
import { ITestPackage } from '../testPackage';
import { CartService } from '../cart.service';
import { Subscription }   from 'rxjs';
import { MatTable } from '@angular/material';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {FormControl} from '@angular/forms';



@Component({
    selector: 'app-test-selector',
    templateUrl: './test-selector.component.html',
    styleUrls: ['./test-selector.component.css']
})
export class TestSelectorComponent implements OnInit {

    displayedColumns: string[] = ['name', 'tests'];
    cart: ICart = <ICart>({samples: []});
    cartSubscription: Subscription;
    selectedSample: string = "";
    tests: <ITest>[] = [];    
    testPackages: <ITestPackage>[] = [];
    searchBarFormControl = new FormControl('');
//    nestedTreeControl: NestedTreeControl<FileNode>;
//    nestedDataSource: MatTreeDataSource<ITestPackage>;



constructor(private _cartService: CartService) { }

@ViewChild(MatTable) table: MatTable<any>;

ngOnInit() {

    this.tests.push(
        {
            name: "DDT",
            resultDate: "7/3"
        }
    );
    this.tests.push(
        {
            name: "DNA",
            resultDate: "9/7"
        }
    );
    this.testPackages.push(
        {
            name: "cold properties",
            tests: [
                {
                    name: "cloud point",
                    resultDate: "3/2"
                },
                {
                    name: "freeze point",
                    resultDate: "7/4"
                },
                {
                    name: "FBT",
                    resultDate: "7/5"
                },
                {
                    name: "kerosene value",
                    resultDate: "7/5"
                }
            ]
        }
    );

    this.cartSubscription = this._cartService.getCartObservable().subscribe(
        data => {
            this.cart = data;
            this.table.renderRows();
        }
    );

}

rowClicked(sample) {
    this.selectedSample = sample.name;
}

}
