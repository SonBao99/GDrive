const mongoose = require("mongoose");
const Vocab = mongoose.model("Vocab", new mongoose.Schema({
    english: { type: String, required: "English word cannot be empty" },
    vietnamese: { type: String, required: "Vietnamese word cannot be empty" },
    japanese: { type: String, required: "Japanese word cannot be empty" }
}, { collection: "vocab" }));

// List all words
exports.list_all_words = async (req, res) => {
    try {
        const words = await Vocab.find({});
        res.json(words);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Create a word
exports.create_a_word = async (req, res) => {
    const newWord = new Vocab(req.body);
    try {
        const word = await newWord.save();
        res.json(word);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Read a word by ID
exports.read_a_word = async (req, res) => {
    try {
        const word = await Vocab.findById(req.params.wordId);
        if (!word) return res.status(404).send("Word not found");
        res.json(word);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update a word by ID
exports.update_a_word = async (req, res) => {
    try {
        const word = await Vocab.findByIdAndUpdate(req.params.wordId, req.body, { new: true });
        if (!word) return res.status(404).send("Word not found");
        res.json(word);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Delete a word by ID
exports.delete_a_word = async (req, res) => {
    try {
        const word = await Vocab.findByIdAndDelete(req.params.wordId);
        if (!word) return res.status(404).send("Word not found");
        res.json({ message: "Word successfully deleted" });
    } catch (error) {
        res.status(500).send(error);
    }
};
