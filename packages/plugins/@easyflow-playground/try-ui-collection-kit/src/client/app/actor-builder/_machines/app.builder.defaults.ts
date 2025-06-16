export default {
  ai: {
    ee: {},
    cloud: {},
    local: {},
  },
  app: {
    app: {},
    canvasHeight: null,
    isSaving: false,
    globalSettings: {},
    pageSwitchInProgress: false,
    isDarkMode: false,
    isViewer: false,
    isComponentLayoutReady: false,
  },
  appVersion: {
    editingVersion: null,
    isUserEditingTheVersion: false,
    releasedVersionId: null,
    isVersionReleased: false,
    isEditorFreezed: false,
    isBannerMandatory: false,
    appVersions: [],
    isAppVersionPromoted: false,
    currentAppVersionEnvironment: null,
  },
  codeHinter: {
    shouldBuildSuggestions: false,
    suggestions: {
      appHints: [],
      jsHints: [],
    },
  },
  components: {
    modules: {
      canvas: {
        pages: [],
        componentNameIdMapping: {},
        queryNameIdMapping: {},
        queryIdNameMapping: {},
      },
    },
    currentPageId: null,
    currentPageIndex: 0,
    containerChildrenMapping: {
      canvas: [],
    },
    selectedComponents: [],
    currentPageHandle: null,
    showWidgetDeleteConfirmation: false,
    focusedParentId: null,
    modalsOpenOnCanvas: [],
  },
  dataQuery: {
    sortBy: 'updated_at',
    sortOrder: 'desc',
    isDeletingQueryInProcess: false,
    creatingQueryInProcessId: null,
    queryConfirmationList: [],
    queuedActions: {},
    queries: {
      modules: {
        canvas: [],
      },
    },
  },
  dataSource: {
    dataSources: [],
    loadingDataSources: true,
    globalDataSources: [],
    sampleDataSource: null,
  },
  debugger: {
    logs: [],
    unreadErrorCount: 0,
    pinned: false,
  },
  dependency: {
    dependencyGraph: {
      modules: {
        canvas: {
          graph: null,
        },
      },
    },
  },
  editorLicense: {
    featureAccess: null,
  },
  environmentsAndVersions: {
    selectedVersion: null,
    selectedEnvironment: null,
    appVersionEnvironment: null,
    versionsPromotedToEnvironment: [],
    environments: [],
    shouldRenderPromoteButton: false, // TODO: need to check if this is needed
    shouldRenderReleaseButton: false, // TODO: need to check if this is needed
    initializedEnvironmentDropdown: true,
    environmentsLazyLoaded: false,
    appVersionsLazyLoaded: false,
    previewInitialEnvironmentId: null,
    developmentVersions: [],
    environmentLoadingState: 'completed',
    isPublicAccess: false,
  },
  events: {
    module: {
      canvas: {
        events: [],
        eventsUpdatedLoader: false,
        eventsCreatedLoader: false,
        actionsUpdatedLoader: false,
        eventToDeleteLoaderIndex: null,
      },
    },
  },
  gitSync: {
    showGitSyncModal: false,
  },
  grid: {
    hoveredComponentForGrid: '',
    hoveredComponentBoundaryId: '',
    triggerCanvasUpdater: false,
    lastCanvasIdClick: '',
    lastCanvasClickPosition: null,
    draggingComponentId: null,
  },
  layout: {
    currentLayout: 'desktop',
    canvasWidth: 1092,
    canvasBackground: {},
    showToggleLayoutBtn: true,
    showUndoRedoBtn: true,
    showFullWidth: false,
  },
  leftSideBar: {
    isLeftSideBarPinned: false,
    selectedSidebarItem: null,
    isSidebarOpen: false,
    pathToBeInspected: null,
  },
  license: {
    license: {},
  },
  loader: {
    isEditorLoading: true,
    isCanvasLoading: false,
  },
  mode: {
    currentMode: 'view',
  },
  multiPlayers: {
    ymap: undefined,
  },
  organization: {
    organization: {},
  },
  pageMenu: {
    editingPage: null,
    showEditingPopover: false,
    showRenamePageHandleModal: false,
    showEditPageEventsModal: false,
    showDeleteConfirmationModal: false,
    showEditPageNameInput: false,
    popoverTargetId: null,
    showAddNewPageInput: false,
    showSearch: false,
    pageSearchResults: null,
    isPageGroup: false,
    pageSettingSelected: false,
    pageSettings: {},
  },
  queryPanel: {
    isQueryPaneExpanded: false,
    isDraggingQueryPane: false,
    queryPanelHeight: 70,
    selectedQuery: null,
    previewPanelHeight: 0,
    selectedDataSource: null,
    queryToBeRun: null,
    previewLoading: false,
    queryPreviewData: '',
    showCreateQuery: false,
    nameInputFocused: false,
    previewPanelExpanded: false,
    loadingDataQueries: false,
    isPreviewQueryLoading: false,
    queryPanelSearchTem: '',
  },
  resolve: {
    resolvedStore: {
      modules: {
        canvas: {
          others: {
            canvasBackgroundColor: null,
            isPagesSidebarHidden: false,
          },
          components: {},
          secrets: {},
          customResolvables: {},
          exposedValues: {
            queries: {},
            components: {},
            variables: {},
            constants: {},
            globals: {},
            page: {
              variables: {},
            },
          },
        },
      },
    },
  },
  rightSideBar: {
    activeRightSideBarTab: {
      COMPONENTS: 'components',
      CONFIGURATION: 'configuration',
    },
  },
  undoRedo: {
    undoStack: [],
    redoStack: [],
  },
  user: {
    user: {},
  },
};
