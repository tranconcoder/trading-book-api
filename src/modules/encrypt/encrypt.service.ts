import { Injectable } from "@nestjs/common";
import { generateKeyPair } from "node:crypto";
import { promisify } from "node:util";
import { InternalServerError } from "@/core/response/errors";

const generateKeyPairAsync = promisify(generateKeyPair);

@Injectable()
export class EncryptService {
  /**
   * Generate a new RSA Key Pair (Private & Public)
   * Default bit length: 2048
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
