import Pets from "../models/petsModels.js";
import adoption from "../models/ adoptionsModels.js";

const createPet = async (data) => {
  const { name, race, age, species, } = data;

  if (!race || !age || !name || !species) {
    const error = new Error("Name, age, race and species are mandatory");
    error.statusCode = 400;
    throw error;
  }

  const pet = await Pets.create({
    name,
    age,
    species,
    race,
  });

  return pet;
};

const getAllPets = async () => {
  return pet.find().sort({ createdAt: -1 });
};

const getPetsById = async (id) => {
  const pet = await pet.findById(id);

  if (!pet) {
    const error = new Error("Pet não encontrado");
    error.statusCode = 404;
    throw error;
  }

  return pet;
};

const searchPetsByRace = async (race) => {
  return pet.find({
    race: { $regex: race, $options: "i" },
  }).sort({ pet: 1 });
};

const updatePet = async (id, data) => {
  const pet = await Pet.findById(id);

  if (!pet) {
    const error = new Error("Pet não encontrado");
    error.statusCode = 404;
    throw error;
  }


  if (data.race !== undefined) {
    pet.race = data.race;
  }

  if (data.species !== undefined) {
    pet.species = data.species
  }

  if (data.age !== undefined) {
    pet.age = data.age;
  }

  if (data.name !== undefined) {
    pet.name = data.name;
  }

  await pet.save();

  return pet;
};

const deactivatePet = async (id) => {
  const pet = await pet.findById(id);

  if (!pet) {
    const error = new Error("Pet não encontrado");
    error.statusCode = 404;
    throw error;
  }

  if (!pet.ativo) {
    const error = new Error("Pet já está desativado");
    error.statusCode = 400;
    throw error;
  }

  const activeLoansCount = await Loan.countDocuments({
    bookId: id,
    status: "ativo",
  });

  if (activeLoansCount > 0) {
    const error = new Error(
      "Não é possível desativar o pet com empréstimos ativos"
    );
    error.statusCode = 400;
    throw error;
  }

  pet.ativo = false;

  await pet.save();

  return pet;
};

const activatePet = async (id) => {
  const pet = await Pet.findById(id);

  if (!pet) {
    const error = new Error("Pet não encontrado");
    error.statusCode = 404;
    throw error;
  }

  if (pet.ativo) {
    const error = new Error("Pet já está ativo");
    error.statusCode = 400;
    throw error;
  }

  pet.ativo = true;

  await pet.save();

  return pet;
};


export default {
  createPet,
  getAllPets,
  getPetsById,
  searchPetsByRace,
  updatePet,
  deactivatePet,
  activatePet,
};