import React from "react";

export default function PrivacyPolicyPage() {
  return (
    <div style={styles.page}>
      <main style={styles.main}>
        <h1 style={styles.title}>Privacy Policy</h1>
        <hr style={styles.titleUnderline} />

        <section style={styles.card}>
          <h2 style={styles.cardTitle}>Information Collection</h2>
          <p style={styles.cardBody}>
            [Lorem ipsum content about what information we collect and how we
            use it]
          </p>
        </section>

        <section style={styles.card}>
          <h2 style={styles.cardTitle}>Data Usage</h2>
          <p style={styles.cardBody}>
            [Content about how we use collected data]
          </p>
        </section>

        <section style={styles.card}>
          <h2 style={styles.cardTitle}>Data Security</h2>
          <p style={styles.cardBody}>[Content about security measures]</p>
        </section>

        <section style={styles.card}>
          <h2 style={styles.cardTitle}>Your Rights</h2>
          <p style={styles.cardBody}>
            [Content about user rights regarding their data]
          </p>
        </section>
        <section style={styles.card}>
          <h2 style={styles.cardTitle}>Contact Information</h2>
          <p style={styles.cardBody}>
            For privacy concerns, contact: privacy@childsponsor.org
          </p>
        </section>
        <hr style={styles.titleUnderline} />
      </main>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  page: {
    minHeight: "100vh",
    backgroundColor: "bg-default-50",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 40px",
    borderBottom: "1px solid border-default-200",
    backgroundColor: "bg-white",
  },
  logo: {
    fontWeight: 600,
    color: "text-default-900",
  },
  nav: {
    display: "flex",
    gap: "24px",
    fontSize: "0.95rem",
  },
  navLink: {
    textDecoration: "none",
    color: "text-default-900",
    cursor: "pointer",
  },
  main: {
    maxWidth: "960px",
    margin: "40px auto",
    padding: "0 40px",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "8px",
    color: "text-default-900",
  },
  titleUnderline: {
    border: "none",
    borderTop: "2px solid text-default-900",
    marginTop: "8px", // small space under the title
    marginBottom: "16px",
  },
  card: {
    backgroundColor: "bg-default-50",
    border: "1px solid border-default-200",
    borderRadius: "4px",
    padding: "20px",
    color: "text-default-900",
    marginBottom: "16px",
  },
  cardTitle: {
    margin: 0,
    fontSize: "1.1rem",
    marginBottom: "8px",
  },
  cardBody: {
    margin: 0,
    color: "text-default-600",
    fontSize: "0.95rem",
  },
};
