// app/routes/random-image.ts
import type { LoaderFunctionArgs } from "@remix-run/cloudflare";

export async function loader({ context }: LoaderFunctionArgs) {
    const env = context.cloudflare.env as Env; // from worker-configuration.d.ts

    // List images in a prefix/folder inside your bucket
    const list = await env.R2.list({ limit: 1000 });

    const pool = (list.objects ?? []).filter(o =>
        /\.(png|jpe?g|webp|gif)$/i.test(o.key)
    );
    if (pool.length === 0) return new Response("No images found", { status: 404 });

    const choice = pool[Math.floor(Math.random() * pool.length)];
    const obj = await env.R2.get(choice.key);
    if (!obj) return new Response("Missing", { status: 404 });

    const headers = new Headers();
    const contentType =
        obj.httpMetadata?.contentType ||
        (/\.(png)$/i.test(choice.key) ? "image/png"
            : /\.(webp)$/i.test(choice.key) ? "image/webp"
                : "image/jpeg");
    headers.set("Content-Type", contentType);

    // Ensure you get a different image on each page load
    headers.set("Cache-Control", "no-store");

    return new Response(obj.body, { headers });
}