

export function forEachLinkageRule(linkageRules: any[], callback: (action: any, rule: any) => void) {
  linkageRules.forEach((rule) => {
    rule.actions?.forEach((action) => {
      callback(action, rule);
    });
  });
}
