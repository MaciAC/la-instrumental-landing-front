import { marked } from 'marked';

const contentCache: Map<string, Promise<string>> = new Map();

const modules = import.meta.glob('../i18n/content/**/*.md', { query: '?raw', import: 'default' });

export async function loadMarkdownContent(locale: string, contentKey: string): Promise<string> {
  const cacheKey = `${locale}/${contentKey}`;
  
  if (contentCache.has(cacheKey)) {
    return contentCache.get(cacheKey)!;
  }

  const contentPromise = (async () => {
    const modulePath = `../i18n/content/${locale}/${contentKey}.md`;
    
    if (!(modulePath in modules)) {
      throw new Error(`Markdown content not found: ${locale}/${contentKey}`);
    }

    const markdown = await modules[modulePath as keyof typeof modules]() as string;
    return marked(markdown);
  })();

  contentCache.set(cacheKey, contentPromise);
  return contentPromise;
}
