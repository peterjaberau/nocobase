export const datasourceService = {
  create,
  getAll,
  deleteDataSource,
  test,
  setOauth2Token,
  save,
  fetchOauth2BaseUrl,
  testSampleDb,
};

function getAll(appVersionId, environment_id, includeStaticSources = false) {
  return [];
}

function create({ plugin_id, name, kind, options, app_id, app_version_id, environment_id }) {
  return [];
}

function save({ id, name, options, app_id, environment_id }) {
  return [];
}

function deleteDataSource(id) {
  return [];
}

function test(body) {
  return [];
}

function testSampleDb(body) {
  return [];
}

function setOauth2Token(dataSourceId, body, current_organization_id) {
  return [];
}

function fetchOauth2BaseUrl(provider, plugin_id = null, source_options = {}) {
  return [];
}
