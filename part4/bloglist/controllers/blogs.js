const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const Comment = require("../models/comment");

blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  res.json(blogs);
});

blogsRouter.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (blog) {
    res.json(blog);
  } else {
    res.status(404).end();
  }
});

blogsRouter.post("/", async (req, res) => {
  const body = req.body;
  const user = req.user;

  if (body.url === undefined || body.title === undefined) {
    return res.status(400).json({ error: "Url or title missing!" });
  }
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes === undefined ? 0 : body.likes,
    user: user._id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  res.json(savedBlog);
});

blogsRouter.delete("/:id", async (req, res) => {
  const user = req.user;
  const blog = await Blog.findById(req.params.id);

  if (blog.user.toString() === user._id.toString()) {
    await Blog.findByIdAndRemove(req.params.id);
  } else {
    return res
      .status(401)
      .json({ error: "this blog was not posted by this user" });
  }
  res.status(204).end();
});

blogsRouter.put("/:id", async (req, res) => {
  const body = req.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {
    new: true,
  });
  res.json(updatedBlog);
});

blogsRouter.get("/:id/comments", async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (blog) {
    const commentList = blog.comments;
    const comments = [];

    for (let x = 0; x < commentList.length; x++) {
      comments.push(await Comment.findById(commentList[x]));
    }

    res.json(comments);
  } else {
    res.status(404).end();
  }
});

blogsRouter.post("/:id/comments", async (req, res) => {
  const body = req.body;
  const blogId = req.params.id;

  const comment = new Comment({
    content: body.content,
    blog: blogId,
  });

  const savedComment = await comment.save();
  const blogRelated = await Blog.findById(blogId);
  blogRelated.comments.push(savedComment);
  await blogRelated.save();

  res.json(savedComment);
});

module.exports = blogsRouter;
