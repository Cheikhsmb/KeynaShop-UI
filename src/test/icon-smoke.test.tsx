import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { IconContext, MapPinIcon } from "@phosphor-icons/react";
import { describe, it, expect, vi, beforeAll } from "vitest";
import FooterSection from "@/components/FooterSection";
import WhatsAppButton from "@/components/WhatsAppButton";
import AboutSection from "@/components/AboutSection";
import { LanguageProvider } from "@/i18n/LanguageContext";

// jsdom has no IntersectionObserver; framer-motion's whileInView needs one.
beforeAll(() => {
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      observe() {}
      unobserve() {}
      disconnect() {}
      takeRecords() {
        return [];
      }
    }
  );
});

const wrap = (ui: React.ReactNode) =>
  render(
    <IconContext.Provider value={{ weight: "light" }}>
      <LanguageProvider>
        <MemoryRouter>{ui}</MemoryRouter>
      </LanguageProvider>
    </IconContext.Provider>
  );

describe("icon migration smoke", () => {
  it("renders the real WhatsApp brand mark on the floating button", () => {
    const { container } = wrap(<WhatsAppButton />);
    const svg = container.querySelector("svg");
    expect(svg).not.toBeNull();
    // simple-icons renders a solid brand path, not a stroked outline.
    expect(svg?.querySelector("path")).not.toBeNull();
  });

  it("gives footer socials distinct accessible names and live hrefs", () => {
    wrap(<FooterSection />);
    const ig = screen.getByLabelText("Instagram");
    const wa = screen.getByLabelText("WhatsApp");
    expect(ig.getAttribute("href")).toContain("instagram.com");
    expect(wa.getAttribute("href")).toContain("wa.me");
    // The old markup pointed every social at "#".
    expect(ig.getAttribute("href")).not.toBe("#");
    expect(wa.getAttribute("href")).not.toBe("#");
  });

  it("applies the light weight from IconContext to Phosphor icons", () => {
    // Phosphor bakes each weight into distinct path geometry rather than a
    // stroke-width, so the check is that light != the regular default.
    const pathOf = (ui: React.ReactNode) => {
      const { container, unmount } = render(<>{ui}</>);
      const d = container.querySelector("svg path")?.getAttribute("d") ?? "";
      unmount();
      return d;
    };

    const regular = pathOf(<MapPinIcon />);
    const light = pathOf(
      <IconContext.Provider value={{ weight: "light" }}>
        <MapPinIcon />
      </IconContext.Provider>
    );

    expect(regular).not.toBe("");
    expect(light).not.toBe(regular);
  });

  it("renders every AboutSection feature icon", () => {
    const { container } = wrap(<AboutSection />);
    expect(container.querySelectorAll("svg").length).toBe(3);
  });
});
