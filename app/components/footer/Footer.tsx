"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#1C1B1A] text-white mt-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* Contact */}
          <div>
            <h3 className="font-display text-xl font-semibold mb-6">
              Contact
            </h3>
            <div className="space-y-4 text-gray-300 text-sm font-accent">
              <a href="tel:+237659099178" className="hover:text-[#E6C200] transition-colors duration-300">
                +237 6 59 09 91 78
              </a>
              <a href="mailto:contact@vitaresort.com" className="block hover:text-[#E6C200] transition-colors duration-300">
                contact@vitaresort.com
              </a>
              <a
                href="https://wa.me/237659099178"
                target="_blank"
                className="inline-flex items-center gap-2 hover:text-[#E6C200] transition-colors duration-300"
              >
                WhatsApp
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-display text-xl font-semibold mb-6">
              Navigation
            </h3>
            <ul className="space-y-4 text-sm text-gray-300 font-accent">
              <li><Link href="/suite">Suite</Link></li>
              <li><Link href="/gallery">Gallery</Link></li>
              <li><Link href="/contact">Reserve</Link></li>
              <li><Link href="/faq">FAQ</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-display text-xl font-semibold mb-6">
              Company
            </h3>
            <ul className="space-y-4 text-sm text-gray-300">
              <li><Link href="/about">About</Link></li>
              <li><Link href="/policies">Policies</Link></li>
            </ul>
          </div>

          {/* Address */}
          <div>
            <h3 className="font-display text-xl font-semibold mb-6">
              Address
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed font-accent">
              Rue 6.126<br />
              Golf Bastos<br />
              Yaoundé, Cameroon
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400 font-accent">
            © 2025 Vita Resort. All rights reserved.
          </p>
          <p className="font-display text-[#E6C200] italic mt-4 md:mt-0">
            Designed, then built.
          </p>
        </div>
      </div>
    </footer>
  );
}
