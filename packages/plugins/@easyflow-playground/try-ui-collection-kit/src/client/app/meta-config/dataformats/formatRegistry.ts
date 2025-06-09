import { assign, setup } from 'xstate';
import type { DataFormatDefinition } from './dataFormatDefinition';
import { useSettings } from '../settings/useSettings';
import { DataConverter } from './dataConverter';
import type { PathIndexLink } from './pathIndexLink';
import { noPathIndexLink } from './pathIndexLink';
import { jsonFormat } from './defaultFormats';

const settings = useSettings();

/**
 * The format registry serves as a central place to register and retrieve data formats definitions,
 * which contain the required implementations for a specific data format.
 *
 * @see DataFormatDefinition
 */
export class FormatRegistry {
  private readonly formats: Map<string, DataFormatDefinition> = new Map();

  public registerFormat(formatName: string, formatDefinition: DataFormatDefinition): void {
    this.formats.set(formatName, formatDefinition);
  }

  /**
   * Returns the data format definition for the given format name.
   * @param formatName the name of the format
   * @return the data format definition. If the format is not registered, the json format is returned.
   */
  public getFormat(formatName: string): DataFormatDefinition {
    const format = this.formats.get(formatName);
    if (format === undefined) {
      return jsonFormat; // we use json as fallback to avoid errors
    }
    return format;
  }

  /**
   * Return a list of all registered data format names.
   */
  public getFormatNames(): string[] {
    return Array.from(this.formats.keys());
  }
}

/**
 * The global format registry.
 * This is used to register and retrieve data formats.
 */
export const formatRegistry = new FormatRegistry();

const currentDataFormatRef = computed(() => {
  const dataFormat = settings.value.dataFormat ?? 'json';
  return formatRegistry.getFormat(dataFormat);
});

/**
 * Returns the data converter for the currently selected data format.
 */
export function useDataConverter(): DataConverter {
  return currentDataFormatRef.value.dataConverter;
}

/**
 * Returns the path index link for the currently selected data format.
 */
export function usePathIndexLink(): PathIndexLink {
  return currentDataFormatRef.value.pathIndexLink ?? noPathIndexLink;
}

export const formatRegistryMachine = setup({
  types: {
    context: {} as {
      formats?: Map<string, DataFormatDefinition> | any;
      dataFormat?: string | any;
      [key: string]: any;
    },
    events: {} as
      | { type: 'REGISTER_FORMAT'; name: string; definition: DataFormatDefinition; [key: string]: any }
      | { type: 'SET_DATA_FORMAT'; format: string; [key: string]: any }
      | { type: 'GET_FORMAT'; name: string; [key: string]: any }
      | any,
  },
  actions: {
    registerFormat: assign(({ context, event }) => {
      const next = new Map(context.formats);
      next.set(event.name, event.definition);
      return { formats: next };
    }),
    setDataFormat: assign(({ context, event }) => ({
      dataFormat: event.format,
    })),
  },
}).createMachine({
  context: ({ input }) => ({
    formats: new Map<string, DataFormatDefinition>(),
    dataFormat: useSettings().value.dataFormat ?? 'json',
    ...input,
  }),
  on: {
    REGISTER_FORMAT: {
      actions: ['registerFormat'],
    },
    SET_FORMAT: {
      actions: ['setDataFormat'],
    },
  },
});
