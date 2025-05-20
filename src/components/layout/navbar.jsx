"use client";

import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/button";
import { useState } from "react";

export default function Navbar() {
  const navLinks = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "Formação",
      link: "/formação",
    },
    {
      title: "Erasmus +",
      link: "/erasmus",
    },
    {
      title: "Notícias",
      link: "/notícias",
    },
  ];

  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full h-20 default-p-x bg-white border-b border-[#E7DAED] flex justify-between items-center fixed z-90">
      {/* Logo */}
      <Link href={"/"}>
        <Image src="images/Logo.png" alt="Logo" width={191} height={38} priority />
      </Link>

      {/* Liens Grand Ecran */}
      <ul className="hidden lg:flex items-center gap-6">
        {navLinks.map((navLink) => (
          <li className="text-title" key={navLink.link}>
            <Link href={navLink.link}>{navLink.title}</Link>
          </li>
        ))}
      </ul>

      {/* Bouton Contact Grand Ecran */}
      <Button className="hidden lg:flex" text="Contactos" link="/contactos" />

      {/* Icone Menu déroulant */}
      <div
        className="lg:hidden cursor-pointer space-y-1.5"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <span className="block h-0.5 w-6 bg-primary"></span>
        <span className="block h-0.5 w-6 bg-primary"></span>
        <span className="block h-0.5 w-6 bg-primary"></span>
      </div>

      {/* Liens Petit écran (menu déroulant) */}
      <ul
        className={`${
          isOpen ? "flex" : "hidden"
        } flex-col default-p-x py-6 gap-6 w-full border-b border-[#E7DAED] bg-white transition-all duration-300 ease-in-out z-10 absolute top-20 left-0 right-0 bg-opacity-90`}
      >
        {navLinks.map((navLink) => (
          <li
            className="text-title border-b border-primary pb-2"
            key={navLink.link}
          >
            <Link href={navLink.link}>{navLink.title}</Link>
          </li>
        ))}
        <Button className="w-full" text="Contactos" link="/contactos" />
      </ul>
    </nav>
  );
}
