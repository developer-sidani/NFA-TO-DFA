export interface State{
  id:string
  initial?:true
  final?:boolean
}

export interface TransitionInterface {
    [x: string]: Record<string, string[]>
}
