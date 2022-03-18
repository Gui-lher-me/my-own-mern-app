const Exercise = require('../models/exercise');

exports.getExercises = (req, res) => {
  Exercise.find()
    .then((exercises) => res.json(exercises))
    .catch((error) => res.status(400).json(error));
};

exports.createExercise = (req, res) => {
  const { username, description, duration, date } = req.body;
  const newExercise = new Exercise({
    username,
    description,
    duration: +duration,
    date: Date.parse(date),
  });
  newExercise
    .save()
    .then(() => res.json('Exercise added!'))
    .catch((error) => res.status(400).json(error));
};

exports.getExercise = (req, res) => {
  const { id } = req.params;
  Exercise.findById(id)
    .then((exercise) => res.json(exercise))
    .catch((error) => res.status(400).json(error));
};

exports.deleteExercise = (req, res) => {
  const { id } = req.params;
  Exercise.findByIdAndDelete(id)
    .then(() => res.json('Exercise deleted.'))
    .catch((error) => res.status(400).json(error));
};

exports.updateExercise = (req, res) => {
  const { id } = req.params;
  const { username, description, duration, date } = req.body;
  Exercise.findById(id)
    .then((exercise) => {
      exercise.username = username;
      exercise.description = description;
      exercise.duration = +duration;
      exercise.date = Date.parse(date);

      exercise
        .save()
        .then(() => res.json('Exercise updated!'))
        .catch((error) => res.status(400).json(error));
    })
    .catch((error) => res.status(400).json(error));
};
