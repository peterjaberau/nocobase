

/**
 * 是否是完整的 URL（带协议的）
 * @param string
 * @returns
 */
export function isURL(string) {
  let url: URL;

  try {
    url = new URL(string);
  } catch (e) {
    return false;
  }

  return url.protocol === 'http:' || url.protocol === 'https:';
}
