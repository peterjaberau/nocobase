export const appService = {
  getConfig,
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
  fetchApp,
  fetchAppBySlug,
  getAppByVersion,
  fetchAppByVersion,
  saveApp,
  getAppUsers,
  createAppUser,
  setPasswordFromToken,
  acceptInvite,
  getInviteeDetails,
};

function getConfig() {
  return [];
}

function getAll(page, folder, searchKey) {
  return [];
}

function createApp(body = {}) {
  return [];
}

function createWorkflow(body = {}) {
  return [];
}

function cloneApp(id) {
  return [];
}

function exportApp(id, versionId) {
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

function importApp(body) {
  return [];
}

function changeIcon(icon, appId) {
  return [];
}

function getApp(id, accessType) {
  return [];
}

// v2 api for fetching app
function fetchApp(id) {
  return [];
}

function deleteApp(id) {
  return [];
}

function fetchAppBySlug(slug) {
  return [];
}

function getAppByVersion(appId, versionId) {
  return [];
}
function fetchAppByVersion(appId, versionId) {
  return [];
}

function saveApp(id, attributes) {
  return [];
}

function getAppUsers(id) {
  return [];
}

function createAppUser(app_id, org_user_id, role) {
  const body = {
    app_id,
    org_user_id,
    role,
  };

  return [];
}

function setPasswordFromToken({ token, password, organization, role, firstName, lastName, organizationToken }) {
  const body = {
    token,
    organizationToken,
    password,
    organization,
    role,
    first_name: firstName,
    last_name: lastName,
  };

  return [];
}

function acceptInvite({ token, password }) {
  const body = {
    token,
    password,
  };

  return [];
}

function getInviteeDetails(token) {
  return [];
}
