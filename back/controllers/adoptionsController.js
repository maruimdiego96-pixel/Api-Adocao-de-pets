import adoptionsService from "../services/adoptionsService.js";

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
