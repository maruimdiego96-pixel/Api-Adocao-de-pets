import Pets from "../models/petsModels.js";
import adoption from "../models/adoptionsModels.js";

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
  const pets = await Pets.find({
    adopted: false,
    active: true,
  });

  console.log("Pets encontrados:", pets);

  return pets;
};

const getPetsById = async (id) => {
  const pet = await Pets.findById(id);

  if (!pet) {
    const error = new Error("Animal not found");
    error.statusCode = 404;
    throw error;
  }

  return pet;
};

const updatePet = async (id, data) => {
  const pet = await Pets.findById(id);

  if (!pet) {
    const error = new Error("Pet not found");
    error.statusCode = 404;
    throw error;
  }

  if (data.name !== undefined) {
    pet.name = data.name;
  }

  if (data.race !== undefined) {
    pet.race = data.race;
  }

  if (data.age !== undefined) {
    pet.age = data.age;
  }

  await pet.save();

  return pet;
};


const activatePet = async (id) => {
  const pet = await Pets.findById(id);

  if (!pet) {
    const error = new Error("Pet not found");
    error.statusCode = 404;
    throw error;
  }

  if (pet.active) {
    const error = new Error("Pet is already active");
    error.statusCode = 400;
    throw error;
  }

  pet.active = true;

  await pet.save();

  return pet;
};

const deactivatePet = async (id) => {
  const pet = await Pets.findById(id);
  if (!pet) {
    const error = new Error("Pet not found");
    error.statusCode = 404;
    throw error;
  }

  if (!pet.active) {
    const error = new Error("This pet has already been deactivated.");
    error.statusCode = 400;
    throw error;
  }

  const adoptionExists = await adoption.findOne({
    PetId: id,
  });

  if (adoptionExists) {
    const error = new Error(
      "It is not possible to deactivate a pet that has already been adopted."
    );
    error.statusCode = 400;
    throw error;
  }

  pet.active = false;

  await pet.save();

  return pet;
};



export default {
  createPet,
  getAllPets,
  getPetsById,
  updatePet,
  deactivatePet,
  activatePet,
};