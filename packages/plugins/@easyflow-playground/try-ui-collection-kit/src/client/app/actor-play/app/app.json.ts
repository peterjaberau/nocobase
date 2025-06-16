export const ActionTypes = [
  {
    name: 'Show Alert',
    id: 'show-alert',
    options: [{ name: 'message', type: 'text', default: 'Message !' }],
  },
  {
    name: 'Logout',
    id: 'logout',
  },
  {
    name: 'Run Query',
    id: 'run-query',
    options: [{ queryId: '' }],
  },
  {
    name: 'Open Webpage',
    id: 'open-webpage',
    options: [{ name: 'url', type: 'text', default: 'https://example.com' }],
  },
  {
    name: 'Go to app',
    id: 'go-to-app',
    options: [
      { name: 'app', type: 'text', default: '' },
      { name: 'queryParams', type: 'code', default: '[]' },
    ],
  },
  {
    name: 'Show Modal',
    id: 'show-modal',
    options: [{ name: 'modal', type: 'text', default: '' }],
  },
  {
    name: 'Close Modal',
    id: 'close-modal',
    options: [{ name: 'modal', type: 'text', default: '' }],
  },
  {
    name: 'Copy to clipboard',
    id: 'copy-to-clipboard',
    options: [{ name: 'copy-to-clipboard', type: 'text', default: '' }],
  },
  {
    name: 'Set local storage',
    id: 'set-localstorage-value',
    options: [
      { name: 'key', type: 'code', default: '' },
      { name: 'value', type: 'code', default: '' },
    ],
  },
  {
    name: 'Generate file',
    id: 'generate-file',
    options: [
      { name: 'fileType', type: 'text', default: '' },
      { name: 'fileName', type: 'text', default: '' },
      { name: 'data', type: 'code', default: '{{[]}}' },
    ],
  },
  {
    name: 'Set table page',
    id: 'set-table-page',
    options: [
      {
        name: 'table',
        type: 'text',
        default: '',
      },
      { name: 'pageIndex', type: 'text', default: '{{1}}' },
    ],
  },
  {
    name: 'Set variable',
    id: 'set-custom-variable',
    options: [
      { name: 'key', type: 'code', default: '' },
      { name: 'value', type: 'code', default: '' },
    ],
  },
  {
    name: 'Unset variable',
    id: 'unset-custom-variable',
    options: [{ name: 'key', type: 'code', default: '' }],
  },
  {
    name: 'Switch page',
    id: 'switch-page',
    options: [{ name: 'page', type: 'text', default: '' }],
  },
  {
    name: 'Set page variable',
    id: 'set-page-variable',
    options: [
      { name: 'key', type: 'code', default: '' },
      { name: 'value', type: 'code', default: '' },
    ],
  },
  {
    name: 'Unset page variable',
    id: 'unset-page-variable',
    options: [
      { name: 'key', type: 'code', default: '' },
      { name: 'value', type: 'code', default: '' },
    ],
  },
  {
    name: 'Control component',
    id: 'control-component',
    options: [
      { name: 'component', type: 'text', default: '' },
      { name: 'action', type: 'text', default: '' },
    ],
  },
];

