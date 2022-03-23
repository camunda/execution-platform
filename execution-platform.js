/**
 * @typedef ExecutionPlatformDetails
 * @property {string} name
 * @property {string} version
*/

var EXECUTION_PLATFORM_NAME = 'modeler:executionPlatform',
    EXECUTION_PLATFORM_VERSION = 'modeler:executionPlatformVersion';

/**
 * Get and set execution platform.
 *
 * @example
 * ```javascript
 * var executionPlatformHelper = modeler.get('executionPlatform');
 * executionPlatformHelper.setExecutionPlatform({ name: 'Camunda Cloud', version: '1.3.0' });
 *
 * var executionPlatform = executionPlatformHelper.getExecutionPlatform();
 *
 * // { name: 'Camunda Cloud', version: '1.3.0' }
 * console.log(executionPlatform);
 * ```
 */
export default function ExecutionPlatform(config, injector, commandStack) {

  // _parent is provided in dmn-js
  this._modeler = injector.get('bpmnjs', false) || injector.get('_parent');
  this._commandStack = commandStack;

  if (!config) {
    return;
  }

  var name = config.name,
      version = config.version;

  if (!name || !version) {
    throw new Error('config.executionPlatform = { name, version } missing required props');
  }

  // TODO(@barmac): required in bpmn-js due to https://github.com/bpmn-io/bpmn-js/issues/1624
  var eventBus = this._modeler;
  if (injector.get('bpmnjs', false)) {
    eventBus = injector.get('eventBus');
  }

  eventBus.on('saveXML.start', function(event) {
    var definitions = event.definitions;

    definitions.set(EXECUTION_PLATFORM_NAME, name);
    definitions.set(EXECUTION_PLATFORM_VERSION, version);
  });
}

ExecutionPlatform.$inject = [
  'config.executionPlatform',
  'injector',
  'commandStack',
  'eventBus'
];

/**
 * Get execution platform details or null if not present.
 *
 * @returns { ExecutionPlatformDetails | null }
 */
ExecutionPlatform.prototype.getExecutionPlatform = function() {
  var definitions = this._modeler.getDefinitions(),
      name = definitions.get(EXECUTION_PLATFORM_NAME);

  if (!name) {
    return null;
  }

  return {
    name: name,
    version: definitions.get(EXECUTION_PLATFORM_VERSION)
  };
};

/**
 * Set execution platform details.
 *
 * @param { ExecutionPlatformDetails } executionPlatform
 */
ExecutionPlatform.prototype.setExecutionPlatform = function(executionPlatform) {
  this._commandStack.execute('executionPlatform.update', {
    executionPlatform: executionPlatform
  });
};
