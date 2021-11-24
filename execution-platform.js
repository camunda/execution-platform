/**
 * @param {Object} config
 * @param {EventBus} eventBus
 */
export default function ExecutionPlatform(config, eventBus) {

  if (!config) {
    throw new Error('config.exporter = { name, version } not configured');
  }

  var name = config.name,
      version = config.version;

  if (!name || !version) {
    throw new Error('config.exporter = { name, version } missing required props');
  }

  eventBus.on('saveXML.start', function(event) {
    var definitions = event.definitions;

    definitions.exporter = name;
    definitions.exporterVersion = version;
  });

}

ExecutionPlatform.$inject = [
  'config.exporter',
  'eventBus'
];