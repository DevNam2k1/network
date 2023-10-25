import { Tabs } from 'antd'
import { SettingsSystem } from 'components/antd/system/settings/form';
import { EditPassword } from 'components/antd/system/settings/authen';

import { useTranslation } from "react-i18next";
import "../../../translations/i18n";

const Page = () => {
    const { t } = useTranslation();

    const items = [
        { label: t("basic_settings"), key: '1', children: <SettingsSystem />},
        { label: t("change_password"), key: '2', children: <EditPassword />}
    ]
    return (
        <Tabs type="card" defaultActiveKey='1' items={items} />
    )
}
export default Page
