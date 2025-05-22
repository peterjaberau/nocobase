

export enum ActionType {
  Visible = 'visible',
  Editable = 'editable',
  ReadOnly = 'disabled',
  ReadPretty = 'readPretty',
  None = 'none',
  Hidden = 'hidden',
  Required = 'required',
  InRequired = 'notRequired',
  Disabled = 'disabled',
  Value = 'value',
  Active = 'enabled',
  Color = 'color',
  BackgroundColor = 'backgroundColor',
  TextAlign = 'textAlign',
}

export enum LinkageRuleCategory {
  default = 'default',
  style = 'style',
}

export const LinkageRuleDataKeyMap: Record<`${LinkageRuleCategory}`, string> = {
  [LinkageRuleCategory.style]: 'x-linkage-style-rules',
  [LinkageRuleCategory.default]: 'x-linkage-rules',
};