export const en = {
  "globals": {
    "readDocumentation": "Read documentation",
    "cancel": "Cancel",
    "save": "Save",
    "savechanges": "Save changes",
    "back": "Back",
    "edit": "Edit",
    "search": "Search",
    "update": "Update",
    "delete": "Delete",
    "remove": "Remove",
    "add": "Add",
    "view": "View",
    "create": "Create",
    "enabled": "Enabled",
    "disabled": "Disabled",
    "yes": "Yes",
    "submit": "Submit",
    "select": "Select",
    "environmentVar": "Workspace constants/variables",
    "saving": "Saving...",
    "saveDatasource": "Save data source",
    "authorize": "Authorize",
    "connect": "Connect",
    "reconnect": "Reconnect",
    "components": "components",
    "send": "Send",
    "noConnection": "could not connect",
    "connectionVerified": "connection verified",
    "left": "Left",
    "center": "Center",
    "right": "Right",
    "justified": "Justified",
    "host": "Host",
    "operation": "Operation",
    "header": "HEADER",
    "path": "Path",
    "query": "Query",
    "requestBody": "Request Body",
    "page": "Page",
    "searchItem": "Search apps in this workspace",
    "workflowsSearchItem": "Search workflows in this workspace",
    "searchComponents": "Search components"
  },
  "errorBoundary": "Something went wrong.",
  "viewer": "Sorry!. This app is under maintenance",
  "app": {
    "updateAvailable": "Update available",
    "newVersionReleased": "A new version of ToolJet has been released.",
    "readReleaseNotes": "Read release notes & update",
    "skipVersion": "Skip this version"
  },
  "stripe": "Please wait while we load the OpenAPI specification for Stripe.",
  "openApi": {
    "noValidOpenApi": "Valid OpenAPI Spec is not available!.",
    "selectHost": "Select a host",
    "selectOperation": "Select an operation"
  },
  "slack": {
    "authorize": "Authorize",
    "connectToolJetToSlack": "{{whiteLabelText}} can connect to Slack and list users, send messages, etc. Please select appropriate permission scopes.",
    "chatWrite": "chat:write",
    "listUsersAndSendMessage": "Your {{whiteLabelText}} app will be able to list users and send messages to users & channels.",
    "connectSlack": "Connect to Slack"
  },
  "googleSheets": {
    "readOnly": "Read only",
    "enableReadAndWrite": "If you want your {{whiteLabelText}} apps to modify your Google sheets, make sure to select read and write access",
    "readDataFromSheets": "Your {{whiteLabelText}} apps can only read data from Google sheets",
    "readWrite": "Read and write",
    "readModifySheets": "Your {{whiteLabelText}} apps can read data from sheets, modify sheets, and more.",
    "toGoogleSheets": "to Google Sheets"
  },
  "zendesk": {
    "enableReadAndWrite": "If you want your {{whiteLabelText}} apps to modify your Zendesk resources, make sure to select read and write access",
    "readDataFromResources": "Your {{whiteLabelText}} apps can only read data from resources",
    "readModifySheets": "Your {{whiteLabelText}} apps can read data from resources, modify resources, and more."
  },
  "profile": {
    "profileSettings": "Profile Settings"
  },
  "verificationSuccessPage": {
    "workEmail": "Email",
    "enterFullName": "Enter your full name",
    "enterNewPassword": "Enter new password",
    "name": "Name",
    "password": "Password",
    "acceptInvite": "Accept invite",
    "successfullyVerifiedEmail": "Successfully verified email",
    "setupTooljet": "Set up {{whiteLabelText}}"
  },
  "loginSignupPage": {
    "forgotPassword": "Forgot Password",
    "emailAddress": "Email address",
    "enterEmail": "Enter email",
    "dontHaveAccount": "Don't have account yet?",
    "enterBusinessEmail": "Enter your business email",
    "alreadyHaveAnAccount": "Already have an account?",
    "resetPassword": "Reset Password",
    "signIn": "Sign in",
    "signUp": "Sign up",
    "createToolJetAccount": "Create an account",
    "password": "Password",
    "showPassword": "show password",
    "loginTo": "Login",
    "yourAccount": "your account",
    "noLoginMethodsEnabled": "No login methods enabled for this workspace",
    "emailConfirmLink": "Please check your email for confirmation link",
    "newPassword": "New Password",
    "passwordConfirmation": "Password Confirmation",
    "newToTooljet": "New to {{whiteLabelText}}?",
    "newToWorkspace": "New to this workspace?",
    "enterWorkEmail": "Enter your work email",
    "enterPassword": "Enter password",
    "forgot": "Forgot?",
    "workEmail": "Email",
    "joinTooljet": "Join {{whiteLabelText}}",
    "getStartedForFree": "Get started for free",
    "passwordCharacter": "Password must be at least 5 characters",
    "enterFullName": "Enter your full name",
    "enterNewPassword": "Enter new password"
  },
  "editor": {
    "preview": "Preview",
    "share": "Share",
    "shareModal": {
      "makeApplicationPublic": "Make application public",
      "shareableLink": "Shareable app link",
      "copy": "copy",
      "embeddableLink": "Embedded app link",
      "manageUsers": "Users"
    },
    "appVersionManager": {
      "version": "Version",
      "currentlyReleased": "Currently Released",
      "createVersion": "Create new version",
      "versionName": "Version name",
      "createVersionFrom": "Create version from",
      "save": "Save",
      "create": "Create Version",
      "editVersion": "Edit Version",
      "deleteVersion": "Do you really want to delete this version ({{version}})?",
      "enterVersionName": "Enter version name",
      "versionAlreadyReleased": "You cannot make changes to a version that has already been released. \n Create a new version or switch to a different version if you want to make changes."
    },
    "queries": "Queries",
    "inspectComponent": "Please select a component to inspect",
    "release": "Release",
    "searchQueries": "Search queries",
    "createQuery": "Create query",
    "queryManager": {
      "general": "General",
      "advanced": "Advanced",
      "preview": "Preview",
      "Save": "Save",
      "selectDatasource": "Select Data Source",
      "addDatasource": "Add datasource",
      "dataSourceManager": {
        "toast": {
          "success": {
            "dataSourceAdded": "Data Source Added",
            "dataSourceSaved": "Data Source Saved"
          },
          "error": {
            "noEmptyDsName": "The name of datasource should not be empty"
          }
        },
        "suggestDataSource": "Suggest Datasource",
        "suggestAnIntegration": "Suggest an integration",
        "whatLookingFor": "Tell us what you were looking for?",
        "noResultFound": "Don't see what you were looking for?",
        "suggest": "Suggest",
        "addNewDataSource": "Add new datasource",
        "whiteListIP": "Please white-list our IP address if the data source is not publicly accessible",
        "copied": "Copied",
        "copy": "Copy",
        "saving": "Saving",
        "noResultsFor": "No results for",
        "noteTaken": "Thank you, we've taken a note of that!",
        "goToAllDatasources": "Go to all Datasource",
        "send": "Send"
      },
      "runQueryOnApplicationLoad": "Run this query on application load",
      "confirmBeforeQueryRun": "Request confirmation before running query",
      "notificationOnSuccess": "Show notification on success",
      "successMessage": "Success Message",
      "queryRanSuccessfully": "Query ran successfully",
      "notificationDuration": "Notification duration (s)",
      "events": "Events",
      "transformation": {
        "transformationToolTip": "Transformations can be enabled on queries to transform the query results. ToolJet allows you to transform the query results using two programming languages: JavaScript and Python",
        "transformations": "Transformations"
      }
    },
    "inspector": {
      "eventManager": {
        "event": "Event",
        "action": "Action",
        "debounce": "Debounce",
        "actionOptions": "Action Options",
        "message": "Message",
        "alertType": "Alert Type",
        "url": "URL",
        "modal": "Modal",
        "text": "Text",
        "query": "Query",
        "key": "Key",
        "value": "Value",
        "type": "Type",
        "fileName": "File name",
        "data": "Data",
        "table": "Table",
        "pageIndex": "Page index",
        "component": "Component",
        "addHandler": "New event handler",
        "addNewEvent": "Add new event",
        "addEventHandler": "+ Add event handler",
        "emptyMessage": "This {{componentName}} doesn't have any event handlers",
        "page": "Page"
      }
    }
  },
  "header": {
    "darkModeToggle": {
      "activateLightMode": "Activate light mode",
      "activateDarkMode": "Activate dark mode"
    },
    "languageSelection": {
      "changeLanguage": "Change language",
      "searchLanguage": "Search language"
    },
    "notificationCenter": {
      "notifications": "Notifications",
      "markAllAs": "Mark all as",
      "read": "read",
      "un": "un",
      "youDontHaveany": "You don't have any",
      "youAreCaughtUp": "You're all caught up!",
      "view": "View"
    },
    "organization": {
      "addNewWorkSpace": "Add new workspace",
      "loadOrganizations": "Load Organizations",
      "createWorkspace": "Create workspace",
      "workspaceName": "Workspace name",
      "editWorkspace": "Edit workspace",
      "menus": {
        "addWorkspace": "Add workspace",
        "menusList": {
          "manageUsers": "Users",
          "manageGroups": "Groups",
          "manageSso": "SSO",
          "manageEnv": "Workspace Variables"
        },
        "manageUsers": {
          "usersAndPermission": "Users & Permissions",
          "inviteNewUser": "Invite one user",
          "inviteUsers": "Invite users",
          "name": "NAME",
          "email": "EMAIL",
          "status": "STATUS",
          "archive": "Archive",
          "unarchive": "Unarchive",
          "addNewUser": "Add users",
          "emailAddress": "Email address",
          "createUser": "Create User",
          "enterFirstName": "Enter First Name",
          "enterLastName": "Enter Last Name",
          "enterEmail": "Enter email id",
          "enterFullName": "Enter full name",
          "inviteNewUsers": "Invite new users"
        },
        "manageGroups": {
          "permissions": {
            "userGroups": "User Groups",
            "createNewGroup": "Create new group",
            "updateGroup": "Update group",
            "addNewGroup": "Add new group",
            "enterName": "Enter group name",
            "createGroup": "Create Group",
            "name": "Name"
          },
          "permissionResources": {
            "userGroup": "User group",
            "apps": "Apps",
            "workflows": "Workflows",
            "users": "Users",
            "permissions": "Permissions",
            "addAppsToGroup": "Select apps to add to the group",
            "addWorkflowsToGroup": "Select workflows to add to the group",
            "name": "name",
            "addUsersToGroup": "Select users to add to the group",
            "email": "email",
            "resource": "Resource",
            "createUpdateDelete": "Create/Update/Delete",
            "folder": "Folder",
            "dataSource": "Data sources"
          },
          "groupOptions": {
            "deleteGroup": "Delete Group",
            "duplicateGroup": "Duplicate Group"
          }
        },
        "manageSSO": {
          "manageSso": "SSO",
          "generalSettings": {
            "title": "General Settings",
            "enableSignup": "Enable Signup",
            "newAccountWillBeCreated": "New account will be created for user's first time SSO sign in",
            "allowedDomains": "Allowed domains",
            "enterDomains": "Enter Domains",
            "supportMultiDomains": "Support multiple domains. Enter domain names separated by comma. example: tooljet.com,tooljet.io,yourorganization.com",
            "loginUrl": "Login URL",
            "workspaceLogin": "Use this URL to login directly to this workspace",
            "allowDefaultSso": "Allow default SSO",
            "ssoAuth": "Allow users to authenticate via default SSO. Default SSO configurations can be overridden by \n workspace level SSO."
          },
          "google": {
            "title": "Google",
            "enabled": "Enabled",
            "disabled": "Disabled",
            "clientId": "Client Id",
            "enterClientId": "Enter Client Id",
            "redirectUrl": "Redirect URL"
          },
          "github": {
            "title": "GitHub",
            "hostName": "Host Name",
            "enterHostName": "Enter Host Name",
            "requiredGithub": "Required if GitHub is self hosted",
            "clientId": "Client Id",
            "enterClientId": "Enter Client Id",
            "clientSecret": "Client Secret",
            "enterClientSecret": "Enter Client Secret",
            "encrypted": "Encrypted",
            "redirectUrl": "Redirect URL"
          },
          "passwordLogin": "Password Login",
          "environmentVar": {
            "noEnvConfig": "You haven't configured any workspace variables, press the 'Add new variable' button to create one",
            "envWillBeDeleted": "Variable will be deleted, do you want to continue?",
            "addNewVariable": "Add new variable",
            "variableForm": {
              "addNewVariable": "Add new variable",
              "updatevariable": "Update variable",
              "name": "Name",
              "value": "Value",
              "enterVariableName": "Enter Variable Name",
              "enterValue": "Enter Value",
              "type": "Type",
              "enableEncryption": "Enable encryption",
              "addVariable": "Add variable"
            },
            "variableTable": {
              "name": "name",
              "value": "value",
              "type": "type",
              "secret": "secret"
            }
          }
        }
      }
    },
    "profileSettingPage": {
      "profileSettings": "Profile Settings",
      "firstName": "First name",
      "lastName": "Last name",
      "enterFirstName": "Enter First Name",
      "enterLastName": "Enter Last Name",
      "email": "Email address",
      "avatar": "Avatar",
      "update": "Update",
      "profile": "Profile",
      "changePassword": "Change password",
      "currentPassword": "Current password",
      "newPassword": "New password",
      "confirmNewPassword": "Confirm new password",
      "enterCurrentPassword": "Enter current password",
      "enterNewPassword": "Enter new password",
      "inviteUsers": "Invite users"
    },
    "profile": "Profile",
    "logout": "Logout"
  },
  "homePage": {
    "appCard": {
      "changeIcon": "Change Icon",
      "addToFolder": "Add to folder",
      "move": "Move",
      "to": "to",
      "selectFolder": "Select folder",
      "deleteApp": "Delete app",
      "exportApp": "Export app",
      "cloneApp": "Clone app",
      "launch": "Launch",
      "maintenance": "Maintenance",
      "noDeployedVersion": "App does not have a deployed version",
      "openInAppViewer": "Open in app viewer",
      "removeFromFolder": "Remove from folder"
    },
    "blankPage": {
      "welcomeToToolJet": "Welcome to your new ToolJet workspace",
      "getStartedCreateNewApp": "You can get started by creating a new application or by creating an application using a template in ToolJet Library.",
      "importApplication": "Import an app"
    },
    "foldersSection": {
      "allApplications": "All applications",
      "folders": "Folders",
      "createNewFolder": "+ Create new",
      "noFolders": "You haven't created any folders. Use folders to organize your apps",
      "createFolder": "Create folder",
      "updateFolder": "Update folder",
      "editFolder": "Edit folder",
      "deleteFolder": "Delete folder",
      "folderName": "Folder name",
      "wishToDeleteFolder": "Are you sure you want to delete the folder {{folderName}}? Apps within the folder will not be deleted."
    },
    "header": {
      "createNewApplication": "Create an app",
      "import": "Import from device",
      "chooseFromTemplate": "Choose from template"
    },
    "pagination": {
      "showing": "Showing",
      "of": "of",
      "to": "to"
    },
    "noApplicationFound": "No Applications found",
    "thisFolderIsEmpty": "This folder is empty",
    "nonAccessibleFolderApps": "You do not have access to any applications in this folder.",
    "deleteAppAndData": "The app {{appName}} and the associated data will be permanently deleted, do you want to continue?",
    "deleteWorkflowAndData": "Are you sure you want to delete the workflow {{appName}}? This action will not only remove it from the system but also from all the apps where it is currently in use. Please confirm to proceed.",
    "removeAppFromFolder": "The app will be removed from this folder, do you want to continue?",
    "change": "Change",
    "templateCard": {
      "use": "Use",
      "preview": "Preview",
      "leadGeneretion": "Lead generetion"
    },
    "templateLibraryModal": {
      "select": "Select template",
      "createAppfromTemplate": "Create application from template"
    }
  },
  "workflowsDashboard": {
    "appCard": {
      "run": "Run",
      "openInWorkflowEditor": "Open in workflow editor"
    },
    "blankPage": {
      "welcomeToToolJet": "Welcome to your new ToolJet workspace",
      "getStartedCreateNewApp": "You can get started by creating a new application or by creating an application using a template in ToolJet Library.",
      "importApplication": "Import an application"
    },
    "foldersSection": {
      "allApplications": "All workflows",
      "folders": "Folders",
      "createNewFolder": "+ Create new",
      "noFolders": "You haven't created any folders. Use folders to organize your apps",
      "createFolder": "Create folder",
      "updateFolder": "Update folder",
      "editFolder": "Edit folder",
      "deleteFolder": "Delete folder",
      "folderName": "Folder name",
      "wishToDeleteFolder": "Are you sure you want to delete the folder? Apps within the folder will not be deleted."
    },
    "header": {
      "createNewApplication": "Create new workflow",
      "import": "Import",
      "chooseFromTemplate": "Choose from template"
    },
    "pagination": {
      "showing": "Showing",
      "of": "of",
      "to": "to"
    },
    "noApplicationFound": "No Applications found",
    "thisFolderIsEmpty": "This folder is empty",
    "deleteAppAndData": "The app and the associated data will be permanently deleted, do you want to continue?",
    "removeAppFromFolder": "The app will be removed from this folder, do you want to continue?",
    "change": "Change",
    "templateCard": {
      "use": "Use",
      "preview": "Preview",
      "leadGeneretion": "Lead generetion"
    },
    "templateLibraryModal": {
      "select": "Select template",
      "createAppfromTemplate": "Create application from template"
    }
  },
  "confirmationPage": {
    "setupAccount": "Set up your account",
    "signupWithGoogle": "Sign up with Google",
    "signupWithGitHub": "Sign up with GitHub",
    "signupWithOpenid": "Sign up with",
    "or": "OR",
    "firstName": "First name",
    "lastName": "Last name",
    "company": "Company",
    "role": "Role",
    "pleaseSelect": "Please select",
    "password": "Password",
    "confirmPassword": "Confirm Password",
    "clickAndAgree": "By clicking the button below, you agree to our",
    "termsAndConditions": "Terms and Conditions",
    "finishAccountSetup": "Finish account setup",
    "acceptInvite": "Accept invite",
    "accountExists": "Already have an account?",
    "and": "and"
  },
  "onBoarding": {
    "finishToolJetInstallation": "Finish ToolJet installation",
    "organization": "Organization",
    "name": "Name",
    "email": "Email",
    "receiveUpdatesFromToolJet": "You will receive updates from the ToolJet team ( 1-2 emails every month, we do not spam )",
    "finishSetup": "Finish setup",
    "skip": "Skip"
  },
  "redirectSso": {
    "upgradingTov1.13.0": "Upgrading to v1.13.0 and above.",
    "fromV1.13.0": "From v1.13.0 we have introduced",
    "multiWorkspace": "Multi-Workspace",
    "singleSignOnConfig": "The Single Sign-On related configurations are moved from workspace variables to database. Please refer this",
    "link": "Link",
    "toConfigureSSO": "to configure SSO.",
    "haveGoogleGithubSSo": "If you have Google or GitHub SSO configurations before upgrade and disabled Multi-Workspace, then theSSO configurations will be migrated while upgrade but you have to re-configure the redirect URL in the SSO provider side. Redirect URLs for each SSO are given below.",
    "isMultiWorkspaceEnabled": "If you have enabled Multi-Workspace, then the SSO configurations will not be migrated while upgrade so you have to re-configure the SSO under the respective workspace.",
    "youHaveEnabled": "You have Enabled",
    "setupSsoWorkspace": "Please login with password and you can setup sso using workspace",
    "manageSsoMenu": "Manage SSO menu.",
    "youHaveDisabled": "You have Disabled",
    "configureRedirectUrl": "Please configure redirect url in SSO provider side.",
    "google": "Google",
    "redirectUrl": "Redirect URL:",
    "gitHub": "GitHub"
  },
  "oAuth2": {
    "pleaseWait": "Please wait...",
    "authSuccess": "Auth successful, you can close this tab now.",
    "authFailed": "Auth failed"
  },
  "widgetManager": {
    "commonlyUsed": "commonly used",
    "layouts": "layouts",
    "forms": "forms",
    "integrations": "integrations",
    "others": "others",
    "noResults": "No results found",
    "tryAdjustingFilterMessage": "Try adjusting your search or filter to find what you're looking for.",
    "clearQuery": "clear query"
  },
  "widget": {
    "common": {
      "properties": "Properties",
      "events": "Events",
      "layout": "Layout",
      "devices": "Devices",
      "styles": "Styles",
      "general": "General",
      "validation": "Validation",
      "documentation": "Read documentation for {{componentMeta}}",
      "widgetNameEmptyError": "Widget name cannot be empty",
      "componentNameExistsError": "Component name already exists",
      "invalidWidgetName": "Invalid widget name. Should be unique and only include letters, numbers and underscore."
    },
    "commonProperties": {
      "visibility": "Visibility",
      "disable": "Disable",
      "borderRadius": "Border radius",
      "transformation": "Transformation",
      "boxShadow": "Box shadow",
      "tooltip": "Tooltip",
      "showOnDesktop": "Show on desktop",
      "showOnMobile": "Show on mobile",
      "showLoadingState": "Show loading state",
      "backgroundColor": "Background color",
      "textColor": "Text color",
      "loaderColor": "Loader color",
      "defaultValue": "Default value",
      "placeholder": "Placeholder",
      "label": "Label",
      "title": "Title",
      "code": "Code",
      "data": "Data",
      "tableData": "Table data",
      "tableColumns": "Table columns",
      "loadingState": "Loading state",
      "serverSidePagination": "Server-side pagination",
      "clientSidePagination": "Client-side pagination",
      "serverSideSearch": "Server-side search",
      "showSearchBox": "Show search box",
      "showDownloadButton": "Show download button",
      "showFilterButton": "Show filter button",
      "showBulkUpdateActions": "Show update buttons",
      "bulkSelection": "Bulk selection",
      "highlightSelectedRow": "Highlight selected row",
      "actionButtonRadius": "Action button radius",
      "tableType": "Table type",
      "cellSize": "Cell size",
      "setPage": "Set page",
      "page": "Page",
      "buttonText": "Button text",
      "click": "Click",
      "setText": "Set text",
      "text": "Text",
      "markerColor": "Marker color",
      "showAxes": "Show axis",
      "showGridLines": "Show grid lines",
      "chartType": "Chart type",
      "jsonDescription": "JSON description",
      "usePlotlyJsonSchema": "Use Plotly JSON schema",
      "padding": "Padding",
      "hideTitleBar": "Hide title bar",
      "hideCloseButton": "Hide close button",
      "hideOnEscape": "Hide on escape",
      "modalSize": "Modal size",
      "open": "Open",
      "close": "Close",
      "regex": "Regex",
      "minLength": "Min length",
      "maxLength": "Max length",
      "customValidation": "Custom validation",
      "clear": "Clear",
      "minimumValue": "Minimum value",
      "maximumValue": "Maximum value",
      "format": "Format",
      "enableTimeSelection": "Enable time selection?",
      "enableDateSelection": "Enable date selection?",
      "disabledDates": "Disabled dates",
      "setChecked": "Set checked",
      "status": "status",
      "defaultStatus": "Default status",
      "checkboxColor": "Checkbox color",
      "optionValues": "Option values",
      "optionLabels": "Option labels",
      "activeColor": "Active color",
      "selectOption": "Select option",
      "option": "Option",
      "toggleSwitchColor": "Toggle switch color",
      "defaultStartDate": "Default start date",
      "defaultEndDate": "Default end date",
      "textSize": "Text size",
      "alignText": "Align text",
      "url": "URL",
      "alternativeText": "Alternative text",
      "zoomButton": "Zoom button",
      "borderType": "Border type",
      "imageFit": "Image fit",
      "optionsLoadingState": "Options loading state",
      "selectedTextColor": "Selected text color",
      "select": "Select",
      "deselectOption": "Deselect option",
      "clearSelections": "Clear selections",
      "enableSelectAllOption": "Enable select all option",
      "initialLocation": "Initial location",
      "defaultMarkers": "Default markers",
      "addNewMarkers": "Add new markers",
      "searchForPlaces": "Search for places",
      "setLocation": "Set location",
      "latitude": "Latitude",
      "longitude": "Longitude",
      "numberOfStars": "Number of stars",
      "defaultNoOfSelectedStars": "Default no of selected stars",
      "enableHalfStar": "Enable half star",
      "tooltips": "Tooltips",
      "starColor": "Star color",
      "labelColor": "Label color",
      "dividerColor": "Divider color",
      "clearFiles": "Clear files",
      "instructionText": "Instruction text",
      "useDropZone": "Use drop zone",
      "useFilePicker": "Use file picker",
      "pickMultipleFiles": "Pick multiple files",
      "maxFileCount": "Max file count",
      "acceptFileTypes": "Accept file types",
      "maxSizeLimitBytes": "Max size limit (Bytes)",
      "minSizeLimitBytes": "Min size limit (Bytes)",
      "parseContent": "Parse content",
      "fileType": "File type",
      "dateFormat": "Date format",
      "defaultDate": "Default date",
      "events": "Events",
      "resources": "Resources",
      "defaultView": "Default view",
      "startTimeOnWeekAndDayView": "Start time on week and day view",
      "endTimeOnWeekAndDayView": "End time on week and day view",
      "showToolbar": "Show toolbar",
      "showViewSwitcher": "Show view switcher",
      "highlightToday": "Highlight today",
      "showPopoverWhenEventIsClicked": "Show popover when event is clicked",
      "cellSizeInViewsClassifiedByResource": "Cell size in views classified by resource",
      "headerDateFormatOnWeekView": "Header date format on week view",
      "showLineNumber": "Show line number",
      "mode": "Mode",
      "tabs": "Tabs",
      "defaultTab": "Default tab",
      "hideTabs": "Hide tabs",
      "highlightColor": "Highlight color",
      "tabWidth": "Tab width",
      "setCurrentTab": "Set current tab",
      "id": "Id",
      "timerType": "Timer type",
      "listData": "List data",
      "rowHeight": "Row height",
      "showBottomBorder": "Show bottom border",
      "tags": "Tags",
      "numberOfPages": "Number of pages",
      "defaultPageIndex": "Default page index",
      "progress": "Progress",
      "color": "Color",
      "strokeWidth": "Stroke width",
      "counterClockwise": "Counter clockwise",
      "circleRatio": "Circle ratio",
      "colour": "Color",
      "size": "Size",
      "primaryValueLabel": "Primary value label",
      "primaryValue": "Primary value",
      "hideSecondaryValue": "Hide secondary value",
      "secondaryValueLabel": "Secondary value label",
      "secondaryValue": "Secondary value",
      "secondarySignDisplay": "Secondary sign display",
      "primaryLabelColour": "Primary label color",
      "primaryTextColour": "Primary text color",
      "secondaryLabelColour": "Secondary label color",
      "secondaryTextColour": "Secondary text color",
      "min": "Min",
      "max": "Max",
      "value": "Value",
      "twoHandles": "Two handles",
      "lineColor": "Line color",
      "handleColor": "Handle color",
      "trackColor": "Track color",
      "timelineData": "Timeline data",
      "hideDate": "Hide date",
      "svgData": "Svg  data",
      "rawHtml": "Raw HTML",
      "values": "values",
      "labels": "Labels",
      "defaultSelected": "Default selected",
      "enableMultipleSelection": "Enable multiple selection",
      "selectedTextColour": "Selected text colour",
      "selectedBackgroundColor": "Selected background color",
      "fileUrl": "File URL",
      "scalePageToWidth": "Scale page to width",
      "showPageControls": "Show page controls",
      "steps": "Steps",
      "currentStep": "Current step",
      "stepsSelectable": "Steps selectable",
      "theme": "Theme",
      "columns": "Columns",
      "cardData": "Card data",
      "enableAddCard": "Enable add card",
      "width": "Width",
      "minWidth": "Min width",
      "accentColor": "Accent color",
      "defaultColor": "Default color",
      "setColor": "Set color",
      "structure": "Structure",
      "checkedValues": "Checked values",
      "expandedValues": "Expanded values"
    },
    "Table": {
      "displayName": "Table",
      "description": "Display paginated tabular data",
      "columnType": "Column type",
      "columnName": "Column name",
      "overflow": "Overflow",
      "key": "Key",
      "textColor": "Text color",
      "validation": "Validation",
      "regex": "Regex",
      "minLength": "Min length",
      "maxLength": "Max length",
      "customRule": "Custom rule",
      "values": "Values",
      "labels": "Labels",
      "cellBgColor": "Cell background color",
      "dateDisplayformat": "Date format",
      "dateParseformat": "Date",
      "showTime": "show time",
      "makeEditable": "make editable",
      "buttonText": "Button text",
      "buttonPosition": "Button position",
      "remove": "Remove",
      "addButton": "+ Add button",
      "addColumn": "Add column",
      "addNewColumn": "Add new column",
      "noActionMessage": "This table doesn't have any action buttons",
      "horizontalAlignment": "Horizontal alignment",
      "textAlignment": "Text alignment",
      "deciamalPlaces": "Decimal Places",
      "imageFit": "Image fit"
    },
    "Button": {
      "displayName": "Button",
      "description": "Trigger actions: queries, alerts, set variables etc."
    },
    "Chart": {
      "displayName": "Chart",
      "description": "Visualize data"
    },
    "Modal": {
      "displayName": "Modal",
      "description": "Show pop-up windows"
    },
    "TextInput": {
      "displayName": "Text Input",
      "description": "User text input field"
    },
    "NumberInput": {
      "displayName": "Number Input",
      "description": "Numeric input field"
    },
    "PasswordInput": {
      "displayName": "Password Input",
      "description": "Secure text input"
    },
    "Datepicker": {
      "displayName": "Date Picker",
      "description": "Choose date and time"
    },
    "Checkbox": {
      "displayName": "Checkbox",
      "description": "Single checkbox toggle"
    },
    "Radio-button": {
      "displayName": "Radio Button",
      "description": "Select one from multiple choices"
    },
    "ToggleSwitch": {
      "displayName": "Toggle Switch",
      "description": "User-controlled on-off switch"
    },
    "Textarea": {
      "displayName": "Textarea",
      "description": "Multi-line text input"
    },
    "DateRangePicker": {
      "displayName": "Range Picker",
      "description": "Choose date ranges"
    },
    "Text": {
      "displayName": "Text",
      "description": "Display text or HTML"
    },
    "Image": {
      "displayName": "Image",
      "description": "Show image files"
    },
    "Container": {
      "displayName": "Container",
      "description": "Group components"
    },
    "Dropdown": {
      "displayName": "Dropdown",
      "description": "Single item selector"
    },
    "Multiselect": {
      "displayName": "Multiselect",
      "description": "Multiple item selector"
    },
    "RichTextEditor": {
      "displayName": "Text Editor",
      "description": "Rich text editor"
    },
    "Map": {
      "displayName": "Map",
      "description": "Display map locations"
    },
    "QrScanner": {
      "displayName": "QR Scanner",
      "description": "Scan QR codes and hold its data"
    },
    "StarRating": {
      "displayName": "Rating",
      "description": "Star rating"
    },
    "Divider": {
      "displayName": "Divider",
      "description": "Separator between components"
    },
    "FilePicker": {
      "displayName": "File Picker",
      "description": "File Picker"
    },
    "Calendar": {
      "displayName": "Calendar",
      "description": "Display calendar events"
    },
    "Iframe": {
      "displayName": "Iframe",
      "description": "Embed external content"
    },
    "CodeEditor": {
      "displayName": "Code Editor",
      "description": "Edit source code"
    },
    "Tabs": {
      "displayName": "Tabs",
      "description": "Organize content in tabs"
    },
    "Timer": {
      "displayName": "Timer",
      "description": "Countdown or stopwatch"
    },
    "Listview": {
      "displayName": "List View",
      "description": "List multiple items"
    },
    "Tags": {
      "displayName": "Tags",
      "description": "Display tag labels"
    },
    "Pagination": {
      "displayName": "Pagination",
      "description": "Navigate pages"
    },
    "CircularProgressbar": {
      "displayName": "Circular Progressbar",
      "description": "Show circular progress"
    },
    "Spinner": {
      "displayName": "Spinner",
      "description": "Indicate loading state"
    },
    "Statistics": {
      "displayName": "Statistics",
      "description": "Show key metrics"
    },
    "RangeSlider": {
      "displayName": "Range Slider",
      "description": "Adjust value range"
    },
    "Timeline": {
      "displayName": "Timeline",
      "description": "Show event timeline"
    },
    "SvgImage": {
      "displayName": "Svg Image",
      "description": "Display SVG graphics"
    },
    "Html": {
      "displayName": "HTML Viewer",
      "description": "View HTML content"
    },
    "VerticalDivider": {
      "displayName": "Vertical Divider",
      "description": "Vertical line separator"
    },
    "CustomComponent": {
      "displayName": "Custom Component",
      "description": "Create React components"
    },
    "ButtonGroup": {
      "displayName": "Button Group",
      "description": "Group of buttons"
    },
    "PDF": {
      "displayName": "PDF",
      "description": "Embed PDF documents"
    },
    "Steps": {
      "displayName": "Steps",
      "description": "Step-by-step navigation aid"
    },
    "KanbanBoard": {
      "displayName": "Kanban Board",
      "description": "Task management board"
    },
    "ColorPicker": {
      "displayName": "Color Picker",
      "description": "Choose colors from a palette"
    },
    "TreeSelect": {
      "displayName": "Tree Select",
      "description": "Hierarchical item selector"
    }
  },
  "leftSidebar": {
    "Inspector": {
      "text": "Inspector",
      "tip": "Inspector"
    },
    "Sources": {
      "text": "Sources",
      "tip": "Add or edit datasources",
      "dataSources": "Data sources",
      "addDataSource": "+ add data source"
    },
    "Debugger": {
      "text": "Debugger",
      "tip": "Debugger",
      "errors": "Errors",
      "noErrors": "No errors found",
      "noLogs": "No logs found",
      "clear": "clear"
    },
    "Comments": {
      "text": "Comments",
      "tip": "Toggle comments",
      "commentBody": "There are no comments to display",
      "typeComment": "Type your comment here"
    },
    "Settings": {
      "text": "Triggers",
      "tip": "Global Settings",
      "hideHeader": "Hide header for launched apps",
      "maintenanceMode": "Maintenance mode",
      "maxWidthOfCanvas": "Max width of canvas",
      "maxHeightOfCanvas": "Max height of canvas",
      "backgroundColorOfCanvas": "Canvas background",
      "appMode": "App mode",
      "exportApp": "Export app"
    },
    "Back": {
      "text": "Back",
      "tip": "Back to Home"
    }
  }
}

