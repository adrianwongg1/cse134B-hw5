export function getProjectCardCSS() {
    return `
        .card {
            background: var(--section-background);
            padding: 1rem;
            margin: 1rem;
            border-radius: 1rem;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .card h2 {
            color: var(--white);
            text-align: center;
        }
        .card img {
            display: block;
            margin-left: auto;
            margin-right: auto;
            width: 50%;
        }
        .card p {
            color: var(--white);
            text-align: center;
        }
        .card ul {
            color: var(--white);
            margin: 1rem 0;
        }
        .card a {
            color: var(--lightblue);
            text-decoration: none;
            transition: color 0.3s ease;
        }
        .card a:hover {
            color: var(--blue);
        }
    `;
}