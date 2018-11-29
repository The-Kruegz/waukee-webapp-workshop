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
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material';


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
    searchBarInput: string = '';
//    searchBarFormControl: FormControl;


    constructor(private _cartService: CartService, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) { 
        iconRegistry.addSvgIcon('unchecked-box', sanitizer.bypassSecurityTrustResourceUrl('assets/outline-check_box_outline_blank-24px.svg'));
        iconRegistry.addSvgIcon('checked-box', sanitizer.bypassSecurityTrustResourceUrl('assets/outline-check_box-24px.svg'));
        iconRegistry.addSvgIcon('expand-more', sanitizer.bypassSecurityTrustResourceUrl('assets/twotone-expand_more-24px.svg'));
        iconRegistry.addSvgIcon('expand-less', sanitizer.bypassSecurityTrustResourceUrl('assets/twotone-expand_less-24px.svg'));
    }

    @ViewChild(MatTable) table: MatTable<any>;

    ngOnInit() {
//        this.searchBarFormControl = new FormControl('');
//        this.searchBarFormControl.registerOnChange((newValue: any) => {
//            console.log(newValue);
//        });
        this.selectedSample = '';

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
                name: "Cold Properties",
                tests: [
                    {
                        name: "Cloud Point",
                        resultDate: "3/2"
                    },
                    {
                        name: "Freeze Point",
                        resultDate: "7/4"
                    },
                    {
                        name: "FBT",
                        resultDate: "7/5"
                    },
                    {
                        name: "Kerosene Value",
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
            let newChildren: TestSelectorNode[] = [];
            testPackage.tests.forEach( test => {
                newChildren.push({label: test.name, selected:false, children:[]})
            })
            this.treeData.push({label: testPackage.name, selected: false, children: newChildren})
        });

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
        this.reloadTree();
    }
    
    reloadTree() {
        if (this.selectedSample != '') {
            let sample = this.cart.samples.find(s => s.name === this.selectedSample);
            this.treeData.forEach( node => {
                if (node.children.length === 0) {
                    if (sample.tests.find(t => t.name === node.label) == undefined)
                        node.selected = false;
                    else node.selected = true;
                }
                else {
                    let testPackage = this.testPackages.find(p => p.name === node.label);
                    let testPackageInCart = sample.packages.find(p => p.name === node.label);
                    if (testPackageInCart == undefined) {
                        node.selected = false;
                        node.children.forEach(childNode => {
                            childNode.selected = false;
                        })
                    } 
                    else {
                        let numTestsInPackage = testPackage.tests.length;
                        let numTestsInPackageInCart = testPackageInCart.tests.length;
                        if (numTestsInPackage === numTestsInPackageInCart) {
                            node.selected = true;
                            node.children.forEach(childNode => {
                                childNode.selected = true;
                            })
                        }
                        else {
                            node.selected = false;
                            node.children.forEach(childNode => {
                                if (testPackageInCart.tests.find(t => t.name === childNode.label) == undefined)
                                    childNode.selected = false;
                                else 
                                    childNode.selected = true;
                            })
                        }              
                    }  
                }
            })
        } else {
            this.clearTreeSelections();
        }
    }
    
    clearTreeSelections() {
        this.treeData.forEach(node => {
            node.selected = false;
            if (node.children.length > 0) {
                node.children.forEach(childNode => {
                    childNode.selected = false;
                })
            }
        })
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
    
    applySelections() {
        
        let sample = this.cart.samples.find(sample => sample.name === this.selectedSample);
        
        // clearing the cart of tests
        let numTests = sample.tests.length;
        sample.tests.splice(0, numTests);
        console.log('clearing '+ numTests + 'tests')

        // clearing the cart of packages
        let numPackages = sample.packages.length;
        sample.packages.splice(0, numPackages);
        console.log('clearing '+ numPackages + 'packs')
        
        // adding selections made in tree to the cart
        this.treeData.forEach( node => {
            if (node.selected == true) {
                // when selection is not in any package
                if (node.children.length === 0) {
                    
                    // lookup test
                    let test = JSON.parse(JSON.stringify(this.tests.find( t => t.name === node.label)));
                    
                    // add to cart sample
                    sample.tests.push(test);
                    
                }
                // when a whole package is selected
                else {
                    let testPackage = JSON.parse(JSON.stringify(this.testPackages.find( p => p.name === node.label)));
                    sample.packages.push(testPackage);
                }
            }
            else {
                // when some tests in a package are selected, but not the whole package
                if (node.children.length > 0) {
                    let testPackage = JSON.parse(JSON.stringify(this.testPackages.find( t => t.name === node.label)));
                    node.children.forEach( childNode => {
                        if (childNode.selected == true) {
                            
                            let test = JSON.parse(JSON.stringify(this.testPackages.find( t => t.name === node.label).tests.find(t => t.name === childNode.label)));
                                                        
                            // if package is not in cart, add it and the test
                            if ( 
                                sample.packages.find( p => p.name === testPackage.name) == undefined
                            ) {
                                console.log('adding package '+ node.label);
                                
                                sample.packages.push(testPackage);
                                
                                console.log('clearing package '+ node.label);
                                
                                testPackage.tests.splice(0,testPackage.tests.length);
                                
                                console.log('verify clear ' + sample.packages.find(p => p.name === testPackage.name).tests.length);
                                
                                console.log('verify orig not clear ' + this.testPackages.find( p => p.name === testPackage.name).tests.length);
                                
                                console.log('adding test '+ test.name);
                                
                                // now I add the selected test back in
                                testPackage.tests.push(test);
                                
                                console.log('verify add ' + this.cart.samples.find( s => s.name === this.selectedSample).packages.find(p => p.name === node.label).tests.length);
                            }
                            // if package is in cart, we can just add this test if its not already there
                            else {
                                
                                console.log('adding test '+ test.name);
                                
                                testPackage.tests.push(test);
                            }
                        }
                    });
                }
            }
        })
        this._cartService.updateCart(this.cart);
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
    
    childContainsSeachInput(node: TestSelectorNode): boolean {
        let childMatches = false;
        node.children.forEach( childNode => {
            if (childNode.label.toLowerCase().includes(this.searchBarInput.toLowerCase()))
                childMatches = true;
        })
        return childMatches;
    }
    
    printCart() {
        console.log(this.cart);
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
}