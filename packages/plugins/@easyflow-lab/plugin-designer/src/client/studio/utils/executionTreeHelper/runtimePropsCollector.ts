import dayjs from 'dayjs';
import { klona } from 'klona/json';
import _ from 'lodash-es';
import numbro from 'numbro';
import Papa from 'papaparse';
import { NIL, parse, stringify, v1, v3, v4, v5, validate, version } from 'uuid';
const THIRD_PARTY_PACKAGES = {
  _: {
    ..._,
  },
  uuid: {
    NIL,
    parse,
    stringify,
    v1,
    v3,
    v4,
    v5,
    validate,
    version,
  },
  dayjs,
  numbro,
  Papa,
};
class ILLAEditorRuntimePropsCollector {
  private _runtimeProps: Record<string, unknown> = {};
  private static instance: ILLAEditorRuntimePropsCollector | null = null;

  constructor() {
    this._runtimeProps = {
      ...THIRD_PARTY_PACKAGES,
      utils: {},
    };
  }

  public static getInstance(): ILLAEditorRuntimePropsCollector {
    if (!ILLAEditorRuntimePropsCollector.instance) {
      ILLAEditorRuntimePropsCollector.instance = new ILLAEditorRuntimePropsCollector();
    }
    return ILLAEditorRuntimePropsCollector.instance;
  }

  public addRuntimeProp(displayName: string, runtimeProp: unknown) {
    this._runtimeProps[displayName] = runtimeProp;
  }

  public deleteRuntimeProp(displayName: string) {
    if (!this._runtimeProps[displayName]) return;
    delete this._runtimeProps[displayName];
  }

  public getRuntimeProps() {
    return this._runtimeProps;
  }

  // public getThirdPartyPackages() {
  //   return THIRD_PARTY_PACKAGES;
  // }
  //
  // public getGlobalCalcContext(otherContext: Record<string, unknown> = {}) {
  //   const executionResult = getExecutionResult();
  //   const cloneDeepExecutionResult = klona(executionResult);
  //
  //   const formatedExecutionResult = Object.keys(cloneDeepExecutionResult).reduce(
  //     (acc, prevKey) => {
  //       const prev = cloneDeepExecutionResult[prevKey];
  //       if (!prev) {
  //         return acc;
  //       }
  //       if (prev.$type === 'ACTION') {
  //         return {
  //           ...acc,
  //           [prev.displayName]: {
  //             ...prev,
  //             trigger: async () => {
  //               return false;
  //             },
  //             // trigger: async () => {
  //             //   return await runActionWithExecutionResult(prev, false);
  //             // },
  //           },
  //         };
  //       }
  //       if (prev.$type === 'WIDGET') {
  //         const runtimePros = this._runtimeProps[prev.displayName];
  //         if (runtimePros) {
  //           return {
  //             ...acc,
  //             [prev.displayName]: {
  //               ...prev,
  //               ...runtimePros,
  //             },
  //           };
  //         }
  //       }
  //       return {
  //         ...acc,
  //         [prevKey]: prev,
  //       };
  //     },
  //     {} as Record<string, any>,
  //   );
  //
  //   const utils = this._runtimeProps.utils as Record<string, unknown>;
  //   const mergeResult = {
  //     ...formatedExecutionResult,
  //     ...THIRD_PARTY_PACKAGES,
  //     utils,
  //     ...otherContext,
  //   };
  //
  //   return mergeResult;
  // }
  //
  // public getCurrentPageCalcContext(otherContext: Record<string, unknown> = {}) {
  //   const rootState = store.getState();
  //   const executionResult = getExecutionResultToCurrentPageCodeMirror(rootState) as Record<string, any>;
  //   const cloneDeepExecutionResult = klona(executionResult);
  //   const formatedExecutionResult = Object.keys(cloneDeepExecutionResult).reduce(
  //     (acc, prevKey) => {
  //       const prev = cloneDeepExecutionResult[prevKey];
  //
  //       if (!prev) {
  //         return acc;
  //       }
  //
  //       if ((Object.hasOwn && Object.hasOwn(prev, 'actionType')) || Object.prototype.hasOwnProperty.call(prev, 'actionType')) {
  //         return {
  //           ...acc,
  //           [prev.displayName]: {
  //             ...prev,
  //             trigger: async () => {
  //               return await runActionWithExecutionResult(prev, false);
  //             },
  //           },
  //         };
  //       }
  //
  //       if (prev.$type === 'WIDGET') {
  //         switch (prev.$widgetType) {
  //           case 'MODAL_WIDGET':
  //             return {
  //               ...acc,
  //               [prevKey]: {
  //                 ...prev,
  //                 openModal: () => {
  //                   store.dispatch(
  //                     executionActions.updateModalDisplayReducer({
  //                       display: true,
  //                       displayName: prevKey,
  //                     }),
  //                   );
  //                 },
  //                 closeModal: () => {
  //                   store.dispatch(
  //                     executionActions.updateModalDisplayReducer({
  //                       display: false,
  //                       displayName: prevKey,
  //                     }),
  //                   );
  //                 },
  //               },
  //             };
  //           default: {
  //             const runtimePros = this._runtimeProps[prev.displayName];
  //             if (runtimePros) {
  //               return {
  //                 ...acc,
  //                 [prev.displayName]: {
  //                   ...prev,
  //                   ...runtimePros,
  //                 },
  //               };
  //             }
  //           }
  //         }
  //       }
  //       return {
  //         ...acc,
  //         [prevKey]: prev,
  //       };
  //     },
  //     {} as Record<string, any>,
  //   );
  //   const utils = this._runtimeProps.utils as Record<string, unknown>;
  //   const mergeResult = {
  //     ...formatedExecutionResult,
  //     ...THIRD_PARTY_PACKAGES,
  //     utils,
  //     ...otherContext,
  //   };
  //
  //   return mergeResult;
  // }
  //
  // public getGlobalCalcContextWithLimit(otherContext?: Record<string, unknown>) {
  //   const rootState = store.getState();
  //   const executionResult = getExecutionResultToGlobalCodeMirror(rootState);
  //   const cloneDeepExecutionResult = klona(executionResult);
  //   const utils = this._runtimeProps.utils as Record<string, unknown>;
  //   const mergeResult = {
  //     ...cloneDeepExecutionResult,
  //     ...THIRD_PARTY_PACKAGES,
  //     utils,
  //     ...otherContext,
  //   };
  //   return mergeResult;
  // }
}

export const ILLAEditorRuntimePropsCollectorInstance = ILLAEditorRuntimePropsCollector.getInstance();
