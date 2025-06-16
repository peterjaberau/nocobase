export type CallerType = {
  id: string,
  type: "user" | "guest" | "system" | any
  [key: string]: any
}

export type HTTPClientType = {
  type: "page_session" | "session" | "user"
}

export type CreateActorHTTPClientType = {
  props: {
    type: HTTPClientType
    caller: CallerType
  },
  [key: string]: any
}

export const createActorHTTPClient = (props: CreateActorHTTPClientType) => {

}
