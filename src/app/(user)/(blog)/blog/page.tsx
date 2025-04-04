"use client";

import React from "react";
import { BlogExplorer } from "../components/BlogExplorer";

function BlogPage() {
  return <BlogExplorer defaultTags={[23]} pageName="Blogs" />;
}

export default BlogPage;
