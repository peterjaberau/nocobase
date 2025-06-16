export const workflowExecutionsService = {
  create,
  getStatus,
  getWorkflowExecution,
  execute,
  all,
  enableWebhook,
  previewQueryNode,
};

function previewQueryNode(queryId, appVersionId, nodeId) {
  return [];
}

function create(appVersionId, testJson, environmentId) {
  return [];
}

function getStatus(workflowExecutionId) {
  return [];
}

function getWorkflowExecution(workflowExecutionId) {
  return [];
}

function all(appVersionId) {
  return [];
}

function execute(workflowAppId, params, appId = undefined, environmentId) {
  return [];
}

function enableWebhook(appId, value) {
  return [];
}
