const mongoose = require('mongoose')

URI = "mongodb+srv://vishwajeetroundhal0:Mr94NXsS6vt6Plwo@jobcluster.9n5l9us.mongodb.net/?retryWrites=true&w=majority&appName=jobCluster"

const connectDB = async () => {
    try {
        await mongoose.connect(URI);
        console.log("connected to database");
    } catch (error) {
        console.error(error,"error getting data")
    }
}

module.exports = connectDB
