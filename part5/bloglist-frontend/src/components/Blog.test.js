import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Blog from "./Blog";

test("render content", () => {
  const blog = {
    title: "title",
    author: "author",
    url: "url",
    likes: 0,
  };

  render(<Blog blog={blog} />)

  const element = screen.getByText('title')
  expect(element).toBeDefined()
});
