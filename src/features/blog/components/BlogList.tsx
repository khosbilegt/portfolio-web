import { Container, Grid } from "@mantine/core";
import { PageDefinition } from "../../../types/types";
import { motion } from "motion/react";
import AnchorCard from "../../../components/AnchorCard";

function BlogList({ blogs }: { blogs: PageDefinition[] }) {
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
          {blogs?.length === 0 && (
            <Grid.Col span={12}>
              <motion.div
                initial={{ opacity: 0.0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0,
                  ease: "easeInOut",
                }}
                viewport={{ once: true }}
              >
                <h1>No pages found with matching filters</h1>
              </motion.div>
            </Grid.Col>
          )}
          {blogs.map((blog, index) => (
            <Grid.Col key={index} span={{ base: 12, md: 4 }}>
              <AnchorCard
                key={index}
                title={blog.title}
                subtitle={blog.subtitle}
                thumbnail={blog.thumbnail}
                href={`/blog/${blog.key}`}
                href_type="internal"
                create_date={blog.createDate}
                tags={blog.tags}
              />
            </Grid.Col>
          ))}
        </Grid>
      </Container>
    </Container>
  );
}

export default BlogList;
