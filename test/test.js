import {
  bootstrapViewer,
  getBpmnJS
} from 'bpmn-js/test/helper';

import BpmnJS from 'bpmn-js';
import DmnJS from 'dmn-js';

import ExecutionPlatform from '../execution-platform';

import ExecutionPlatformModule from '..';

var bpmnXML = require('./process.bpmn');
var dmnXML = require('./decision.dmn');


describe('execution-platform', function() {

  describe('should extend BpmnJS instance', function() {

    beforeEach(bootstrapViewer(bpmnXML, {
      additionalModules: [
        ExecutionPlatformModule
      ],
      exporter: {
        name: 'foo',
        version: 'bar'
      }
    }));


    it('serializing exporter value', function(done) {

      // given
      var bpmnJS = getBpmnJS();

      // when
      bpmnJS.saveXML(function(err, xml) {

        expect(xml).to.contain('exporter="foo"');
        expect(xml).to.contain('exporterVersion="bar"');

        done(err);
      });
    });

  });


  it('should extend existing instance via helper', function(done) {

    // given
    var dmnJS = new DmnJS();

    // when
    ExecutionPlatform({ name: 'foo', version: 'bar' }, dmnJS);

    // then
    dmnJS.importXML(dmnXML, function() {

      dmnJS.saveXML(function(err, xml) {

        expect(xml).to.contain('exporter="foo"');
        expect(xml).to.contain('exporterVersion="bar"');

        done(err);
      });
    });

  });


  describe('should throw on invalid configuration', function() {

    it('exporter config missing', function() {

      expect(function() {

        new BpmnJS({
          additionalModules: [
            ExecutionPlatformModule
          ]
        });

      }).to.throw('config.exporter = { name, version } not configured');
    });


    it('exporter config invalid props', function() {

      expect(function() {

        new BpmnJS({
          additionalModules: [
            ExecutionPlatformModule
          ],
          exporter: {}
        });

      }).to.throw('config.exporter = { name, version } missing required props');
    });

  });

});