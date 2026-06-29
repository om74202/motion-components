import { useState } from "react";

export const MojitoNavbar = () => {

    const [activeTab,setActiveTab]=useState("home")
  const tabs: { name: string; id: string }[] = [
    { name: "Home", id: "home" },
    { name: "About Us", id: "about" },
    { name: "Services", id: "services" },
    { name: "Contact", id: "contact" },
  ];
  return (
    <div className="flex justify-evenly items-center noise-bg">
    <div className="font-modern-negra flex justify-center text-2xl text-white font-bold px-4 py-2">
        Velvet Pour 
    </div>

    <div>
        <ul className="flex justify-center gap-10 text-white">

            {tabs.map((tab) => {
                const isActive=tab.id===activeTab;

                console.log(isActive,tab)
                return (
                  <li key={tab.id}>
                    <button
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={`cursor-pointer transition transform duration-300 ${
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
  )
};
