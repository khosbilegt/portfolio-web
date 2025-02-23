import { Container, Grid, useMantineTheme } from "@mantine/core";
import BlogCard from "./BlogCard";
import { BlogProps } from "../types";

function BlogList({ blogs = [] }: BlogProps) {
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
}

export default BlogList;
