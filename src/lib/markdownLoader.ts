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

export interface ManifestSection {
  index: number;
  html: string;
}

export async function loadManifestSections(locale: string): Promise<ManifestSection[]> {
  const cacheKey = `${locale}/manifest_sections`;
  
  if (contentCache.has(cacheKey)) {
    return contentCache.get(cacheKey)!;
  }

  const contentPromise = (async () => {
    const sections: ManifestSection[] = [];
    let sectionIndex = 0;

    while (true) {
      const modulePath = `../i18n/content/${locale}/manifest_${sectionIndex}.md`;
      
      if (!(modulePath in modules)) {
        break;
      }

      const markdown = await modules[modulePath as keyof typeof modules]() as string;
      const html = await marked(markdown);
      sections.push({
        index: sectionIndex,
        html: html as string
      });
      sectionIndex++;
    }

    if (sections.length === 0) {
      throw new Error(`No manifest sections found for locale: ${locale}`);
    }

    return sections;
  })();

  contentCache.set(cacheKey, contentPromise);
  return contentPromise;
}
