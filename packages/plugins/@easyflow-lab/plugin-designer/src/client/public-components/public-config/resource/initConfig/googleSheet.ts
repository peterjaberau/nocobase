import {
  GoogleSheetAuthStatus,
  GoogleSheetResource,
} from "../../../public-types/resource"

export const GoogleSheetResourceInitial: GoogleSheetResource = {
  authentication: "serviceAccount",
  opts: {
    privateKey: "",
    status: GoogleSheetAuthStatus.Initial,
  },
}
