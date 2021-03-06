> As of v0.3.0, this package has been renamed from @bpmn-io/execution-platform to @camunda/execution-platform. Read more on the changes in [the issue](https://github.com/bpmn-io/execution-platform/issues/1).

# @camunda/execution-platform

[![CI](https://github.com/camunda/execution-platform/workflows/CI/badge.svg)](https://github.com/camunda/execution-platform/actions?query=workflow%3ACI)

Set `executionPlatform` and `executionPlatformVersion` in your BPMN and DMN diagrams.

## Usage

### bpmn-js

```javascript
import BpmnModeler from 'bpmn-js/lib/Modeler';

import ExecutionPlatformModule from '@camunda/execution-platform';
import ModelerModdleExtension from 'modeler-moddle/resources/modeler.json';


// extend the BPMN editor with the module and moddle extension
var modeler = new BpmnModeler({
  additionalModules: [
    ExecutionPlatformModule
  ],
  moddleExtensions: {
    modeler: ModelerModdleExtension
  }
});

var executionPlatformHelper = modeler.get('executionPlatform');

executionPlatformHelper.setExecutionPlatform({ name: 'Camunda Cloud', version: '1.3.0' });

var executionPlatform = executionPlatformHelper.getExecutionPlatform();

// { name: 'Camunda Cloud', version: '1.3.0' }
console.log(executionPlatform);

// see the meta-data appear on save
modeler.saveXML(function(err, xml) {

  xml; // ... <bpmn:Definitions ... modeler:executionPlatform="Camunda Cloud" modeler:executionPlatformVersion="1.3.0">...
});
```

You can also configure the extension so that the execution platform details are set
imperatively each time you save the diagram:

```javascript
import BpmnModeler from 'bpmn-js/lib/Modeler';

import ExecutionPlatformModule from '@camunda/execution-platform';
import ModelerModdleExtension from 'modeler-moddle/resources/modeler.json';

// extend the BPMN editor with the module and moddle extension together with configuration
var modeler = new BpmnModeler({
  additionalModules: [
    ExecutionPlatformModule
  ],
  moddleExtensions: {
    modeler: ModelerModdleExtension
  },
  executionPlatform: {
    name: 'Camunda Cloud',
    version: '1.3.0'
  }
});

// see the meta-data appear on save
modeler.saveXML(function(err, xml) {

  xml; // ... <bpmn:Definitions ... modeler:executionPlatform="Camunda Cloud" modeler:executionPlatformVersion="1.3.0">...
});
```

### dmn-js

```javascript
import DmnModeler from 'dmn-js/lib/Modeler';

import ExecutionPlatformModule from '@camunda/execution-platform';
import ModelerModdleExtension from 'modeler-moddle/resources/dmn-modeler.json';


// extend the DMN editor with the module and moddle extension
var modeler = new DmnModeler({
  drd: {
    additionalModules: [
      ExecutionPlatformModule
    ]
  },
  decisionTable: {
    additionalModules: [
      ExecutionPlatformModule
    ]
  },
  literalExpression: {
    additionalModules: [
      ExecutionPlatformModule
    ]
  },
  moddleExtensions: {
    modeler: ModelerModdleExtension
  }
});

var executionPlatformHelper = modeler.getActiveViewer().get('executionPlatform');

executionPlatformHelper.setExecutionPlatform({ name: 'Camunda Cloud', version: '1.3.0' });

var executionPlatform = executionPlatformHelper.getExecutionPlatform();

// { name: 'Camunda Cloud', version: '1.3.0' }
console.log(executionPlatform);

// see the meta-data appear on save
modeler.saveXML(function(err, xml) {

  xml; // ... <dmn:Definitions ... modeler:executionPlatform="Camunda Cloud" modeler:executionPlatformVersion="1.3.0">...
});
```

You can also configure the extension so that the execution platform details are set
imperatively each time you save the diagram:

```javascript
import DmnModeler from 'dmn-js/lib/Modeler';

import ExecutionPlatformModule from '@camunda/execution-platform';
import ModelerModdleExtension from 'modeler-moddle/resources/dmn-modeler.json';

// extend the DMN editor with the module and moddle extension together with configuration
var modeler = new DmnModeler({
  drd: {
    additionalModules: [
      ExecutionPlatformModule
    ]
  },
  decisionTable: {
    additionalModules: [
      ExecutionPlatformModule
    ]
  },
  literalExpression: {
    additionalModules: [
      ExecutionPlatformModule
    ]
  },
  moddleExtensions: {
    modeler: ModelerModdleExtension
  },
  executionPlatform: {
    name: 'Camunda Cloud',
    version: '1.3.0'
  }
});

// see the meta-data appear on save
modeler.saveXML(function(err, xml) {

  xml; // ... <dmn:Definitions ... modeler:executionPlatform="Camunda Cloud" modeler:executionPlatformVersion="1.3.0">...
});
```
## License

MIT
