import Adoptions from "../models/adoptionsModels.js"
import User from "../models/usersModels.js";
import Pets from "../models/petsModels.js";

const CompleteTheAdoption = async (userId, data) => {
  const { PetId,} = data;

  if (!PetId) {
    const error = new Error("The pet ID and user ID are mandatory.");
    error.statusCode = 400;
    throw error;
  }

  const user = await User.findById(userId);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  const pet = await Pets.findById(PetId);

  if (!pet) {
    const error = new Error("Pet not found");
    error.statusCode = 404;
    throw error;
  }

  if (!pet.active) {
    const error = new Error("This pet is inactive.");
    error.statusCode = 400;
    throw error;
  }

  if (pet.adopted) {
    const error = new Error("This pet has already been adopted.");
    error.statusCode = 400;
    throw error;
  }


  const adoption = await Adoptions.create({
    UserId: userId,
    PetId: PetId,
  });

  pet.adopted = true;
  await pet.save();

  return await Adoptions.findById(adoption._id)
  .populate("UserId")
  .populate("PetId");
};

const getMyAdoption = async (userId) => {
  return Adoptions.find({ UserId: userId })
    .populate("UserId")
    .populate("PetId")
    .sort({ createdAt: -1 });
};


const getAllAdoption = async () => {
  return Adoptions.find()
    .populate("UserId")
    .populate("PetId")
    .sort({ createdAt: -1 });
};

export default {
  CompleteTheAdoption,
  getMyAdoption,
  getAllAdoption
}