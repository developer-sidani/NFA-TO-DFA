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
