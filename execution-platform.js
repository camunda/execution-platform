/**
 * @param {Object} bpmnjs
 */
export default function ExecutionPlatform(bpmnjs, modeling) {
  this._bpmnjs = bpmnjs;
  this._modeling = modeling;

  // if (!config) {
  //   throw new Error('config.exporter = { name, version } not configured');
  // }

  // var name = config.name,
  //     version = config.version;

  // if (!name || !version) {
  //   throw new Error('config.exporter = { name, version } missing required props');
  // }

  // eventBus.on('saveXML.start', function(event) {
  //   var definitions = event.definitions;

  //   definitions.exporter = name;
  //   definitions.exporterVersion = version;
  // });

}

ExecutionPlatform.$inject = [
  'bpmnjs',
  'modeling'
];

ExecutionPlatform.prototype.getExecutionPlatform = function() {
  var definitions = this._bpmnjs.getDefinitions();

  return {
    name: definitions.get('modeler:executionPlatform'),
    version: definitions.get('modeler:executionPlatformVersion')
  };
};

ExecutionPlatform.prototype.setExecutionPlatform = function(executionPlatform) {
  var definitions = this._bpmnjs.getDefinitions();

  this._modeling.updateProperties(definitions, {
    'modeler:executionPlatform': executionPlatform.name,
    'modeler:executionPlatformVersion': executionPlatform.version
  });
};
