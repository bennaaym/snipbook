interface Image {
  url: string;
}

export interface ICreatePostBody {
  title: string;
  message: string;
  tags: string[];
  images: Image[];
}
