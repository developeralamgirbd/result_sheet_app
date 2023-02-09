const {createResult, getResults} = require("../controllers/student");
const router = require('express').Router();

router.get('/students/:keyword', getResults);
router.post('/student', createResult)
module.exports = router;