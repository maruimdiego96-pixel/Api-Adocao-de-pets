import mongoose from "mongoose";

const AdoptionsSchema = new mongoose.Schema(
    {
        UserId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        PetId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Pets",
            required: true,
        },
        AdoptionDate: {
            type: Date,
            default: Date.now
        },
    },
    {
        collection: "Adoptions",
        timestamps: true,
    }
);

export default mongoose.model("Adoptions", AdoptionsSchema);