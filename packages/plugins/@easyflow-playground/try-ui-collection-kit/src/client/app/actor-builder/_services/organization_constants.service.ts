export const orgEnvironmentConstantService = {
  getAll,
  create,
  update,
  remove,
  getConstantsFromEnvironment,
  getConstantsFromApp,
  getConstantsFromPublicApp,
  getAllSecrets,
};

function getAll(type = null) {
  return [];
}

function create(name, value, type, environments) {
  return [];
}

function update(id, value, environmentId) {
  return [];
}

function remove(id, environmentId) {
  return [];
}

function getConstantsFromEnvironment(environmentId, type = null) {
  return [];
}

function getAllSecrets() {
  return [];
}

function getConstantsFromApp(slug, environmentId) {
  return [];
}

function getConstantsFromPublicApp(slug, environmentId) {
  return [];
}
