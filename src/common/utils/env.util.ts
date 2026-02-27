/**
 * Env - Utility class for safe and expressive environment variable access.
 *
 * Usage:
 *   Env.get('PORT')                     → string | undefined
 *   Env.get('PORT', '3000')             → string (with default)
 *   Env.getOrThrow('DATABASE_URL')      → string (throws if missing/empty)
 *   Env.getInt('PORT', 3000)            → number
 *   Env.getBool('DEBUG', false)         → boolean
 *   Env.has('PORT')                     → true/false (key exists)
 *   Env.hasValue('PORT')                → true/false (key exists AND non-empty)
 *   Env.is('NODE_ENV', 'production')    → true/false
 *   Env.isProduction()                  → shorthand
 *   Env.isDevelopment()                 → shorthand
 */
export class Env {
  // ─── Existence Checks ──────────────────────────────────────────────────────

  /**
   * Returns `true` if the env key EXISTS in `process.env` (even if empty string).
   */
  static has(key: string): boolean {
    return key in process.env;
  }

  /**
   * Returns `true` if the env key exists AND has a non-empty value.
   */
  static hasValue(key: string): boolean {
    const val = process.env[key];
    return val !== undefined && val.trim() !== "";
  }

  // ─── String Getters ─────────────────────────────────────────────────────────

  /**
   * Get a string env value. Returns `defaultValue` if missing or empty.
   */
  static get(key: string): string | undefined;
  static get(key: string, defaultValue: string): string;
  static get(key: string, defaultValue?: string): string | undefined {
    const val = process.env[key];
    if (val === undefined || val.trim() === "") {
      return defaultValue;
    }
    return val;
  }

  /**
   * Get a string env value. Throws `Error` if missing or empty.
   */
  static getOrThrow(key: string): string {
    const val = process.env[key];
    if (val === undefined || val.trim() === "") {
      throw new Error(
        `[Env] Required environment variable "${key}" is missing or empty.`,
      );
    }
    return val;
  }

  // ─── Typed Getters ───────────────────────────────────────────────────────────

  /**
   * Get env value as an integer. Returns `defaultValue` if missing, empty, or NaN.
   */
  static getInt(key: string, defaultValue: number): number {
    const val = process.env[key];
    if (val === undefined || val.trim() === "") return defaultValue;
    const parsed = parseInt(val, 10);
    return isNaN(parsed) ? defaultValue : parsed;
  }

  /**
   * Get env value as an integer. Throws if missing, empty, or not a valid integer.
   */
  static getIntOrThrow(key: string): number {
    const val = this.getOrThrow(key);
    const parsed = parseInt(val, 10);
    if (isNaN(parsed)) {
      throw new Error(
        `[Env] Environment variable "${key}" must be a valid integer, got: "${val}"`,
      );
    }
    return parsed;
  }

  /**
   * Get env value as a float. Returns `defaultValue` if missing, empty, or NaN.
   */
  static getFloat(key: string, defaultValue: number): number {
    const val = process.env[key];
    if (val === undefined || val.trim() === "") return defaultValue;
    const parsed = parseFloat(val);
    return isNaN(parsed) ? defaultValue : parsed;
  }

  /**
   * Get env value as a boolean.
   * Truthy strings: 'true', '1', 'yes', 'on' (case-insensitive).
   * Everything else is `false`.
   */
  static getBool(key: string, defaultValue: boolean): boolean {
    const val = process.env[key];
    if (val === undefined || val.trim() === "") return defaultValue;
    return ["true", "1", "yes", "on"].includes(val.trim().toLowerCase());
  }

  // ─── Value Comparison ────────────────────────────────────────────────────────

  /**
   * Returns `true` if the env value strictly equals `expected` (case-sensitive).
   */
  static is(key: string, expected: string): boolean {
    return process.env[key] === expected;
  }

  // ─── Environment Shorthands ──────────────────────────────────────────────────

  static isProduction(): boolean {
    return this.is("NODE_ENV", "production");
  }

  static isDevelopment(): boolean {
    return this.is("NODE_ENV", "development");
  }

  static isTest(): boolean {
    return this.is("NODE_ENV", "test");
  }

  static isStaging(): boolean {
    return this.is("NODE_ENV", "staging");
  }

  // ─── Array Getters ──────────────────────────────────────────────────────────

  /**
   * Get env value as an array of strings (comma-separated).
   * Returns `defaultValue` if missing or empty.
   */
  static getArray(key: string): string[] | undefined;
  static getArray(key: string, defaultValue: string[]): string[];
  static getArray(key: string, defaultValue?: string[]): string[] | undefined {
    const val = process.env[key];
    if (val === undefined || val.trim() === "") return defaultValue;
    return val.split(",").map((v) => v.trim());
  }

  /**
   * Get env value as an array of strings. Throws if missing or empty.
   */
  static getArrayOrThrow(key: string): string[] {
    const val = this.getOrThrow(key);
    return val.split(",").map((v) => v.trim());
  }
}
