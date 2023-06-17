const { check, validationResult } = require("express-validator");
const genres = require("../utils/genres");
const { isValidObjectId } = require("mongoose");

exports.useValidtor = [
  check("name").trim().not().isEmpty().withMessage("Name is missing!"),
  check("email").normalizeEmail().isEmail().withMessage("Email is invalid!"),
  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is missing!")
    .isLength({ min: 8, max: 20 })
    .withMessage("Password must be 8 to 20 characters long!"),
];

exports.signInValidtor = [
  check("email").normalizeEmail().isEmail().withMessage("Email is invalid!"),
  check("password").trim().not().isEmpty().withMessage("Password is missing!"),
];

exports.validatePassword = [
  check("newPassword")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is missing!")
    .isLength({ min: 8, max: 20 })
    .withMessage("Password must be 8 to 20 characters long!"),
];

exports.actorInfoValidator = [
  check("name")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Actor name is a required field!"),
  check("about")
    .trim()
    .not()
    .isEmpty()
    .withMessage("About is a required field!"),
  check("gender")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Gender is a required field!"),
];
exports.validateMovie = [
  check("name").trim().not().isEmpty().withMessage("Movie title is missing!"),
  check("storyLine")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Store Line is important!"),
  check("language").trim().not().isEmpty().withMessage("Language is missing!"),
  check("releaseDate").isDate().withMessage("Store Line is important!"),
  check("status")
    .isIn(["public", "private"])
    .withMessage("Movie status must be private or public!"),
  check("type").trim().not().isEmpty().withMessage("Movie type is missing!"),
  check("genres")
    .isArray()
    .withMessage("Genres must be an array of strings!")
    .custom((value) => {
      for (let g of value) {
        if (!genres.includes(g)) throw Error("Invalid genres!");
      }
      return true;
    }),
  check("tags")
    .isArray({ min: 1 })
    .withMessage("Tags must be an array of strings!")
    .custom((tags) => {
      for (let tag of tags) {
        if (typeof tag !== "string")
          throw Error("Tags must be an array of strings!");
      }
      return true;
    }),
  check("cast")
    .isArray()
    .withMessage("Cast must be an array of strings!")
    .custom((cast) => {
      for (let c of cast) {
        if (!isValidObjectId(c.id)) throw Error("Invalid cast id inside cast!");
        if (!c.roleAs?.trim()) throw Error("Role as is missing inside cast!");
        if (typeof c.leaderActor !== "boolean")
          throw Error(
            "Only accepted boolean value inside leadActor inside cast!"
          );
          return true;
      }

    }),
  check("trailerInfo")
    .isObject()
    .withMessage("trailer info must be an object with url and public_id!")
    .custom(({ url, public_id }) => {
      try {
        const result = new URL(url);
        if (!result.protocol.includes("http"))
          throw Error("Trailer url is invalid!");

        const arr = url.split("/");
        const publicId = arr[arr.length - 1].split(".")[0];

        if (public_id !== publicId)
          throw Error("Trailer public_id is invalid!");

          return true;

      } catch (error) {
        throw Error("Trailer url is invalid!");
      }
    }),

  check("poster").custom((_, { req }) => {
    if (!req.file) throw Error("Poster file is missing!");
    return true;
  }),
];

exports.validate = (req, res, next) => {
  const error = validationResult(req).array();
  // error.length indicates error array is not empty(at least 1 error occurs)
  if (error.length) {
    return res.json({ error: error[0].msg });
  }
  next();
};
