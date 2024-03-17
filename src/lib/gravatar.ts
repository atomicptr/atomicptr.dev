import md5 from "md5";

export const gravatar = (email: string): string => `https://gravatar.com/avatar/${md5(email)}?s=200&d=retro`;