export const metadataApi = {
  "instance_id": "afe615ed-cf87-4722-95fa-2d9f86cff5eb",
  "installed_version": "3.5.39-cloud-lts",
  "onboarded": true,
  "version_ignored": true
}

export const authoriseApi = {
  "current_organization_id": "4caee195-88d7-4d00-8d91-835782b7222c",
  "current_organization_slug": "peter-1741241642610",
  "current_organization_name": "Peter 1741241642610",
  "consultation_banner_date": "2025-03-06T06:14:02.759Z",
  "current_user": {
    "id": "af677eca-497c-4b9d-a383-a5af45450892",
    "email": "peterjaberau@gmail.com",
    "first_name": "Peter",
    "last_name": "Jaber",
    "avatar_id": null,
    "sso_user_info": {},
    "metadata": {},
    "created_at": "2025-03-06T06:14:02.759Z"
  },
  "id": "af677eca-497c-4b9d-a383-a5af45450892",
  "email": "peterjaberau@gmail.com",
  "first_name": "Peter",
  "last_name": "Jaber",
  "avatar_id": null,
  "created_at": "2025-03-06T06:14:02.759Z",
  "admin": true,
  "super_admin": false,
  "app_group_permissions": {
    "editable_apps_id": [
      "5f525a10-8938-42ed-8fa4-46be45c123d2",
      "65e05b6c-0b9e-4ec8-8eaa-7e725345ab51"
    ],
    "is_all_editable": true,
    "viewable_apps_id": [],
    "hidden_apps_id": []
  },
  "data_source_group_permissions": {
    "usable_data_sources_id": [],
    "configurable_data_source_id": [],
    "is_all_configurable": true
  },
  "sso_user_info": {},
  "metadata": {},
  "role": {
    "id": "3f346526-acba-48ce-8d63-212acde50fbf",
    "organization_id": "4caee195-88d7-4d00-8d91-835782b7222c",
    "name": "admin",
    "type": "default",
    "app_create": true,
    "app_delete": true,
    "folder_c_r_u_d": true,
    "org_constant_c_r_u_d": true,
    "data_source_create": true,
    "data_source_delete": true,
    "created_at": "2025-03-06T06:14:02.551Z",
    "updated_at": "2025-03-06T06:14:02.551Z",
    "group_users": [
      {
        "id": "57a07fcc-030f-4f65-aff5-ae78bc0517f3",
        "user_id": "af677eca-497c-4b9d-a383-a5af45450892",
        "group_id": "3f346526-acba-48ce-8d63-212acde50fbf",
        "created_at": "2025-03-06T06:14:02.551Z",
        "updated_at": "2025-03-06T06:14:02.551Z"
      }
    ]
  },
  "group_permissions": [
    {
      "id": "3f346526-acba-48ce-8d63-212acde50fbf",
      "organization_id": "4caee195-88d7-4d00-8d91-835782b7222c",
      "name": "admin",
      "type": "default",
      "app_create": true,
      "app_delete": true,
      "folder_c_r_u_d": true,
      "org_constant_c_r_u_d": true,
      "data_source_create": true,
      "data_source_delete": true,
      "created_at": "2025-03-06T06:14:02.551Z",
      "updated_at": "2025-03-06T06:14:02.551Z",
      "group_users": [
        {
          "id": "57a07fcc-030f-4f65-aff5-ae78bc0517f3",
          "user_id": "af677eca-497c-4b9d-a383-a5af45450892",
          "group_id": "3f346526-acba-48ce-8d63-212acde50fbf",
          "created_at": "2025-03-06T06:14:02.551Z",
          "updated_at": "2025-03-06T06:14:02.551Z"
        }
      ]
    }
  ],
  "user_permissions": {
    "is_super_admin": false,
    "is_admin": true,
    "app_create": true,
    "app_delete": true,
    "data_source_create": true,
    "data_source_delete": true,
    "folder_c_r_u_d": true,
    "org_constant_c_r_u_d": true,
    "org_variable_c_r_u_d": false,
    "app": {
      "editable_apps_id": [
        "5f525a10-8938-42ed-8fa4-46be45c123d2",
        "65e05b6c-0b9e-4ec8-8eaa-7e725345ab51"
      ],
      "is_all_editable": true,
      "viewable_apps_id": [],
      "hidden_apps_id": []
    },
    "global_data_source": {
      "usable_data_sources_id": [],
      "configurable_data_source_id": [],
      "is_all_configurable": true
    }
  }
}

