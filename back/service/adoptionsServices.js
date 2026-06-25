import Sale from "../models/Sale.js";
import User from "../models/User.js";
import Car from "../models/Car.js";

const CompleteTheAdoption = async (userId, data) => {
  const { petId, valorVenda, formaPagamento, dataVenda, status } = data;

  if (!userId || !carId || !formaPagamento) {
    const error = new Error("Usuário, carro e forma de pagamento são obrigatórios");
    error.statusCode = 400;
    throw error;
  }

  const user = await User.findById(userId);

  if (!user) {
    const error = new Error("Usuário não encontrado");
    error.statusCode = 404;
    throw error;
  }

  const car = await Car.findById(carId);

  if (!car) {
    const error = new Error("Carro não encontrado");
    error.statusCode = 404;
    throw error;
  }

  if (!car.disponivel) {
    const error = new Error("Este carro não está disponível para venda");
    error.statusCode = 400;
    throw error;
  }

  const saleValue = valorVenda ?? car.preco;

  if (saleValue <= 0) {
    const error = new Error("O valor da venda precisa ser maior que zero");
    error.statusCode = 400;
    throw error;
  }

  const sale = await Sale.create({
    userId,
    carId,
    valorVenda: saleValue,
    formaPagamento,
    dataVenda: dataVenda ?? Date.now(),
    status: status ?? "paga",
  });

  car.disponivel = false;
  await car.save();

  return Sale.findById(sale._id).populate("userId").populate("carId");
};
