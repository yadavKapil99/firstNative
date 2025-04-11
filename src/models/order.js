import mongoose from "mongoose";
import Counter from "./counter.js";

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  deliveryPartner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DeliveryPartner",
  },
  branch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Branch",
    required: true,
  },
  items: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      count: { type: Number, reqired: true },
    },
  ],
  deliveryLocation: {
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    address: { type: String },
  },
  pickupLocation: {
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    address: { type: String },
  },
  deliveryPersonLocation: {
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    address: { type: String },
  },
  status: {
    type: String,
    enum: ["available", "confirmed","arriving","delivered","cancelled"],
    default: "available"
  },
  totalPrice: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now},
  updatedAt: { type: Date, default: Date.now},
});

async function getNextSequenceValue(sequenceValue){
    const sequenceDocument = await Counter.findOneAndUpdate(
        {name: sequenceName},
        {$inc: {sequence_value: 1}},
        {new: true, upsert: true}
    )

    return sequenceDocument.sequence_value;
}

orderSchema.pre('save', async function (next) {
    if(this.isNew){
        const sequenceValue = await getNextSequenceValue("orderId") 
        this.orderId = `ORDER${sequenceValue.toString().padStart(5,"0")}`
    } 

    next()
})

const Order = mongoose.model("Order", orderSchema)

export default Order