import type { LoaderFunctionArgs } from "@remix-run/cloudflare";

export async function loader({ context }: LoaderFunctionArgs) {
    const env = context.cloudflare.env as Env;

    const list = await env.R2.list({ prefix: "hero", limit: 1000 });
    const pool = (list.objects ?? []).filter(o => /\.(png|jpe?g|webp|gif)$/i.test(o.key));
    if (!pool.length) return new Response("No images", { status: 404 });

    const choice = pool[Math.floor(Math.random() * pool.length)].key;

    return new Response(null, {
        status: 302,
        headers: { Location: `/images/${encodeURIComponent(choice)}` },
    });
}