export interface Hash {
  hash: (input: Hash.Input) => Promise<Hash.Output>;
}

export namespace Hash {
  export type Input = {
    plainText: string;
  };
  export type Output = string;
}

export interface HashCompare {
  compare: (input: HashCompare.Input) => Promise<HashCompare.Output>;
}

export namespace HashCompare {
  export type Input = {
    plainText: string;
    cipherText: string;
  };
  export type Output = boolean;
}
