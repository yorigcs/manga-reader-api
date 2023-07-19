export interface Hash {
  hash: (plainText: string) => Promise<string>;
}

export interface HashCompare {
  compare: (plainText: string, cipherText) => Promise<boolean>;
}
