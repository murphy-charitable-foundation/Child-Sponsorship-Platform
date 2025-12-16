import type { Metadata } from "next";
import React from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sponsorship Platform",
  description: "Child sponsorship website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={bodyStyles}>
        <main style={mainStyles}>{children}</main>
        <footer style={footerStyles}>
          <span style={copyStyles}>
            © {new Date().getFullYear()} Child Sponsorship System
          </span>

          <div style={linksWrapperStyles}>
            <a href="/terms" style={linkStyles}>
              Terms of Use
            </a>
            <a href="/privacy" style={linkStyles}>
              Privacy Policy
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}

const bodyStyles: React.CSSProperties = {
  margin: 0,
  backgroundColor: "#f3f4f6",
  fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
};

const mainStyles: React.CSSProperties = {
  minHeight: "calc(100vh - 80px)", 
};

const footerStyles: React.CSSProperties = {
  borderTop: "1px solid #e5e7eb",
  padding: "12px 40px",
  fontSize: "0.9rem",
  color: "#6b7280",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const copyStyles: React.CSSProperties = {
  color: "#060606ff",
};

const linksWrapperStyles: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
};

const linkStyles: React.CSSProperties = {
  textDecoration: "none",
  color: "#060606ff",
  marginLeft: "16px", 
};
