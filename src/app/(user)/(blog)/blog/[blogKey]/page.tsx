import { portfolioManagerURL } from "@/app/variables";
import { notFound } from "next/navigation";

import "./Blog.css";
import { PageDefinition } from "@/app/types";
import { Metadata } from "next";
import { cache } from "react";
import PageContent from "./PageContent";
import { Flex } from "@mantine/core";
import Head from "next/head";

const fetchBlog = cache(
  async (blogKey: string): Promise<PageDefinition | null> => {
    const res = await fetch(`${portfolioManagerURL}/api/page/key/${blogKey}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) return null;
    return res.json();
  }
);

// Generate dynamic metadata
export async function generateMetadata({
  params,
}: {
  params: { blogKey: string };
}): Promise<Metadata> {
  const data = await fetchBlog(params.blogKey);
  if (!data) return {};

  return {
    title: data.title,
    description: data.subtitle || "",
    openGraph: {
      title: data.title,
      description: data.subtitle,
    },
  };
}

export default async function Blog({
  params,
}: {
  params: { blogKey: string };
}) {
  const data = await fetchBlog(params.blogKey);

  if (!data) return notFound();

  return (
    <Flex justify={"center"}>
      <Head>
        <title>{data.title}</title>
        <meta name="description" content={data.subtitle} />
        <meta property="og:title" content={data.title} />
        <meta property="og:description" content={data.subtitle} />
        <meta property="og:image" content={data.thumbnail} />
      </Head>
      <PageContent data={data} />
    </Flex>
  );
}
