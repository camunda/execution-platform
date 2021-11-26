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
export default function ExecutionPlatform(config, bpmnjs, modeling, canvas, eventBus) {
  this._bpmnjs = bpmnjs;
  this._modeling = modeling;
  this._canvas = canvas;

  if (!config) {
    return;
  }

  var name = config.name,
      version = config.version;

  if (!name || !version) {
    throw new Error('config.executionPlatform = { name, version } missing required props');
  }

  eventBus.on('saveXML.start', function(event) {
    var definitions = event.definitions;

    definitions.set(EXECUTION_PLATFORM_NAME, name);
    definitions.set(EXECUTION_PLATFORM_VERSION, version);
  });
}

ExecutionPlatform.$inject = [
  'config.executionPlatform',
  'bpmnjs',
  'modeling',
  'canvas',
  'eventBus'
];

/**
 * Get execution platform details or null if not present.
 *
 * @returns { ExecutionPlatformDetails | null }
 */
ExecutionPlatform.prototype.getExecutionPlatform = function() {
  var definitions = this._bpmnjs.getDefinitions(),
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
  var definitions = this._bpmnjs.getDefinitions();
  var rootElement = this._canvas.getRootElement();

  this._modeling.updateModdleProperties(rootElement, definitions, {
    [ EXECUTION_PLATFORM_NAME ]: executionPlatform.name,
    [ EXECUTION_PLATFORM_VERSION ]: executionPlatform.version
  });
};
