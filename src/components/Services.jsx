import React from 'react';
import { motion } from 'framer-motion';
import { styles } from '../styles';
import { fadeIn, textVariant } from '../utils/motion';
import { SectionWrapper } from '../hoc';

const ServiceCard = ({ index, title, description }) => {
  return (
    <motion.div
      variants={fadeIn("right", "spring", 0.5 * index, 0.75)}
      className="xs:w-[250px] w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card"
    >
      <div className="bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col">
        <h3 className="text-white text-[20px] font-bold text-center">{title}</h3>
        <p className="text-secondary text-[14px] text-center">{description}</p>
      </div>
    </motion.div>
  );
};

const Services = () => {
  const services = [
    {
      title: "Développement Web Full Stack",
      description: "Nous créons des applications web et mobiles sur mesure, robustes et évolutives."
    },
    {
      title: "Sites Web No-Code",
      description: "Solutions rapides et efficaces avec des plateformes no-code pour des sites professionnels."
    },
    {
      title: "Création Multimédia",
      description: "Production de contenu multimédia : vidéos, animations et visuels interactifs."
    },
    {
      title: "Réseaux Sociaux",
      description: "Stratégie social media, création de contenu et gestion de communauté."
    },
    {
      title: "Design et Impressions",
      description: "Services de design graphique et d'impression pour votre communication."
    },
  ];

  return (
    <section className={`${styles.padding} max-w-7xl mx-auto relative z-0`}>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Ce que nous proposons</p>
        <h2 className={styles.sectionHeadText}>Nos Services.</h2>
      </motion.div>

      <div className="mt-20 flex flex-wrap gap-10 justify-center">
        {services.map((service, index) => (
          <ServiceCard 
            key={index} 
            index={index} 
            {...service} 
          />
        ))}
      </div>
    </section>
  );
};

export default SectionWrapper(Services, "services");
