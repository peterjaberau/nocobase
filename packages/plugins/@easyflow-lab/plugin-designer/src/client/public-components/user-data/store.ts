import { CurrentUserInfo, Team } from "../public-types"

export type RootState = {
  currentUser: CurrentUserInfo
  team: Team
}
