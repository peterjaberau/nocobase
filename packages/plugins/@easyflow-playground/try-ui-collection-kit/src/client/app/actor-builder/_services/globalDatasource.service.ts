export const globalDatasourceService = {
  create,
  getAll,
  save,
  deleteDataSource,
  convertToGlobal,
  getDataSourceByEnvironmentId,
  getForApp,
};

function getForApp(organizationId, appVersionId, environmentId) {
  return [];
}

function getAll(organizationId, appVersionId, environmentId) {
  return [];
}

function create({ plugin_id, name, kind, options, scope, environment_id }) {
  return [];
}

function save({ id, name, options, environment_id }) {
  return [];
}

function deleteDataSource(id) {
  return [];
}

function convertToGlobal(id) {
  return [];
}

function getDataSourceByEnvironmentId(dataSourceId, environmentId) {
  return [];
}
