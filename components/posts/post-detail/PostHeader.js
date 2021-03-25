import styles from "./PostHeader.module.css";

function PostHeader(props) {
    const { title, image } = props;
    return (
        <header className={styles.header}>
            <h1>{title}</h1>
            <img src={image} alt={title} width="200" height="150" />
        </header>
    );
}

export default PostHeader;
