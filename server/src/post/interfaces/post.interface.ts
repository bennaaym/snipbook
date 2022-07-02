interface Image {
  url: string;
}

export interface ICreatePostBody {
  title: string;
  description: string;
  tags: string[];
  images: Image[];
}
export interface IUpdatePostBody {
  title: string;
  description: string;
  tags: string[];
}

export interface ICreateComment {
  content: string;
}
