"use client";

import { useState } from "react";

export const MojitoNavbar = () => {
  const [activeTab, setActiveTab] = useState("home");

  const tabs: { name: string; id: string; targetId: string }[] = [
    { name: "Home", id: "home", targetId: "hero" },
    { name: "About Us", id: "about", targetId: "about" },
    { name: "Services", id: "services", targetId: "cocktails" },
    { name: "Contact", id: "contact", targetId: "contact" },
  ];

  const handleTabClick = (tabId: string, targetId: string) => {
    setActiveTab(tabId);

    const section = document.getElementById(targetId);

    if (!section) return;

    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="noise-bg flex items-center justify-evenly">
      <div className="font-modern-negra px-4 py-2 text-2xl font-bold text-white">
        Velvet Pour
      </div>

      <div>
        <ul className="flex justify-center gap-10 text-white">
          {tabs.map((tab) => {
            const isActive = tab.id === activeTab;

            return (
              <li key={tab.id}>
                <button
                  type="button"
                  onClick={() => handleTabClick(tab.id, tab.targetId)}
                  className={`cursor-pointer transform transition duration-300 ${
                    isActive
                      ? "text-white underline underline-offset-8"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  {tab.name}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
