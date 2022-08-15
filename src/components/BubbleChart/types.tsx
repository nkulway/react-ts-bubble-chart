export namespace Types {
  export type Data = {
    id: number 
    name: string
    size: number
    fillColor: string
  }

  export type ForceData = {
    size: number
  }

  export type ForceDataComplete = {
    size: number
    x: number
    y: number
    v: number
  }
}