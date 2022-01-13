const profileInitState = {
  user: {
    _id: '',
    email: '',
    name: '',
    avatar: '',
    publicCardPacksCount: 0,
    created: new Date(),
    updated: new Date(),
    isAdmin: false,
    verified: false,
    rememberMe: false,
    error: ''
  } as ProfileType,
}

export const profileReducer = (state: InitStateType = profileInitState, action: ProfileActionsType): InitStateType => {
  switch (action.type) {
    default: {
      return state
    }
  }
}

// Actions

// Thunk

// Types
type InitStateType = typeof profileInitState
export type ProfileType = {
  _id: string
  email: string
  name: string
  avatar?: string
  publicCardPacksCount: number
  created: Date
  updated: Date
  isAdmin: boolean
  verified: boolean
  rememberMe: boolean
  error?: string
}
type ProfileActionsType = any