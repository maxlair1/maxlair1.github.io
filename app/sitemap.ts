import { promises as fs } from 'fs';
import path from 'path';

export const dynamic = "force-static"

const SITE_URL = 'https://maxlair1.github.io';

async function getNoteSlugs(dir: string): Promise<string[]> {
  const slugs: string[] = [];

  async function walk(current: string) {
    const entries = await fs.readdir(current, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        await walk(fullPath);
      } else if (entry.isFile() && entry.name === 'page.mdx') {
        const slug = path.relative(dir, path.dirname(fullPath));
        slugs.push(slug.replace(/\\/g, '/'));
      }
    }
  }

  await walk(dir);
  return slugs;
}

export default async function sitemap() {
  const notesDirectory = path.join(process.cwd(), 'app', 'n');
  const slugs = await getNoteSlugs(notesDirectory);

  const notes = slugs.map((slug) => ({
    url: `${SITE_URL}/n/${slug}`,
    lastModified: new Date().toISOString()
  }));

  const routes = [''].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date().toISOString()
  }));

  return [...routes, ...notes];
}
