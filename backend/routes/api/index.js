const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const postsRouter = require('./posts.js')
const likesRouter = require('./likes')


const asyncHandler = require('express-async-handler');
const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');
const { restoreUser } = require('../../utils/auth.js');

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/posts', postsRouter);
router.use('/likes', likesRouter);

router.post('/test', function(req, res){
    res.json({requestBody: req.body});
});

router.get('/set-token-cookie', asyncHandler(async (_req, res) => {

    const user = await User.findOne({
      where: {
        username: 'Demo-lition'
      }
    });
    setTokenCookie(res, user);
    return res.json({ user });
}));

router.get(
  '/restore-user',
  restoreUser,
  (req, res) => {
    return res.json(req.user);
  }
);


module.exports = router;
