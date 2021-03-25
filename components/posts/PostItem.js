import Link from "next/link";
// import path from "path";

import styles from "./PostItem.module.css";

function PostItem(props) {
    const { slug, image, title, date, excerpt } = props.post;
    const formattedDate = new Date(date).toLocaleDateString("en-US", {
        date: "numeric",
        month: "long",
        year: "numeric",
    });

    const imagePath = `/images/posts/${slug}/${image}`;
    const linkPath = `/posts/${slug}`;

    return (
        <li className={styles.post}>
            <Link href={linkPath}>
                <a>
                    <div className={styles.image}>
                        <img
                            src={imagePath}
                            alt={title}
                            width={300}
                            height={200}
                        />
                    </div>
                    <div className={styles.content}>
                        <h3>{title}</h3>
                        <time>{formattedDate}</time>
                        <p>{excerpt}</p>
                    </div>
                </a>
            </Link>
        </li>
    );
}

export default PostItem;
