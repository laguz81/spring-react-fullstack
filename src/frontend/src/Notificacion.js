import {notification} from "antd";

const openNotificationWithIcon = (type, message, description, placement) => {
    placement = placement || 'topRight';
    notification[type]({
        message: message,
        description: description
    });
};

export const successNotificacion = (message, description, placement) =>
    openNotificationWithIcon('success', message, description, placement);

export const infoNotificacion = (message, description, placement) =>
    openNotificationWithIcon('info', message, description, placement);

export const warningNotificacion = (message, description, placement) =>
    openNotificationWithIcon('warning', message, description, placement);

export const errorNotificacion = (message, description, placement) =>
    openNotificationWithIcon('error', message, description, placement);
