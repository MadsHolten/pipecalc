export interface Query {
  accept?: string;
  contentType?: string;
  db: string;
  query: string;
  reasoning: boolean;
}

export interface UpdateTriple {
  accept?: string;
  db: string;
  property: string;
  newVal: string;
  oldVal?: string;
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