// app/routes/_index.tsx (or wherever your page is)
export default function Index() {
    return (
        <main className="main">
            <div className="stack">
                <img src="/random-image" alt="Random photograph from archive" />
                <p className="contact">
                    Kyle Reinford ·{" "}
                    <a href="mailto:kyledeanreinford@gmail.com">email</a> ·{" "}
                    <a href="https://www.instagram.com/kdrshoots/">instagram</a>
                </p>
            </div>
        </main>
    );
}