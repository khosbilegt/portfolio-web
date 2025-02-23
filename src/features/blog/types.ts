type AnchorCardDefinition = {
  title: string;
  subtitle: string;
  thumbnail: string;
  href: string;
  href_type: string;
  tags: string[];
  create_date: string;
}

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

export type { AnchorCardDefinition, BlogDefinition, BlogProps };