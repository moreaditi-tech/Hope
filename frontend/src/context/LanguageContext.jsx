import { createContext, useContext, useState } from "react";

const LanguageContext = createContext();

export const translations = {
  en: {
    home: "Home",
    donate: "Donate",
    order: "Order",
    login: "Login",
    signup: "Sign Up",
    logout: "Logout",

    loginTitle: "Login",
    loginSubtitle: "Login to continue helping or receiving food.",
    email: "Email",
    password: "Password",

    createAccount: "Create Account",
    fullName: "Full Name",
    registerAs: "Register As",
    donor: "Donor",
    receiver: "Receiver",

    availableFood: "Available Food",
  },

  hi: {
    home: "होम",
    donate: "दान करें",
    order: "ऑर्डर",
    login: "लॉगिन",
    signup: "साइन अप",
    logout: "लॉगआउट",

    loginTitle: "लॉगिन",
    loginSubtitle: "भोजन देने या प्राप्त करने के लिए लॉगिन करें।",
    email: "ईमेल",
    password: "पासवर्ड",

    createAccount: "खाता बनाएं",
    fullName: "पूरा नाम",
    registerAs: "रजिस्टर करें",
    donor: "दाता",
    receiver: "प्राप्तकर्ता",

    availableFood: "उपलब्ध भोजन",
  },

  mr: {
    home: "मुख्यपृष्ठ",
    donate: "दान करा",
    order: "ऑर्डर",
    login: "लॉगिन",
    signup: "नोंदणी",
    logout: "लॉगआउट",

    loginTitle: "लॉगिन",
    loginSubtitle: "अन्न देण्यासाठी किंवा मिळवण्यासाठी लॉगिन करा.",
    email: "ईमेल",
    password: "पासवर्ड",

    createAccount: "खाते तयार करा",
    fullName: "पूर्ण नाव",
    registerAs: "नोंदणी प्रकार",
    donor: "दाता",
    receiver: "घेणारा",

    availableFood: "उपलब्ध अन्न",
  },
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
