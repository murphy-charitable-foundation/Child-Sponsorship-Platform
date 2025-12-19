"use client";
import { Button, HeroUIProvider } from "@heroui/react";
import NextLink from "next/link";
import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <HeroUIProvider>
      <div style={styles.page}>
        {/* HEADER */}
        <header style={styles.header}>
          <div style={styles.logo}>[LOGO]</div>
          <nav style={styles.nav}>
            <Link href="/" style={styles.navLink}>
              Home
            </Link>
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
        <main>
          <section style={styles.hero}>
            <h1 style={styles.heroTitle}>
              Change a Child&apos;s Story, Sponsor from as Little as $25 a Month
            </h1>
            <Button
              as={NextLink}
              href="#"
              className="bg-black text-white hover:bg-black/80"
              style={styles.heroButton}
            >
              Sponsor a Child
            </Button>
          </section>

          <section style={styles.storySection}>
            <h2 style={styles.sectionTitle}>Our Story</h2>
            <hr style={styles.sectionUnderline} />
            <div style={styles.videoPlaceholder}>
              <Image
                src="/children/group1.jpg"
                alt="Child profile"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          </section>

          <section style={styles.childrenSection}>
            <h2 style={styles.sectionTitle}>Meet the Children</h2>
            <hr style={styles.sectionUnderline} />

            <div style={styles.childrenGrid}>
              <div style={styles.childCard}>
                <div style={styles.childPhoto}>
                  <Image
                    src="/children/girl2.jpg"
                    alt="Child profile"
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div style={styles.childBody}>
                  <div style={styles.childName}>Maria</div>
                  <div style={styles.childMeta}>Age: 8</div>
                  <div style={styles.childMeta}>Guatemala</div>
                  <button style={styles.childButton}>Sponsor Me</button>
                </div>
              </div>

              <div style={styles.childCard}>
                <div style={styles.childPhoto}>
                  <Image
                    src="/children/boy1.png"
                    alt="Child profile"
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div style={styles.childBody}>
                  <div style={styles.childName}>Carlos</div>
                  <div style={styles.childMeta}>Age: 7</div>
                  <div style={styles.childMeta}>Guatemala</div>
                  <button style={styles.childButton}>Sponsor Me</button>
                </div>
              </div>

              <div style={styles.childCard}>
                <div style={styles.childPhoto}>
                  <Image
                    src="/children/girl1.jpg"
                    alt="Child profile"
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div style={styles.childBody}>
                  <div style={styles.childName}>Sofia</div>
                  <div style={styles.childMeta}>Age: 9</div>
                  <div style={styles.childMeta}>Guatemala</div>
                  <button style={styles.childButton}>Sponsor Me</button>
                </div>
              </div>

              <div style={styles.childCard}>
                <div style={styles.childPhoto}>
                  <Image
                    src="/children/boy2.jpg"
                    alt="Child profile"
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div style={styles.childBody}>
                  <div style={styles.childName}>Juan</div>
                  <div style={styles.childMeta}>Age: 6</div>
                  <div style={styles.childMeta}>Guatemala</div>
                  <button style={styles.childButton}>Sponsor Me</button>
                </div>
              </div>
            </div>

            <button style={styles.viewAllButton}>View All Children</button>
          </section>

          <section style={styles.howItWorksSection}>
            <h2 style={styles.sectionTitle}>How It Works</h2>
            <hr style={styles.sectionUnderline} />

            <div style={styles.stepsGrid}>
              <div style={styles.stepCard}>
                <div style={styles.stepNumber}>1</div>
                <div style={styles.stepTitle}>Choose a Child</div>
                <div style={styles.stepText}>
                  Browse profiles and select a child to sponsor.
                </div>
              </div>

              <div style={styles.stepCard}>
                <div style={styles.stepNumber}>2</div>
                <div style={styles.stepTitle}>Start Sponsorship</div>
                <div style={styles.stepText}>
                  Complete your sponsorship setup and payment.
                </div>
              </div>

              <div style={styles.stepCard}>
                <div style={styles.stepNumber}>3</div>
                <div style={styles.stepTitle}>Connect &amp; Communicate</div>
                <div style={styles.stepText}>
                  Exchange letters and updates with your child.
                </div>
              </div>

              <div style={styles.stepCard}>
                <div style={styles.stepNumber}>4</div>
                <div style={styles.stepTitle}>Track Progress</div>
                <div style={styles.stepText}>
                  See the impact of your support over time.
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </HeroUIProvider>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#f9fafb",
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

  hero: {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  padding: "40px 40px 20px",
  gap: "20px", 
},


  heroTitle: {
    fontSize: "2.8rem",
    marginBottom: "20px",
    color: "#111827",
    maxWidth: "900px",
  },

  heroButton: {
    fontSize: "1.05rem",
    padding: "14px 28px",
    borderRadius: "999px",
  },

  storySection: {
    maxWidth: "1100px",
    margin: "20px auto 80px",
    padding: "0 40px",
    textAlign: "center",
  },

  sectionTitle: {
    fontSize: "2rem",
    fontWeight: 600,
    marginBottom: "8px",
    color: "#111827",
  },

  sectionUnderline: {
    border: "none",
    borderTop: "2px solid #111827",
    margin: "0 auto 24px",
  },

  videoPlaceholder: {
    height: "320px",
    backgroundColor: "#d1d5db",
    border: "2px solid #111827",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 500,
    position: "relative", // 👈 needed for fill
    overflow: "hidden",
  },

  // ---------- MEET THE CHILDREN ----------
  childrenSection: {
    maxWidth: "1100px",
    margin: "40px auto 60px",
    padding: "0 40px",
  },

  childrenGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    gap: "24px",
    marginTop: "24px",
  },

  childCard: {
    backgroundColor: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "4px",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  },

  childPhoto: {
    backgroundColor: "#d1d5db",
    height: "230px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.9rem",

    position: "relative", // 👈 required for Image with `fill`
    overflow: "hidden",
  },

  childBody: {
    padding: "12px 16px 16px",
  },

  childName: {
    fontWeight: 600,
    marginBottom: "4px",
  },

  childMeta: {
    fontSize: "0.9rem",
    color: "#4b5563",
  },

  childButton: {
    marginTop: "12px",
    width: "100%",
    padding: "10px 0",
    backgroundColor: "#111827",
    color: "#ffffff",
    border: "none",
    borderRadius: "2px",
    fontSize: "0.95rem",
    cursor: "pointer",
  },

  viewAllButton: {
    marginTop: "28px",
    padding: "10px 24px",
    border: "1px solid #111827",
    backgroundColor: "#ffffff",
    cursor: "pointer",
    borderRadius: "4px",
    fontSize: "0.95rem",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  },

  // ---------- HOW IT WORKS ----------
  howItWorksSection: {
    backgroundColor: "#f9fafb",
    borderTop: "1px solid #d1d5db",
    borderBottom: "1px solid #d1d5db",
    padding: "40px 40px 60px",
  },

  stepsGrid: {
    maxWidth: "1100px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    gap: "32px",
    marginTop: "32px",
  },

  stepCard: {
    textAlign: "center",
  },

  stepNumber: {
    width: "80px",
    height: "80px",
    border: "2px solid #111827",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "2rem",
    margin: "0 auto 16px",
  },

  stepTitle: {
    fontWeight: 600,
    marginBottom: "8px",
  },

  stepText: {
    fontSize: "0.95rem",
    color: "#4b5563",
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
    marginTop: "8px",
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
