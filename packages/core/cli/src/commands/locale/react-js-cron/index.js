

exports.getReactJsCron = (lang) => {
  const langs = {
    'en-US': require('./en-US.json'),
    'zh-CN': require('./zh-CN.json'),
    'z-TW': require('./zh-TW.json'),
  }
  return langs[lang] || langs['en-US'];
}