export const decide = {
  "config": {
    "enable_collect_everything": true
  },
  "toolbarParams": {},
  "isAuthenticated": false,
  "supportedCompression": [
    "gzip",
    "gzip-js"
  ],
  "sessionRecording": {
    "endpoint": "/s/",
    "consoleLogRecordingEnabled": true,
    "recorderVersion": "v2",
    "sampleRate": null,
    "minimumDurationMilliseconds": null,
    "linkedFlag": null,
    "networkPayloadCapture": null,
    "masking": null,
    "urlTriggers": [],
    "urlBlocklist": [],
    "eventTriggers": [],
    "triggerMatchType": null,
    "scriptConfig": null
  },
  "captureDeadClicks": false,
  "capturePerformance": {
    "network_timing": true,
    "web_vitals": false,
    "web_vitals_allowed_metrics": null
  },
  "autocapture_opt_out": false,
  "autocaptureExceptions": false,
  "analytics": {
    "endpoint": "/i/v0/e/"
  },
  "elementsChainAsString": true,
  "surveys": false,
  "heatmaps": false,
  "flagsPersistenceDefault": false,
  "defaultIdentifiedOnly": true,
  "errorTracking": {
    "autocaptureExceptions": false,
    "suppressionRules": []
  },
  "siteApps": [],
  "requestId": "14dc1fb4-e817-4592-85f2-b6691fd2517b",
  "featureFlags": {},
  "errorsWhileComputingFlags": false,
  "featureFlagPayloads": {}
}

