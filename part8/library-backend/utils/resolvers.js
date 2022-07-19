const { UserInputError, AuthenticationError } = require("apollo-server");
const { PubSub } = require("graphql-subscriptions");
const jwt = require("jsonwebtoken");

const Author = require("../models/author");
const Book = require("../models/book");
const User = require("../models/user");

const JWT_SECRET = process.env.JWT_SECRET;

const pubsub = new PubSub();

const resolvers = {
  Query: {
    authorCount: async () => await Author.collection.countDocuments(),
    bookCount: async () => await Book.collection.countDocuments(),

    me: (root, args, context) => {
      return context.currentUser;
    },

    allBooks: async (root, args) => {
      if (!args.author && !args.genre) {
        return await Book.find({});
      }

      if (args.author && !args.genre) {
        const author = await Author.find({ name: args.author });
        return await Book.find({ author: author[0]._id });
      }

      if (!args.author && args.genre) {
        return await Book.find({ genres: { $all: [args.genre] } });
      }

      const author = await Author.find({ name: args.author });
      const books = await Book.find({
        author: author[0]._id,
        genres: { $all: [args.genre] },
      });
      return books;
    },

    allAuthors: async (root, args) => await Author.find({}),
  },

  Author: {
    bookCount: async (root) =>
      await Book.collection.countDocuments({ author: root._id }),
  },

  Book: {
    author: async (root) => await Author.findById(root.author.toString()),
  },

  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }

      if ((await Book.findOne({ title: args.title })) !== null) {
        throw new UserInputError("Book title already exists", {
          invalidArgs: args.title,
        });
      }

      let author = null;

      if ((await Author.findOne({ name: args.author })) === null) {
        const newAuthor = new Author({ name: args.author });
        author = await newAuthor.save();
      }

      if (author === null) {
        author = await Author.findOne({ name: args.author });
      }

      const book = new Book({ ...args, author: author._id });
      try {
        await book.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }

      pubsub.publish("BOOK_ADDED", { bookAdded: book });

      return book;
    },

    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }

      const author = await Author.findOne({ name: args.name });
      if (!author) return null;

      author.born = args.setBornTo;

      try {
        await author.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }

      return author;
    },

    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favGenre: args.favGenre,
      });

      return user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      });
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "password") {
        throw new UserInputError("Wrong credentials");
      }

      const token = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(token, JWT_SECRET) };
    },
  },

  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(["BOOK_ADDED"]),
    },
  },
};

module.exports = resolvers;
