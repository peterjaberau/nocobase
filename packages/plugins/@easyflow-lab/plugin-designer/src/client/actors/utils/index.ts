export const prettier = async (configCode) => {
  let prettierCode = '';
  try {
    const prettier = await import('prettier');
    const plugins = [await import('prettier/plugins/typescript')];

    prettierCode = await prettier.format(configCode, {
      parser: 'typescript',
      plugins,
      semi: true,
      singleQuote: true,
      printWidth: 100,
      trailingComma: 'all',
      proseWrap: 'never',
      endOfLine: 'lf',
    });
  } catch (err) {
    console.error('Error formatting code:', err);
    prettierCode = `Code formatting failed. Original code:\n${configCode}`;
  }
  return prettierCode;
};
