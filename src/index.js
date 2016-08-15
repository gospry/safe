'use strict'

import { send } from 'micro'
import dbg from 'debug'

const debug = dbg('spry')

export default fn => async (req, res) => {
  try {
    return await fn(req, res)
  } catch (e) {
    if (process.env.NODE_ENV !== 'production' && e.stack) {
      debug(e.stack)
    }

    send(res, e.statusCode || 500, {
      message: e.message,
      error: true
    })
  }
}
