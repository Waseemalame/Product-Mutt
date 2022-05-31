const express = require('express');
const asyncHandler = require('express-async-handler');
const {requireAuth} = require('../../utils/auth')


const { Post } = require('../../db/models');

const router = express.Router();


router.get('/', asyncHandler(async function(_req, res) {


  const posts = await Post.findAll()
  console.log(posts)
  return res.json(posts);

}));

router.post('/', requireAuth, asyncHandler(async function (req, res) {

  console.log('BACKEND POST')
    console.log(req.body, 'req.body');
    const { title, content, media, userId } = req.body
    const post = await Post.create({
      title,
      content,
      media,
      userId
    });

    return res.json(post);
    })
  );
router.put('/:id', requireAuth, asyncHandler(async function (req, res) {

    const {id} = req.params;

    req.body.userId = id;
    const {title, content, media, userId} = req.body;

    const post = await Post.findByPk(id);
    post.update({
      title,
      content,
      media,
      userId
    })
    return res.json(post);
    })
  );

  module.exports = router;

  // const id = await PokemonRepository.create(req.body);S
  // console.log('BACKEND POKEMON POST AFTER ADD TO DB - id -> ', id);
  // return res.redirect(`${req.baseUrl}/${id}`);
  // const id = await PokemonRepository.create(req.body);
