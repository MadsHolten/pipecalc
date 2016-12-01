export interface Query {
  accept?: string;
  db: string;
  query: string;
  reasoning: boolean;
}

export interface UpdateTriple {
  accept?: string;
  db: string;
  property: string;
  newVal: string;
}