export interface IConfig {
  pattern: {
    prefix: string
    suffix: string
    seperator: string
  }
  elementTypes: {
    [type: string]: React.ComponentType<any>
  }
}
export interface IReactTransformer {
  config: IConfig
  children: React.ReactNode
}

export interface IPattern {
  data: any
  type: string
  startPosition: number
  endPosition: number
}
