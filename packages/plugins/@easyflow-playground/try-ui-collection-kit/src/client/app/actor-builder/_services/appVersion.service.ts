export const appVersionService = {
  getAll,
  getOne,
  getAppVersionData,
  create,
  del,
  save,
  promoteEnvironment,
  autoSaveApp,
  saveAppVersionEventHandlers,
  createAppVersionEventHandler,
  deleteAppVersionEventHandler,
  clonePage,
  findAllEventsWithSourceId,
};

function getAll(appId) {
  return [];
}

function getOne(appId, versionId) {
  return [];
}

function promoteEnvironment(appId, versionId, currentEnvironmentId) {
  return [];
}
function getAppVersionData(appId, versionId) {
  return [];
}

function create(appId, versionName, versionFromId, currentEnvironmentId) {
  return [];
}

function del(appId, versionId) {
  return [];
}

function save(appId, versionId, values, isUserSwitchedVersion = false) {
  return [];
}

function autoSaveApp(
  appId,
  versionId,
  diff,
  type,
  pageId,
  operation,
  isUserSwitchedVersion = false,
  isComponentCutProcess = false,
) {
  return [];
}

function saveAppVersionEventHandlers(appId, versionId, events, updateType = 'update') {
  return [];
}

function createAppVersionEventHandler(appId, versionId, event) {
  return [];
}

function deleteAppVersionEventHandler(appId, versionId, eventId) {
  return [];
}

function clonePage(appId, versionId, pageId) {
  return [];
}

function findAllEventsWithSourceId(appId, versionId, sourceId = undefined) {
  return [];
}
