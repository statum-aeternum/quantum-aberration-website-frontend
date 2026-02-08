import { supabase } from "../lib/supabase";
import type { NewsItem, MerchItem, Contact } from "../types";

const generateSlug = (text: string, id: number): string => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') + `-${id}`;
};

export const getNews = async (page: number = 1, limit: number = 10) => {
  try {
    const start = (page - 1) * limit;
    const end = start + limit - 1;

    const { data, error, count } = await supabase
      .from("news")
      .select("*", { count: "exact" })
      .order("date", { ascending: false })
      .range(start, end);

    if (error) throw error;

    const newsWithSlugs = (data || []).map(item => ({
      ...item,
      slug: item.slug || generateSlug(item.title, item.id)
    }));

    return {
      news: newsWithSlugs as NewsItem[],
      total: count || 0,
    };
  } catch (error) {
    console.error("Erreur lors du chargement des news:", error);
    return { news: [], total: 0 };
  }
};

export const getMerch = async () => {
  try {
    const { data, error } = await supabase
      .from("merch")
      .select("*")
      .order("id", { ascending: true });

    if (error) throw error;

    const merchWithSlugs = (data || []).map(item => ({
      ...item,
      slug: item.slug || generateSlug(item.name, item.id)
    }));

    return merchWithSlugs as MerchItem[];
  } catch (error) {
    console.error("Erreur lors du chargement du merch:", error);
    return [];
  }
};

export const getContacts = async () => {
  try {
    const { data, error } = await supabase
      .from("contacts")
      .select("*")
      .order("id", { ascending: true });

    if (error) throw error;

    return data as Contact[];
  } catch (error) {
    console.error("Erreur lors du chargement des contacts:", error);
    return [];
  }
};
