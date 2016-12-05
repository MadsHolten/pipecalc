export interface Query {
  accept?: string;
  contentType?: string;
  db: string;
  query: string;
  reasoning: boolean;
}

export class Ontologies {
  id: string;
  name: string;
  graphUrl: string;
  docUrl: string;
  baseUri: string;
  dependencies?: string[];
}

// Interface for schemaData
export interface Head {
  vars: string[];
}

export interface Res {
  type: string;
  value: string;
  datatype?: string;
  'xml:lang'?: string;
}

export interface Bindings {
  property: Res;
  label?: Res;
  val?: Res;
}

export interface Results {
  bindings: Bindings;
}

export interface SchemaData {
  head: {vars: string[]};
  results: Results;
}