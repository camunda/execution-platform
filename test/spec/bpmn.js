import {
  bootstrapModeler,
  getBpmnJS
} from 'bpmn-js/test/helper';

import ExecutionPlatformModule from '../..';
import ModelerModdleExtension from 'modeler-moddle/resources/modeler.json';

var bpmnXML = require('../fixtures/bpmn/cloud.bpmn');
var missingExecutionPlatformXML = require('../fixtures/bpmn/missing-execution-platform.bpmn');


describe('execution-platform (BPMN)', function() {

  beforeEach(bootstrapModeler(bpmnXML, {
    additionalModules: [
      ExecutionPlatformModule
    ],
    moddleExtensions: {
      modeler: ModelerModdleExtension
    }
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


  it('should set execution platform details', function() {

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


  it('should undo execution platform change', function() {

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


  describe('missing execution-platform', function() {

    beforeEach(bootstrapModeler(missingExecutionPlatformXML, {
      additionalModules: [
        ExecutionPlatformModule
      ],
      moddleExtensions: {
        modeler: ModelerModdleExtension
      }
    }));

    it('should return null if execution platform details not present', function() {

      // given
      var bpmnJS = getBpmnJS();
      var executionPlatformHelper = bpmnJS.get('executionPlatform');

      // when
      var executionPlatform = executionPlatformHelper.getExecutionPlatform();

      // then
      expect(executionPlatform).to.be.null;
    });


    it('should set execution platform with correct namespace', async function() {

      // given
      var bpmnJS = getBpmnJS();
      var executionPlatformHelper = bpmnJS.get('executionPlatform');

      // when
      executionPlatformHelper.setExecutionPlatform({
        name: 'Camunda Platform',
        version: '7.16.0'
      });

      // then
      var result = await bpmnJS.saveXML();

      expect(result.xml).to.contain('xmlns:modeler="http://camunda.org/schema/modeler/1.0"');
      expect(result.xml).to.contain('modeler:executionPlatform="Camunda Platform"');
      expect(result.xml).to.contain('modeler:executionPlatformVersion="7.16.0"');
    });
  });


  describe('setting execution platform imperatively on save', function() {

    beforeEach(bootstrapModeler(missingExecutionPlatformXML, {
      additionalModules: [
        ExecutionPlatformModule
      ],
      moddleExtensions: {
        modeler: ModelerModdleExtension
      },
      executionPlatform: {
        name: 'Camunda Platform',
        version: '7.16.0'
      }
    }));


    it('should set execution platform on saveXML', async function() {

      // given
      var bpmnJS = getBpmnJS();

      // when
      var result = await bpmnJS.saveXML();

      // then
      expect(result.xml).to.contain('xmlns:modeler="http://camunda.org/schema/modeler/1.0"');
      expect(result.xml).to.contain('modeler:executionPlatform="Camunda Platform"');
      expect(result.xml).to.contain('modeler:executionPlatformVersion="7.16.0"');
    });
  });
});

