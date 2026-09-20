"use client";

import StaggeredMenu, { StaggeredMenuItem, StaggeredMenuSocialItem } from "@/components/StaggeredMenu";

const menuItems: StaggeredMenuItem[] = [
  { label: "WORK", ariaLabel: "View selected work", link: "#work" },
  { label: "SHOWREEL", ariaLabel: "Watch showreel video", link: "#showreel" },
  { label: "ABOUT", ariaLabel: "Learn about me", link: "#about" },
  { label: "EXPERIENCE", ariaLabel: "View experience", link: "#experience" },
  { label: "SKILLS", ariaLabel: "View skills and tools", link: "#skills" },
  { label: "PROCESS", ariaLabel: "View creative process", link: "#process" },
  { label: "CONTACT", ariaLabel: "Get in touch", link: "#contact" },
];

const socialItems: StaggeredMenuSocialItem[] = [
  { label: "GitHub", link: "https://github.com" },
  { label: "LinkedIn", link: "https://linkedin.com" },
  { label: "Instagram", link: "https://instagram.com" },
  { label: "Email", link: "mailto:afreed@example.com" },
];

export default function Navbar() {
  return (
    <StaggeredMenu
      position="right"
      items={menuItems}
      socialItems={socialItems}
      displaySocials={true}
      displayItemNumbering={true}
      menuButtonColor="#ffffff"
      openMenuButtonColor="#E2F163"
      changeMenuColorOnOpen={true}
      colors={["#18181b", "#27272a", "#09090b"]}
      accentColor="#E2F163"
      isFixed={true}
      closeOnClickAway={true}
    />
  );
}