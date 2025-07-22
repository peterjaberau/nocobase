import {
  AppwriteAction,
  AppwriteDocumentOperations,
  AppwriteFilterParams,
  AppwriteListDocuments,

} from "../../../public-types/action"

export const AppwriteDocumentOperationsInitial: AppwriteDocumentOperations = {
  collectionID: "",
  documentID: "",
  data: "",
}

export const AppwriteFilterInitial: AppwriteFilterParams = {
  key: "",
  operator: "equal",
  value: "",
}

export const AppwriteOrderByInitial = { key: "", value: "asc" }

export const AppwriteListDocumentsInitial: AppwriteListDocuments = {
  collectionID: "",
  filter: [
    {
      key: "",
      operator: "equal",
      value: "",
    },
  ],
  orderBy: [
    {
      key: "",
      value: "asc",
    },
  ],
  limit: "{{100}}",
}

export const AppwriteActionInitial: AppwriteAction<AppwriteListDocuments> = {
  method: "list",
  opts: AppwriteListDocumentsInitial,
}
