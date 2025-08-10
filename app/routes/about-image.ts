import type { LoaderFunctionArgs } from "@remix-run/cloudflare";

export async function loader({ context }: LoaderFunctionArgs) {
    const env = context.cloudflare.env as Env;

    const key = "about/kyle-polaroid.jpg";

    const obj = await env.R2.get(key);
    if (!obj) return new Response("Not found", { status: 404 });

    const contentType =
        obj.httpMetadata?.contentType ||
        (/\.(png)$/i.test(key) ? "image/png"
            : /\.(jpe?g)$/i.test(key) ? "image/jpeg"
                : "application/octet-stream");

    return new Response(obj.body, {
        headers: {
            "Content-Type": contentType,
            "Cache-Control": "public, max-age=31536000, immutable",
            ...(obj.httpEtag ? { ETag: obj.httpEtag } : {}),
            ...(obj.uploaded ? { "Last-Modified": obj.uploaded.toUTCString() } : {}),
        },
    });
}