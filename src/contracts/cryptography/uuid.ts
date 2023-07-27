export interface UuidGenerate {
  generate: (input: UuidGenerate.Input) => UuidGenerate.Output
}
export namespace UuidGenerate {
  export interface Input { key?: string }
  export type Output = string
}
