import React from "react";

export default function PrivacyPolicyPage() {
  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div style={styles.logo}>[LOGO]</div>
        <nav style={styles.nav}>
          <a style={styles.navLink} href="#">
            Meet the Children ▼
          </a>
          <a style={styles.navLink} href="#">
            About the Program
          </a>
          <a style={styles.navLink} href="#">
            Contact
          </a>
          <a style={styles.navLink} href="#">
            Login / Register
          </a>
        </nav>
      </header>

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
    backgroundColor: "#f3f4f6",
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 40px",
    borderBottom: "1px solid #d1d5db",
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
    color: "#111827",
  },
  titleUnderline: {
    border: "none",
    borderTop: "2px solid #111827",
    marginTop: "8px",      // small space under the title
    marginBottom: "16px",
  },
  card: {
    backgroundColor: "#f9fafb",
    border: "1px solid #d1d5db",
    borderRadius: "4px",
    padding: "20px",
    color: "#111827",
    marginBottom: "16px",
  },
  cardTitle: {
    margin: 0,
    fontSize: "1.1rem",
    marginBottom: "8px",
  },
  cardBody: {
    margin: 0,
    color: "#4b5563",
    fontSize: "0.95rem",
  },
};
