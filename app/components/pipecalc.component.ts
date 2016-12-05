import { Component, OnInit }    from '@angular/core';
import { Observable }           from 'rxjs/Observable';

import { TriplestoreService }   from '../services/triplestore.service';
import { Query, UpdateTriple, SchemaData }  from '../services/triplestore.interface';

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
    updateQuery: Query = {
        db: this.db,
        query: '',
        reasoning: false,
        accept: 'text/boolean',
        contentType: 'application/x-www-form-urlencoded'
    }

    schemaData:     Observable<any>;
    errorMessage:   string;
    updateTriple:   UpdateTriple[];

    // Inject private instance of TriplestoreService into constructor
    constructor( private _queryService: TriplestoreService) { }

    ngOnInit(){
        // Get schema and pipe data
        this.refreshData();
    }

    refreshData() {
        // Refresh schema and pipe data
        this._queryService.getQueryResult(this.schemaQuery)
            .subscribe(
                res => this.schemaData = res,
                error =>  this.errorMessage = error);
        console.log('Refreshed data');
    }

    toggleReasoning(){
        // The reasoning property is set to the opposite of what it currently is
        this.schemaQuery.reasoning = !this.schemaQuery.reasoning;
        this.refreshData();
    }

    performUpdate() {
        // Refresh schema and pipe data
        this._queryService.getQueryResult(this.updateQuery)
            .subscribe(
                res => {
                    console.log(res);
                    this.refreshData();
                },
                error =>  this.errorMessage = error);
    }
    
    updateProperty(event:any) {
        // Recieve changed data and update the queryUpdate object
        var key = event.target.name;
        var newVal = event.target.value;

        // Filter schemaData to get existing values
        var exist = this.schemaData['results']['bindings'].filter(x => x['property']['value'] == key)[0];
        
        // If there is an existing value, store it in a variable
        var existVal = exist.val ? exist.val.value : null;

        // DELETION
        if (newVal.length === 0) {
            // If there was an existing value in the field, this should be deleted
            if(!existVal) {
                //If there was not already an existing value, nothing should be done
                return;
            } else {
                // If there was an existing value, this value should be deleted
                this.updateQuery.query = `DELETE WHERE { p:pipeA <`+key+`> `+existVal+` }`;
                this.performUpdate();
                console.log('Performed deletion query');
            }
        } else {
            // INSERTION
            // If there was not already an existing value, a new one will be created
            if(!existVal) {
                this.updateQuery.query = `INSERT DATA { p:pipeA <`+key+`> `+newVal+` }`;
                this.performUpdate();
                console.log('Performed insertion query');
            } else {
                // UPDATE
                if(existVal != newVal) {
                    this.updateQuery.query = `
                        DELETE { p:pipeA <`+key+`> `+existVal+` }
                        INSERT { p:pipeA <`+key+`> `+newVal+` }
                        WHERE { p:pipeA <`+key+`> `+existVal+` }
                    `;
                    this.performUpdate();
                    console.log('Performed update query');
                }
            }
        }

    }

}