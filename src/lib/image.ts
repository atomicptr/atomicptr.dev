import config from "$lib/config";

export const fixPromoImage = (url: string|null): string|null =>
    url !== null ? (url.startsWith("http") ? url : (url.indexOf("/") > -1 ? url : `${config.cdnPrefix}${url}`)) : null;
