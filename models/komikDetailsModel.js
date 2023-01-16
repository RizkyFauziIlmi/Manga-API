import mongoose from "mongoose";

// Buat schema untuk objek di dalam array "relative" dan "similar"
const refSchema = new mongoose.Schema({
  title_ref: String,
  link_ref: String
});

// Buat schema untuk objek di dalam array "genre"
const genreSchema = new mongoose.Schema({
  genre_title: String,
  genre_ref: String
});

// Buat schema untuk objek di dalam array "teaser"
const teaserSchema = new mongoose.Schema({
  teaser_image: String
});

// Buat schema untuk objek di dalam array "similar"
const similarSchema = new mongoose.Schema({
  similar_image: String,
  similar_title: String,
  similar_endpoint: String,
  similar_desc: String
});

// Buat schema untuk objek di dalam array "info"
const infoSchema = new mongoose.Schema({
  "Status":  String,
  "Pengarang":  String,
  "Ilustrator":  String,
  "Grafis":  String,
  "Tema":  String,
  "Konten": String,
  "Official": String,
  "Jenis Komik":  String,
  "Retail":  String,
  "Informasi":  String,
});

// Buat schema untuk collection komikList
const komikDetailsSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Types.ObjectId,
  },
  title: {
    type: String,
    required: true
  },
  endpoint: {
    type: String,
    required: true
  },
  thumb: String,
  score: String,
  scoredBy: String,
  relative: [refSchema],
  info: [infoSchema],
  genre: [genreSchema],
  teaser: [teaserSchema],
  similar: [similarSchema]
});

// Buat model untuk collection komikList
export default mongoose.model('komikdetails', komikDetailsSchema);
