import { Dispatch, ReactNode, RefObject, SetStateAction } from 'react';
import { Extension } from '@codemirror/state';

export type CodeType = undefined | 'JSON' | 'Function' | 'PureJSON';

//Illa
export enum CODE_TYPE {
  'EXPRESSION' = 'EXPRESSION',
  'FUNCTION' = 'FUNCTION',
  'NO_METHOD_FUNCTION' = 'NO_METHOD_FUNCTION',
}

//Illa
export enum VALIDATION_TYPES {
  STRING = 'String',
  NUMBER = 'Number',
  BOOLEAN = 'Boolean',
  ARRAY = 'Array',
  OBJECT = 'Object',
  UNDEFINED = 'Undefined',
  ANY = 'any',
}

export type CompInfo = {
  name: string;
  type: string;
  data: Record<string, any>;
  dataDesc: Record<string, ReactNode>;
};

export interface HintTooltipProps {
  isEditorFocused: boolean;
  hasError?: boolean;
  resultType?: VALIDATION_TYPES;
  result?: string;
  children: ReactNode;
  toolTipContainer?: RefObject<HTMLElement>;
}

export interface HintTooltipContentProps extends Pick<HintTooltipProps, 'hasError' | 'resultType' | 'result'> {
  setIsHovered: Dispatch<SetStateAction<boolean>>;
}

export interface CodeEditorProps
  extends Omit<
    ILLACodeMirrorProps,
    'hasError' | 'resultType' | 'result' | 'executionResult' | 'expressions' | 'canShowResultRealtime'
  > {
  expectValueType?: VALIDATION_TYPES;
  wrappedCodeFunc?: (value: string) => string;
  canExpand?: boolean;
  modalTitle?: string;
  modalDescription?: string;
  wrapperCss?: 'SerializedStyles';
}

export interface ILLACodeMirrorProps
  extends ICodeMirrorOptions,
    Omit<HintTooltipProps, 'isEditorFocused' | 'children'> {
  extensions?: Extension[];
  value?: string;
  onChange?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: (value: string) => void;
  height?: string;
  minHeight?: string;
  maxHeight?: string;
  width?: string;
  minWidth?: string;
  maxWidth?: string;
  editable?: boolean;
  readOnly?: boolean;
  placeholder?: string;
  className?: string;
  tooltipContainer?: RefObject<HTMLElement>;
}

export interface ICodeMirrorOptions {
  showLineNumbers?: boolean;
  lang?: CODE_LANG;
  codeType?: CODE_TYPE;
  expressions?: IExpressionShape[];
  canShowCompleteInfo?: boolean;
  sqlScheme?: Record<string, unknown>;
  singleLine?: boolean;
  scopeOfAutoComplete?: 'global' | 'page';
}

export enum CODE_LANG {
  'JAVASCRIPT' = 'javascript',
  'SQL' = 'sql',
  'HTML' = 'html',
  'JSON' = 'json',
  'XML' = 'xml',
  'PGSQL' = 'pgsql',
  'MYSQL' = 'mysql',
  'MARIASQL' = 'mariasql',
  'MSSQL' = 'mssql',
  'SQLite' = 'sqlite',
  'CASSANDRA' = 'cassandra',
  'PLSQL' = 'plsql',
}

export interface IExpressionShape {
  value: string;
  hasError: boolean;
}

export interface ModalBodyContent {
  description?: string;
  placeholder?: string;
  lang?: CodeEditorProps['lang'];
  expectValueType?: CodeEditorProps['expectValueType'];
  scopeOfAutoComplete?: CodeEditorProps['scopeOfAutoComplete'];
  onChange?: CodeEditorProps['onChange'];
  wrappedCodeFunc?: CodeEditorProps['wrappedCodeFunc'];
  onFocus?: CodeEditorProps['onFocus'];
  onBlur?: CodeEditorProps['onBlur'];
  value: string;
  codeType?: CodeEditorProps['codeType'];
}

export interface FooterContentProps {
  onClickSaveButton: () => void;
}

export interface ModalCodeMirrorProps
  extends Omit<MovableModalProps, 'bodyContent' | 'footerContent'>,
    ModalBodyContent {
  onClickSaveButton?: () => void;
}

export interface MovableModalProps extends BaseModalProps {
  defaultPosition?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export interface BaseModalProps {
  title: string;
  bodyContent: ReactNode;
  footerContent?: ReactNode;
  docLink?: string;
  onClose: () => void;
}

export interface FooterContentProps {
  onClickSaveButton: () => void;
}

export enum AutocompleteDataType {
  OBJECT = 'Object',
  NUMBER = 'Number',
  ARRAY = 'Array',
  FUNCTION = 'Function',
  BOOLEAN = 'Boolean',
  STRING = 'String',
  UNKNOWN = 'Unknown',
}

interface IILLAUtilsDesc {
  desc?: string;
  usage: string;
}

export const ILLA_UTILS_DESC: Record<string, IILLAUtilsDesc> = {
  goToURL: {
    desc: '',
    usage: 'utils.goToURL({url:string,newTab?:boolean = false})',
  },
  showNotification: {
    desc: '',
    usage: `utils.showNotification({type:"info" | "error" | "success" | "warning" | "normal" = "info",title?:string,description?:string,duration?:number = 4500})`,
  },
  copyToClipboard: {
    desc: '',
    usage: `utils.copyToClipboard(copiedValue:any)`,
  },
  setRouter: {
    desc: '',
    usage: 'utils.setRouter({pagePath:string;viewPath?:string})',
  },
  downloadFile: {
    desc: '',
    usage: `utils.downloadFile({fileType?:string = "auto";fileName?:string = "Untitled File",data:any})`,
  },
  downloadFromILLADrive: {
    desc: '',
    usage: `utils.downloadFromILLADrive({downloadInfo:{tinyURL:string,fileID:string}[],asZip?:boolean})`,
  },
  saveToILLADrive: {
    desc: '',
    usage: `utils.saveToILLADrive({fileName:string,fileData:string,fileType?:string="auto",folder?:string="",allowAnonymous?:boolean = false,replace?:boolean = false})`,
  },
  setGlobalDataIn: {
    desc: '',
    usage: `utils.setGlobalDataIn({key:string,path:string,value:any})`,
  },
  setGlobalDataValue: {
    desc: '',
    usage: `utils.setGlobalDataValue({key:string,value:any})`,
  },
  setLocalStorage: {
    desc: '',
    usage: `utils.setLocalStorage({key:string,value:any})`,
  },
  clearLocalStorage: {
    desc: '',
    usage: `utils.clearLocalStorage()`,
  },
};

export const ILLAContextDesc: Record<string, any> = {
  utils: ILLA_UTILS_DESC,
};
