const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const supertest = require("supertest");
const helper = require("./test-helper");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");

let token;
beforeAll((done) => {
  api
    .post("/api/login")
    .send({ username: "root", password: "secret" })
    .end((error, res) => {
      token = res.body.token;
      done();
    });
});

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

describe("When there are initially some blogs saved", () => {
  test("blogs are returned as JSON", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("All blogs are returned", async () => {
    const res = await api.get("/api/blogs");
    expect(res.body).toHaveLength(helper.initialBlogs.length);
  });

  test("A specific blog title is within the returned blogs", async () => {
    const res = await api.get("/api/blogs");
    const titles = res.body.map((blog) => blog.title);
    expect(titles).toContain("TDD harms architecture");
  });

  test("The unique identifier property of the blog posts is named id", async () => {
    const res = await api.get("/api/blogs");
    res.body.forEach((blog) => {
      expect(blog.id).toBeDefined();
    });
  });
});

describe("Posting of a new blog", () => {
  test("A valid blog can be added", async () => {
    const newBlog = {
      title: "The Ideal Garden",
      author: "H. H. Thomas",
      url: "https://www.amazon.de/-/en/H-Thomas/dp/1528714725",
      likes: 99,
    };

    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const newlyPostedBlog = Object.keys(
      blogsAtEnd[helper.initialBlogs.length]
    ).reduce((object, key) => {
      if (key !== "id" && key !== "user") {
        object[key] = blogsAtEnd[helper.initialBlogs.length][key];
      }
      return object;
    }, {});

    expect(newlyPostedBlog).toEqual(newBlog);
  });

  test("if the likes property is missing, then it is 0 by default", async () => {
    const newBlog = {
      title: "The Ideal Garden",
      author: "H. H. Thomas",
      url: "https://www.amazon.de/-/en/H-Thomas/dp/1528714725",
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const newlyPostedBlog = Object.keys(
      blogsAtEnd[helper.initialBlogs.length]
    ).reduce((object, key) => {
      if (key !== "id" && key !== "user") {
        object[key] = blogsAtEnd[helper.initialBlogs.length][key];
      }
      return object;
    }, {});

    expect(newlyPostedBlog).toEqual({ ...newBlog, likes: 0 });
  });

  test("If the url or title is missing then report error", async () => {
    const newBlog = {
      author: "Robert G. Hagstrom",
    };
    await api.post("/api/blogs").send(newBlog).expect(400);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });
});

describe("Viewing of a blog", () => {
  test("A specific blog can be viewed", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToView = blogsAtStart[0];

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const processedBlogToView = JSON.parse(JSON.stringify(blogToView));
    expect(resultBlog.body).toEqual(processedBlogToView);
  });
});

describe("Update of a blog", () => {
  test("A blog can be updated", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];

    const newBlog = { ...blogToUpdate, likes: 100 };

    const resultBlog = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(newBlog)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const processedBlogToView = JSON.parse(JSON.stringify(newBlog));
    expect(resultBlog.body).toEqual(processedBlogToView);
  });
});

describe("Deletion of a blog", () => {
  test("A blog can be deleted", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(204);
      
    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

    const titles = blogsAtEnd.map((blog) => blog.title);
    expect(titles).not.toContain(blogToDelete.title);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
