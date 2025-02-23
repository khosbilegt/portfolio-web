import { Flex } from "@mantine/core";
import { BlogDefinition } from "../types";
import BlogList from "../components/BlogList";

export const BlogExplorer = () => {
  return (
    <Flex>
      <BlogList blogs={BLOGS} />
    </Flex>
  );
};

const BLOGS: BlogDefinition[] = [
  {
    backgroundImageUrl:
      "https://images.unsplash.com/photo-1455612693675-112974d4880b?q=80&w=900&h=900&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    backgroundImageAlt: "",
    title: "Smart Home Features Buyers Want Now",
    tag: "Market",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    publishedAt: "Dec 4th, 2024",
  },
  {
    backgroundImageUrl:
      "https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a?q=80&w=900&h=900&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    backgroundImageAlt: "",
    title: "Luxury Market: Beyond the Basics",
    tag: "Investing",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    publishedAt: "Nov 25th, 2024",
  },
  {
    backgroundImageUrl:
      "https://images.unsplash.com/photo-1445699269025-bcc2c8f3faee?q=80&w=900&h=900&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    backgroundImageAlt: "",
    title: "First-Time Buyer's Guide to Mortgages",
    tag: "Tips",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    publishedAt: "Nov 19th, 2024",
  },
  {
    backgroundImageUrl:
      "https://images.unsplash.com/photo-1445699269025-bcc2c8f3faee?q=80&w=900&h=900&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    backgroundImageAlt: "",
    title: "First-Time Buyer's Guide to Mortgages",
    tag: "Tips",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    publishedAt: "Nov 19th, 2024",
  },
] as const;
