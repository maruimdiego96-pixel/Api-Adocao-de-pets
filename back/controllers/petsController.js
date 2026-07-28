import petsService from "../service/petsService.js";

const createPets = async (req, res, next) => {
    try {
        const pet = await petsService.createPet(req.body);

        res.status(201).json(pet
        );
    } catch (error) {
        next(error);
    }
};

const getAllPets = async (req, res, next) => {
    try {
        const pets = await petsService.getAllPets();

        res.status(200).json(pets);
    } catch (error) {
        next(error);
    }
};

const getPetsById = async (req, res, next) => {
    try {
        const pet = await petsService.getPetsById(req.params.id);

        res.status(200).json(pet);
    } catch (error) {
        next(error);
    }
};

const deactivatePet = async (req, res, next) => {
    try {
        const pet = await petsService.deactivatePet(req.params.id);

        res.status(200).json(pet);
    } catch (error) {
        next(error);
    }
};
const updatePet = async (req, res, next) => {
    try {
        const pet = await petsService.updatePet(req.params.id, req.body);

        res.status(200).json(pet);
    } catch (error) {
        next(error);
    }
};

const activatePet = async (req, res, next) => {
    try {
        const pet = await petsService.activatePet(req.params.id);

        res.status(200).json(pet);
    } catch (error) {
        next(error);
    }
};

export default {
    createPets,
    getAllPets,
    getPetsById,
    updatePet,
    deactivatePet,
    activatePet,
};