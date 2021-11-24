import {
  bootstrapModeler,
  getBpmnJS
} from 'bpmn-js/test/helper';

import ExecutionPlatformModule from '..';

var bpmnXML = require('./cloud.bpmn');


describe('execution-platform', function() {

  beforeEach(bootstrapModeler(bpmnXML, {
    additionalModules: [
      ExecutionPlatformModule
    ]
  }));


  it('should expose execution platform details', function() {

    // given
    var bpmnJS = getBpmnJS();
    var executionPlatformHelper = bpmnJS.get('executionPlatform');

    // when
    var executionPlatform = executionPlatformHelper.getExecutionPlatform();

    // then
    expect(executionPlatform).to.have.property('name', 'Camunda Cloud');
    expect(executionPlatform).to.have.property('version', '1.0.0');
  });


  it.only('should set execution platform details', function() {

    // given
    var bpmnJS = getBpmnJS();
    var executionPlatformHelper = bpmnJS.get('executionPlatform');

    // when
    executionPlatformHelper.setExecutionPlatform({
      name: 'Camunda Platform',
      version: '7.16.0'
    });

    // then
    var executionPlatform = executionPlatformHelper.getExecutionPlatform();
    expect(executionPlatform).to.have.property('name', 'Camunda Platform');
    expect(executionPlatform).to.have.property('version', '7.16.0');
  });


  it.only('should undo execution platform change', function() {

    // given
    var bpmnJS = getBpmnJS();
    var executionPlatformHelper = bpmnJS.get('executionPlatform');
    var commandStack = bpmnJS.get('commandStack');

    // when
    executionPlatformHelper.setExecutionPlatform({
      name: 'Camunda Platform',
      version: '7.16.0'
    });
    commandStack.undo();

    // then
    var executionPlatform = executionPlatformHelper.getExecutionPlatform();
    expect(executionPlatform).to.have.property('name', 'Camunda Cloud');
    expect(executionPlatform).to.have.property('version', '1.0.0');
  });
});
