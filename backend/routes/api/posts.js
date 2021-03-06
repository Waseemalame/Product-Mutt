const express = require('express');
const asyncHandler = require('express-async-handler');
const {requireAuth} = require('../../utils/auth')
const postRepository = require('../../db/post-repository')
const { Post, Comment, User, Like } = require('../../db/models');
const router = express.Router();
  /* GET ALL POSTS */
router.get('/', asyncHandler(async function(_req, res) {
  const posts = await Post.findAll()
  return res.json(posts);
}));
  /* GET ONE POST */
  router.get('/:id', asyncHandler(async function(req, res) {
    const post = await postRepository.one(req.params.id)
    return res.json(post);
  }));
/* GET Comments */
router.get('/:id/comments', asyncHandler(async function(req, res) {
  const post = await postRepository.one(req.params.id)
  const postId = post.id
  const comments = await Comment.findAll({
    include: User,
    where: {
      postId
    }
  });
  return res.json(comments);
}));
router.post('/', requireAuth, asyncHandler(async function (req, res) {
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
    const userId = req.user.id;
    req.body.userId = userId;
    // const id = await postRepository.update(req.body);
    // const post = await postRepository.one(req.params.id);
    const post = await Post.findByPk(req.params.id)
    const { title, content, media } = req.body
    post.update({
      title,
      content,
      media
    })
    return res.json(post);
    })
  );
  router.delete('/:id', requireAuth, asyncHandler(async function (req, res) {
    const {id} = req.params;
    const post = await Post.findByPk(id);
    await post.destroy();
    return res.json(id);
  })
  );
    /* CREATE COMMENT  */
    router.post('/:id/comments/', requireAuth, asyncHandler(async function (req, res) {
      const {
        content: commentContent,
        userId,
        postId
       } = req.body;
      const comment = await Comment.create({
        content: commentContent,
        userId,
        postId
      })
      const newComment = await Comment.findByPk(comment.id, {include: User})
    return res.json(newComment);

    }))
    /* DELETE COMMENT */
    router.delete('/:postId/comments/:id', requireAuth, asyncHandler(async function (req, res) {


      const {id} = req.params;
      const comment = await Comment.findByPk(id);
      await comment.destroy();
      return res.json({id});
    })
    );

    /* EDIT COMMENT  */
    // router.put(
    //   "/:postId/comments/:id",
    //   requireAuth,
    //   asyncHandler(async function (req, res) {
    //   const post = await Post.findByPk(req.params.postId)
    //   post.update({
    //     title,
    //     content,
    //     media
    //   })
    //   return res.json(post);
    //   })
    // );

  //   /* Get PostsLikes */
  //   router.get('/:id/likes', asyncHandler(async function(req, res) {
  //     // const userId = req.user.id;
  //     const post = await postRepository.one(req.params.id);
  //     const postId = post.id;
  //     const likes = await Like.findAll({
  //       include: User,
  //       where: {
  //         postId
  //       }
  //     });
  //     return res.json(likes);
  //   }));

  //   /* Get single like from post */
  //   router.get('/postId:/likes/:businessId', asyncHandler(async (req, res) => {
  //     const {businessId} = req.params
  //     const businessLikes = await Like.findAll({where: {businessId}})

  //     res.json(businessLikes)
  // }))

  //   router.post('/:id/likes/', requireAuth, asyncHandler(async function (req, res) {
  //     const {
  //       userId,
  //       postId
  //      } = req.body;
  //      const likes = await Like.findAll({
  //        include: User,
  //        where: {
  //          postId
  //        }
  //      })
  //     const like = await Like.create({
  //       userId,
  //       postId
  //     })
  //     const newLike = await Like.findByPk(like.id, {include: User})

  //   return res.json(newLike);

  //   }))
  //   router.delete('/:postId/likes/:id', requireAuth, asyncHandler(async function (req, res) {


  //     const {id} = req.params;
  //     const like = await Like.findByPk(id);
  //     await like.destroy();
  //     return res.json({id});
  //   })
  //   );

  module.exports = router;
