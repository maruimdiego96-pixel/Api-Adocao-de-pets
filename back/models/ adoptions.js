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
            ref: "Pet",
            required: true,
        },
        AdoptionDate: {
            type: Date,
            required: true,
        },
    },
    {
        collection: "Adoptions",
        timestamps: true,
    }
);

export default mongoose.model("Adoptions", AdoptionsSchema);