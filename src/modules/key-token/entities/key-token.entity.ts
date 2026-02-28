export class KeyToken {
  userId: string;
  publicKey: string;
  publicKeyUsed: string[];

  constructor(partial: Omit<KeyToken, "publicKeyUsed">) {
    this.userId = partial.userId;
    this.publicKey = partial.publicKey;
    this.publicKeyUsed = [];
  }
}
