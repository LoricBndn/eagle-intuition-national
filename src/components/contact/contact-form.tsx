"use client";

import { useEffect } from "react";
import Title from "@/components/ui/title";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Phone,
  Mail,
  YoutubeIcon,
  TwitterIcon,
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
} from "lucide-react";

export default function ContactForm() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.google.com/recaptcha/api.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="w-full default-p-x default-p-y flex flex-col lg:flex-row">
      <form
        action="#"
        method="POST"
        className="w-full lg:w-1/2 bg-white border border-black rounded-t-2xl lg:rounded-bl-2xl lg:rounded-tl-2xl lg:rounded-tr-none p-6 md:p-8"
      >
        <Title className="mb-4" title="Contactar nos" />
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          {/* Nom */}
          <div>
            <label
              htmlFor="first-name"
              className="block text-sm font-semibold text-title"
            >
              Nome
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="first-name"
                id="first-name"
                autoComplete="given-name"
                className="block w-full rounded-md bg-white px-3.5 py-2 text-title outline outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-primary"
              />
            </div>
          </div>

          {/* Prénom */}
          <div>
            <label
              htmlFor="last-name"
              className="block text-sm font-semibold text-title"
            >
              Nome Próprio
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="last-name"
                id="last-name"
                autoComplete="family-name"
                className="block w-full rounded-md bg-white px-3.5 py-2 text-title outline outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-primary"
              />
            </div>
          </div>

          {/* Email */}
          <div className="sm:col-span-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-title"
            >
              Email
            </label>
            <div className="mt-2.5">
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="email"
                className="block w-full rounded-md bg-white px-3.5 py-2 text-title outline outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-primary"
              />
            </div>
          </div>

          {/* Téléphone */}
          <div className="sm:col-span-2">
            <label
              htmlFor="phone-number"
              className="block text-sm font-semibold text-title"
            >
              Telemóvel
            </label>
            <div className="mt-2.5">
              <div className="flex rounded-md bg-white outline outline-gray-300 focus-within:outline-2 focus-within:outline-primary">
                <input
                  type="text"
                  name="phone-number"
                  id="phone-number"
                  className="block w-full grow py-2 px-2 text-title placeholder:text-gray-400 focus:outline-none"
                  placeholder="123-456-7890"
                />
              </div>
            </div>
          </div>

          {/* Sujet */}
          <div className="sm:col-span-2">
            <label
              htmlFor="company"
              className="block text-sm font-semibold text-title"
            >
              Assunto
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="company"
                id="company"
                autoComplete="organization"
                className="block w-full rounded-md bg-white px-3.5 py-2 text-title outline outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-primary"
              />
            </div>
          </div>

          {/* Message */}
          <div className="sm:col-span-2">
            <label
              htmlFor="message"
              className="block text-sm font-semibold text-title"
            >
              Mensagem
            </label>
            <div className="mt-2.5">
              <textarea
                name="message"
                id="message"
                rows={4}
                className="block w-full rounded-md bg-white px-3.5 py-2 text-title outline outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-primary"
              ></textarea>
            </div>
          </div>
        </div>

        {/* reCAPTCHA */}
        <div className="mt-6">
          <div
            className="g-recaptcha"
            data-sitekey="6LfuriArAAAAAEFq0dgjsBOybO-EmDyhx4TsCAKN"
          ></div>
        </div>

        <div className="mt-4">
          <Button
            className="w-full"
            text="Enviar"
            link="/formação"
          />
        </div>
      </form>

      {/* Colonne droite avec carte et infos */}
      <div className="w-full lg:w-1/2 bg-primary border border-black rounded-b-2xl lg:rounded-br-2xl lg:rounded-tr-2xl lg:rounded-bl-none p-4 md:p-16 flex flex-col gap-8">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d779.913482003152!2d-9.040849230410878!3d38.56478654685237!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd1948c8aef68b91%3A0x15acc46aa7eb6953!2sEagle%20Intuition%20-%20Centro%20de%20Forma%C3%A7%C3%A3o!5e0!3m2!1sfr!2spt!4v1745331423547!5m2!1sfr!2spt"
          className="w-full h-70 md:h-96 border-0 rounded-md"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Maps - Eagle Intuition"
        ></iframe>

        <div className="flex flex-col gap-4 text-white">
          <div className="flex items-center gap-4">
            <MapPin size={34} />
            <a
              href="https://www.google.com/maps?q=Rua+Piteira+Santos,+Lote+30,+Loja+B,+2975-333+Quinta+do+Conde,+Portugal"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Rua Piteira Santos, Lote 30, Loja B 2975-333 Quinta do Conde,
              Portugal
            </a>
          </div>
          <div className="flex items-center gap-4">
            <Phone />
            <a href="tel:+351212104522" className="hover:underline">
              +351 212 104 522 (Chamada para a rede fixa nacional)
            </a>
          </div>
          <div className="flex items-center gap-4">
            <Phone />
            <a href="tel:+351968402713" className="hover:underline">
              +351 968 402 713 (Chamada para a rede móvel nacional)
            </a>
          </div>
          <div className="flex items-center gap-4">
            <Mail />
            <a href="mailto:info@ei.edu.pt" className="hover:underline">
              info@ei.edu.pt
            </a>
          </div>

          <div className="flex gap-4 mt-8">
            <a
              href="https://www.facebook.com/CF.Eagle.Intuition"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FacebookIcon className="text-white hover:text-gray-300" />
            </a>
            <a
              href="https://www.instagram.com/eagleintuition/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <InstagramIcon className="text-white hover:text-gray-300" />
            </a>
            <a
              href="https://www.youtube.com/channel/UCfNvmUI9Zi2EjDMDavZqA7A"
              target="_blank"
              rel="noopener noreferrer"
            >
              <YoutubeIcon className="text-white hover:text-gray-300" />
            </a>
            <a
              href="https://www.youtube.com/channel/UCP_zOP-MIa5U71xI06KGELA"
              target="_blank"
              rel="noopener noreferrer"
            >
              <YoutubeIcon className="text-white hover:text-gray-300" />
            </a>
            <a
              href="https://www.linkedin.com/in/eagleintuition/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedinIcon
                className="text-white hover:text-gray-300"
                strokeWidth={1.5}
              />
            </a>
            <a
              href="https://twitter.com/intuitioneagle"
              target="_blank"
              rel="noopener noreferrer"
            >
              <TwitterIcon className="text-white hover:text-gray-300" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
