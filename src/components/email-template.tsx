export default function EmailTemplate({
  name,
  productKey,
}: {
  name: string | null | undefined;
  productKey: string | undefined;
}) {
  return (
    <div style={email}>
      <img
        src="https://res.cloudinary.com/dikuvcyrf/image/upload/v1727874918/Rocket_Gradient_xrhk8d.svg"
        alt="Roket Logo"
        style={image}
      />
      <h1 style={greeting}>Hey {name?.split(" ")[0]},</h1>
      <h2 style={message}>
        Thank you for your purchase! We&apos;re super excited that you&apos;ve
        decided to make landing your dream job a priority. Please be sure to
        join our Discord community to suggest new features and be the first to
        get our latest updates. You&apos;ll also find other useful resources
        there.
      </h2>
      <a style={link} href="https://discord.gg/qQcfbkbDJF">
        Join Discord
      </a>
      <h1 style={keyLabel}>Your Product Key</h1>
      <h1 style={key}>{productKey}</h1>
      <h1 style={footer}>All rights reserved © 2024 Roket.Work</h1>
    </div>
  );
}

const email = {
  backgroundColor: "#ffffff",
  width: "100%",
  color: "#000",
  padding: "16px",
};

const image = {
  width: "50px",
  margin: "24px 50%",
  transform: "translateX(-50%)",
};

const greeting = {
  fontSize: "24px",
  fontWeight: "bold",
  margin: "24px 0px 0px 0px",
};

const message = {
  fontSize: "16px",
  margin: "16px 0px 32px 0px",
  fontWeight: "300",
};

const link = {
  fontSize: "16px",
  color: "#000",
  textDecoration: "underline",
  fontWeight: "300",
};

const keyLabel = {
  fontSize: "20px",
  margin: "32px 0px 0px 0px",
};

const key = {
  fontSize: "24px",
  fontWeight: "bold",
};

const footer = {
  fontSize: "12px",
  color: "#505050",
  margin: "60px 0px 0px 0px",
  fontWeight: "300",
};
