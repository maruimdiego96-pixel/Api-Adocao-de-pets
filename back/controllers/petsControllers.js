import bookService from "../services/petsService.js";

const createPets = async (req, res, next) => {
    try {
        const pets = await petsService.createPets(req.body);

        res.status(201).json({
            message: "Pet cadastrado com sucesso",
            data: pet,
        });
    } catch (error) {
        next(error);
    }
};

const getAllPets = async (req, res, next) => {
    try {
        const pets = await petsService.getAllPets();

        res.status(200).json({
            message: "Pet encontrado com sucesso",
            total: pets.length,
            data: pets,
        });
    } catch (error) {
        next(error);
    }
};

const getPetsById = async (req, res, next) => {
    try {
        const pets = await petsService.getPetsById(req.params.id);

        res.status(200).json({
            message: "Pet encontrado com sucesso",
            data: pet,
        });
    } catch (error) {
        next(error);
    }
};

const searchPetsByRace = async (req, res, next) => {
    try {
        const pets = await petService.searchPetsByRace(req.params.title);

        res.status(200).json({
            message: "Pets encontrados por raça com sucesso",
            total: pets.length,
            data: pets,
        });
    } catch (error) {
        next(error);
    }
};

const deactivatePets = async (req, res, next) => {
    try {
        const pet = await petService.deactivateBook(req.params.id);

        res.status(200).json({
            message: "Pet desativado com sucesso",
            data: pet,
        });
    } catch (error) {
        next(error);
    }
};
const updatePet = async (req, res, next) => {
  try {
    const pet = await petService.updatePet(req.params.id, req.body);

    res.status(200).json({
      message: "Pet atualizado com sucesso",
      data: pet,
    });
  } catch (error) {
    next(error);
  }
};

const activatePets = async (req, res, next) => {
    try {
        const pet = await petService.activatePet(req.params.id);

        res.status(200).json({
            message: "Pet ativado com sucesso",
            data: pet,
        });
    } catch (error) {
        next(error);
    }
};

export default {
    createPets,
    getAllPets,
    getPetsById,
    searchPetsByRace,
    updatePet,
    deactivatePets,
    activatePets,
};