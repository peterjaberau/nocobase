

export enum EasyFlowDesktopRouteType {
  group = 'group',
  page = 'page',
  link = 'link',
  tabs = 'tabs',
}

/**
 * 尽量与移动端的结构保持一致
 */
export interface EasyFlowDesktopRoute {
  id?: number;
  parentId?: number;
  children?: EasyFlowDesktopRoute[];

  title?: string;
  tooltip?: string;
  icon?: string;
  schemaUid?: string;
  menuSchemaUid?: string;
  tabSchemaName?: string;
  /**
   * schemaUid 是用于存储菜单的 schema uid，pageSchemaUid 是用于存储菜单中的页面的 schema uid
   *
   * 注意：仅 type 为 page 时，pageSchemaUid 才有值
   */
  pageSchemaUid?: string;
  type?: EasyFlowDesktopRouteType;
  options?: any;
  sort?: number;
  hideInMenu?: boolean;
  enableTabs?: boolean;
  hidden?: boolean;

  // 关联字段
  roles?: Array<{
    name: string;
    title: string;
  }>;

  // 系统字段
  createdAt?: string;
  updatedAt?: string;
  createdBy?: any;
  updatedBy?: any;
}
