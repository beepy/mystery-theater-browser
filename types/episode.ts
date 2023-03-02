// necessary?
import type { MarkdownParsedContent } from '@nuxt/content/dist/runtime/types';
export interface Episode extends MarkdownParsedContent {
  title?: string;
  date?: string;
  id?: string | number;
  urls?: { url?: string; source?: string; quality?: number }[];
  audioQuality?: number;
  tags?: string[];
  multipart?: number;
  actors?: { id?: number; name?: string }[];
  actorIds?: number[];
  writers?: { id?: number; name?: string }[];
  writerIds?: number[];
  // searchable?: string;
  _searchable?: string;
  descriptionSource?: string;
  notes?: string;
}
