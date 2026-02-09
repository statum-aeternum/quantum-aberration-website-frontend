import { useState, useEffect } from "react";
import { Contact as ContactType } from "../types";
import { getContacts } from "../api";
import StickyTitle from "../components/StickyTitle";
import { Helmet } from "react-helmet";

const Contact = () => {
  const [contacts, setContacts] = useState<ContactType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const fetchedContacts = await getContacts();
        setContacts(fetchedContacts);
      } catch (error) {
        console.error("Erreur lors du chargement des contacts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  if (loading) {
    return (
      <section
        id="contact"
        className="min-h-screen py-20 bg-space-950 relative"
      >
        <div className="container mx-auto px-6">
          <StickyTitle title="Contact" sectionId="contact" />
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cosmic-purple"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <Helmet>
        <title>Contact | Quantum Aberration</title>
        <meta
          name="description"
          content="Contactez-nous pour toute demande de booking, collaboration ou information."
        />
        <meta property="og:title" content="Contact" />
        <meta
          property="og:description"
          content="Contactez-nous pour toute demande de booking, collaboration ou information."
        />
        <meta property="og:type" content="section" />
      </Helmet>
      <section
        id="contact"
        className="min-h-screen py-20 bg-space-950 relative"
      >
        <div className="container mx-auto px-6">
          <StickyTitle title="Contact" sectionId="contact" />

          <div className="max-w-2xl mx-auto">
            <div className="bg-space-800 rounded-lg p-8 shadow-xl border border-space-700">
              <p className="text-center text-gray-300 mb-8 text-lg">
                Contactez-nous pour toute demande de booking, collaboration ou
                information.
              </p>

              <div className="space-y-6">
                {contacts.map((contact, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-space-700 rounded-lg border border-space-600"
                  >
                    <span className="text-cosmic-purple font-semibold">
                      {contact.label}
                    </span>
                    {contact.type === "email" ? (
                      <a
                        href={`mailto:${contact.value}`}
                        className="text-white hover:text-cosmic-purple transition-colors duration-300"
                      >
                        {contact.value}
                      </a>
                    ) : (
                      <a
                        href={contact.value}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-cosmic-purple transition-colors duration-300"
                      >
                        <svg
                          className="w-6 h-6"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M10 6v2H5v11h11v-5h2v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6zm11-3v8h-2V6.413l-7.793 7.794-1.414-1.414L17.585 5H13V3h8z" />
                        </svg>
                      </a>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <p className="text-gray-400">Basé à Paris, France</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
