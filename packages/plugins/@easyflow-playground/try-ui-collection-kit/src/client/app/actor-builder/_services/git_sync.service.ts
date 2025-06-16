export const gitSyncService = {
  create,
  getGitConfig,
  updateConfig,
  syncAppVersion,
  setFinalizeConfig,
  deleteConfig,
  getAppConfig,
  gitPush,
  gitPull,
  importGitApp,
  checkForUpdates,
  confirmPullChanges,
  updateStatus,
  getGitStatus,
};

function create(organizationId, gitUrl) {
  return [];
}

function updateConfig(organizationGitId, updateParam) {
  return [];
}

function updateStatus(organizationGitId, isEnabled) {
  return [];
}

function setFinalizeConfig(organizationGitId) {
  return [];
}

function getGitConfig(workspaceId) {
  return [];
}

function getGitStatus(workspaceId) {
  return [];
}

function syncAppVersion(appGitId, versionId) {
  return [];
}

function deleteConfig(organizationGitId) {
  return [];
}

function gitPush(body, appGitId, versionId) {
  return [];
}

function getAppConfig(organizationId, versionId) {
  return [];
}

function checkForUpdates(appId) {
  return [];
}

function gitPull() {
  return [];
}

function confirmPullChanges(body, appId) {
  return [];
}

function importGitApp(body) {
  return [];
}
