import mongoose from "mongoose";
import bcrypt from "bcryptjs";
/**
 * Imports bcrypt, a library for hashing passwords.
 * Ensures passwords are never stored in plain text.
 */

const userSchema = new mongoose.Schema({//Creates a schema (structure) for the User collection.
  name: String,
  email: { type: String, unique: true },//unique: true → MongoDB ensures no two users can have the same email
  password: String
});

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
  /**
   * Hashes the password using bcrypt.

   * 10 = salt rounds

    * Higher = more secure but slower

    * Replaces plain password with a hashed version.
   */
});

/*
Mongoose pre-save hook

Runs automatically before saving a user document to MongoDB.

function () is used (not arrow function) so this refers to the current user.
*/
export default mongoose.model("User", userSchema);

/*
Creates a User model from the schema.

Exports it so it can be used in controllers (User.find(), User.create() etc).*/