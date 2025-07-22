
export type PanelStyle = {
  bottom: {
    h: number;
  };
  codeEditor: {
    w: number;
    h: number;
  };
};

const DefaultPanelStyle: PanelStyle = {
  bottom: {
    h: 285,
  },
  codeEditor: {
    w: 744,
    h: 468,
  },
};

export function savePanelStyle(panelStyle: PanelStyle) {
  localStorage.setItem('editor_panel_style', JSON.stringify(panelStyle));
}

export function getPanelStyle(): PanelStyle {
  const str = localStorage.getItem('editor_panel_style');
  if (!str) {
    return DefaultPanelStyle;
  }
  return { ...DefaultPanelStyle, ...JSON.parse(str) };
}
