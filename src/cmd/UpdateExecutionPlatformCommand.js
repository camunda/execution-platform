const EXECUTION_PLATFORM_NAME = 'modeler:executionPlatform',
      EXECUTION_PLATFORM_VERSION = 'modeler:executionPlatformVersion';

export default function UpdateExecutionPlatformCommand(commandStack) {
  commandStack.registerHandler('executionPlatform.update', UpdateExecutionPlatformHandler);
}

UpdateExecutionPlatformCommand.$inject = [ 'commandStack' ];

function UpdateExecutionPlatformHandler(injector) {

  // _parent is provided in dmn-js
  this._modeler = injector.get('bpmnjs', false) || injector.get('_parent');
}

UpdateExecutionPlatformHandler.prototype.execute = function(context) {
  const executionPlatform = context.executionPlatform;
  const definitions = context.definitions = this._modeler.getDefinitions();

  context.oldExecutionPlatform = getExecutionPlatform(definitions, executionPlatform);

  setExecutionPlatform(definitions, executionPlatform);

  return [];
};

UpdateExecutionPlatformHandler.prototype.revert = function(context) {
  const oldExecutionPlatform = context.oldExecutionPlatform;

  setExecutionPlatform(context.definitions, oldExecutionPlatform);

  return [];
};

UpdateExecutionPlatformHandler.$inject = [ 'injector' ];

function setExecutionPlatform(definitions, properties) {
  definitions.set(EXECUTION_PLATFORM_NAME, properties.name);
  definitions.set(EXECUTION_PLATFORM_VERSION, properties.version);
}

function getExecutionPlatform(definitions) {
  return {
    name: definitions.get(EXECUTION_PLATFORM_NAME),
    version: definitions.get(EXECUTION_PLATFORM_VERSION)
  };
}
