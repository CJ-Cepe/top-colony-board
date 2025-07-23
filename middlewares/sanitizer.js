import { body, validationResult } from "express-validator";

// Array of middleware funcs
// solely on defining validation rules
const validateMessageForm = [
  // Validate 'topic' field
  body("topic").trim().notEmpty().withMessage("Please select a topic").escape(),

  // Validate 'content' field
  body("content")
    .trim()
    .notEmpty()
    .withMessage("Message content cannot be empty")
    .isLength({ min: 1 })
    .withMessage("Message must be at least 1 characters long")
    .isLength({ max: 100 })
    .withMessage("Message cannot exceed 100 characters")
    .escape(),

  // Validate 'name' field - hidden
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Ant name is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Ant name must be between 2 and 20 characters")
    .escape(),

  // Validate 'role' field - hidden
  body("role")
    .trim()
    .notEmpty()
    .withMessage("Ant role is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Ant role must be between 2 and 20 characters")
    .escape(),
];

// solely on handling the outcome of validation
// to make it generic middleware
// can be applied to others
// centralizing error response logic
const checkValidationResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send("Invalid Input");
  }
  next();
};

export { validateMessageForm, checkValidationResult };
