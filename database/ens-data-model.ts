import mongoose from 'mongoose';

const { Schema, model } = mongoose;
const EnsData = new Schema({
  node: String,
  address: {},
  text: {
    avatar: String,
    description: String,
    email: String,
    phone: String,
    url: String,
  },
  contenthash: String,
});

export const EnsDataModel = mongoose.models.EnsData || model('EnsData', EnsData);
