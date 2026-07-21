import bcrypt from "bcryptjs";
import User from "../models/usersModels.js";
import Adoptions from "../models/adoptionsModels.js";



const getAllUsers = async () => {
  return User.find().sort({ createdAt: -1 });
};

const getUserById = async (id) => {
  const user = await User.findById(id);

  if (!user) {
    const error = new Error("Usuário não encontrado");
    error.statusCode = 404;
    throw error;
  }

  return user;
};

const updateMe = async (userId, data) => {
  delete data.role;
  delete data.active;
  delete data.password;

  if (data.email) {
    const emailExists = await User.findOne({
      email: data.email,
      _id: { $ne: userId },
    });

    if (emailExists) {
      const error = new Error("Já existe outro usuário com esse email");
      error.statusCode = 400;
      throw error;
    }
  }

  const user = await User.findByIdAndUpdate(userId, data, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    const error = new Error("Usuário não encontrado");
    error.statusCode = 404;
    throw error;
  }

  return user;
};

const updateUser = async (id, data) => {
  if (data.email) {
    const emailExists = await User.findOne({
      email: data.email,
      _id: { $ne: id },
    });

    if (emailExists) {
      const error = new Error("Já existe outro usuário com esse email");
      error.statusCode = 400;
      throw error;
    }
  }

  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }

  const user = await User.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    const error = new Error("Usuário não encontrado");
    error.statusCode = 404;
    throw error;
  }

  return user;
};

const deactivateUser = async (id) => {
  const user = await User.findById(id);

  if (!user) {
    const error = new Error("Usuário não encontrado");
    error.statusCode = 404;
    throw error;
  }

  if (!user.active) {
    const error = new Error("Usuário já está desativado");
    error.statusCode = 400;
    throw error;
  }

  const activeLoansCount = await Adoptions.countDocuments({
    userId: id,
    status: "active",
  });

  if (activeLoansCount > 0) {
    const error = new Error(
      "Não é possível desativar usuário com uma adoção ativa"
    );
    error.statusCode = 400;
    throw error;
  }

  user.active = false;

  await user.save();

  return user;
};

const activateUser = async (id) => {
  const user = await User.findById(id);

  if (!user) {
    const error = new Error("Usuário não encontrado");
    error.statusCode = 404;
    throw error;
  }

  if (user.active) {
    const error = new Error("Usuário já está ativo");
    error.statusCode = 400;
    throw error;
  }

  user.active = true;

  await user.save();

  return user;
};

export default {
  getAllUsers,
  getUserById,
  updateMe,
  updateUser,
  deactivateUser,
  activateUser,
};