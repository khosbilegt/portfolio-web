import React, { Suspense } from "react";
import { BlogExplorer } from "../components/BlogExplorer";

function BlogPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BlogExplorer defaultTags={[]} pageName="blog" />
    </Suspense>
  );
}

export default BlogPage;
