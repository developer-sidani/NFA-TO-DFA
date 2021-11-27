import { TransitionInterface } from '../../types'

type T = TransitionInterface | string;

export function getTransitions(obj:T,
  buildKeyStr:string[] = []):string {
  return Object.entries(obj).reduce((acc, [key, val]) => {
    if (Array.isArray(val)) {
      return `${acc + [...buildKeyStr, key]
        .join('->')} [label = "${val.join(',')}"]\n`
    }

    if (typeof val === 'object') {
      return acc + getTransitions(val, [...buildKeyStr, key])
    }

    return acc + val
  }, '')
}

export function convertTransitionObject(obj:T):T {
  const myNewObject:T = {}
  if (obj) {
    // eslint-disable-next-line array-callback-return
    Object?.entries(obj)?.map(([key, value]) => {
      myNewObject[key] = {}
      // eslint-disable-next-line array-callback-return
      Object.entries(value).map(([k, val]) => {
        // @ts-ignore
        // eslint-disable-next-line array-callback-return
        val?.map(x => {
          if (!myNewObject[key][x]) {
            myNewObject[key][x] = []
          }
          myNewObject[key][x].push(k)
        })
      })
    })
  }
  return myNewObject
}
