const Footer = () => {
  const links = [
    { label: 'Spotify', url: '#' },
    { label: 'YouTube', url: '#' },
    { label: 'Instagram', url: '#' },
    { label: 'Facebook', url: '#' }
  ];

  return (
    <footer className="bg-space-800 py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold text-cosmic-purple">Quantum Aberration</h3>
            <p className="text-gray-400">Death Metal Technique Parisien</p>
          </div>
          <div className="flex space-x-6">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.url}
                className="text-gray-400 hover:text-cosmic-purple transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-space-700 text-center text-gray-500">
          <p>&copy; 2024 Quantum Aberration. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;