import bcrypt from "bcryptjs";

export const generateHash = async (str, saltRounds) => {
  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(str, salt);
};

export const compareHash = async (str1, str2) => {
  return await bcrypt.compare(str1, str2);
};
