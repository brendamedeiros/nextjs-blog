import { useEffect, useState } from "react";

import styles from "./ContactForm.module.css";
import Notification from "../ui/Notification";

async function sendContactData(contactDetails) {
    const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(contactDetails),
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || "Something went wrong!");
    }
}

function ContactForm() {
    const [enteredEmail, setEnteredEmail] = useState("");
    const [enteredName, setEnteredName] = useState("");
    const [enteredMessage, setEnteredMessage] = useState("");
    const [requestStatus, setRequestStatus] = useState();
    const [requestError, setRequestError] = useState();

    useEffect(() => {
        if (requestStatus === "success" || requestStatus === "error") {
            const timer = setTimeout(() => {
                setRequestStatus(null);
                setRequestError(null);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [requestStatus]);

    async function submitFormHandler(e) {
        e.preventDefault();

        setRequestStatus("pending");

        try {
            await sendContactData({
                email: enteredEmail,
                name: enteredName,
                message: enteredMessage,
            });
            setRequestStatus("success");
            setEnteredMessage("");
            setEnteredEmail("");
            setEnteredName("");
        } catch (err) {
            setRequestError(err.message);
            setRequestStatus("error");
        }
    }

    let notification;

    // switch (requestStatus) {
    //     case "pending":
    //         notification = {
    //             status: "pending",
    //             title: "Sending message",
    //             message: "Your message is on its way",
    //         };
    //     case "success":
    //         notification = {
    //             status: "success",
    //             title: "Success",
    //             message: "Message sent successfully",
    //         };
    //     case "error":
    //         notification = {
    //             status: "error",
    //             title: "Error",
    //             message: requestError,
    //         };
    // }

    if (requestStatus === "pending") {
        notification = {
            status: "pending",
            title: "Sending message...",
            message: "Your message is on its way!",
        };
    }

    if (requestStatus === "success") {
        notification = {
            status: "success",
            title: "Success!",
            message: "Message sent successfully!",
        };
    }

    if (requestStatus === "error") {
        notification = {
            status: "error",
            title: "Error!",
            message: requestError,
        };
    }

    return (
        <section className={styles.contact} onSubmit={submitFormHandler}>
            <h1>How can i help you?</h1>
            <form className={styles.form}>
                <div className={styles.controls}>
                    <div className={styles.control}>
                        <label htmlFor="email">Your E-mail</label>
                        <input
                            type="email"
                            id="email"
                            value={enteredEmail}
                            onChange={(e) => setEnteredEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.control}>
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={enteredName}
                            onChange={(e) => setEnteredName(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className={styles.control}>
                    <label htmlFor="message">Your Message</label>
                    <textarea
                        id="message"
                        rows="5"
                        value={enteredMessage}
                        onChange={(e) => setEnteredMessage(e.target.value)}
                    ></textarea>
                </div>
                <div className={styles.actions}>
                    <button>Send Message</button>
                </div>
            </form>
            {notification && (
                <Notification
                    status={notification.status}
                    title={notification.title}
                    message={notification.message}
                />
            )}
        </section>
    );
}

export default ContactForm;
