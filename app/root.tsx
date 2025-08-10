import {LinksFunction, MetaFunction} from "@remix-run/cloudflare";
import {
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from "@remix-run/react";
import resetHref from "./styles/reset.css?url";
import siteHref from "./styles/site.css?url";

export const meta: MetaFunction = () => {
    return [
        {title: "Kyle Dean Reinford Photography"},
        {
            name: "description",
            content: "Photography portfolio and contact information for Kyle Dean Reinford.",
        },
        {name: "viewport", content: "width=device-width, initial-scale=1"},
    ];
};

export const links: LinksFunction = () => ([
    {rel: "preconnect", href: "https://fonts.googleapis.com"},
    {rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous"},
    {rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"},
    {rel: "stylesheet", href: resetHref},
    {rel: "stylesheet", href: siteHref},
    {rel: "icon", type: "image/png", href: "/favicon.png"},
]);

export function Layout({children}: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <head>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <Meta/>
            <Links/>
        </head>
        <body>
        {children}
        <ScrollRestoration/>
        <Scripts/>
        </body>
        </html>
    );
}

export default function App() {
    return <Outlet/>;
}
