const snippetModel = require("../models/snippet")
const sanitize = require("../utils/sanitize")
const mongoose = require("mongoose");

module.exports.createSnippet = async (req, res) => {
    try {
        const userId = req.user.id
        const body = sanitize(req.body)
        const { title, code, language } = body

        if (!title || !code || !language) {
            return res.status(400).json({ message: "All fields are required" });
        }

        await snippetModel.create({
            title,
            code,
            language,
            userId
        });
        return res.status(201).json({
            message: "Snippet created successfully!",
        });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports.getSnippet = async (req, res) => {
    try {
        const { snippetId } = req.params
        const userId = req.user.id

        if (!mongoose.Types.ObjectId.isValid(snippetId)) {
            return res.status(400).json({ message: "Invalid snippet id" });
        }

        const snippet = await snippetModel.findOne({ _id: snippetId, userId })

        if (!snippet) {
            return res.status(404).json({
                message: "Snippet not found or Unauthorized"
            });
        }

        return res.status(200).json(snippet);

    }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

module.exports.getAllSnippets = async (req, res) => {
    try {

        const userId = req.user.id;
        const query = sanitize(req.query)
        const { language, search } = query;

        const filter = { userId };

        if (language) filter.language = language;

        if (search) filter.title = { $regex: search, $options: "i" };

        const snippets = await snippetModel.find(filter).sort({ createdAt: -1 });

        return res.status(200).json(snippets);

    }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

module.exports.updateSnippet = async (req, res) => {
    try {
        const { snippetId } = req.params
        if (!mongoose.Types.ObjectId.isValid(snippetId)) {
            return res.status(400).json({ message: "Invalid snippet id" });
        }
        const userId = req.user.id

        const body = sanitize(req.body)

        const allowedUpdates = ["title", "code", "language"];
        const updateData = {};

        allowedUpdates.forEach((field) => {
            if (body[field]) {
                updateData[field] = body[field];
            }
        });

        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({ message: "No valid fields to update" });
        }

        const updatedSnippet = await snippetModel.findOneAndUpdate(
            { _id: snippetId, userId },
            updateData,
            { new: true }
        );
        if (!updatedSnippet) {
            return res
                .status(404)
                .json({ message: "Snippet not found or Unauthorized" });
        }

        return res.status(200).json({
            message: "Snippet updated successfully!",
        });
    }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

module.exports.deleteSnippet = async (req, res) => {
    try {
        const { snippetId } = req.params
        if (!mongoose.Types.ObjectId.isValid(snippetId)) {
            return res.status(400).json({ message: "Invalid snippet id" });
        }
        const userId = req.user.id

        const snippet=await snippetModel.findOneAndDelete({_id:snippetId,userId})

        if(!snippet) return res.status(403).json({message:"Snippet Not Found Or Unauthorized!"})

        return res.status(200).json({message:"Snippet Deleted Successfully!"})

    }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }
}