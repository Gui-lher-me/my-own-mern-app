const express = require('express');
const {
  getExercises,
  createExercise,
  getExercise,
  deleteExercise,
  updateExercise,
} = require('../controllers/exercises');

const router = express.Router();

router.route('/').get(getExercises).post(createExercise);
router
  .route('/:id')
  .get(getExercise)
  .delete(deleteExercise)
  .put(updateExercise);

module.exports = router;
