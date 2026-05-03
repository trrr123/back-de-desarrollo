import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../database/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export interface UserI {
  id?: number;
  username: string;
  email: string;
  password: string;
  is_active: string;
  avatar?: string;
}

export class User extends Model<UserI> implements UserI {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public is_active!: string;
  public avatar!: string;

  public generateToken(): string {
    return jwt.sign(
      { id: this.id },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "10m" }
    );
  }

  public async checkPassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}

User.init(
  {
    username: {
      type: DataTypes.STRING(80),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    is_active: {
      type: DataTypes.STRING(20),
      defaultValue: "ACTIVE",
    },
    avatar: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: false,
    hooks: {
      beforeCreate: async (user: User) => {
        user.password = await bcrypt.hash(user.password, 10);
      },
      beforeUpdate: async (user: User) => {
        if (user.changed("password")) {
          user.password = await bcrypt.hash(user.password, 10);
        }
      },
    },
  }
);
