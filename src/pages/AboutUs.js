import React, { useState } from "react";

const AboutUs = () => {
  const [language, setLanguage] = useState("en"); // 'en' = English, 'sw' = Swahili

  const content = {
    en: {
      heroTitle: "About Us",
      heroSubtitle:
        "Welcome to E-Learning – your gateway to quality education from anywhere.",
      missionTitle: "Our Mission",
      mission:
        "Our mission is to make high-quality education accessible to everyone, empowering learners with the tools they need to succeed in a digital world.",
      visionTitle: "Our Vision",
      vision:
        "To become the most trusted e-learning platform, bridging educational gaps globally.",
      valuesTitle: "Our Core Values",
      values: [
        "Accessibility",
        "Innovation",
        "Integrity",
        "Collaboration",
        "Excellence",
      ],
      videoTitle: "Watch Our Intro Video",
      teamTitle: "Meet Our Team",
      testimonialsTitle: "What Our Users Say",
      callToAction: "Want to be part of our journey?",
      ctaText:
        "Join as a student, teacher, or admin and shape the future of education with us.",
      buttonText: "Get Started",
    },
    sw: {
      heroTitle: "Kuhusu Sisi",
      heroSubtitle:
        "Karibu kwenye E-Learning – njia yako ya elimu bora kutoka mahali popote.",
      missionTitle: "Dhamira Yetu",
      mission:
        "Lengo letu ni kuhakikisha elimu bora inapatikana kwa kila mtu, na kuwawezesha wanafunzi kwa zana za kufanikisha mafanikio katika dunia ya kidijitali.",
      visionTitle: "Maono Yetu",
      vision: "Kuwa jukwaa la kuaminika la kujifunza mtandaoni duniani kote.",
      valuesTitle: "Misingi Yetu",
      values: ["Upatikanaji", "Ubunifu", "Uadilifu", "Ushirikiano", "Ubora"],
      videoTitle: "Tazama Video Yetu ya Utangulizi",
      teamTitle: "Kutana na Timu Yetu",
      testimonialsTitle: "Maoni ya Watumiaji Wetu",
      callToAction: "Unataka kuwa sehemu ya safari yetu?",
      ctaText:
        "Jiunge nasi kama mwanafunzi, mwalimu au msimamizi ili kuunda mustakabali wa elimu.",
      buttonText: "Anza Sasa",
    },
  };

  const t = content[language];

  return (
    <div className="py-6 px-4 min-h-screen bg-white text-gray-800">
      {/* 🌍 Language Toggle */}
      <div className="text-right mb-4">
        <button
          onClick={() => setLanguage("en")}
          lang="en"
          className={`mr-2 px-4 py-2 text-sm rounded ${
            language === "en"
              ? "bg-blue-600 text-white"
              : "bg-blue-100 hover:bg-blue-200"
          }`}
        >
          English
        </button>
        <button
          onClick={() => setLanguage("sw")}
          lang="sw"
          className={`px-4 py-2 text-sm rounded ${
            language === "sw"
              ? "bg-green-600 text-white"
              : "bg-green-100 hover:bg-green-200"
          }`}
        >
          Kiswahili
        </button>
      </div>

      {/* 🏁 Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">{t.heroTitle}</h1>
        <p className="text-lg max-w-2xl mx-auto">{t.heroSubtitle}</p>
      </div>

      {/* 🎯 Mission & Vision */}
      <section className="max-w-5xl mx-auto mb-16">
        <h2 className="text-2xl font-semibold mb-4">{t.missionTitle}</h2>
        <p className="text-gray-700">{t.mission}</p>
      </section>

      <section className="max-w-5xl mx-auto mb-16 grid gap-8 md:grid-cols-2">
        <div>
          <h3 className="text-xl font-semibold mb-2">{t.visionTitle}</h3>
          <p className="text-gray-700">{t.vision}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">{t.valuesTitle}</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            {t.values.map((val, index) => (
              <li key={index}>{val}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* 👨‍💼 Team Section */}
      <section className="max-w-6xl mx-auto mb-16 text-center">
        <h2 className="text-2xl font-bold text-blue-600 mb-8">{t.teamTitle}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Hamza A. Barisa",
              role: "Founder & Developer",
              image: "/assets/team1.png",
            },
            {
              name: "Mr. Henry Lusala",
              role: "Lead Instructor",
              image: "/assets/team1.png",
            },
            {
              name: "Abdulfertah Mohamed",
              role: "Admin Coordinator",
              image: "/assets/team1.png",
            },
          ].map((member, idx) => (
            <div key={idx} className="bg-white shadow-lg rounded-lg p-4">
              <img
                src={member.image}
                alt={`${member.name} profile`}
                className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
              />
              <h4 className="text-lg font-semibold">{member.name}</h4>
              <p className="text-sm text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ▶️ YouTube Video */}
      <section className="max-w-4xl mx-auto mb-16 text-center">
        <h2 className="text-2xl font-bold mb-6 text-blue-600">
          {t.videoTitle}
        </h2>
        <div className="relative w-full pb-[56.25%] h-0 rounded-lg shadow-lg overflow-hidden">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="Intro Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </section>

      {/* 🌟 Testimonials */}
      <section className="max-w-6xl mx-auto mb-16 text-center">
        <h2 className="text-2xl font-bold mb-8 text-blue-600">
          {t.testimonialsTitle}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Ali Hassan",
              feedback:
                "This platform helped me pass my exams and gain confidence!",
              avatar: "/assets/user1.jpg",
            },
            {
              name: "Grace Wanjiku",
              feedback: "The instructors are amazing and very supportive.",
              avatar: "/assets/user2.jpg",
            },
            {
              name: "Mohammed Yusuf",
              feedback: "Great learning experience and flexible schedules.",
              avatar: "/assets/user3.jpg",
            },
          ].map((testi, idx) => (
            <div
              key={idx}
              className="bg-gray-100 p-6 rounded-lg shadow-md text-center"
            >
              <img
                src={testi.avatar}
                alt={`${testi.name}'s avatar`}
                className="w-14 h-14 rounded-full object-cover mx-auto mb-2"
              />
              <p className="font-bold">{testi.name}</p>
              <blockquote className="text-gray-700 italic mt-2">
                "{testi.feedback}"
              </blockquote>
            </div>
          ))}
        </div>
      </section>

      {/* 📢 Call to Action */}
      <div className="text-center">
        <h3 className="text-2xl font-semibold mb-4">{t.callToAction}</h3>
        <p className="mb-6 text-gray-700">{t.ctaText}</p>
        <a
          href="/register"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition duration-300"
        >
          {t.buttonText}
        </a>
      </div>
    </div>
  );
};

export default AboutUs;
