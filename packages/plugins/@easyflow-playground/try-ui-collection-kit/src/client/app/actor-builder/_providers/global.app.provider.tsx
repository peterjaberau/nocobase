import React from 'react'
import { assign, setup } from 'xstate'
import { createActorContext } from '@xstate/react'

export interface ICreateAppMachine {
  searchParams: any
  router: any
  initialPath: any
  send: any
  snapshot: { session: any, user: any} | any
  token: any,
  [key: string]: any
}

export const createAppMachine = (props: ICreateAppMachine) => {
  const { searchParams, router, initialPath, send, snapshot, token } = props

  const initialSessionSnapshot = snapshot.session
  const initialUserSnapshot = snapshot.user

  const globalAppMachine1 = setup({
    types: {
      input: {} as { id: string, initialCaller: any, sessionAccessToken: any, userAccessToken: any} | any,
      context: {} as any,
      events: {} as any,
    },
    actions: {

    }, actors: {}, guards: {}
  }).createMachine({
    initial: 'idle',
    context: ({ input }) =>  {
      return {...input}
    }
  })

}

export const globalAppMachine = setup({
  actions: {}, actors: {}, guards: {}
}).createMachine({
  initial: 'idle',
  context: ({ input }) =>  {
    return {...input}
  }
})

export const GlobalAppContext = createActorContext(globalAppMachine)

export function GlobalAppProvider({ children }) {
  return <GlobalAppContext.Provider>{children}</GlobalAppContext.Provider>
}



// export const rootMachine = setup({}).createMachine({})

// export const rootMachine = setup({
//   actions: {}, actors: {}, guards: {}
// }).createMachine({
//   initial: 'idle',
//   context: ({ input }) =>  {
//     return {...input}
//   }
// })
