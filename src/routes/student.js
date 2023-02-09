const {createResult, getResults, editResult, updateStudent, deleteStudent} = require("../controllers/student");
const router = require('express').Router();

router.get('/students/:keyword', getResults);
router.get('/student/:id', editResult);
router.patch('/student/:id', updateStudent);
router.delete('/student/:id', deleteStudent);
router.post('/student', createResult)
module.exports = router;