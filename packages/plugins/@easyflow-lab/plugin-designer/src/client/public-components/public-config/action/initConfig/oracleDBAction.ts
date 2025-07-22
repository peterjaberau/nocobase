import { OracleDBAction, OracleDBActionType } from "../../../public-types/action"

export const OracleDBActionSQLModeInitial = {
  raw: "",
}

export const OracleDBActionInitial: OracleDBAction<OracleDBActionType> = {
  mode: "sql-safe",
  opts: OracleDBActionSQLModeInitial,
}
