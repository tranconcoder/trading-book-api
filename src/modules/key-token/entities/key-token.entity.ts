/**
 * Class representing a KeyToken object used for authentication security.
 * Stores a user's current public key and a list of previously used public keys (for rotation/security tracking).
 */
export class KeyToken {
  /**
   * Unique identifier of the user (UUID).
   */
  userId: string;

  /**
   * Current active public key for JWT verification.
   */
  publicKey: string;

  /**
   * List of previously used public keys to track potentially compromised/rotated keys.
   */
  publicKeyUsed: string[];

  constructor(partial: KeyToken) {
    this.userId = partial.userId;
    this.publicKey = partial.publicKey;
    this.publicKeyUsed = partial.publicKeyUsed;
  }
}
