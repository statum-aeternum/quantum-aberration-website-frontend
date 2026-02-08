export interface NewsItem {
  id: number;
  title: string;
  content: string;
  image: string;
  date: string;
  slug: string;
}

export interface MerchItem {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  slug: string;
}

export interface Contact {
  type: string;
  value: string;
  label: string; 
}