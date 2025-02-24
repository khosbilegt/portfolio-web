type Tag = {
  id: number;
  name: string;
  type: string;
}

type AnchorCardDefinition = {
  title: string;
  subtitle: string;
  thumbnail: string;
  href: string;
  href_type: string;
  tags: Tag[];
  create_date: string;
}

type PageDefinition = {
  id: number;
  key: string;
  name: string;
  title: string;
  subtitle: string;
  thumbnail: string;
  createDate: string;
  lastModifiedDate: string;
  tags: Tag[];
  contents: string[];
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

export type { AnchorCardDefinition, PageDefinition, Tag, BlogDefinition, BlogProps };