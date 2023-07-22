export interface UploadFile {
  upload: (input: UploadFile.Input) => Promise<UploadFile.Output>
}

export namespace UploadFile {
  export interface Input { file: Buffer, fileName: string }
  export type Output = string
}
