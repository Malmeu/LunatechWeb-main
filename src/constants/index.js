import {
    mobile,
    backend,
    creator,
    web,
    javascript,
    typescript,
    html,
    css,
    reactjs,
    redux,
    tailwind,
    nodejs,
    mongodb,
    git,
    figma,
    docker,
    meta,
    starbucks,
    tesla,
    shopify,
    carrent,
    jobit,
    tripguide,
    threejs,
  } from "../assets";
  
  export const navLinks = [
    {
      id: "about",
      title: "A propos",
    },
    {
      id: "services",
      title: "Nos Services",
    },
    {
      id: "work",
      title: "Travaux",
    },
    {
      id: "blog",
      title: "Blog",
    },
    {
      id: "contact",
      title: "Contact",
    },
  ];
  
  const services = [
    {
      title: "Web Developer",
      icon: web,
    },
    {
      title: "Backend Developer",
      icon: backend,
    },
    {
      title: "Content Creator",
      icon: creator,
    },
    {
      title: "Full Stack Developer",
      icon: javascript,
    },
  ];
  
  const technologies = [
    {
      name: "HTML 5",
      icon: html,
    },
    {
      name: "CSS 3",
      icon: css,
    },
    {
      name: "JavaScript",
      icon: javascript,
    },
    {
      name: "TypeScript",
      icon: typescript,
    },
    {
      name: "React JS",
      icon: reactjs,
    },
    {
      name: "Redux Toolkit",
      icon: redux,
    },
    {
      name: "Tailwind CSS",
      icon: tailwind,
    },
    {
      name: "Node JS",
      icon: nodejs,
    },
    {
      name: "MongoDB",
      icon: mongodb,
    },
    {
      name: "Three JS",
      icon: threejs,
    },
    {
      name: "git",
      icon: git,
    },
    {
      name: "figma",
      icon: figma,
    },
    {
      name: "docker",
      icon: docker,
    },
  ];
  
  const experiences = [
    {
      title: "Designer",
      company_name: "Numeritech",
      icon: starbucks,
      iconBg: "#383E56",
      date: "Mars 2010 - Avril 2013",
      points: [
        "En tant que designer, j'ai créé de superbes maquettes pour des projets clients en utilisant une approche créative pour m'assurer que chaque design reflète parfaitement les besoins de chaque client.",
        "J'ai également créé des cartes de visite et des logos professionnels pour une variété de clients, en veillant à ce que chaque design soit unique et mémorable tout en reflétant l'identité de la marque.",
        "Grâce à mes compétences en conception numérique, j'ai créé des designs pour des projets numériques, tels que des bannières publicitaires et des conceptions pour les médias sociaux.",
        "Dans chaque projet, j'ai fait preuve d'une grande attention aux détails pour m'assurer que chaque élément du design est parfaitement intégré, ce qui a conduit à des résultats visuellement impressionnants qui ont dépassé les attentes des clients.",
      ],
    },
    {
      title: "Designer, Dev Web",
      company_name: "Algerie Marches",
      icon: tesla,
      iconBg: "#E6DEDD",
      date: "Jan 2016 - Feb 2018",
      points: [
        "En tant qu'informaticien, j'ai fourni un soutien technique pour les logiciels et les équipements informatiques de l'entreprise, ce qui a permis de maintenir un environnement de travail efficace et sans interruption.",
        "En tant qu'infographe, j'ai créé des designs visuellement attrayants pour les médias imprimés et numériques, tels que des brochures, des bannières publicitaires et des visuels pour les réseaux sociaux.",
        "En tant que web designer, j'ai créé des designs de sites Web modernes et fonctionnels pour l'entreprise et ses clients, en utilisant des technologies telles que HTML, CSS, JavaScript et WordPress.",
        "Grâce à mes compétences et mon expérience en informatique, infographie et design Web, j'ai pu collaborer avec des collègues de différents départements pour proposer des solutions créatives et efficaces pour les projets de l'entreprise.",
      ],
    },
    {
      title: "Responsable Com, Web Development",
      company_name: "Top Tenders",
      icon: shopify,
      iconBg: "#383E56",
      date: "Jan 2019 - Mars 2020",
      points: [
        "En tant que responsable commercial, j'ai développé et mis en œuvre des stratégies de vente efficaces pour atteindre les objectifs de l'entreprise et accroître les revenus.",
        "En tant qu'informaticien, j'ai fourni un soutien technique pour les logiciels et les équipements informatiques de l'entreprise, ce qui a permis de maintenir un environnement de travail efficace et sans interruption.",
        "En tant qu'infographe, j'ai créé des designs visuellement attrayants pour les médias imprimés et numériques, tels que des brochures, des bannières publicitaires et des visuels pour les réseaux sociaux.",
        "En tant que web designer, j'ai créé des designs de sites Web modernes et fonctionnels pour l'entreprise et ses clients, en utilisant des technologies telles que HTML, CSS, JavaScript et WordPress, tout en m'assurant que les sites étaient optimisés pour le référencement naturel (SEO).",
      ],
    },
    {
      title: "Full stack Developer",
      company_name: "We Link",
      icon: meta,
      iconBg: "#E6DEDD",
      date: "Oct 2022 - Present",
      points: [
        "En tant que freelance, j'ai travaillé sur plusieurs projets pour différents clients, allant de la création de sites Web à la conception graphique, en passant par le développement d'applications et le marketing numérique.",
        "J'ai acquis une grande expertise dans les langages de programmation tels que HTML, CSS, JavaScript, ReactJS et ThreeJS, qui me permettent de créer des sites Web et des applications performants et modernes.",
        "En tant que designer, j'ai créé des designs professionnels et créatifs pour des logos, des cartes de visite, des brochures et des visuels pour les réseaux sociaux, en utilisant des outils tels que Photoshop, Illustrator et InDesign.",
        "Je suis également spécialisé dans le marketing numérique, en utilisant des stratégies telles que le référencement naturel (SEO), la publicité en ligne et les médias sociaux pour aider mes clients à atteindre leurs objectifs commerciaux.",
      ],
    },
  ];
  
  const testimonials = [
    {
      testimonial:
        "Leur professionnalisme et leur attention aux détails ont rendu le processus de création de notre site Web fluide et agréable. Nous sommes ravis du résultat final et nous recommandons vivement leurs services.",
      name: "Sabrina Benali",
      designation: "CFO",
      company: "Docaz",
      image: "https://randomuser.me/api/portraits/women/40.jpg",
    },
    {
      testimonial:
        "Nous avons travaillé avec Malmeu pour la création de notre logo et la conception de notre site Web. Leur expertise en matière de design et de développement a été essentielle pour atteindre nos objectifs commerciaux",
      name: "ENTEGHAR Muhend",
      designation: "CIO",
      company: "Maghreb elemech Company",
      image: "https://randomuser.me/api/portraits/men/43.jpg",
    },
    {
      testimonial:
        "Nous avons été extrêmement satisfaits des services de design et de création web fournis par Malmeu. Leur compréhension de nos besoins et leur capacité à créer des designs visuellement attrayants et fonctionnels ont été remarquables.",
      name: "Fawzi Berroua",
      designation: "CIO",
      company: "Vendita DZ",
      image: "https://randomuser.me/api/portraits/men/11.jpg",
    },
  ];
  
  const projects = [
    {
      name: "Docaz",
      description:
        "Docaz est une plateforme de vente et d’achat d’articles de mode d’occasion en ligne en Algérie. Elle permet aux consommateurs d’acheter des vêtements, des chaussures et des accessoires de mode à des prix avantageux.",
      tags: [
        {
          name: "react",
          color: "blue-text-gradient",
        },
        {
          name: "mongodb",
          color: "green-text-gradient",
        },
        {
          name: "tailwind",
          color: "pink-text-gradient",
        },
      ],
      image: carrent,
      source_code_link: "https://docaz.live/",
    },
    {
      name: "Djodeco",
      description:
        "Djodeco est une entreprise spécialisée dans la conception, la construction et la décoration de piscines, ainsi que dans l'aménagement paysager de jardins et de projets de revêtements de sol industriels.",
      tags: [
        {
          name: "react",
          color: "blue-text-gradient",
        },
        {
          name: "restapi",
          color: "green-text-gradient",
        },
        {
          name: "scss",
          color: "pink-text-gradient",
        },
      ],
      image: jobit,
      source_code_link: "https://djodeco.com/",
    },
    {
      name: "Maghreb Elemech Company",
      description:
        "Maghreb Elemech Company, une entreprise spécialisée dans les domaines des technologies électriques et mécaniques appliquées, des solutions innovantes d'éclairage et des produits LED professionnels.",
      tags: [
        {
          name: "nextjs",
          color: "blue-text-gradient",
        },
        {
          name: "supabase",
          color: "green-text-gradient",
        },
        {
          name: "css",
          color: "pink-text-gradient",
        },
      ],
      image: tripguide,
      source_code_link: "https://maghrebelemech.dz/",
    },
  ];
  
  export { services, technologies, experiences, testimonials, projects };