type Tag = {
  id: number;
  name: string;
  type: string;
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

type AnchorCardDefinition = {
  title: string;
  subtitle: string;
  thumbnail: string;
  href: string;
  href_type: string;
  tags: Tag[];
  create_date: string;
}

export type { Tag, PageDefinition, AnchorCardDefinition };