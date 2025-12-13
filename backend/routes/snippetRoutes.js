const express = require("express");
const router = express.Router();

const {createSnippet,getSnippet,getAllSninnpets,updateSnippet,deleteSnippet} =require("../controllers/snippet")

router.post("/create",createSnippet)
router.get("/snippet/:snippetId",getSnippet)
router.get('/all-snippets',getAllSninnpets)
router.put("/update/:snippetId",updateSnippet)
router.delete("/delete/:snippetId",deleteSnippet)



module.exports = router;