export const widget_info_v2 = {
  "responseTimeHolder": {
    "channelResponseTime": [],
    "channelResponseTimesFor7Days": [
      {
        "channelId": 433493,
        "responseTime": 82165
      }
    ],
    "channelCustomResponse": []
  },
  "userRules": [],
  "channelResponse": {
    "channels": [
      {
        "appId": 588001139693325,
        "channelId": 433493,
        "name": "Chat with us",
        "created": 1646310166316,
        "updated": 1646310166316,
        "welcomeMessage": {
          "messageId": 0,
          "messageType": 1,
          "messageUserId": 0,
          "conversationId": 0,
          "appId": 588001139693325,
          "createdMillis": 0,
          "updatedMillis": 0,
          "readByUser": false,
          "restrictResponse": false,
          "messageFragments": [
            {
              "fragmentType": 1,
              "contentType": "text/html",
              "content": "Hello there! Need help? Reach out to us right here, and we\u0027ll get back to you as soon as we can!",
              "position": 0
            }
          ],
          "source": 0,
          "ruleId": 0,
          "articleContentId": 0,
          "deliveredAt": 0,
          "cobrowsingId": 0,
          "labelId": 0,
          "labelCategoryId": 0,
          "shouldTranslate": 0,
          "read": false,
          "marketingId": 0,
          "messageUserType": 2,
          "marketingReplyId": -1,
          "isResponseForBot": false,
          "isQuickAction": false,
          "conversationChannelId": 0,
          "hideComposer": false,
          "isParallelConversation": false,
          "isParallelConversationEnabled": false,
          "isBotsInput": false,
          "isBotsPrivate": false,
          "isWidgetOpenEvent": false,
          "isNotPreviewMessage": false,
          "parentMessageId": 0,
          "isCollectPropertyMessage": false,
          "readAt": 0
        },
        "isDisabled": false,
        "position": 1,
        "type": "BOTH",
        "groupId": 0,
        "isDefaultChannel": true,
        "tags": [],
        "restricted": false,
        "channelAlias": "8ed2f87f-7107-4877-b55e-5b4378371e58",
        "source": "FRESHCHAT",
        "csatSurveySettings": {},
        "sendCsat": false,
        "channelContents": [
          {
            "channelContentId": 0,
            "channelId": 0,
            "localeId": 0,
            "deleted": false,
            "hidden": false,
            "appId": 0,
            "groupId": 0,
            "isCustomRespMsg": false
          }
        ],
        "operatingHoursId": 0,
        "serviceAccountId": 0,
        "channelMeta": {
          "canMigrateToPMP": false
        },
        "threadingInterval": -1,
        "isRevampEnabledChannel": false
      },
      {
        "appId": 588001139693325,
        "channelId": 433494,
        "name": "",
        "created": 1646310166337,
        "updated": 1646310166337,
        "welcomeMessage": {
          "messageId": 0,
          "messageType": 1,
          "messageUserId": 0,
          "conversationId": 0,
          "appId": 588001139693325,
          "createdMillis": 0,
          "updatedMillis": 0,
          "readByUser": false,
          "restrictResponse": false,
          "messageFragments": [
            {
              "fragmentType": 1,
              "contentType": "text/html",
              "content": "",
              "position": 0
            }
          ],
          "source": 0,
          "ruleId": 0,
          "articleContentId": 0,
          "deliveredAt": 0,
          "cobrowsingId": 0,
          "labelId": 0,
          "labelCategoryId": 0,
          "shouldTranslate": 0,
          "read": false,
          "marketingId": 0,
          "messageUserType": 2,
          "marketingReplyId": -1,
          "isResponseForBot": false,
          "isQuickAction": false,
          "conversationChannelId": 0,
          "hideComposer": false,
          "isParallelConversation": false,
          "isParallelConversationEnabled": false,
          "isBotsInput": false,
          "isBotsPrivate": false,
          "isWidgetOpenEvent": false,
          "isNotPreviewMessage": false,
          "parentMessageId": 0,
          "isCollectPropertyMessage": false,
          "readAt": 0
        },
        "isDisabled": false,
        "position": 2,
        "type": "BOTH",
        "groupId": 0,
        "isDefaultChannel": false,
        "tags": [
          "bot preview",
          "fc_bot_preview"
        ],
        "restricted": true,
        "channelAlias": "fb48ceae-e29a-4e26-b5dd-4fed9a9f2736",
        "source": "BOT_PREVIEW",
        "csatSurveySettings": {},
        "sendCsat": false,
        "channelContents": [
          {
            "channelContentId": 0,
            "channelId": 0,
            "localeId": 0,
            "deleted": false,
            "hidden": false,
            "appId": 0,
            "groupId": 0,
            "isCustomRespMsg": false
          }
        ],
        "operatingHoursId": 0,
        "serviceAccountId": 0,
        "channelMeta": {
          "canMigrateToPMP": false
        },
        "threadingInterval": -1,
        "isRevampEnabledChannel": false
      }
    ],
    "contentLocale": {
      "localeId": 999,
      "language": "999",
      "displayCode": "un_dfl",
      "displayName": "Unity Default Language",
      "direction": "ltr",
      "parentLocaleId": 0,
      "isVisible": true
    },
    "lastModifiedAt": 1646310166337
  },
  "operatingHoursResponse": {
    "operatingHours": [
      {
        "timezone": "UTC",
        "awayMessage": {
          "messageId": 0,
          "messageType": 5,
          "messageUserId": 0,
          "conversationId": 0,
          "appId": 588001139693325,
          "createdMillis": 0,
          "updatedMillis": 0,
          "readByUser": false,
          "restrictResponse": false,
          "messageFragments": [
            {
              "fragmentType": 1,
              "contentType": "text/html",
              "content": "We are away now",
              "position": 0
            }
          ],
          "source": 0,
          "ruleId": 0,
          "articleContentId": 0,
          "deliveredAt": 0,
          "cobrowsingId": 0,
          "labelId": 0,
          "labelCategoryId": 0,
          "shouldTranslate": 0,
          "read": false,
          "marketingId": 0,
          "messageUserType": 0,
          "marketingReplyId": -1,
          "isResponseForBot": false,
          "isQuickAction": false,
          "conversationChannelId": 0,
          "hideComposer": false,
          "isParallelConversation": false,
          "isParallelConversationEnabled": false,
          "isBotsInput": false,
          "isBotsPrivate": false,
          "isWidgetOpenEvent": false,
          "isNotPreviewMessage": false,
          "parentMessageId": 0,
          "isCollectPropertyMessage": false,
          "readAt": 0
        },
        "days": {
          "0": "36000;61200;",
          "1": "36000;61200;",
          "2": "36000;61200;",
          "3": "36000;61200;",
          "4": "36000;61200;",
          "5": "36000;61200;",
          "6": "36000;61200;"
        },
        "working": {
          "0": "true",
          "1": "true",
          "2": "true",
          "3": "true",
          "4": "true",
          "5": "true",
          "6": "true"
        },
        "enabled": false,
        "appId": 588001139693325,
        "operatingHoursId": 269893,
        "created": 1646310166596,
        "workingDaily": false,
        "serverTimeInMillis": 1749662387182,
        "name": "Default Business Hour",
        "defaultBhr": true,
        "isCalendarLinked": false,
        "operatingHoursType": "CUSTOM"
      }
    ]
  },
  "offlineExperienceResponse": {
    "appId": 588001139693325,
    "offlineExpEnabled": false,
    "awayMessage": {
      "messageId": 0,
      "messageType": 1,
      "messageUserId": 0,
      "conversationId": 0,
      "appId": 588001139693325,
      "createdMillis": 0,
      "updatedMillis": 0,
      "readByUser": false,
      "restrictResponse": false,
      "messageFragments": [
        {
          "fragmentType": 1,
          "contentType": "text/html",
          "content": "Hi! We are currently away. Please leave a message and our team will reach out to you at the earliest.",
          "position": 0
        }
      ],
      "source": 0,
      "ruleId": 0,
      "articleContentId": 0,
      "deliveredAt": 0,
      "cobrowsingId": 0,
      "labelId": 0,
      "labelCategoryId": 0,
      "shouldTranslate": 0,
      "read": false,
      "marketingId": 0,
      "messageUserType": 0,
      "marketingReplyId": -1,
      "isResponseForBot": false,
      "isQuickAction": false,
      "conversationChannelId": 0,
      "hideComposer": false,
      "isParallelConversation": false,
      "isParallelConversationEnabled": false,
      "isBotsInput": false,
      "isBotsPrivate": false,
      "isWidgetOpenEvent": false,
      "isNotPreviewMessage": false,
      "parentMessageId": 0,
      "isCollectPropertyMessage": false,
      "readAt": 0
    },
    "endMessage": {
      "messageId": 0,
      "messageType": 1,
      "messageUserId": 0,
      "conversationId": 0,
      "appId": 588001139693325,
      "createdMillis": 0,
      "updatedMillis": 0,
      "readByUser": false,
      "restrictResponse": false,
      "messageFragments": [
        {
          "fragmentType": 1,
          "contentType": "text/html",
          "content": "Thank you for reaching out.",
          "position": 0
        }
      ],
      "source": 0,
      "ruleId": 0,
      "articleContentId": 0,
      "deliveredAt": 0,
      "cobrowsingId": 0,
      "labelId": 0,
      "labelCategoryId": 0,
      "shouldTranslate": 0,
      "read": false,
      "marketingId": 0,
      "messageUserType": 0,
      "marketingReplyId": -1,
      "isResponseForBot": false,
      "isQuickAction": false,
      "conversationChannelId": 0,
      "hideComposer": false,
      "isParallelConversation": false,
      "isParallelConversationEnabled": false,
      "isBotsInput": false,
      "isBotsPrivate": false,
      "isWidgetOpenEvent": false,
      "isNotPreviewMessage": false,
      "parentMessageId": 0,
      "isCollectPropertyMessage": false,
      "readAt": 0
    },
    "localeId": 999,
    "channelIds": [
      433493
    ],
    "contactInfo": 0
  },
  "messageMaskConfigList": [],
  "requestsWhiteListedDomains": [],
  "categoryResponse": {
    "categories": [
      {
        "categoryId": 349408,
        "title": "Community support",
        "description": "We have a Slack community of 1,500+ members for discussing everything related to ToolJet.",
        "position": 2,
        "enabled": true,
        "platforms": [
          "android",
          "web",
          "ios"
        ],
        "deleted": false,
        "categoryAlias": "202a5be4-fc23-40fe-b293-51baf714680a",
        "appId": 588001139693325,
        "userId": 588001140338170,
        "lastUpdatedAt": 1682584179500,
        "hasEnabledArticles": false,
        "articleCount": 0,
        "tags": [],
        "isFDImported": false
      }
    ],
    "contentLocale": {
      "localeId": 999,
      "language": "999",
      "displayCode": "un_dfl",
      "displayName": "Unity Default Language",
      "direction": "ltr",
      "parentLocaleId": 0,
      "isVisible": true
    },
    "lastModifiedAt": 1682584192906
  },
  "isSales360App": false,
  "isBERuleEngineWorking": false,
  "isJourneyEnabledApp": false,
  "currentServerTime": 1749662387200,
  "widgetInfoTraceId": "ed15592f-1284-4be4-8308-9c3bc3eed246",
  "isD2cApp": false
}

