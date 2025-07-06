import React, { useState } from "react";

const TermsOfService = () => {
  const [language, setLanguage] = useState("en");

  const content = {
    en: {
      title: "Terms of Service",
      effectiveDate: "Effective Date: July 1, 2025",
      contents: "Contents",
      sections: [
        {
          id: "acceptance",
          title: "1. Acceptance of Terms",
          body: "By accessing or using our platform...",
        },
        {
          id: "modifications",
          title: "2. Modifications",
          body: "We reserve the right to change these Terms...",
        },
        {
          id: "account",
          title: "3. Account Responsibilities",
          body: "You are responsible for your login credentials...",
        },
        {
          id: "usage",
          title: "4. Acceptable Use",
          body: "You agree not to misuse the platform or engage in illegal activities.",
        },
        {
          id: "payments",
          title: "5. Payments & Subscriptions",
          body: "Fees are billed in advance and are non-refundable...",
        },
        {
          id: "termination",
          title: "6. Termination",
          body: "We may suspend or terminate your account for any violation...",
        },
        {
          id: "liability",
          title: "7. Limitation of Liability",
          body: "We are not liable for indirect or incidental damages...",
        },
        {
          id: "governing",
          title: "8. Governing Law",
          body: "These Terms are governed by the laws of Kenya...",
        },
        {
          id: "contact",
          title: "9. Contact Us",
          body: "Contact us at support@yourcompany.com or +1234567890",
        },
      ],
      contact: {
        email: "support@yourcompany.com",
        phone: "+1234567890",
      },
    },
    sw: {
      title: "Masharti ya Huduma",
      effectiveDate: "Tarehe ya Kuanzia: Julai 1, 2025",
      contents: "Yaliyomo",
      sections: [
        {
          id: "acceptance",
          title: "1. Kukubali Masharti",
          body: "Kwa kutumia jukwaa letu, unakubali masharti haya...",
        },
        {
          id: "modifications",
          title: "2. Mabadiliko",
          body: "Tunaweza kubadilisha masharti haya wakati wowote...",
        },
        {
          id: "account",
          title: "3. Majukumu ya Akaunti",
          body: "Unawajibika kwa taarifa zako za kuingia...",
        },
        {
          id: "usage",
          title: "4. Matumizi Yanayokubalika",
          body: "Hauruhusiwi kutumia jukwaa kwa njia zisizo halali...",
        },
        {
          id: "payments",
          title: "5. Malipo & Usajili",
          body: "Malipo yanahitajika kabla ya huduma na hayarudishwi...",
        },
        {
          id: "termination",
          title: "6. Kusitisha Huduma",
          body: "Tunaweza kusitisha akaunti yako kwa ukiukaji wa masharti...",
        },
        {
          id: "liability",
          title: "7. Kikomo cha Uwajibikaji",
          body: "Hatutawajibika kwa hasara zisizo za moja kwa moja...",
        },
        {
          id: "governing",
          title: "8. Sheria Inayotumika",
          body: "Masharti haya yanasimamiwa na sheria za Kenya...",
        },
        {
          id: "contact",
          title: "9. Wasiliana Nasi",
          body: "Wasiliana nasi kupitia ",
        },
      ],
      contact: {
        email: "juniorhamka03@gmail.com",
        phone: "+254790301457",
      },
    },
  };

  const t = content[language];

  return (
    <div className="bg-white text-gray-800 py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Language Toggle */}
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setLanguage("en")}
          className={`mr-2 px-4 py-2 text-sm rounded ${
            language === "en"
              ? "bg-blue-500 text-white"
              : "bg-blue-100 hover:bg-blue-200"
          }`}
        >
          English
        </button>
        <button
          onClick={() => setLanguage("sw")}
          className={`px-4 py-2 text-sm rounded ${
            language === "sw"
              ? "bg-green-500 text-white"
              : "bg-green-100 hover:bg-green-200"
          }`}
        >
          Kiswahili
        </button>
      </div>

      {/* Header */}
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-2">
          {t.title}
        </h1>
        <p className="text-gray-600 text-lg">{t.effectiveDate}</p>
      </header>

      {/* Table of Contents */}
      <nav className="mb-10">
        <h2 className="text-xl font-semibold mb-4">{t.contents}</h2>
        <ul className="list-disc list-inside text-blue-600 space-y-2">
          {t.sections.map((section) => (
            <li key={section.id}>
              <a href={`#${section.id}`} className="hover:underline">
                {section.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Section Content */}
      {t.sections.map((section) => (
        <section key={section.id} id={section.id} className="mb-10">
          <h2 className="text-2xl font-bold text-blue-600 mb-3">
            {section.title}
          </h2>
          <p className="text-gray-700 leading-relaxed">{section.body}</p>
        </section>
      ))}
      {/* Contact Info */}
      <section id="contact" className="mb-10">
        <p className="mt-2 text-gray-700">
          Email:{" "}
          <a
            href={`mailto:${t.contact.email}`}
            className="text-blue-600 hover:underline"
          >
            {t.contact.email}
          </a>
          <br />
          Phone:{" "}
          <a
            href={`tel:${t.contact.phone}`}
            className="text-blue-600 hover:underline"
          >
            {t.contact.phone}
          </a>
        </p>
      </section>
    </div>
  );
};

export default TermsOfService;
