import type { MetaFunction } from "@remix-run/cloudflare";

export const meta: MetaFunction = () => ([
    { title: "About – Kyle Dean Reinford" },
    { name: "description", content: "About Kyle Dean Reinford – photographer based in Nashville." },
]);

export default function About() {
    return (
        <main className="about">
            <article>
                <h1>About</h1>

                {/* top-left back link inside the content column */}
                <p className="back-link">
                    <a href="/" aria-label="Back to home">← Home</a>
                </p>

                <img src="/about-image" alt="Polaroid of Kyle Dean Reinford" />

                <section>
                    <p>
                        I’m Kyle, a photographer based in Nashville. I shoot concerts,
                        portraits, and the in-between moments. For bookings or questions,
                        reach out any time.
                    </p>
                    <p>
                        Clients include: Rolling Stone, Spotify, SPIN, Live Nation and a variety of labels and bands
                        directly.
                    </p>

                    <ul className="contact-list">
                        <li>Email: <a href="mailto:kyledeanreinford@gmail.com">kyledeanreinford@gmail.com</a></li>
                        <li>Website: <a href="https://kyledeanreinford.com">kyledeanreinford.com</a></li>
                        <li>Substack: <a href="https://kdr5.substack.com">kdr5.substack.com</a></li>
                        <li>Instagram: <a href="https://instagram.com/kdrshoots">@kdrshoots</a></li>
                    </ul>
                </section>
            </article>
        </main>
    );
}