export const data_queries = {
  "data_queries": [
    {
      "id": "f57846e3-8334-4143-be72-f1f917d4e5d4",
      "name": "generateColorCodes",
      "options": {
        "code": "function generateShadesOfColor(baseColor, alphaCode, numShades, type) {\n  const match = baseColor.match(/^#?([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i);\n  if (!match) {\n    throw new Error(\n      \"Invalid color format. Please use hexadecimal color notation.\"\n    );\n  }\n\n  const [, r, g, b] = match.map((hex) => parseInt(hex, 16));\n\n  const shades = [];\n  for (let i = 0; i < numShades; i++) {\n    let newR, newG, newB;\n\n    switch (type) {\n      case \"red\":\n        newR = Math.floor(r + (255 - r) * (i / numShades));\n        newG = g;\n        newB = b;\n        break;\n      case \"green\":\n        newR = r;\n        newG = Math.floor(g + (255 - g) * (i / numShades));\n        newB = b;\n        break;\n      case \"blue\":\n        newR = r;\n        newG = g;\n        newB = Math.floor(b + (255 - b) * (i / numShades));\n        break;\n      case \"white\":\n        newR = Math.floor(r + (255 - r) * (i / numShades));\n        newG = Math.floor(g + (255 - g) * (i / numShades));\n        newB = Math.floor(b + (255 - b) * (i / numShades));\n        break;\n      case \"black\":\n        newR = Math.floor(r * (1 - i / numShades));\n        newG = Math.floor(g * (1 - i / numShades));\n        newB = Math.floor(b * (1 - i / numShades));\n        break;\n      default:\n        throw new Error(\n          'Invalid type. Use \"red\", \"green\", \"blue\", \"white\", or \"black\".'\n        );\n    }\n\n    const shade = `#${newR.toString(16).padStart(2, \"0\")}${newG\n      .toString(16)\n      .padStart(2, \"0\")}${newB.toString(16).padStart(2, \"0\")}${alphaCode}`;\n    shades.push(shade);\n  }\n\n  return shades;\n}\n\nfunction segregateColorCodes(inputColor) {\n  baseColor = \"\";\n  alphaCode = \"\";\n  switch (inputColor.length) {\n    case 3:\n      baseColor = `#${inputColor[0]}${inputColor[0]}${inputColor[1]}${inputColor[1]}${inputColor[2]}${inputColor[2]}`;\n      break;\n    case 4:\n      baseColor = `#${inputColor[0]}${inputColor[0]}${inputColor[1]}${inputColor[1]}${inputColor[2]}${inputColor[2]}`;\n      alphaCode = `${inputColor[3]}${inputColor[3]}`;\n      break;\n    case 6:\n      baseColor = `#${inputColor}`;\n      break;\n    case 8:\n      baseColor = `#${inputColor.slice(0, 6)}`;\n      alphaCode = inputColor.slice(6);\n      break;\n    default:\n      throw new Error(\n        'Invalid type. Use \"red\", \"green\", \"blue\", \"white\", or \"black\".'\n      );\n  }\n\n  return { baseColor, alphaCode };\n}\n\nlet baseColor, alphaCode;\n({ baseColor, alphaCode } = segregateColorCodes(\n  components.textinput1.value.toLowerCase()\n));\nconst numShades = 10;\n\nconst shadesWhite = generateShadesOfColor(\n  baseColor,\n  alphaCode,\n  numShades,\n  \"white\"\n);\nconst shadesBlack = generateShadesOfColor(\n  baseColor,\n  alphaCode,\n  numShades,\n  \"black\"\n);\nconst shadesRed = generateShadesOfColor(baseColor, alphaCode, numShades, \"red\");\nconst shadesGreen = generateShadesOfColor(\n  baseColor,\n  alphaCode,\n  numShades,\n  \"green\"\n);\nconst shadesBlue = generateShadesOfColor(\n  baseColor,\n  alphaCode,\n  numShades,\n  \"blue\"\n);\n\nreturn [\n  [...shadesWhite, \"#ffffff\"],\n  [...shadesBlack, \"#000000\"],\n  [...shadesRed, \"#ff0000\"],\n  [...shadesGreen, \"#00ff00\"],\n  [...shadesBlue, \"#0000ff\"],\n];",
        "hasParamSupport": true,
        "parameters": [],
        "runOnPageLoad": true
      },
      "app_version_id": "485524f3-8a6b-4c48-bfb7-5f1229d6bdcf",
      "created_at": "2025-06-11T07:27:38.114Z",
      "updated_at": "2025-06-11T07:27:38.114Z",
      "plugins": [],
      "kind": "runjs"
    },
    {
      "id": "372f7932-4dd2-4847-abe8-cf40f2ddc1fb",
      "name": "setDefaultColors",
      "options": {
        "code": "actions.setVariable(\"backgroundColor\", \"fff\");\nactions.setVariable(\"textColor\", \"fff\");\nactions.setVariable(\"borderColor\", \"ffffff00\");",
        "hasParamSupport": true,
        "parameters": [],
        "runOnPageLoad": true
      },
      "app_version_id": "485524f3-8a6b-4c48-bfb7-5f1229d6bdcf",
      "created_at": "2025-06-11T07:27:38.114Z",
      "updated_at": "2025-06-11T07:27:38.114Z",
      "plugins": [],
      "kind": "runjs"
    }
  ]
}

