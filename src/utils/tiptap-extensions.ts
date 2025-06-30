import { JSONContent } from '@tiptap/react';

export function tiptapJsonToPlainText(json: JSONContent): string {
  if (!json || typeof json !== 'object') return '';

  const extractText = (node: JSONContent): string => {
    if (node.type === 'text') return node.text || '';
    if (!node.content) return '';
    return node.content.map(extractText).join(' ');
  };

  return extractText(json).trim();
}
