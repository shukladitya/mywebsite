"use client";
import Link from "@/components/Link";
import styles from "./styles.module.scss";
import { useRef, useState } from "react";

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [emailMessage, setEmailMessage] = useState("");
  const [showForm, setShowForm] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  async function sendEmail(name: string, email: string, message: string) {
    setLoading(true);
    try {
      const response = await fetch("/api", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (response.ok) {
        const data = await response.json();

        if (data.code === 200) {
          setEmailMessage("success");
        } else {
          setEmailMessage(data.error ?? data.message);
        }
        console.log(data.message);
      } else {
        const error = await response.json();
        setEmailMessage(error.error);
        console.error("Error:", error.error);
      }
      setLoading(false);
    } catch (error) {
      setEmailMessage("Error sending email");
      console.error("Error:", error);
      setLoading(false);
    }
  }

  const validateAndSendEmail = () => {
    if (
      nameRef.current?.value &&
      emailRef.current?.value &&
      messageRef.current?.value
    ) {
      if (
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          emailRef.current.value
        )
      ) {
        sendEmail(
          nameRef.current.value,
          emailRef.current.value,
          messageRef.current.value
        );
      } else {
        setEmailMessage("Please enter a valid email address");
        setTimeout(() => {
          setEmailMessage("");
        }, 3000);
      }
    } else {
      setEmailMessage("Please fill all the fields");
      setTimeout(() => {
        setEmailMessage("");
      }, 3000);
    }
  };

  const SubmitBtnComponent = () => {
    if (loading) return <LoadingAnimation />;
    if (emailMessage !== "") {
      if (emailMessage === "success")
        return (
          <div className={styles.successMessage}>
            Message sent
            <ThumbsUp />
          </div>
        );
      return <div className={styles.error}>{emailMessage}</div>;
    }
    return (
      <Link
        key={"submit"}
        text="Send&nbsp;&#x2192;"
        onClick={validateAndSendEmail}
      />
    );
  };

  return (
    <>
      <div className={styles.scaffold}>
        <div className={styles.contactBG}>
          <div
            className={styles.hoverable}
            onClick={() => setShowForm(true)}
            style={{ opacity: showForm ? 0 : 1 }}
          >
            Say <span className={styles.itallic}>Hello</span>
            <span className={styles.arrow}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25">
                <path
                  d="m17.5 5.999-.707.707 5.293 5.293H1v1h21.086l-5.294 5.295.707.707L24 12.499l-6.5-6.5z"
                  data-name="Right"
                />
              </svg>
            </span>
          </div>
        </div>
        <div
          className={styles.darkBg}
          style={{
            opacity: showForm ? 1 : 0,
            visibility: showForm ? "visible" : "hidden",
            transition: "all 0.5s ease",
          }}
        >
          <div className={styles.contactForm}>
            <h1>Mail to: hi@adity.me</h1>
            <input
              type="text"
              name="name"
              placeholder="Name"
              className={styles.input}
              ref={nameRef}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className={styles.input}
              ref={emailRef}
            />
            <textarea
              name="message"
              placeholder="Message"
              className={styles.input}
              ref={messageRef}
            />
          </div>
          <div className={styles.linkPanel}>
            {SubmitBtnComponent()}
            <Link
              key={"backBtn"}
              text="Back&nbsp;&#x2190;"
              onClick={() => setShowForm(false)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;

const ThumbsUp = () => {
  return (
    <>
      <svg
        id="Layer_1"
        version="1.1"
        viewBox="0 0 128 128"
        xmlSpace="preserve"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <g>
          <path d="M86.5,114.1c-0.5,2.9-3,4.9-5.9,4.9H34v8h46.6c6.8,0,12.6-4.9,13.8-11.5l6.4-36c0.7-4.1-0.4-8.3-3-11.4   c-2.7-3.2-6.6-5-10.7-5H71.2c1.2-3.7,2.8-9.1,4.1-16.2l0.6-4.2c0.9-6.6-3.7-12.6-10.2-13.5c-3.2-0.4-6.3,0.4-8.9,2.3   c-2.6,1.9-4.2,4.8-4.7,7.9l-0.6,4c-0.1,0.5-0.2,1-0.2,1.5c-0.1,0.5-0.2,1-0.3,1.5C47.9,61,36.3,72.8,21.3,76.6L16,77.9V127h8V84.1   c17.5-4.7,31.2-18.7,34.9-36c0.1-0.6,0.2-1.2,0.4-1.8c0.1-0.6,0.2-1.2,0.3-1.8l0.6-4c0.1-1.1,0.7-2,1.6-2.6c0.9-0.6,1.9-0.9,3-0.8   c2.2,0.3,3.7,2.3,3.4,4.5l-0.5,3.9c-2.1,11.6-5,18.3-5.5,19.6l-0.3,0.8l0,5.2h25.5c1.8,0,3.5,0.8,4.6,2.1c1.1,1.4,1.6,3.2,1.3,4.9   L86.5,114.1z" />
        </g>
      </svg>
    </>
  );
};

const LoadingAnimation = () => {
  return (
    <svg
      width="80"
      height="20"
      viewBox="0 0 120 30"
      xmlns="http://www.w3.org/2000/svg"
      fill="#ffffff"
    >
      <circle cx="15" cy="15" r="10">
        <animate
          attributeName="r"
          from="10"
          to="10"
          begin="0s"
          dur="0.8s"
          values="10;8;10"
          calcMode="linear"
          repeatCount="indefinite"
        />
        <animate
          attributeName="fill-opacity"
          from="1"
          to="1"
          begin="0s"
          dur="0.8s"
          values="1;.5;1"
          calcMode="linear"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="60" cy="15" r="8" fill-opacity="0.3">
        <animate
          attributeName="r"
          from="8"
          to="8"
          begin="0s"
          dur="0.8s"
          values="8;6;8"
          calcMode="linear"
          repeatCount="indefinite"
        />
        <animate
          attributeName="fill-opacity"
          from="0.5"
          to="0.5"
          begin="0s"
          dur="0.8s"
          values=".5;1;.5"
          calcMode="linear"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="105" cy="15" r="10">
        <animate
          attributeName="r"
          from="10"
          to="10"
          begin="0s"
          dur="0.8s"
          values="10;8;10"
          calcMode="linear"
          repeatCount="indefinite"
        />
        <animate
          attributeName="fill-opacity"
          from="1"
          to="1"
          begin="0s"
          dur="0.8s"
          values="1;.5;1"
          calcMode="linear"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
};
