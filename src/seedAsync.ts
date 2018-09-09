import User, { UserRole } from "./models/user";
import { hashPasswordAsync } from "./utils/passwordService";
import logger from "./utils/logger";

const seedSuperAdminAsync = async () => {
  const superAdmin = await User.findOne({
    username: process.env.SUPER_ADMIN_USERNAME
  }).exec();
  if (superAdmin) return;

  const newSuperAdmin = new User({
    username: process.env.SUPER_ADMIN_USERNAME,
    password: await hashPasswordAsync(process.env.SUPER_ADMIN_PASSWORD),
    role: UserRole.SuperAdmin
  });
  await newSuperAdmin.save();
};

const seedAsync = async () => {
  try {
    await seedSuperAdminAsync();
  } catch (err) {
    logger.error("Seed data error", err);
    process.exit();
  }
};

export default seedAsync;
