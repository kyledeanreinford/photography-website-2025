import { Link } from "@remix-run/react";

export default function Index() {
    return (
        <main className="index">
            <article>
                <img src="/random-image" alt="Random photograph from archive" />
                <p className="contact">
                    <Link to="/about" prefetch="intent">Kyle Dean Reinford</Link> ·{" "}
                    <a href="mailto:kyledeanreinford@gmail.com">email</a> ·{" "}
                    <a href="https://kdr5.substack.com">substack</a> ·{" "}
                    <a href="https://www.instagram.com/kdrshoots/">instagram</a>
                </p>
            </article>
        </main>
    );
}