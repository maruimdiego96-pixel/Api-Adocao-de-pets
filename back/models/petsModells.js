import mongoose from "mongoose";

const PetsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    species: {
      type: String,
      required: true,
      trim: true,
    },
    race: {
      type: String,
      trim: true,
    },
    age: {
      type: Number,
      required: true,
    },
    description: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    adopted: {
      type: Boolean,
      default: true,
    },
  },
  {
    collection: "pets",
    timestamps: true,
  }
);

export default mongoose.model("Pets", PetsSchema);