import { Container, Grid } from "@mantine/core";
import { BlogProps } from "../types";
import AnchorCard from "../../../components/AnchorCard";

function BlogList({ blogs = [] }: BlogProps) {
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
            <Grid.Col key={index} span={{ base: 12, md: 4 }}>
              <AnchorCard
                key={index}
                title={blog.title}
                subtitle={blog.tag}
                thumbnail={blog.backgroundImageUrl}
                href={`/blog/${blog.title}`}
                href_type="internal"
                create_date={blog.publishedAt}
                tags={[]}
              />
            </Grid.Col>
          ))}
        </Grid>
      </Container>
    </Container>
  );
}

export default BlogList;
