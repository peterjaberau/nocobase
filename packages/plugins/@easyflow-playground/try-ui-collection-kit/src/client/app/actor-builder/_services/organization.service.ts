export const organizationService = {
  getUsersByValue,
  createOrganization,
  editOrganization,
  getOrganizations,
  switchOrganization,
  getSSODetails,
  editOrganizationConfigs,
  getWorkspacesLimit,
  checkWorkspaceUniqueness,
  updateOrganization,
};

function getUsersByValue(searchInput) {
  return [];
}

function createOrganization(data) {
  return [];
}

// Used for making API calls to update workspace name/slug and workspace status
function updateOrganization(params, organizationId = '') {
  return [];
}

//  Used for making API calls to update details related to organization's SSO configurations
function editOrganization(params, organizationId = '') {
  return [];
}

function getOrganizations(status = 'active', currentPage = undefined, perPageCount = undefined, name = undefined) {
  return [];
}

function switchOrganization(organizationId) {
  return [];
}

function getSSODetails() {
  return [];
}

function editOrganizationConfigs(params) {
  return [];
}

function getWorkspacesLimit() {
  return [];
}

function checkWorkspaceUniqueness(name, slug) {
  return [];
}
