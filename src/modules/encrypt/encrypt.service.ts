import { Injectable } from "@nestjs/common";
import { generateKeyPair } from "node:crypto";
import { promisify } from "node:util";
import { InternalServerError } from "@/core/response/errors";

const generateKeyPairAsync = promisify(generateKeyPair);

/**
 * Service for cryptographic operations, such as RSA key pair generation.
 */
@Injectable()
export class EncryptService {
  /**
   * Generates a new RSA Key Pair (Private & Public) using asymmetric encryption.
   * Default bit length is 2048. Format is PEM and type is SPKI (Public) / PKCS8 (Private).
   * @returns A promise resolving to an object containing publicKey and privateKey strings.
   * @throws {InternalServerError} If key generation fails.
   */
  async generateRSAKeyPair(): Promise<{
    publicKey: string;
    privateKey: string;
  }> {
    try {
      const { publicKey, privateKey } = await generateKeyPairAsync("rsa", {
        modulusLength: 2048,
        publicKeyEncoding: {
          type: "spki",
          format: "pem",
        },
        privateKeyEncoding: {
          type: "pkcs8",
          format: "pem",
        },
      });

      return { publicKey, privateKey };
    } catch (error) {
      throw new InternalServerError(
        `Failed to generate RSA key pair: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }
}
