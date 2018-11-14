import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
    selector: 'app-catalog',
    templateUrl: './catalog.component.html',
    styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

    isLinear = false;
    samplesFormGroup: FormGroup;
    testsFormGroup: FormGroup;

    constructor(private _formBuilder: FormBuilder) { }

    //   this.orders = [packageName: "cold properties", tests: [
    //                 {name:"freezing point", resultTime: "3/7"}, 
    //                 {name:"FBT", resultTime: "2/5"},
    //                 {name:"KV", resultTime: "2/5"}],
    //                 packageName: "general", tests: [
    //                 {name:"t2", resultTime: "3/7"}, 
    //                 {name:"fzcontent", resultTime: "2/5"},
    //                 {name:"KV", resultTime: "2/5"}]]

    ngOnInit() {
        
        this.samplesFormGroup = this._formBuilder.group({
            firstCtrl: ['', Validators.required]
        });
        this.testsFormGroup = this._formBuilder.group({
            secondCtrl: ['', Validators.required]
        });
    }

}
