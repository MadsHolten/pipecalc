import { Component, OnInit }    from '@angular/core';
import { Observable }           from 'rxjs/Observable';

import { TriplestoreService }   from '../services/triplestore.service';
import { Query, UpdateTriple }  from '../services/triplestore.interface';

@Component({
    moduleId: module.id,
    selector: 'pipecalc',
    templateUrl: 'pipecalc.component.html',
    providers: [ TriplestoreService ],
    styles: [`
        hr {
            color: red;
            margin-bottom: 1.5em;
        }
        .md-card {
            margin-bottom: 0.5em;
        }
    `]
})
export class PipeCalcComponent implements OnInit {

    db = 'pipe';

    // Initial data request
    schemaQuery: Query = {
        db: this.db,
        query: `
            SELECT DISTINCT * WHERE {
	        ?property rdfs:domain po:Pipe .
  	        OPTIONAL { ?property rdfs:label ?label }
            OPTIONAL { p:pipeA ?property ?val }
            }
            ORDER BY ASC(?label)`,
        reasoning: false
    }

    // Triple to update
    updateQuery: UpdateTriple = {
        db: this.db,
        property: '',
        newVal: ''
    }

    schemaData:     Observable<string[]>;
    errorMessage:   string;
    updateTriple:   UpdateTriple[];

    // Inject private instance of TriplestoreService into constructor
    constructor( private _queryService: TriplestoreService) { }

    ngOnInit() {
        // Get schema and pipe data
        this._queryService.getQueryResult(this.schemaQuery)
            .subscribe(
                res => this.schemaData = res,
                error =>  this.errorMessage = error);
    }

    toggleReasoning(){
        // The reasoning property is set to the opposite of what it currently is
        this.schemaQuery.reasoning = !this.schemaQuery.reasoning;
        this.refreshData();
    }

    refreshData() {
        // Refresh schema and pipe data
        this._queryService.getQueryResult(this.schemaQuery)
            .subscribe(
                res => this.schemaData = res,
                error =>  this.errorMessage = error);
    }
    
    updateProperty(event:any) {
        // Recieve changed data and update the queryUpdate object
        this.updateQuery.property = event.target.name;
        this.updateQuery.newVal = event.target.value;

        // Filter schemaData to get existing values
        var exist = this.schemaData.results.bindings.filter(x => x.property.value == this.updateQuery.property);

        // Check if property is defined. If defined, return exisitng value
        var existVal = exist[0].val ? exist[0].val : null;

        // Check if input is empty. If empty and input defined, it is a delete request
        var emptyVal = (event.target.value == '') ? true : false ;

        // If empty and no existing value, do nothing
        if (emptyVal && !existVal) return;

        // If empty and exisiting val, delete value
        

        console.log(existVal, emptyVal);

        // // Call service to update triple in database
        // this._queryService.update(this.updateQuery)
        //     .subscribe(
        //         res => null,
        //         error =>  {
        //             console.log(<any>error);
        //             this.errorMessage = error;
        //         });

        // // Return fresh data
        // this.refreshData();
    }

}