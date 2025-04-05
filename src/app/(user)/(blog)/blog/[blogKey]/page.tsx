import { portfolioManagerURL } from "@/app/variables";
import { notFound } from "next/navigation";

import "./Blog.css";
import { PageDefinition } from "@/app/types";
import { cache } from "react";
import PageContent from "./PageContent";
import { Flex } from "@mantine/core";

const fetchBlog = cache(
  async (blogKey: string): Promise<PageDefinition | null> => {
    const res = await fetch(`${portfolioManagerURL}/api/page/key/${blogKey}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) return null;
    return res.json();
  }
);

type Params = Promise<{ blogKey: string }>;

export async function generateMetadata(props: { params: Params }) {
  const params = await props.params;

  const data = await fetchBlog(params.blogKey);

  if (!data) {
    return {
      title: "Blog Not Found",
      description: "The requested blog could not be found.",
    };
  }

  return {
    title: data.title,
    description: data.subtitle,
    openGraph: {
      title: data.title,
      description: data.subtitle,
      images: [
        {
          url: data.thumbnail,
        },
      ],
      url: `/${data.key}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: data.title,
      description: data.subtitle,
      images: [data.thumbnail],
    },
  };
}

export default async function Blog(props: { params: Params }) {
  const params = await props.params;
  const data = await fetchBlog(params.blogKey);

  if (!data) return notFound();

  return (
    <Flex justify={"center"} className="blog-viewer">
      <PageContent data={data} />
    </Flex>
  );
}
