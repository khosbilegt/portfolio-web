
type BlogDefinition = {
  backgroundImageUrl: string;
  backgroundImageAlt: string;
  backgroundImageSizes?: string;
  title: string;
  tag: string;
  description: string;
  publishedAt: string;
};

type BlogProps = {
  blogs?: BlogDefinition[];
};

export type { BlogDefinition, BlogProps };