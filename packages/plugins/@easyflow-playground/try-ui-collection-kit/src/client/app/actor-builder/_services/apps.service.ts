import queryString from 'query-string';

export const appsService = {
  validatePrivateApp,
  validateReleasedApp,
  setVisibility,
  setMaintenance,
  setSlug,
  getAll,
  createApp,
  cloneApp,
  exportApp,
  importApp,
  exportResource,
  importResource,
  cloneResource,
  changeIcon,
  deleteApp,
  getApp,
  getAppByVersion,
  saveApp,
  getAppUsers,
  getVersions,
  getTables,
  getWorkflows,
  getAppsLimit,
  getWorkflowLimit,
  releaseVersion,
};

function getWorkflows(id) {
  return [];
}

function getAppsLimit() {
  return [];
}

function validateReleasedApp(slug) {
  return [];
}

function validatePrivateApp(slug, queryParams) {
  return [];
}

function getAll(page, folder, searchKey, type = 'front-end') {
  return [];
}

function createApp(body = {}) {
  return [];
}

function createWorkflow(body = {}) {
  return [];
}

function cloneApp(id, name) {
  return [];
}

function exportApp(id, versionId) {
  return [];
}

function getVersions(id) {
  return [];
}

function importApp(app, name) {
  return [];
}

function changeIcon(icon, appId) {
  return [];
}

function getApp(id, accessType) {
  return [];
}

function deleteApp(id) {
  return [];
}

function getAppByVersion(appId, versionId) {
  return [];
}

function saveApp(id, attributes) {
  return [];
}

function getAppUsers(id) {
  return [];
}

function setVisibility(appId, visibility) {
  return [];
}

function setMaintenance(appId, value) {
  return [];
}

function setSlug(appId, slug) {
  return [];
}

function exportResource(body) {
  return [];
}

function importResource(body) {
  return [];
}

function cloneResource(body) {
  return [];
}

function getTables(id) {
  return [];
}

function getWorkflowLimit(type) {
  return [];
}

function releaseVersion(appId, versionToBeReleased) {
  return [];
}
