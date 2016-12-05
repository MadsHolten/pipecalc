import { Ontologies } from './triplestore.interface';

export const ExtOnts: Ontologies[] = [
    {   id: 'qudt20_schema', 
        name: 'QUDT 2.0 schema', 
        graphUrl: 'http://www.qudt.org/2.0/schema/SCHEMA_QUDT-v2.0.ttl',
        docUrl: 'http://qudt.org/doc/2016/DOC_SCHEMA-QUDT-v2.0.html',
        baseUri: 'http://qudt.org/2.0/schema/qudt'
    },
    {   id: 'qudt11_schema', 
        name: 'QUDT 1.1 schema', 
        graphUrl: 'http://qudt.org/1.1/schema/OSG_qudt-(v1.01).ttl',
        docUrl: 'http://www.linkedmodel.org/doc/qudt/1.1/index.html',
        baseUri: 'http://qudt.org/1.1/schema/qudt'
    },
    {   id: 'qudt11_vocab_unit', 
        name: 'QUDT 1.1 vocabulary - Units', 
        graphUrl: 'http://qudt.org/1.1/vocab/OVG_units-qudt-(v1.1).ttl',
        docUrl: 'http://www.linkedmodel.org/doc/qudt-vocab-units/1.1/index.html',
        baseUri: 'http://qudt.org/1.1/vocab/unit'
    },
    {   id: 'qudt11_vocab_quantity', 
        name: 'QUDT 1.1 vocabulary - Quantities', 
        graphUrl: 'http://qudt.org/1.1/vocab/OVG_quantities-qudt-(v1.1).ttl',
        docUrl: 'http://www.linkedmodel.org/doc/qudt-vocab-quantities/1.1/index.html',
        baseUri: 'http://qudt.org/1.1/vocab/quantity'
    },
    {   id: 'qudt11_vocab_dimension', 
        name: 'QUDT 1.1 vocabulary - Dimensions', 
        graphUrl: 'http://qudt.org/1.1/vocab/OVG_dimensions-qudt-(v1.1).ttl',
        docUrl: 'http://www.linkedmodel.org/doc/qudt-vocab-dimensions/1.1/index.html',
        baseUri: 'http://qudt.org/1.1/vocab/dimension'
    },
    {   id: 'qudt11_vocab_dimensionalunit', 
        name: 'QUDT 1.1 vocabulary - Dimensional units', 
        graphUrl: 'http://qudt.org/1.1/vocab/OVG_dimensionalunits-qudt-(v1.1).ttl',
        docUrl: 'http://www.linkedmodel.org/doc/qudt-dimensionalunit/1.1/index.html',
        baseUri: 'http://qudt.org/1.1/vocab/dimensionalunit'
    },
    {   id: 'ifc4', 
        name: 'ifcOWL IFC4', 
        graphUrl: 'http://ifcowl.openbimstandards.org/IFC4.ttl',
        docUrl: 'http://ifcowl.openbimstandards.org/IFC4/index.html',
        dependencies: ['express', 'list'],
        baseUri: 'http://ifcowl.openbimstandards.org/IFC4'
    },
    {   id: 'ifc4_add1', 
        name: 'ifcOWL IFC4_ADD1', 
        graphUrl: 'http://ifcowl.openbimstandards.org/IFC4_ADD1.ttl',
        docUrl: 'http://ifcowl.openbimstandards.org/IFC4_ADD1/index.html',
        dependencies: ['express', 'list'],
        baseUri: 'http://ifcowl.openbimstandards.org/IFC4_ADD1'
    },
    {   id: 'ifc2x3_tc1', 
        name: 'ifcOWL IFC2X3_TC1', 
        graphUrl: 'http://ifcowl.openbimstandards.org/IFC2X3_TC1.ttl',
        docUrl: 'http://ifcowl.openbimstandards.org/IFC2X3_TC1/index.html',
        dependencies: ['express', 'list'],
        baseUri: 'http://ifcowl.openbimstandards.org/IFC2X3_TC1'
    },
    {   id: 'ifc2x3_final', 
        name: 'ifcOWL IFC2X3 Final', 
        graphUrl: 'http://ifcowl.openbimstandards.org/IFC2X3_Final.ttl', 
        docUrl: 'http://ifcowl.openbimstandards.org/IFC2X3_Final/index.html',
        dependencies: ['express', 'list'],
        baseUri: 'http://ifcowl.openbimstandards.org/IFC2X3_Final'
    },
    {   id: 'express', 
        name: 'EXPRESS', 
        graphUrl: 'https://users.ugent.be/~pipauwel/ontologies/express_W3ID/20151211/express.ttl',
        docUrl: 'https://users.ugent.be/~pipauwel/ontologies/express_W3ID/20151211/index.html',
        baseUri: 'https://w3id.org/express'
    },
    {   id: 'list', 
        name: 'LIST', 
        graphUrl: 'https://users.ugent.be/~pipauwel/ontologies/list_W3ID/20151211/list.ttl', 
        docUrl: 'https://users.ugent.be/~pipauwel/ontologies/list_W3ID/20151211/index.html',
        baseUri: 'https://w3id.org/list'
    },
    {   id: 'saref', 
        name: 'SAREF: The Smart Appliances REFerence ontology', 
        graphUrl: 'http://ontology.tno.nl/saref.ttl', 
        docUrl: 'http://ontology.tno.nl/saref/',
        baseUri: 'https://w3id.org/saref'
    },
    {   id: 'bot', 
        name: 'BOT: Building Topology Ontology', 
        graphUrl: 'http://www.student.dtu.dk/~mhoras/bot/ontology.ttl', 
        docUrl: 'http://www.student.dtu.dk/~mhoras/bot/index-en.html',
        baseUri: 'http://linkedbuildingdata.net/bot'
    }
];