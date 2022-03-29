import ExecutionPlatform from './ExecutionPlatform';
import UpdateExecutionPlatformCommand from './cmd/UpdateExecutionPlatformCommand';

export default {
  __init__: [ 'executionPlatform', 'updateExecutionPlatformCommand' ],
  executionPlatform: [ 'type', ExecutionPlatform ],
  updateExecutionPlatformCommand: [ 'type', UpdateExecutionPlatformCommand ]
};