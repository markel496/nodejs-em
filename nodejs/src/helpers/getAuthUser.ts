import { AuthorizationError } from '#errors'

import type { Request } from 'express'

export const getAuthUser = (req: Pick<Request, 'state'>) => {
  if (!req.state?.user) {
    throw new AuthorizationError({
      code: 'UNAUTHORIZED',
      text: 'User is not authorized'
    })
  }

  return req.state.user
}
