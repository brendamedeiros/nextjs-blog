// import Image from "next/image";
import styles from "./Hero.module.css";

function Hero() {
    return (
        <section className={styles.hero}>
            <div className={styles.image}>
                <img
                    src="/images/site/IMG_4125.JPG"
                    alt="Brenda herself"
                    width="300"
                    height="300"
                />
                {/* <Image
                    src="/images/site/IMG_4125.JPG"
                    alt="Brenda herself"
                    width={300}
                    height={300}
                /> */}
            </div>
            <h1>Hi, I'm Brenda</h1>
            <p>
                I blog about web development - especially frontend frameworks
                like Angular or React.
            </p>
        </section>
    );
}

export default Hero;
