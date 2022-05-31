const express = require('express');
const asyncHandler = require('express-async-handler');
const {requireAuth} = require('../../utils/auth');

const { Post } = require('../../db/models');
const { Comment } = require('../../db/models');

router.get('/', asyncHandler(async function(_req, res) {

  const comments = await Comment.findAll();
  console.log(comments, 'comments-backend')
  return red.json(comments)
}))
