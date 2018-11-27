import { Component, OnInit, ViewChild } from '@angular/core';
import { ISample } from '../sample';
import { ICart } from '../cart';
import { ITest } from '../test';
//import {TestSelectorNode} from '../treeNode'
import { ITestPackage } from '../testPackage';
import { CartService } from '../cart.service';
import { Subscription }   from 'rxjs';
import { MatTable } from '@angular/material';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {FormControl} from '@angular/forms';

export class TestSelectorNode {
    label: string;
    selected: boolean;
    children: TestSelectorNode[];
}

@Component({
    selector: 'app-test-selector',
    templateUrl: './test-selector.component.html',
    styleUrls: ['./test-selector.component.css']
})
export class TestSelectorComponent implements OnInit {

    displayedColumns: string[] = ['name', 'tests'];
    cart: ICart = <ICart>({samples: []});
    cartSubscription: Subscription;
    selectedSample: string = '';
    tests: ITest[] = [];
    testPackages: ITestPackage[] = [];
    treeData: TestSelectorNode[] = [];
    searchBarFormControl = new FormControl('');
    nestedTreeControl: NestedTreeControl<TestSelectorNode>;
    nestedDataSource: MatTreeNestedDataSource<TestSelectorNode>;
    selected: string[] = [];


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

        this.tests.forEach( test => {
            this.treeData.push({
                label: test.name, selected: false, children:[]
            })
        });

        this.testPackages.forEach( testPackage => {
            var newChildren: TestSelectorNode[] = [];
            testPackage.tests.forEach( test => {
                newChildren.push({label: test.name, selected:false, children:[]})
            })
            this.treeData.push({label: testPackage.name, selected: false, children: newChildren})
        });
        console.log(this.treeData);

        this.nestedTreeControl = new NestedTreeControl<TestSelectorNode>(this._getChildren);
        this.nestedDataSource = new MatTreeNestedDataSource();

        this.cartSubscription = this._cartService.getCartObservable().subscribe(
            data => {
                this.cart = data;
                this.table.renderRows();
            }
        );
        this.nestedDataSource.data = this.treeData;
    }

    rowClicked(sample) {
        if (this.selectedSample == sample.name) {
            this.selectedSample = '';
        } else {
            this.selectedSample = sample.name;
        }
    }

    private _getChildren (node: TestSelectorNode) {
        return node.children;
    }

    hasNestedChild (index: number, node: TestSelectorNode) {
        if (node.children.length > 0) return true;
        else return false;
    }

    noNestedChildren (index: number, node: TestSelectorNode) {
        if (node.children.length == 0) return true;
        else return false;
    }

    select(node: TestSelectorNode): void {
        console.log('selected: ' + node.label);
        node.selected = true;
        // if it has children, select them all
        if (node.children.length > 0) {
            node.children.forEach( childNode => {
                childNode.selected = true;
            });
        } else {
        // if it does not have children, check if the selection completes a package, if so, select the package
            this.treeData.forEach(rootNode => {
                let numChildren = rootNode.children.length;
                if (numChildren > 0) {
                    let numSelected = 0;
                    rootNode.children.forEach( childNode => {
                        if (childNode.selected === true) numSelected++;
                    })
                    if (numChildren === numSelected) rootNode.selected = true;
                }
            })
        }
    }

    deselect(node: TestSelectorNode): void {
        console.log('selected: ' + node.label);
        node.selected = false;
        // if it has children, deselect them all
        if (node.children.length > 0){
            node.children.forEach( childNode => {
                childNode.selected = false;
            })
        } else {
        // if it does not have children, check if the selection is in a selected package, if so, deselect the package
            this.treeData.forEach(rootNode => {
                let numChildren = rootNode.children.length;
                if (numChildren > 0) {
                    let numSelected = 0;
                    rootNode.children.forEach( childNode => {
                        if (childNode.selected === true) numSelected++;
                    })
                    if (numChildren != numSelected) rootNode.selected = false;
                }
            })
        }
    }

//selectTest(node: ITestPackage | ITest): void {
//    console.log("selected: " + node.name);
//    if (typeof node === ITest) {
//        this.cart.samples.find(sample => sample.name === this.selectedSample).tests.push(node)
//    }
//    if (typeof node === ITestPackage) {
//        this.cart.samples.find(sample => sample.name === this.selectedSample).packages.push(node)
//    }
//}

//deselectTest(node: ITestPackage | ITest): void {
//    if (typeof node === ITest) {
//        console.log("deselected test: " + node.name);
//        this.cart.samples.find(sample => sample.name === this.selectedSample).tests.forEach( (test, index) =>  {
//            if (test.name === node.name) {
//                this.cart.samples.find(sample => sample.name === this.selectedSample).tests.splice(index, 1);
//            }
//        });
//    }
//    if (typeof node === ITestPackage) {
//        console.log("deselected package: " + node.name);
//        this.cart.samples.find(sample => sample.name === this.selectedSample).packages.forEach( (package, index) =>  {
//            if (package.name === node.name) {
//                this.cart.samples.find(sample => sample.name === this.selectedSample).packages.splice(index, 1);
//            }
//        });
//    }
//}
}