export const appEnvironmentsApi = {
  "editorVersion": {
    "id": "485524f3-8a6b-4c48-bfb7-5f1229d6bdcf",
    "name": "v1",
    "appId": "65e05b6c-0b9e-4ec8-8eaa-7e725345ab51",
    "currentEnvironmentId": "38085a87-d031-4844-b36b-21007107d626"
  },
  "editorEnvironment": {
    "id": "38085a87-d031-4844-b36b-21007107d626",
    "organizationId": "4caee195-88d7-4d00-8d91-835782b7222c",
    "name": "development",
    "isDefault": false,
    "priority": 1,
    "enabled": true,
    "createdAt": "2025-03-06T06:14:02.614Z",
    "updatedAt": "2025-03-06T06:14:02.614Z",
    "appVersionsCount": 1
  },
  "appVersionEnvironment": {
    "id": "38085a87-d031-4844-b36b-21007107d626",
    "organizationId": "4caee195-88d7-4d00-8d91-835782b7222c",
    "name": "development",
    "isDefault": false,
    "priority": 1,
    "enabled": true,
    "createdAt": "2025-03-06T06:14:02.614Z",
    "updatedAt": "2025-03-06T06:14:02.614Z",
    "appVersionsCount": 1
  },
  "shouldRenderPromoteButton": false,
  "shouldRenderReleaseButton": true,
  "environments": [
    {
      "id": "38085a87-d031-4844-b36b-21007107d626",
      "organizationId": "4caee195-88d7-4d00-8d91-835782b7222c",
      "name": "development",
      "isDefault": false,
      "priority": 1,
      "enabled": true,
      "createdAt": "2025-03-06T06:14:02.614Z",
      "updatedAt": "2025-03-06T06:14:02.614Z",
      "appVersionsCount": 1
    },
    {
      "id": "b4810177-8db5-422f-a405-528df3e51740",
      "organizationId": "4caee195-88d7-4d00-8d91-835782b7222c",
      "name": "staging",
      "isDefault": false,
      "priority": 2,
      "enabled": false,
      "createdAt": "2025-03-06T06:14:02.615Z",
      "updatedAt": "2025-03-06T06:14:02.615Z",
      "appVersionsCount": 0
    },
    {
      "id": "3a394c81-2516-4152-84e8-550ba9589611",
      "organizationId": "4caee195-88d7-4d00-8d91-835782b7222c",
      "name": "production",
      "isDefault": true,
      "priority": 3,
      "enabled": false,
      "createdAt": "2025-03-06T06:14:02.615Z",
      "updatedAt": "2025-03-06T06:14:02.615Z",
      "appVersionsCount": 0
    }
  ]
}

export const datasources = {
  "data_sources": [
    {
      "id": "40f982b1-7d4d-4e5b-a45f-b132f67885e8",
      "name": "Sample data source",
      "kind": "postgresql",
      "type": "sample",
      "plugin_id": null,
      "app_version_id": null,
      "organization_id": "4caee195-88d7-4d00-8d91-835782b7222c",
      "scope": "global",
      "created_at": "2025-03-06T06:14:02.551Z",
      "updated_at": "2025-03-06T06:14:02.551Z",
      "plugin": null
    }
  ]
}
