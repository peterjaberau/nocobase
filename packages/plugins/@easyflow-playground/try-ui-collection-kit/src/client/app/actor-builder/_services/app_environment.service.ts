import queryString from 'query-string';

export const appEnvironmentService = {
  getAllEnvironments,
  getVersionsByEnvironment,
  getEnvironment,
  init,
  postVersionDeleteAction,
  postEnvironmentChangedAction,
};

function getEnvironment(id, queryParams) {
  return [];
}

function getAllEnvironments(appId) {
  return [];
}

function getVersionsByEnvironment(appId, environmentId) {
  return [];
}

function init(editing_version_id = null) {
  return [];
}

function postVersionDeleteAction(actionParams = {}) {
  return [];
}

function postEnvironmentChangedAction(actionParams = {}) {
  return [];
}
