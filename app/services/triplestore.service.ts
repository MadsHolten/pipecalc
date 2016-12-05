import { Injectable }   from '@angular/core';
import { Http, Headers, Response, URLSearchParams, RequestOptions } from '@angular/http';

import { Observable }   from 'rxjs/Observable';

import { Query, UpdateTriple, SchemaData } from './triplestore.interface';

@Injectable()
export class TriplestoreService {

    // Define variables for server connection
    queryUrl : string = 'http://localhost:5820';
    username : string = 'admin';
    password : string = 'admin';

    // Encode username and password in base-64
    auth : string = "Basic " + btoa(this.username + ":" + this.password);

    // Inject Http to private field
    constructor(private _http: Http) { }

    // Query the triple-store
    getQueryResult(args:Query) {
        let headers = new Headers();
        headers.append('authorization', this.auth);
        headers.append('accept', args.accept ? args.accept : 'application/sparql-results+json'); // Defaults to return json
        headers.append('content-type', args.contentType ? args.contentType : null);

        let params = new URLSearchParams();
        params.set('reasoning', args.reasoning ? 'true' : 'false'); // Convert boolean to string
        params.set('query', args.query);

        let options = new RequestOptions({ headers: headers, search: params });
        return this._http
            .get(this.queryUrl + '/'+args.db+'/query', options)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    updateTriple(args:UpdateTriple) {
        let headers = new Headers();
        headers.append('authorization', this.auth);
        headers.append('content-type', 'application/x-www-form-urlencoded');
        headers.append('accept', args.accept ? args.accept : 'text/boolean'); // Defaults to return json

        var query = `DELETE { p:pipeA <`+args.property+`> ?oldVal } 
                     INSERT { p:pipeA <`+args.property+`> `+args.newVal+` } 
                     WHERE { p:pipeA <`+args.property+`> ?oldVal }`;

        let params = new URLSearchParams();
        params.set('query', query);

        let options = new RequestOptions({ headers: headers, search: params });
        console.log(options);
        console.log(options.search.paramsMap);
        return this._http
            .get(this.queryUrl + '/'+args.db+'/query', options)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    // Handle errors
    private handleError (error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
            console.error(errMsg);
            return Observable.throw(errMsg);
    }

}