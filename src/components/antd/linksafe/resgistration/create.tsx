import { Result } from "antd"
import React from "react"
import ubusApi from "service/api/ubus-api"
import { useTranslation } from "react-i18next"
import "../../../../translations/i18n"
import QRCode from "react-qr-code"

export const Linksafe = (props: any) => {
  const { t } = useTranslation()

  const [uuid, setuuid] = React.useState({ status: 0, uuid: "" })

  const loaduuid = async () => {
    const result = await ubusApi.linksafe_get_uuid()
    setuuid(result)
  }

  React.useEffect(() => {
    loaduuid()
  }, [])
  let title = t("device_id") + uuid.uuid

  if (uuid.status === 1) {
    return (
      <>
        <Result
          status="success"
          title={title}
          subTitle={t("has_registerd")}
        />
      </>
    )
  } else {
    return (
      <>
        <Result status="warning" title={title} subTitle={t("not_register")} 
         extra={[
          <div>
            <QRCode
              // size={256}
              style={{ height: "auto", maxWidth: "100%", width: "256px" }}
              value={uuid.uuid}
              viewBox={`0 0 256 256`}
            />
          </div>,
          <span>{t("Qr_note")}</span>
         ]}
         
        />
      </>
    )
  }
}
