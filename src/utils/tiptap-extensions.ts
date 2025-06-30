export function tiptapJsonToPlainText(json: any): string {
  if (!json || typeof json !== 'object') return '';

  const extractText = (node: any): string => {
    if (node.type === 'text') return node.text || '';
    if (!node.content) return '';
    return node.content.map(extractText).join(' ');
  };

  return extractText(json).trim();
}