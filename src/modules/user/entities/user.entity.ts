import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

/**
 * Enum representing supported user genders.
 */
export enum EGender {
  MALE = "male",
  FEMALE = "female",
  OTHER = "other",
}

/**
 * Entity representing a user in the system.
 * Maps to the 'users' table in the database.
 */
@Entity({ name: "users" })
export class User {
  /**
   * Unique identifier for the user (UUID).
   */
  @PrimaryGeneratedColumn("uuid")
  id: string;

  /**
   * User's first name.
   */
  @Column({ name: "first_name" })
  firstName: string;

  /**
   * User's last name.
   */
  @Column({ name: "last_name" })
  lastName: string;

  /**
   * User's primary email address (unique).
   */
  @Column({ unique: true })
  email: string;

  /**
   * URL to the user's avatar image.
   */
  @Column({ nullable: true })
  avatar?: string;

  /**
   * User's physical or mailing address.
   */
  @Column({ nullable: true })
  address?: string;

  /**
   * User's date of birth.
   */
  @Column({ name: "date_of_birth", type: "date", nullable: true })
  dateOfBirth?: Date;

  /**
   * User's gender.
   */
  @Column({ type: "enum", enum: EGender, default: EGender.OTHER })
  gender: EGender;

  /**
   * User's unique identifier from Google (for OAuth2).
   */
  @Column({ name: "google_id", nullable: true })
  googleId?: string;

  /**
   * Timestamp when the user record was created.
   */
  @CreateDateColumn({ name: "created_at", type: "timestamptz" })
  createdAt: Date;

  /**
   * Timestamp when the user record was last updated.
   */
  @UpdateDateColumn({ name: "updated_at", type: "timestamptz" })
  updatedAt: Date;
}
