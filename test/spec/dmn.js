import Modeler from 'dmn-js/lib/Modeler';

import ExecutionPlatformModule from '../..';
import ModelerModdleExtension from 'modeler-moddle/resources/dmn-modeler.json';
import MochaTestContainerSupport from 'mocha-test-container-support';

var dmnXML = require('../fixtures/dmn/dmn.dmn');
var missingExecutionPlatformXML = require('../fixtures/dmn/missing-execution-platform.dmn');


describe('execution-platform (DMN)', function() {

  var modeler;

  describe('basics', function() {

    beforeEach(function() {
      var container = MochaTestContainerSupport.get(this);

      modeler = new Modeler({
        container: container,
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

      return modeler.importXML(dmnXML);
    });


    it('should expose execution platform details', function() {

      // given
      var executionPlatformHelper = getExecutionPlatformHelper(modeler);

      // when
      var executionPlatform = executionPlatformHelper.getExecutionPlatform();

      // then
      expect(executionPlatform).to.have.property('name', 'Camunda Cloud');
      expect(executionPlatform).to.have.property('version', '1.0.0');
    });


    it('should set execution platform details', function() {

      // given
      var executionPlatformHelper = getExecutionPlatformHelper(modeler);

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
      var executionPlatformHelper = getExecutionPlatformHelper(modeler);
      var commandStack = getModule(modeler, 'commandStack');

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


  describe('missing execution-platform', function() {

    beforeEach(function() {
      var container = MochaTestContainerSupport.get(this);

      modeler = new Modeler({
        container: container,
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

      return modeler.importXML(missingExecutionPlatformXML);
    });


    it('should return null if execution platform details not present', function() {

      // given
      var executionPlatformHelper = getExecutionPlatformHelper(modeler);

      // when
      var executionPlatform = executionPlatformHelper.getExecutionPlatform();

      // then
      expect(executionPlatform).to.be.null;
    });


    it('should set execution platform with correct namespace', async function() {

      // given
      var executionPlatformHelper = getExecutionPlatformHelper(modeler);

      // when
      executionPlatformHelper.setExecutionPlatform({
        name: 'Camunda Platform',
        version: '7.16.0'
      });

      // then
      var result = await modeler.saveXML();

      expect(result.xml).to.contain('xmlns:modeler="http://camunda.org/schema/modeler/1.0"');
      expect(result.xml).to.contain('modeler:executionPlatform="Camunda Platform"');
      expect(result.xml).to.contain('modeler:executionPlatformVersion="7.16.0"');
    });
  });


  describe('setting execution platform imperatively on save', function() {

    beforeEach(function() {
      var container = MochaTestContainerSupport.get(this);

      modeler = new Modeler({
        container: container,
        common: {
          executionPlatform: {
            name: 'Camunda Platform',
            version: '7.16.0'
          }
        },
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

      return modeler.importXML(missingExecutionPlatformXML);
    });


    it('should set execution platform on saveXML (DRD)', async function() {

      // when
      var result = await modeler.saveXML();

      // then
      expect(result.xml).to.contain('xmlns:modeler="http://camunda.org/schema/modeler/1.0"');
      expect(result.xml).to.contain('modeler:executionPlatform="Camunda Platform"');
      expect(result.xml).to.contain('modeler:executionPlatformVersion="7.16.0"');
    });


    it('should set execution platform on saveXML (decision table)', async function() {

      // given
      var view = modeler.getViews().find(function(view) {
        return view.type === 'decisionTable';
      });
      await modeler.open(view);

      // when
      var result = await modeler.saveXML();

      // then
      expect(result.xml).to.contain('xmlns:modeler="http://camunda.org/schema/modeler/1.0"');
      expect(result.xml).to.contain('modeler:executionPlatform="Camunda Platform"');
      expect(result.xml).to.contain('modeler:executionPlatformVersion="7.16.0"');
    });


    it('should set execution platform on saveXML (literal expression)', async function() {

      // given
      var view = modeler.getViews().find(function(view) {
        return view.type === 'literalExpression';
      });
      await modeler.open(view);

      // when
      var result = await modeler.saveXML();

      // then
      expect(result.xml).to.contain('xmlns:modeler="http://camunda.org/schema/modeler/1.0"');
      expect(result.xml).to.contain('modeler:executionPlatform="Camunda Platform"');
      expect(result.xml).to.contain('modeler:executionPlatformVersion="7.16.0"');
    });
  });
});


// helper //////////
function getExecutionPlatformHelper(modeler) {
  return getModule(modeler, 'executionPlatform');
}

function getModule(modeler, module) {
  return modeler.getActiveViewer().get(module);
}
