export interface Book {
  id: string;
  title: string;
  subtitle?: string | null;
  titleCategory: string;
  grandFormat?: string | null;
  poche?: string | null;
  collector?: string | null;
  graph?: string|null;
  summary?: string | null;
  epubURL?: string | null;
  img?: string | null;
  imgCategory?: string | null;
  category: "BOOK" | "BOOK_GRAPH"; // Ton Enum
  createdAt: string; // En JSON, les dates deviennent des strings
}