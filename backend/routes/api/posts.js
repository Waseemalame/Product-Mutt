const express = require('express');
const asyncHandler = require('express-async-handler');


const { Post } = require('../../db/models');

const router = express.Router();


router.get('/', asyncHandler(async function(_req, res) {


  const posts = await Post.findAll()
  console.log(posts)
  return res.json(posts);

}));

router.post('/', asyncHandler(async function (req, res) {
    console.log(req.body);
    const post = await Post.create(req.body);
    console.log(post);
    return res.json(post);

  })
  );

  module.exports = router;

  // const id = await PokemonRepository.create(req.body);
  // console.log('BACKEND POKEMON POST AFTER ADD TO DB - id -> ', id);
  // return res.redirect(`${req.baseUrl}/${id}`);
  // const id = await PokemonRepository.create(req.body);
