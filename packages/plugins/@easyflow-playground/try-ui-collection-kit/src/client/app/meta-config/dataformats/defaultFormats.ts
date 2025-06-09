import type {DataFormatDefinition} from './dataFormatDefinition';
import {DataConverterJson, DataConverterXml, DataConverterYaml} from './dataConverter';
import {PathIndexLinkJson} from './pathIndexLinkJson';
import {formatRegistry} from './formatRegistry';
import {PathIndexLinkYaml} from './pathIndexLinkYaml';

export const jsonFormat: DataFormatDefinition = {
  dataConverter: new DataConverterJson(),
  pathIndexLink: new PathIndexLinkJson(),
};

const yamlFormat: DataFormatDefinition = {
  dataConverter: new DataConverterYaml(),
  pathIndexLink: new PathIndexLinkYaml(),
};

const xmlFormat: DataFormatDefinition = {
  dataConverter: new DataConverterXml(),
  pathIndexLink: null,
};

/**
 * Registers the default data formats, which are JSON and YAML.
 */
export function registerDefaultDataFormats() {
  formatRegistry.registerFormat('json', jsonFormat);
  formatRegistry.registerFormat('yaml', yamlFormat);
  formatRegistry.registerFormat('xml', xmlFormat);
}
