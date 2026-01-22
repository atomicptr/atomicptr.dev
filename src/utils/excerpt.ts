import { stripHtmlCode } from "@igorskyflyer/strip-html";
import ellipsize from "ellipsize";

export async function createExcerpt(content: string) {
    const out = stripHtmlCode(content, {
        trimWhitespace: true,
    });

    return ellipsize(out, 200);
}
