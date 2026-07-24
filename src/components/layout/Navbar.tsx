"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import {
  Home,
  Briefcase,
  LayoutGrid,
  MessageSquare,
  FileText,
  HelpCircle,
  Menu,
  type LucideIcon,
} from "lucide-react";
import { NAV_ITEMS } from "@/lib/constants";

const NAV_ICONS: LucideIcon[] = [
  Home,
  Briefcase,
  LayoutGrid,
  MessageSquare,
  FileText,
  HelpCircle,
];

export function Navbar() {
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const sectionIds = ["hero", ...NAV_ITEMS.map((item) => item.targetId)];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const navbar = document.querySelector<HTMLElement>("nav.navbar");
    if (!navbar) return;

    const onScroll = () => {
      navbar.classList.toggle("scrolled", window.scrollY > 50);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSection = useCallback(
    (targetId: string) => {
      const target = document.getElementById(targetId);
      if (!target) return;

      const offset = window.innerWidth >= 1024 ? 72 : 64;
      const top =
        target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: "smooth" });
      setActiveSection(targetId);
      setMobileMenuOpen(false);
    },
    []
  );

  return (
    <>
      {/* Mobile Header */}
      <header className="jtp-mobile-header" aria-label="Navegação mobile">
        <button
          className="jtp-mobile-brand"
          onClick={() => scrollToSection("hero")}
          type="button"
        >
          <Image
            src="/img/logo-navbar.png"
            alt="JTP Services"
            width={36}
            height={36}
            className="jtp-brand-logo"
          />
          <span className="jtp-brand-text">JTP Services</span>
        </button>

        <button
          className="jtp-mobile-menu-trigger"
          aria-label="Abrir menu"
          type="button"
          onClick={() => setMobileMenuOpen(true)}
        >
          <Menu className="jtp-menu-icon" />
        </button>
      </header>

      {/* Mobile Overlay / Drawer */}
      <div
        className={`jtp-mobile-overlay${mobileMenuOpen ? " open" : ""}`}
        onClick={() => setMobileMenuOpen(false)}
        role="presentation"
      >
        <aside
          className="jtp-mobile-drawer"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="jtp-mobile-close"
            type="button"
            aria-label="Fechar menu"
            onClick={() => setMobileMenuOpen(false)}
          >
            X
          </button>

          <nav
            className="jtp-mobile-links"
            aria-label="Navegação do menu mobile"
          >
            {NAV_ITEMS.map((item, index) => {
              const Icon = NAV_ICONS[index] ?? HelpCircle;
              const isActive = activeSection === item.targetId;

              return (
                <button
                  key={`mobile-${item.targetId}`}
                  type="button"
                  className={`jtp-mobile-link${isActive ? " is-active" : ""}`}
                  onClick={() => scrollToSection(item.targetId)}
                >
                  <Icon className="jtp-nav-icon" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </aside>
      </div>

      {/* Desktop Navbar */}
      <nav className="navbar jtp-desktop-header" aria-label="Navegação principal">
        <div className="jtp-desktop-inner">
          <button
            className="jtp-desktop-brand"
            onClick={() => scrollToSection("hero")}
            type="button"
          >
            <Image
              src="/img/logo-navbar.png"
              alt="JTP Services"
              width={36}
              height={36}
              className="jtp-brand-logo"
            />
            <span className="jtp-brand-text">JTP Services</span>
          </button>

          <div className="jtp-desktop-links">
            {NAV_ITEMS.map((item, index) => {
              const Icon = NAV_ICONS[index] ?? HelpCircle;
              const isActive = activeSection === item.targetId;

              return (
                <button
                  key={item.targetId}
                  type="button"
                  onClick={() => scrollToSection(item.targetId)}
                  className={`jtp-desktop-link${isActive ? " is-active" : ""}`}
                  aria-label={item.label}
                  title={item.label}
                >
                  <Icon className="jtp-nav-icon" />
                </button>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
}
