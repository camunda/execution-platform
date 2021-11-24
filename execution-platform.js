/**
 * @typedef ExecutionPlatformDetails
 * @property {string} name
 * @property {string} version
*/

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
export default function ExecutionPlatform(bpmnjs, modeling, canvas) {
  this._bpmnjs = bpmnjs;
  this._modeling = modeling;
  this._canvas = canvas;
}

ExecutionPlatform.$inject = [
  'bpmnjs',
  'modeling',
  'canvas'
];

/**
 * Get execution platform details or null if not present.
 *
 * @returns { ExecutionPlatformDetails | null }
 */
ExecutionPlatform.prototype.getExecutionPlatform = function() {
  var definitions = this._bpmnjs.getDefinitions(),
      name = definitions.get('modeler:executionPlatform');

  if (!name) {
    return null;
  }

  return {
    name: name,
    version: definitions.get('modeler:executionPlatformVersion')
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
    'modeler:executionPlatform': executionPlatform.name,
    'modeler:executionPlatformVersion': executionPlatform.version
  });
};
