import { useLanguage } from "../context/LanguageContext";

const LanguageDropdown = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <select
      value={language}
      onChange={(e) => setLanguage(e.target.value)}
      className="bg-orange-500 text-white px-3 py-1 rounded-md border border-white"
    >
      <option value="en">English</option>
      <option value="hi">Hindi</option>
      <option value="mr">Marathi</option>
    </select>
  );
};

export default LanguageDropdown;

