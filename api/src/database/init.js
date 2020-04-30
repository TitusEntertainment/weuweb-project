// Get logger entity
const { Logger } = require("@ayana/logger");
const logger = Logger.get("DB");

// Get connect and connection from mongoose;
const { connect, connection, set } = require("mongoose");

class DB {
  /**
   * @param { Object } config. This is where we get access to the mongodb uri passed by the user if there is none we throw and error
   *
   * @description this class handles the mongoose (mongoDB) events and handles the connection to the database. We also listen to  a set of events namely: connect, err (error) and disconnected. On these events we logg them with diffirent severity levels. Info, warnings and errors.
   * @method init This method initalises the database connection and sets all the configuration relevant to it
   */

  constructor(_uri) {
    if (!_uri) throw new Error("Please, provide a valid MongoDB URI");
    this.connection = connection;
    this._uri = _uri;

    this.connection.on("connected", () => {
      logger.info(`Connected to database`);
    });

    this.connection.on("err", (err) => {
      logger.error(err);
    });

    this.connection.on("disconnected", () => {
      logger.warn(`Disconnected from database`);
    });
  }

  init() {
    set("useCreateIndex", true);
    return connect(this._uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: true,
      poolSize: 5,
      connectTimeoutMS: 10000,
      family: 4,
    });
  }
}

module.exports = DB;
