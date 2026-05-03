"use client";
import React from "react";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { Home, User, Mail } from "lucide-react";
export default function FloatingNavDemo() {
  const navItems = [
    {
      name: "Home",
      link: "/",
      icon: <Home className="h-4 w-4 text-white" />,
    },
    {
      name: "About",
      link: "#about",
      icon: <User className="h-4 w-4 text-white" />,
    },
    {
      name: "Contact",
      link: "#contact",
      icon: (
        <Mail className="h-4 w-4 text-white" />
      ),
    },
  ];
  return (
    <div className="relative w-full translate-z-0">
      <FloatingNav navItems={navItems} />
      <DummyContent />
    </div>
  );
}
const DummyContent = () => {
  return (
    <div className="relative grid h-[100rem] w-full grid-cols-1 rounded-md border border-neutral-800 bg-black">
      <p className="mt-40 text-center text-4xl font-bold text-white">
        Scroll down to hide, scroll up to reveal
      </p>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-900/10 via-transparent to-transparent" />
    </div>
  );
};
