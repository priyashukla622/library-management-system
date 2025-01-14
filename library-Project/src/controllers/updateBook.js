const bookModel = require("../models/bookScheema");

const bookUpdated = async (req, res) => {
    const { title, authorName, price, publish } = req.body;

    try {
        // Find the book by its title
        const existingBook = await bookModel.findOne({ title });

        if (existingBook) {
            // Update the book's details using $set
            const updateResult = await bookModel.updateOne(
                { title },
                { $set: { authorName, price, publish } }
            );

            if (updateResult.modifiedCount > 0) {
                res.status(200).json({ message: "Book updated successfully", updateResult });
                console.log("Book updated successfully");
            } else {
                res.status(400).json({ message: "No changes were made to the book details" });
                console.log("No changes were made to the book details");
            }
        } else {
            res.status(404).json({ message: "Book does not exist" });
            console.log("Book does not exist");
        }
    } catch (err) {
        console.error("Error updating book", err);
        res.status(500).json({ message: "Error updating book", error: err.message });
    }
};

module.exports = { bookUpdated };