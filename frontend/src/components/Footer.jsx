import { Instagram, Linkedin, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-orange-500 text-white py-8 mt-10">
      <div className="max-w-6xl mx-auto px-4 text-center space-y-4">
        {/* Brand Line */}
        <h2 className="text-xl font-semibold tracking-wide">
          © 2025 HOPE | Share Food, Spread Love
        </h2>

        {/* Contact Info */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-sm">
          <a
            href="mailto:morerajaditi@gmail.com"
            className="flex items-center gap-2 hover:underline"
          >
            <Mail size={18} /> morerajaditi@gmail.com
          </a>

          <a
            href="tel:7083873818"
            className="flex items-center gap-2 hover:underline"
          >
            <Phone size={18} /> 7083873818
          </a>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center gap-6 pt-2">
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 transition-transform"
          >
            <Instagram size={22} />
          </a>

          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 transition-transform"
          >
            <Linkedin size={22} />
          </a>
        </div>

        {/* Bottom Note */}
        <p className="text-xs opacity-90 pt-2">
            Built with care to reduce food waste and spread kindness
        </p>
      </div>
    </footer>
  );
};

export default Footer;

