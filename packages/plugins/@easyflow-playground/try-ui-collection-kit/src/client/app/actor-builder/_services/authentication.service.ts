const currentSession = {
  current_organization_id: null,
  current_organization_name: null,
  super_admin: null,
  admin: null,
  user_permissions: null,
  group_permissions: null,
  app_group_permissions: null,
  data_source_group_permissions: null,
  role: null,
  organizations: [],
  isUserLoggingIn: false,
  authentication_status: null,
  authentication_failed: null,
  isOrgSwitchingFailed: null,
  isUserUpdated: false,
  load_app: false, //key is used only in the viewer mode
  instance_id: null,
  noWorkspaceAttachedInTheSession: false,
  triggeredOnce: null,
  createdAt: null,
};

export const authenticationService = {
  login,
  superAdminLogin,
  signup,
  verifyToken,
  verifyOrganizationToken,
  setupAdmin,
  currentSession,
  signInViaOAuth,
  resetPassword,
  saveLoginOrganizationId,
  getLoginOrganizationId,
  deleteLoginOrganizationId,
  forgotPassword,
  resendInvite,
  authorize,
  getUserDetails,
  activateTrial,
  getLoginOrganizationSlug,
  saveLoginOrganizationSlug,
  getInvitedUserSession,
  activateAccountWithToken,
  getSignupOrganizationId,
  getSignupOrganizationSlug,
  getInviteFlowIndetifier,
  setSignUpOrganizationDetails,
  deleteAllAuthCookies,
};

function setSignUpOrganizationDetails(organizationId, organizationSlug, inviteFlowIdentifier) {}

function deleteAllAuthCookies() {
  return [];
}

function login(email, password, organizationId) {
  return [];
}

function superAdminLogin(email, password) {
  return [];
}

function getUserDetails() {
  return [];
}

function saveLoginOrganizationId(organizationId) {
  return [];
}

function getLoginOrganizationId() {
  return [];
}

function getSignupOrganizationId() {
  return [];
}

function deleteLoginOrganizationId() {
  return [];
}

function getSignupOrganizationSlug() {
  return [];
}

function getInviteFlowIndetifier() {
  return [];
}

function saveLoginOrganizationSlug(organizationSlug) {
  return [];
}

function getLoginOrganizationSlug() {
  return [];
}

function signup(email, name, password, organizationId, redirectTo) {
  return [];
}

function activateAccountWithToken(email, password, organizationToken) {
  return [];
}

function resendInvite(email, organizationId, redirectTo) {
  return [];
}
function setupAdmin({ companyName, companySize, name, role, workspace, password, email, phoneNumber, requestedTrial }) {
  return [];
}

function activateTrial() {
  return [];
}

function verifyOrganizationToken(token) {
  return [];
}
function verifyToken(token, organizationToken) {
  return [];
}

function forgotPassword(email) {
  return [];
}

function resetPassword(params) {
  return [];
}

function signInViaOAuth(configId, ssoType, ssoResponse) {
  return [];
}

function authorize() {
  return [];
}

function getInvitedUserSession({ accountToken, organizationToken }) {
  return [];
}
