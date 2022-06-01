const { Post } = require('./models')

async function one(id) {
  return await Post.scope("detailed").findByPk(id);
}
async function update(details) {
  const id = details.id;
  delete details.id;
  await Post.update(
    details,
    {
      where: { id }
    }
  );
  return id;
}

module.exports = {
  one,
  update
}
