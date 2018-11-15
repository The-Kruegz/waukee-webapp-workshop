import { Component, OnInit, ViewChild } from '@angular/core';
import { ISample } from '../sample';
import { MatTable } from '@angular/material';


@Component({
    selector: 'app-sample-specifier',
    templateUrl: './sample-specifier.component.html',
    styleUrls: ['./sample-specifier.component.css']
})
export class SampleSpecifierComponent implements OnInit {
    
    samples: ISample[] = [];
    displayedColumns: string[] = ['name', 'description', 'button'];
    nameInput: string;
    descriptionInput: string;
    
    constructor() { }

    ngOnInit() {
        this.samples.push({id: 1, name: 'FQT', description: 'from report', packages: [], tests: []});
    }

    @ViewChild(MatTable) table: MatTable<any>;

    removeSample(sample: ISample) {
        this.samples.splice(this.samples.indexOf(sample), 1);
        this.table.renderRows();
    }

    addSample() {
        this.samples.push({name: this.nameInput, description: this.descriptionInput, packages: [], tests: []})
        this.table.renderRows();
    }

}
