import { AppwriteActionMethodsType } from "../../../public-types/action"
import {
  AppwriteDocumentOperationsInitial,
  AppwriteListDocumentsInitial,
} from ".."

export const generateAppwriteOpts = (method: AppwriteActionMethodsType) => {
  switch (method) {
    case "get":
    case "update":
    case "delete":
    case "create": {
      return AppwriteDocumentOperationsInitial
    }

    case "list": {
      return AppwriteListDocumentsInitial
    }
  }
}
