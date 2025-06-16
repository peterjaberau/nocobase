function findOne(headers, tableId, query = '') {
  return [];
}

function findAll(organizationId) {
  return [];
}

async function getTablesLimit() {
  return [];
}

function createTable(organizationId, tableName, columns, foreignKeyColumns, checkingValues = false) {
  return [];
}

function viewTable(organizationId, tableName) {
  return [];
}

function bulkUpload(organizationId, tableName, file) {
  return [];
}

function createRow(headers, tableId, data) {
  return [];
}

function createColumn(
  organizationId,
  tableId,
  columnName,
  dataType,
  defaultValue,
  isNotNull,
  isUniqueConstraint,
  isCheckSerialType = false,
  checkingValues = false,
  foreignKeyArray,
  configurations = {},
) {
  return [];
}

function updateTable(organizationId, tableName, columns) {
  return [];
}

function renameTable(organizationId, tableName, newTableName, data = []) {
  return [];
}

function editForeignKey(organizationId, tableName, id, data = []) {
  return [];
}

function createForeignKey(organizationId, tableName, data = []) {
  return [];
}

function deleteForeignKey(organizationId, tableName, id) {
  return [];
}

function updateRows(headers, tableId, data, query = '') {
  return [];
}

function updateColumn(organizationId, tableName, columns) {
  return [];
}

function deleteRows(headers, tableId, query = '') {
  return [];
}

function deleteColumn(organizationId, tableName, columnName) {
  return [];
}

function deleteTable(organizationId, tableName) {
  return [];
}

function joinTables(headers, organizationId, data) {
  return [];
}

export const tooljetDatabaseService = {
  findOne,
  findAll,
  viewTable,
  createRow,
  createTable,
  createColumn,
  updateTable,
  updateRows,
  deleteRows,
  deleteColumn,
  deleteTable,
  renameTable,
  getTablesLimit,
  bulkUpload,
  joinTables,
  updateColumn,
  editForeignKey,
  createForeignKey,
  deleteForeignKey,
};
