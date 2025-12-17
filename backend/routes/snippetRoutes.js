const express = require("express");
const router = express.Router();
const authenticateUser=require('../middlewares/auth')

const {createSnippet,getSnippet,getAllSnippets,updateSnippet,deleteSnippet} =require("../controllers/snippet")

router.post("/create",authenticateUser,createSnippet)
router.get('/all-snippets',authenticateUser,getAllSnippets)
router.get("/:snippetId",authenticateUser,getSnippet)
router.put("/update/:snippetId",authenticateUser,updateSnippet)
router.delete("/delete/:snippetId",authenticateUser,deleteSnippet)



module.exports = router;