import ExecutionPlatform from './execution-platform';
import UpdateExecutionPlatformCommand from './update-execution-platform-command';

export default {
  __init__: [ 'executionPlatform', 'updateExecutionPlatformCommand' ],
  executionPlatform: [ 'type', ExecutionPlatform ],
  updateExecutionPlatformCommand: [ 'type', UpdateExecutionPlatformCommand ]
};