import adoptionsService from "../service/adoptionsService.js";

const CompleteTheAdoption = async (req, res, next) => {
  try {
    const adoption = await adoptionsService.CompleteTheAdoption(req.user._id, req.body);

    res.status(201).json({
      message: "Adoption successfully completed",
      data: adoption,
    });
  } catch (error) {
    next(error);
  }
};

const getMyAdoption = async (req, res, next) => {
  try {
    const adoption = await adoptionsService.getMyAdoption(req.user._id);

    res.status(200).json({
      message: "Adoptions successfully found",
      total: adoption.length,
      data: adoption,
    });
  } catch (error) {
    next(error);
  }
};

const getAllAdoption = async (req, res, next) => {
  try {
    const adoptions = await adoptionsService.getAllAdoption();

    res.status(200).json({
      message: "Adoptions successfully found",
      total: adoptions.length,
      data: adoptions,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  CompleteTheAdoption,
  getMyAdoption,
  getAllAdoption
}
