export default {
  "title": "Browser kernel support for CSS",
  "remark": "Hey, data accuracy is not guaranteed",
  "type": "page",
  "body": {
    "type": "crud",
    "draggable": true,
    "syncLocation": false,
    "api": "https://3xsw4ap8wah59.cfc-execute.bj.baidubce.com/api/amis-mock/mock2/sample",
    "keepItemSelectionOnPageChange": true,
    "autoGenerateFilter": true,
    "bulkActions": [
      {
        "type": "button",
        "label": "Batch Delete",
        "actionType": "ajax",
        "api": "delete:https://3xsw4ap8wah59.cfc-execute.bj.baidubce.com/api/amis-mock/mock2/sample/${ids|raw}",
        "confirmText": "Confirm to delete in batches?"
      },
      {
        "type": "button",
        "label": "Batch modification",
        "actionType": "dialog",
        "dialog": {
          "title": "Batch editing",
          "name": "sample-bulk-edit",
          "body": {
            "type": "form",
            "api": "https://3xsw4ap8wah59.cfc-execute.bj.baidubce.com/api/amis-mock/mock2/sample/bulkUpdate2",
            "body": [
              {
                "type": "hidden",
                "name": "ids"
              },
              {
                "type": "input-text",
                "name": "engine",
                "label": "Engine"
              }
            ]
          }
        }
      }
    ],
    "quickSaveApi": "https://3xsw4ap8wah59.cfc-execute.bj.baidubce.com/api/amis-mock/mock2/sample/bulkUpdate",
    "quickSaveItemApi": "https://3xsw4ap8wah59.cfc-execute.bj.baidubce.com/api/amis-mock/mock2/sample/$id",
    "headerToolbar": [
      "bulkActions",
      {
        "type": "button",
        "label": "Reset test data",
        "actionType": "ajax",
        "size": "sm",
        "api": "https://3xsw4ap8wah59.cfc-execute.bj.baidubce.com/api/amis-mock/mock2/sample/reset"
      },
      "export-excel",
      {
        "type": "tpl",
        "tpl": "There are a total of ${count} rows of data.",
        "className": "v-middle"
      },
      {
        "type": "columns-toggler",
        "align": "right",
        "draggable": true
      },
      {
        "type": "drag-toggler",
        "align": "right"
      }
    ],
    "footerToolbar": [
      "statistics",
      "switch-per-page",
      "pagination"
    ],
    "columns": [
      {
        "name": "id",
        "label": "ID",
        "width": 20,
        "sortable": true,
        "type": "text",
        "searchable": {
          "type": "input-text",
          "name": "id",
          "label": "primary key",
          "placeholder": "Input id"
        }
      },
      {
        "name": "browser",
        "label": "Browser",
        "searchable": {
          "type": "select",
          "name": "browser",
          "label": "browser",
          "placeholder": "Select browser",
          "options": [
            {
              "label": "Internet Explorer",
              "value": "ie"
            },
            {
              "label": "AOL browser",
              "value": "aol"
            },
            {
              "label": "Firefox",
              "value": "firefox"
            }
          ]
        }
      },
      {
        "name": "platform",
        "label": "platform",
        "popOver": {
          "trigger": "hover",
          "body": {
            "type": "tpl",
            "tpl": "It is to demonstrate a function called popOver"
          }
        },
        "sortable": true,
        "type": "text"
      },
      {
        "name": "grade",
        "label": "CSS level",
        "type": "select",
        "options": [
          "A",
          "B",
          "C",
          "D",
          "X"
        ]
      },
      {
        "type": "operation",
        "label": "Operation",
        "width": 100,
        "buttons": [
          {
            "type": "button",
            "actionType": "ajax",
            "label": "Delete",
            "confirmText": "Do you confirm that you want to delete?",
            "api": "delete:https://3xsw4ap8wah59.cfc-execute.bj.baidubce.com/api/amis-mock/mock2/sample/$id"
          }
        ]
      }
    ]
  }
}
