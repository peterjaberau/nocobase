

import { FormLayout } from '@formily/antd-v5';
import { SchemaOptionsContext } from '@formily/react';
import { createMemoryHistory } from 'history';
import React, { useCallback, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Router } from 'react-router-dom';
import { SchemaInitializerItem } from '../../application';
import {
  CollectionManagerProvider,
  useCollectionManager,
} from '../../data-source/collection/CollectionManagerProvider';
import {
  DataSourceManagerProvider,
  useDataSourceManager,
} from '../../data-source/data-source/DataSourceManagerProvider';
import { useGlobalTheme } from '../../global-theme';
import { EasyFlowDesktopRouteType } from '../../route-switch/antd/admin-layout/convertRoutesToSchema';
import {
  FormDialog,
  SchemaComponent,
  SchemaComponentOptions,
  useEasyFlowRoutes,
  useParentRoute,
} from '../../schema-component';
import { useStyles } from '../../schema-component/antd/menu/MenuItemInitializers';
import { useURLAndHTMLSchema } from '../actions/link/useURLAndHTMLSchema';

export const LinkMenuItem = () => {
  const { t } = useTranslation();
  const options = useContext(SchemaOptionsContext);
  const { theme } = useGlobalTheme();
  const { componentCls, hashId } = useStyles();
  const { urlSchema, paramsSchema } = useURLAndHTMLSchema();
  const parentRoute = useParentRoute();
  const { createRoute } = useEasyFlowRoutes();
  const dm = useDataSourceManager();
  const cm = useCollectionManager();

  const handleClick = useCallback(async () => {
    const values = await FormDialog(
      t('Add link'),
      () => {
        const history = createMemoryHistory();
        return (
          <DataSourceManagerProvider dataSourceManager={dm}>
            <CollectionManagerProvider instance={cm} dataSource={cm?.dataSource?.key}>
              <Router location={history.location} navigator={history}>
                <SchemaComponentOptions scope={options.scope} components={{ ...options.components }}>
                  <FormLayout layout={'vertical'}>
                    <SchemaComponent
                      schema={{
                        properties: {
                          title: {
                            title: t('Menu item title'),
                            required: true,
                            'x-component': 'Input',
                            'x-decorator': 'FormItem',
                          },
                          icon: {
                            title: t('Icon'),
                            'x-component': 'IconPicker',
                            'x-decorator': 'FormItem',
                          },
                          href: urlSchema,
                          params: paramsSchema,
                        },
                      }}
                    />
                  </FormLayout>
                </SchemaComponentOptions>
              </Router>
            </CollectionManagerProvider>
          </DataSourceManagerProvider>
        );
      },
      theme,
    ).open({
      initialValues: {},
    });
    const { title, href, params, icon } = values;

    // 创建一个路由到 desktopRoutes 表中
    await createRoute({
      type: EasyFlowDesktopRouteType.link,
      title,
      icon,
      parentId: parentRoute?.id,
      options: {
        href,
        params,
      },
    });
  }, [options.components, options.scope, t, theme]);

  return <SchemaInitializerItem title={t('Link')} onClick={handleClick} className={`${componentCls} ${hashId}`} />;
};
