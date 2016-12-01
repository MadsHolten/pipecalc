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

    schemaData:     Observable<string[]>;
    errorMessage:   string;
    updateTriple:   UpdateTriple[];

    // Inject private instance of TriplestoreService into constructor
    constructor( private _queryService: TriplestoreService) { }

    ngOnInit() {
        // Get schema
        this._queryService.getQueryResult(this.schemaQuery)
            .subscribe(
                res => this.schemaData = res,
                error =>  console.log(<any>error));
    }

    toggleReasoning(){
        // The reasoning property is set to the opposite of what it currently is
        this.schemaQuery.reasoning = !this.schemaQuery.reasoning;
        this.refreshData();
    }

    refreshData() {
        this._queryService.getQueryResult(this.schemaQuery)
            .subscribe(
                res => this.schemaData = res,
                error =>  console.log(<any>error));
    }
    
    update(event:any){

        var db = this.db;
        var property = event.target.name;
        var newVal = event.target.value;

        console.log(db, property, newVal);

    // this._queryService.update(db:string, property:string, newVal:string)
    //         .subscribe(
    //             res => console.log(res),
    //             error =>  console.log(<any>error));
    // }

}