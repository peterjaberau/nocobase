
const appDataDefaults = {
  editingVersion: null,
  currentUser: null,
  apps: [],
  appName: null,
  slug: null,
  creationMode: 'DEFAULT',
  isPublic: null,
  isMaintenanceOn: null,
  organizationId: null,
  currentVersionId: null,
  userId: null,
  app: {},
  components: [],
  pages: [],
  layouts: [],
  events: [],
  eventHandlers: [],
  appDefinitionDiff: null,
  appDiffOptions: {},
  isSaving: false,
  appId: null,
  areOthersOnSameVersionAndPage: false,
  appVersionPreviewLink: null,
  metadata: null,
  eventsUpdatedLoader: false,
  eventsCreatedLoader: false,
  actionsUpdatedLoader: false,
  eventToDeleteLoaderIndex: null,
  isTJDarkMode: localStorage.getItem('darkMode') === 'true',
}

const appVersionDefaults = {
  editingVersion: null,
  isUserEditingTheVersion: false,
  releasedVersionId: null,
  isVersionReleased: false,
  isEditorFreezed: false,
  isBannerMandatory: false,
  appVersions: [],
  isAppVersionPromoted: false,
  currentAppVersionEnvironment: null,
}

const currentSessionDefaults = {
  organizations: [],
  isGettingOrganizations: false,
}

const currentStateDefaults = {
  queries: {},
  components: {},
  globals: {
    theme: { name: 'light' },
    urlparams: null,
    environment: {
      id: null,
      name: null,
    },
    mode: {},
    currentUser: {},
  },
  errors: {},
  variables: {},
  client: {},
  server: {},
  page: {
    handle: '',
    variables: {},
  },
  succededQuery: {},
  constants: {},
  isEditorReady: false,
}

const dataQueriesDefaults = {
  dataQueries: [],
  secrets: [],
  sortBy: 'updated_at',
  sortOrder: 'desc',
  loadingDataQueries: true,
  isDeletingQueryInProcess: false,
  /** TODO: Below two params are primarily used only for websocket invocation post update. Can be removed onece websocket logic is revamped */
  // isCreatingQueryInProcess: false,
  creatingQueryInProcessId: null,
  isUpdatingQueryInProcess: false,
  /** When a 'Create Data Query' operation is in progress, rename/update API calls are cached in the variable. */
  queuedActions: {},
  // queuedQueriesForRunOnAppLoad: [],
}

const dataSourcesDefaults = {
  dataSources: [],
  loadingDataSources: true,
  globalDataSources: [],
  sampleDataSource: null,
  globalDataSourceStatus: {
    isSaving: false,
    isEditing: false,
    unSavedModalVisible: false,
    action: null,
    saveAction: null,
  },
}

const editorDefaults = {
  currentLayout: 'desktop',
  showComments: false,
  hoveredComponent: '',
  selectionInProgress: false,
  selectedComponents: [],
  isEditorActive: false,
  selectedComponent: null,
  canUndo: false,
  canRedo: false,
  currentVersion: {},
  noOfVersionsSupported: 100,
  appDefinition: {},
  isUpdatingEditorStateInProcess: false,
  saveError: false,
  isLoading: true,
  defaultComponentStateComputed: false,
  showLeftSidebar: true,
  queryConfirmationList: [],
  currentPageId: null,
  currentSessionId: uuid(),
  currentAppEnvironment: null,
  currentAppEnvironmentId: null,
  featureAccess: null,
  componentsNeedsUpdateOnNextRender: [],
  appMode: 'auto',
  editorCanvasWidth: 1092,
  canvasBackground: {},
  pageSwitchInProgress: false,
}

const environmentsAndVersionsDefaults = {
  selectedVersion: null,
  selectedEnvironment: null,
  appVersionEnvironment: null,
  versionsPromotedToEnvironment: [],
  environments: [],
  shouldRenderPromoteButton: false,
  shouldRenderReleaseButton: false,
  initializedEnvironmentDropdown: false,
  environmentsLazyLoaded: false,
  appVersionsLazyLoaded: false,
  previewInitialEnvironmentId: null,
  developmentVersions: [],
}

const gridDefaults = {
  draggedElement: null,
  activeGrid: null,
  noOfGrid: 43,
  draggedSubContainer: false,
  resizingComponentId: null,
  dragTarget: null,
  isGroupHandleHoverd: false,
  idGroupDragged: false,
  openModalWidgetId: null,
  subContainerWidths: {},
}

const keyboardShortcutsDefaults = {
  componentStack: [],
}

const licenseDefaults = {
  featureAccess: {},
  featuresLoaded: false,
}

const queryPanelDefaults = {
  queryPanelHeight: queryManagerPreferences?.isExpanded ? queryManagerPreferences?.queryPanelHeight : 95 ?? 70,
  previewPanelHeight: 0,
  selectedQuery: null,
  selectedDataSource: null,
  queryToBeRun: null,
  previewLoading: false,
  queryPreviewData: '',
  showCreateQuery: false,
  nameInputFocussed: false,
  previewPanelExpanded: false,
}


const whitelabelDefaults = {
  activeOrganizationId: null,
  whiteLabelText: 'white_label_text',
  whiteLabelLogo: 'white_label_logo',
  whiteLabelFavicon: 'white_label_favicon',
  loadingWhiteLabelDetails: true,
  isWhiteLabelDetailsFetched: false,
}
