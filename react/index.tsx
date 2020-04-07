import * as React from 'react'
import { useIntl } from 'react-intl'

import { PaymentModel } from 'gocommerce.admin-gateway'

const PaymentFormComponent = () => {
  const intlPrefix = 'admin/payment.vtexpayment'
  const { formatMessage } = useIntl()

  const optionsInstallments = new Array(12).fill(0).map(function (_, i) {
    const curr = i + 1
    return {
      "value": curr,
      "label": `${curr}x`
    }
  })

  const paymentSchema = {
    "title": "VTEX Payment",
    "properties": {
      "boxGeneral": {
        "title": formatMessage({ id: `${intlPrefix}.boxGeneral` }),
        "id": "general",
        "fields": {
          "rule.isDefault": {
            "type": "boolean",
            "widget": "hidden",
            "title": "isDefault"
          },
          "paymentAlias": {
            "type": "string",
            "widget": "hidden",
            "title": "paymentAlias"
          },
          "interestRate": {
            "type": "string",
            "widget": "hidden",
            "title": "interestRate"
          },
          "creditCardActive": {
            "type": "boolean",
            "widget": "toggle",
            "title": formatMessage({ id: `${intlPrefix}.creditCardActive` })
          },
          "bankInvoiceActive": {
            "type": "boolean",
            "widget": "toggle",
            "title": formatMessage({ id: `${intlPrefix}.bankInvoiceActive` })
          },
        },
      },
      "boxApplicationSetup": {
        "title": formatMessage({ id: `${intlPrefix}.boxApplicationSetup` }),
        "id": "applicationSetup",
        "fields": {
          "affiliation.configuration.appKey": {
            "type": "string",
            "widget": "text",
            "title": "appKey",
            "validate": {
              "required": true
            }
          },
          "affiliation.configuration.appToken": {
            "type": "string",
            "widget": "text",
            "title": "appToken",
            "validate": {
              "required": true
            }
          }
        }
      },
      "boxInstallments": {
        "title": formatMessage({ id: `${intlPrefix}.boxInstallments` }),
        "id": "installments",
        "fields": {
          "minimumInstallmentValue": {
            "type": "number",
            "widget": "currency",
            "title": formatMessage({ id: `${intlPrefix}.minimumInstallmentValue` })
          },
          "installments": {
            "fields": {
              "numberOfInstallments": {
                "type": "number",
                "widget": "select",
                "title": formatMessage({ id: `${intlPrefix}.installments.numberOfInstallments` }),
                "options": optionsInstallments,
                "validate": {
                  "required": true
                }
              },
              "numberOfInstallmentsInterestFree": {
                "type": "number",
                "widget": "select",
                "title": formatMessage({ id: `${intlPrefix}.installments.numberOfInstallmentsInterestFree` }),
                "options": optionsInstallments,
                "validate": {
                  "required": true
                },
                "description": formatMessage({ id: `${intlPrefix}.installments.numberOfInstallmentsInterestFree.description` })
              }
            }
          }
        }
      }
    },
    "additionalData": {
      "requireAuthorize": false,
      "description": formatMessage({ id: `${intlPrefix}.additionalData.description` })
    },
    "initialValues": {
      "paymentAlias": "vtexpayment",
      "creditCardActive": false,
      "numberOfInstallments": 12,
      "numberOfInstallmentsInterestFree": 1,
      "affiliation.configuration.maxInstallments": 12
    }
  }

  return (
    <PaymentModel payment_id="vtexpayment" paymentSchema={paymentSchema} />
  )
}

export default PaymentFormComponent
