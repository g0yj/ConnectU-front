/**
 * 새창을 열기 위한 유틸리티
 */

const WINDOW_FEATURE = {
  SMALL: { width: 500, height: 300},
  COMMON: { width: 635, height: 700 },
  LARGE: { width: 800, height: 800 },
};

const WINDOWS = {
  SEND_PREVIEW: { id: "SendPreview", url: "/admin/send-preview", options: WINDOW_FEATURE.REGISTER_RESV },
  SEND_EMAIL: { id: "SendEmail", url: "/admin/send-email", options: WINDOW_FEATURE.COMMON },
  SEND_SMS: { id: "SendSms", content: "content", url: "/admin/send-sms", options: WINDOW_FEATURE.COMMON },

};

let openWindows = {};

const openWindow = (windowData) => {
  let windowFeature = `location=no,menubar=no,toolbar=no,resizable=no,scrollbars=no,status=no`;
  windowFeature += `,width=${windowData.options.width}`;
  windowFeature += `,height=${windowData.options.height}`;
  windowFeature += `,left=${(window.innerWidth - windowData.options.width) / 2}`;
  windowFeature += `,top=${(window.innerHeight - windowData.options.height) / 2}`;

  const newWindow = window.open(windowData.url, windowData.id, windowFeature);
  openWindows[windowData.id] = newWindow;
};

const closeWindow = (id) => {
  const windowToClose = openWindows[id];
  if (windowToClose) {
    windowToClose.close();
    delete openWindows[id];
  }
}

export { WINDOWS, openWindow, closeWindow };
