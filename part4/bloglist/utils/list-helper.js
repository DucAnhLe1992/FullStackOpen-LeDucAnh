const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((sum, item) => sum + item.likes, 0);
};

const favoriteBlog = (blogs) => {
  const blog = blogs.reduce(
    (max, item) => (item.likes > max.likes ? item : max),
    blogs[0]
  );

  return {
    title: blog.title,
    author: blog.author,
    likes: blog.likes,
  };
};

const mostBlogs = (blogs) => {
  const authorList = [...new Set(blogs.map((blog) => blog.author))];

  const blogsByAuthor = authorList.map((author) => {
    return blogs.reduce(
      (authorObject, blog) => {
        return {
          author: author,
          blogs:
            blog.author === author
              ? authorObject.blogs + 1
              : authorObject.blogs,
        };
      },
      {
        author: "",
        blogs: 0,
      }
    );
  });

  return blogsByAuthor.reduce(
    (mostBlogs, author) =>
      author.blogs > mostBlogs.blogs ? author : mostBlogs,
    blogsByAuthor[0]
  );
};

const mostLikes = (blogs) => {
  const authorList = [...new Set(blogs.map((blog) => blog.author))];

  const likesByAuthor = authorList.map((author) => {
    return blogs.reduce(
      (authorObject, blog) => {
        return {
          author: author,
          likes: authorObject.likes + (blog.author === author ? blog.likes : 0),
        };
      },
      {
        author: "",
        likes: 0,
      }
    );
  });

  return likesByAuthor.reduce(
    (mostLikes, author) =>
      author.likes > mostLikes.likes ? author : mostLikes,
    likesByAuthor[0]
  );
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
