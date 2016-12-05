import { Component, OnInit }    from '@angular/core';
import { Observable }           from 'rxjs/Observable';

import { MdSnackBar }           from '@angular/material';
import { TriplestoreService }   from '../services/triplestore.service';
import { ExtOnts }              from '../services/ontologies.service';
import { Query }                from '../services/triplestore.interface';

@Component({
    selector: 'named-graphs',
    providers: [ TriplestoreService ],
    template: `
        <md-progress-bar
            *ngIf="loading"
            class="app-progress"
            mode="indeterminate"
            aria-label="Indeterminate progress-bar example">
        </md-progress-bar>
        <h3 class="md-headline">Named graphs in database</h3>
        <p>Should be made with md-chips when available</p>
        <p>Adding from list should be done with md-autocomplete when available</p>
        <p>Clicking text should display more information about the ontology</p>
        <!-- Named Graphs in project -->
        <button disabled
            color="primary"
            md-raised-button 
            *ngFor="let item of namedGraphs?.results.bindings">
        <span class="namedGraph">
            <{{item?.g.value.split('tag:/').pop()}}>
        </span> <i 
            (click)="deleteNamespace($event)" 
            id="{{item?.g.value}}" 
            class="material-icons icon-pink">delete</i>
        </button>
        <hr/>
        <!-- Named graphs not in project -->
        <button disabled
            md-raised-button 
            *ngFor="let item of extOnts">
        <span class="namedGraph">
            <{{item.name}}>
        </span> <i 
            (click)="addNamespace($event)" 
            id="{{item.id}}" 
            class="material-icons icon-green">add_circle</i>
        </button>
    `,
    styles: [ `
        button {
            margin: 0px 10px 10px 0px;
        }
        .material-icons {
            color: #777;
            cursor: pointer;
        }
        .icon-pink:hover {
            color: deeppink;
        }
        .icon-green:hover {
            color: green;
        }
        .namedGraph:hover {
            cursor: pointer;
            color: black;
        } `
    ]
})
export class NamedGraphsComponent implements OnInit {

    db = 'pipe';
    loading = false;

    // Create instance of JS object
    extOnts = ExtOnts;

    // Initial data request
    getNamedGraphs: Query = {
        db: this.db,
        query: `
            SELECT DISTINCT ?g WHERE { 
	            GRAPH ?g { ?s ?p ?o } 
            }`,
        reasoning: false
    }

    updateQuery: Query = {
        db: this.db,
        query: '',
        reasoning: false,
        accept: 'text/boolean',
        contentType: 'application/x-www-form-urlencoded'
    }

    namedGraphs:    Observable<any>;
    errorMessage:   string;

    constructor( 
        private _queryService: TriplestoreService,
        private _snackbar: MdSnackBar 
    ) { }

    ngOnInit() { 
        // Refresh named graphs list
        this.refreshGraphlist();
    }

    showError(error:string) {
        this._snackbar.open(error, 'CLOSE');
    }

    refreshGraphlist() {
        this._queryService.getQueryResult(this.getNamedGraphs)
            .subscribe(
                res => this.namedGraphs = res,
                error =>  this.errorMessage = error);
        console.log('Retrieved named graphs');
    }

    performUpdate() {
        // Refresh schema and pipe data
        this._queryService.getQueryResult(this.updateQuery)
            .subscribe(
                res => {
                    console.log(res);
                    this.refreshGraphlist();
                    this.loading = false;
                },
                error =>  this.showError(error));
    }

    deleteNamespace(event:any){
        var graph = event.target.id;
        this.updateQuery.query = 'DELETE WHERE { GRAPH <'+graph+'> { ?s ?p ?o } }';
        this.performUpdate();
    }

    addNamespace(event:any){
        var id = event.target.id;
        var ontData = this.extOnts.filter(x => x.id == id)[0];
        var graphUrl = ontData.graphUrl;

        this.loading = true;
        this.updateQuery.query = 'LOAD <'+graphUrl+'> INTO GRAPH <'+id+'>';
        this.performUpdate();
    }

}