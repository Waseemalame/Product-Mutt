const express = require('express');
const asyncHandler = require('express-async-handler');
const {requireAuth} = require('../../utils/auth')
const postRepository = require('../../db/post-repository')
const { Post, Comment, User, Like } = require('../../db/models');
const router = express.Router();


    /* Get PostsLikes */
    router.get('/:id', asyncHandler(async function(req, res) {
      // const userId = req.user.id;
      const post = await postRepository.one(req.params.id);
      const postId = post.id;
      const likes = await Like.findAll({
        where: {postId}
      });
      return res.json(likes);
    }));

  //   /* Get single like from post */
  //   router.get('/:likeId/:postId', asyncHandler(async (req, res) => {
  //     const {postId} = req.params
  //     const postLikes = await Like.findAll({where: {postId}})

  //     res.json(businessLikes)
  // }))

    router.post('/', requireAuth, asyncHandler(async function (req, res) {
      const {
        userId,
        postId
       } = req.body;
       const likes = await Like.findAll({
         include: User,
         where: {
           postId
         }
       })
      const like = await Like.create({
        userId,
        postId
      })
      const newLike = await Like.findByPk(like.id, {include: User})

    return res.json(newLike);

    }))
    // router.delete('/:postId/likes/:id', requireAuth, asyncHandler(async function (req, res) {


    //   const {id} = req.params;
    //   const like = await Like.findByPk(id);
    //   await like.destroy();
    //   return res.json({id});
    // })
    // );
    router.delete('/', requireAuth, asyncHandler(async (req, res) => {
      const {postId, userId} = req.body
      const deleteLike = await Like.findOne({where: postId, userId})
      const deleteLikeId = deleteLike.id
      await deleteLike.destroy()
      res.json(deleteLikeId)
  }))

module.exports = router;
