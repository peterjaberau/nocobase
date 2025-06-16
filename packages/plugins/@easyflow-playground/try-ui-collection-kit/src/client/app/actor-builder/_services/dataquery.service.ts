export const dataqueryService = {
  create,
  getAll,
  run,
  update,
  del,
  preview,
  changeQueryDataSource,
  updateStatus,
  bulkUpdateQueryOptions,
};

function getAll(appVersionId) {
  return [];
}

function create(app_id, app_version_id, name, kind, options, data_source_id, plugin_id) {
  return [];
}

function update(id, versionId, name, options, dataSourceId) {
  return [];
}

function bulkUpdateQueryOptions(queryOptions, appVersionId) {
  return [];
}

function updateStatus(id, status) {
  return [];
}

function del(id, versionId) {
  return [];
}

function run(queryId, resolvedOptions, options, versionId, environmentId) {
  return [];
}

function preview(query, options, versionId, environmentId) {
  return [];
}

function changeQueryDataSource(id, dataSourceId, versionId, type, kind) {
  return [];
}
