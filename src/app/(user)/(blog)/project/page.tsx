"use client";
import React from "react";
import { BlogExplorer } from "../components/BlogExplorer";

function BlogPage() {
  return <BlogExplorer defaultTags={[0]} pageName="Projects" />;
}

export default BlogPage;
