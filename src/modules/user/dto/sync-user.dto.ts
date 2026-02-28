/**
 * Data Transfer Object for synchronizing user data from external providers.
 */
export class SyncUserDto {
  /**
   * User's email address.
   */
  email: string;

  /**
   * User's first name.
   */
  firstName: string;

  /**
   * User's last name.
   */
  lastName: string;

  /**
   * URL to the user's avatar image.
   */
  avatar: string;
}
