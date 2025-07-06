import React, { useState } from "react";

const PrivacyPolicy = () => {
  const [language, setLanguage] = useState("en");

  const content = {
    en: {
      title: "Privacy Policy",
      lastUpdated: "Last updated: July 1, 2025",
      contents: "Contents",
      sections: [
        {
          id: "introduction",
          title: "1. Introduction",
          body: "Welcome to our Privacy Policy. Your privacy is critically important to us. This policy explains how we collect, use, and protect your personal information when you use our e-learning platform.",
        },
        {
          id: "data-we-collect",
          title: "2. What Data We Collect",
          list: [
            "Personal Identification (Name, Email Address, etc.)",
            "Usage data (pages visited, duration, browser type)",
            "Payment information (processed securely via third parties)",
            "Profile data (courses enrolled, progress, preferences)",
          ],
        },
        {
          id: "how-we-use-data",
          title: "3. How We Use Your Data",
          body: "We use the data to:",
          list: [
            "Provide and improve our learning services",
            "Personalize user experience",
            "Send relevant communications and updates",
            "Comply with legal and security obligations",
          ],
        },
        {
          id: "cookies",
          title: "4. Cookies",
          body: "Our platform uses cookies to enhance user experience and track usage statistics. You can manage cookie preferences in your browser settings.",
        },
        {
          id: "data-sharing",
          title: "5. Data Sharing",
          body: "We do not sell your personal data. We only share data with trusted third-party providers who help us deliver our services, under strict data protection agreements.",
        },
        {
          id: "your-rights",
          title: "6. Your Rights",
          list: [
            "Access, update, or delete your personal information",
            "Withdraw consent at any time",
            "Request data portability",
            "File a complaint with a data protection authority",
          ],
        },
        {
          id: "security",
          title: "7. Data Security",
          body: "We implement appropriate technical and organizational security measures to protect your personal data against unauthorized access, alteration, or disclosure.",
        },
        {
          id: "contact",
          title: "8. Contact Us",
          body: "If you have any questions or concerns about this Privacy Policy, please contact us at:",
        },
      ],
      contact: {
        email: "privacy@yourcompany.com",
        phone: "+1234567890",
      },
    },
    sw: {
      title: "Sera ya Faragha",
      lastUpdated: "Imesasishwa mwisho: Julai 1, 2025",
      contents: "Yaliyomo",
      sections: [
        {
          id: "introduction",
          title: "1. Utangulizi",
          body: "Karibu kwenye Sera yetu ya Faragha. Faragha yako ni muhimu sana kwetu. Sera hii inaeleza jinsi tunavyokusanya, kutumia, na kulinda taarifa zako unapotumia jukwaa letu la e-learning.",
        },
        {
          id: "data-we-collect",
          title: "2. Taarifa Tunazokusanya",
          list: [
            "Maelezo ya kibinafsi (Jina, Anwani ya barua pepe, nk)",
            "Takwimu za matumizi (kurasa zilizotembelewa, muda, aina ya kivinjari)",
            "Taarifa za malipo (zinafanyika kupitia wahusika wa tatu kwa usalama)",
            "Maelezo ya wasifu (kozi ulizojiunga, maendeleo, mapendeleo)",
          ],
        },
        {
          id: "how-we-use-data",
          title: "3. Jinsi Tunavyotumia Taarifa",
          body: "Tunatumia taarifa hizi kwa:",
          list: [
            "Kutoa na kuboresha huduma zetu za kujifunza",
            "Kubinafsisha uzoefu wa mtumiaji",
            "Kutuma mawasiliano na masasisho muhimu",
            "Kuzingatia mahitaji ya kisheria na usalama",
          ],
        },
        {
          id: "cookies",
          title: "4. Vidakuzi (Cookies)",
          body: "Jukwaa letu hutumia cookies kuboresha uzoefu wa mtumiaji na kufuatilia takwimu za matumizi. Unaweza kudhibiti vidakuzi kupitia mipangilio ya kivinjari chako.",
        },
        {
          id: "data-sharing",
          title: "5. Kushiriki Taarifa",
          body: "Hatuuzi taarifa zako binafsi. Tunashiriki tu taarifa na watoa huduma wa kuaminika wanaotusaidia kutoa huduma, chini ya makubaliano madhubuti ya faragha.",
        },
        {
          id: "your-rights",
          title: "6. Haki Zako",
          list: [
            "Kupata, kusasisha, au kufuta taarifa zako",
            "Kutoa idhini yako wakati wowote",
            "Kuomba usafirishaji wa data",
            "Kuwasilisha malalamiko kwa mamlaka ya ulinzi wa data",
          ],
        },
        {
          id: "security",
          title: "7. Usalama wa Taarifa",
          body: "Tunachukua hatua za kiufundi na kiutawala kulinda taarifa zako dhidi ya ufikiaji usioidhinishwa, mabadiliko au kufichuliwa.",
        },
        {
          id: "contact",
          title: "8. Wasiliana Nasi",
          body: "Ikiwa una maswali au wasiwasi wowote kuhusu Sera hii ya Faragha, tafadhali wasiliana nasi kupitia:",
        },
      ],
      contact: {
        email: "privacy@yourcompany.com",
        phone: "+1234567890",
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
        <p className="text-gray-600 text-lg">{t.lastUpdated}</p>
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

      {/* Policy Sections */}
      {t.sections.map((section) => (
        <section id={section.id} key={section.id} className="mb-10">
          <h2 className="text-2xl font-bold text-blue-600 mb-3">
            {section.title}
          </h2>
          {section.body && (
            <p className="text-gray-700 leading-relaxed mb-2">{section.body}</p>
          )}
          {section.list && (
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              {section.list.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          )}
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

export default PrivacyPolicy;
