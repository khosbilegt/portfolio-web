import { Container, Grid, useMantineTheme } from "@mantine/core";
import BlogCard from "../components/BlogCard";
import { BlogDefinition } from "../types";

export type Blog01Props = {
  blogs?: BlogDefinition[];
};

export const BlogList = ({ blogs = BLOGS }: Blog01Props) => {
  const theme = useMantineTheme();
  return (
    <Container
      bg="var(--mantine-color-body)"
      py={{
        base: "calc(var(--mantine-spacing-lg) * 1)",
        xs: "calc(var(--mantine-spacing-lg) * 2)",
        lg: "calc(var(--mantine-spacing-lg) * 3)",
      }}
      fluid
    >
      <Container size="lg" p={0} mt="xl">
        <Grid gutter="xl" align="center">
          {blogs.map((blog, index) => (
            <Grid.Col key={blog.title} span={{ base: 12, md: 4 }}>
              <BlogCard
                key={blog.title}
                backgroundImageUrl={blog.backgroundImageUrl}
                backgroundImageAlt={blog.backgroundImageAlt}
                backgroundImageSizes={`(max-width: ${theme.breakpoints.md}) 100vw, 33vw`}
                title={blog.title}
                tag={blog.tag}
                description={blog.description}
                publishedAt={blog.publishedAt}
                index={index}
              />
            </Grid.Col>
          ))}
        </Grid>
      </Container>
    </Container>
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
