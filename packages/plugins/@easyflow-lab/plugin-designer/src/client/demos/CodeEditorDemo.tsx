import { createContext, Suspense, useContext, useMemo } from 'react';
import { data } from './data/code-editor';
import { CodeEditor } from '../studio/components/codeEditor';
const ExposedContext = createContext(undefined as any);

const demoList = [
  'pageStateDemo',
  'gloablStateDemo',
  'calcContext',
  'compStateDemo',
  'tmpCalcContext',
  'compPropsDemo',
  'compExposingDemo',
];

export const CodeEditorDemo = (props) => {
  const {
    demoId,
    disabled,
    enableClickCompName,
    codeType,
    codeText,
    onChange,
    enableExposingDataAutoCompletion = false,
    cardContent,
    cardTitle,
    bordered,
    label,
    placeholder,
    ...rest
  } = props;

  const ExposedContextState = useContext(ExposedContext);

  const exposedContextData = useMemo(() => {
    if (enableExposingDataAutoCompletion) {
      if (demoId === null) return null;
      console.log(data[demoId]);

      return {
        ...data[demoId],
        ...ExposedContextState,
      };
    }
  }, [ExposedContextState, enableExposingDataAutoCompletion, demoId]);

  function handleChange(state) {
    console.log('handling change----', {
      event: state,
      content: state.doc.toString(),
    });
    return state.doc.toString();
  }

  return (
    <CodeEditor
      {...rest}
      disabled={disabled}
      value={codeText}
      bordered={bordered || true}
      codeType={codeType || 'javascript'}
      cardContent={cardContent}
      cardTitle={cardTitle || 'string card title'}
      placement="bottom"
      styleName="medium"
      segments={[]}
      label={label || 'label for the draggable popup'}
      enableClickCompName={enableClickCompName}
      exposingData={exposedContextData}
      placeholder={placeholder || '{\n  rating : {$gte : 9}\n}'}
      onChange={handleChange}
    />
  );
};

/*

------------------ControlParams extends CodeEditorControlParams
  key?: string;
  label?: ReactNode;
  tooltip?: ReactNode;
  width?: string;
  layout?: ControlLayout;
  labelEllipsis?: boolean;
  placement?: ControlPlacement;
  lastNode?: ReactNode;
  preInputNode?: ReactNode;
  childrenWrapperStyle?: CSSProperties;
  extraChildren?: ReactNode;
  IconType?: "OnlyAntd" | "All" | "default" | undefined;


----------CodeEditorProps extends CodeEditorControlParams
  label?: ReactNode;
  value?: string;
  codeType?: CodeType;

  // extension
  exposingData?: Record<string, unknown>;
  boostExposingData?: Record<string, unknown>;
  enableClickCompName?: boolean;
  onChange?: (state: EditorState) => void;

  // eval info card
  cardTitle?: string;
  cardContent?: string;
  hasError?: boolean;
  segments?: { value: string; success: boolean }[];

  bordered?: boolean;


------------CodeEditorControlParams
  placeholder?: string;
  styleName?: StyleName;
  disableCard?: boolean;
  language?: Language;
  indentWithTab?: boolean;
  tooltipContainer?: HTMLElement;
  expandable?: boolean;
  onFocus?: (focused: boolean) => void;
  showLineNum?: boolean;
  enableIcon?: boolean;
  widgetPopup?: (v: EditorView) => ReactNode;
  onClick?: (e: React.MouseEvent, v: EditorView) => void;
  extraOnChange?: (state: EditorState) => void;
  cardRichContent?: (s: string) => ReactNode;
  cardTips?: ReactNode;
  enableMetaCompletion?: boolean;



*
*
*
* */
