import { motion } from "framer-motion";
import Image from "next/image";

const companies = [
    { name: "Slack", logo: "/logos/Slack.png" },
    { name: "Spotify", logo: "/logos/Spotify.png" },
    { name: "Airbnb", logo: "/logos/Airbnb.png" },
    { name: "Zapier", logo: "/logos/Zapier.png" },
    { name: "Netflix", logo: "/logos/Netflix.png" },
    { name: "Zomato", logo: "/logos/Zomato.png" },
  ];
  
  const duplicatedCompanies = Array(2).fill(companies).flat();
  
  export const InfiniteLogoSlider = () => {
    return (
      <div className="mt-16 text-center overflow-hidden relative">
        <p className="text-gray-500 mb-4">Trusted by top companies worldwide</p>
  
        <div className="relative w-full overflow-hidden">
          <div className="flex">
            <motion.div
              className="flex items-center gap-12 whitespace-nowrap"
              animate={{
                x: [0, -1920],
              }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {companies.map((company, index) => (
                <div
                  key={`first-${index}`}
                  className="relative w-32 h-12 flex-shrink-0"
                >
                  <Image
                    src={company.logo}
                    alt={`${company.name} logo`}
                    fill
                    style={{ objectFit: "contain" }}
                    className="filter grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              ))}
              {/* Second set of logos */}
              {companies.map((company, index) => (
                <div
                  key={`second-${index}`}
                  className="relative w-32 h-12 flex-shrink-0"
                >
                  <Image
                    src={company.logo}
                    alt={`${company.name} logo`}
                    fill
                    style={{ objectFit: "contain" }}
                    className="filter grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              ))}
              {/* Third set of logos for seamless loop */}
              {companies.map((company, index) => (
                <div
                  key={`third-${index}`}
                  className="relative w-32 h-12 flex-shrink-0"
                >
                  <Image
                    src={company.logo}
                    alt={`${company.name} logo`}
                    fill
                    style={{ objectFit: "contain" }}
                    className="filter grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    );
  };
  