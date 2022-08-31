const { connect } = require("mongoose");

const connectDB = () => {
  try {
    const mongodb_url = process.env.MONGO_URL;
    connect(mongodb_url).then(() =>
      console.log("Mongodb connected sucessfully")
    );
  } catch (error) {
    console.log("DB did'nt connect Error:" + JSON.stringify(error));
    process.exit(1);
  }
};
module.exports = {
  connectDB,
};
