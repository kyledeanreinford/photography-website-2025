import type { LoaderFunctionArgs } from "@remix-run/cloudflare";

export async function loader({ context, params, request }: LoaderFunctionArgs) {
    const env = context.cloudflare.env as Env;
    const cache = context.cloudflare.caches.default;

    const cacheKey = new Request(new URL(request.url).toString(), request);

    let res = await cache.match(cacheKey);
    if (res) return res;

    const key = params.key!;
    const obj = await env.R2.get(key);
    if (!obj) return new Response("Not found", { status: 404 });

    const ct =
        obj.httpMetadata?.contentType ||
        (/\.(png)$/i.test(key) ? "image/png"
            : /\.(jpe?g)$/i.test(key) ? "image/jpeg"
                : /\.(gif)$/i.test(key) ? "image/gif"
                    : "image/webp");

    res = new Response(obj.body, {
        headers: {
            "Content-Type": ct,
            "Cache-Control": "public, max-age=31536000, immutable",
            ...(obj.httpEtag ? { ETag: obj.httpEtag } : {}),
            ...(obj.uploaded ? { "Last-Modified": obj.uploaded.toUTCString() } : {}),
        },
    });

    await cache.put(cacheKey, res.clone());
    return res;
}