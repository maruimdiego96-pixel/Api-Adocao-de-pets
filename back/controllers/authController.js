import authService from "../service/authServices.js"

const register = async (req, res, next) => {
    try {
        const user = await authService.register(req.body);

        res.status(201).json(user)
    } catch (error) {
        next(error)
    }
}

const login = async (req, res, next) => {
    try {
        const result = await authService.login(req.body);

            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
}


export default {
    register,
    login,
}
