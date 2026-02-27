import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

export enum EGender {
  MALE = "male",
  FEMALE = "female",
  OTHER = "other",
}

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "first_name" })
  firstName: string;

  @Column({ name: "last_name" })
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  avatar?: string;

  @Column({ nullable: true })
  address?: string;

  @Column({ name: "date_of_birth", type: "date", nullable: true })
  dateOfBirth?: Date;

  @Column({ type: "enum", enum: EGender, default: EGender.OTHER })
  gender: EGender;

  @Column({ name: "google_id", nullable: true })
  googleId?: string;

  @CreateDateColumn({ name: "created_at", type: "timestamptz" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamptz" })
  updatedAt: Date;
}
