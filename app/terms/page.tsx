import React from "react";


export default function TermsPage() {
  return (
    <div style={styles.page}>
      

      <main style={styles.main}>
        <h1 style={styles.title}>Terms of Use</h1>
        <hr style={styles.titleUnderline} />

        <section style={styles.card}>
          <h2 style={styles.cardTitle}>1. Acceptance of Terms</h2>
          <p style={styles.cardBody}>
            [Lorem ipsum content about accepting terms of use]
          </p>
        </section>

        <section style={styles.card}>
          <h2 style={styles.cardTitle}>2. Sponsorship Agreement</h2>
          <p style={styles.cardBody}>
            [Content about sponsorship commitments and obligations]
          </p>
        </section>

        <section style={styles.card}>
          <h2 style={styles.cardTitle}>3. Payment Terms</h2>
          <p style={styles.cardBody}>
            [Content about payment obligations and refund policies]
          </p>
        </section>

        <section style={styles.card}>
          <h2 style={styles.cardTitle}>4. Communication Guidelines</h2>
          <p style={styles.cardBody}>
            [Content about appropriate communication with sponsored children]
          </p>
        </section>

        <section style={styles.card}>
          <h2 style={styles.cardTitle}>5. Termination</h2>
          <p style={styles.cardBody}>[Content about how to end sponsorship]</p>
        </section>
      </main>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#f9fafb",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 40px",
    borderBottom: "1px solid #e5e7eb",
    backgroundColor: "#ffffff",
  },
  logo: {
    fontWeight: 600,
    color: "#111827",
  },
  nav: {
    display: "flex",
    gap: "24px",
    fontSize: "0.95rem",
  },
  navLink: {
    textDecoration: "none",
    color: "#111827",
  },
  main: {
    maxWidth: "960px",
    margin: "40px auto",
    padding: "0 40px 40px",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "8px",
    color: "#111827",
  },
  titleUnderline: {
    border: "none",
    borderTop: "2px solid #111827",
    marginTop: "8px",
    marginBottom: "24px",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "6px",
    border: "1px solid #e5e7eb",
    padding: "16px 20px",
    marginBottom: "16px",
  },
  cardTitle: {
    margin: 0,
    fontSize: "1.1rem",
    marginBottom: "8px",
  },
  cardBody: {
    fontSize: "0.95rem",
    color: "#4b5563",
    lineHeight: 1.5,
  },
};
