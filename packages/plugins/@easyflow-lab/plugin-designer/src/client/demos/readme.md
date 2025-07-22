# Code Editor Component Hierarchy

Here is the hierarchy of the components and wrappers in the `codeEditor`:

1. **CodeEditor**
    - **CodeEditorTooltipContainer**
        - **CodeEditorCommon**
            - **CodeEditorWrapper**
                - **PopupCard** (conditionally rendered)
                - **Container**
                    - **CodeEditorPanel** (conditionally rendered)
                        - **CodeEditorForPanel**
                            - **CodeEditorPanelContainer**

## Summary

- `CodeEditor` is the top-level component.
- `CodeEditorTooltipContainer` wraps `CodeEditorCommon`.
- `CodeEditorCommon` contains `CodeEditorWrapper` and conditionally renders `PopupCard`.
- `CodeEditorWrapper` contains `Container`.
- `Container` conditionally renders `CodeEditorPanel`.
- `CodeEditorPanel` contains `CodeEditorForPanel`.
- `CodeEditorForPanel` contains `CodeEditorPanelContainer`.
