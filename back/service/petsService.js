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

export default {
  createPet,
  // getAllPets,
 // getPetsById,
 // searchPetsByRace,
 // updatePet,
//  deactivatePet,
//  activatePet,
};