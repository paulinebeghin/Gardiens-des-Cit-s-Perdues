export interface Book {
  id: string;
  title: string;
  subtitle?: string;
  releaseDates: {
    grandFormat?: string;
    poche?: string;
    collector?: string;
    date? : string;
  };
  
  excerptUrl: string; // Ajoute l'URL de l'extrait ici
  summary: string;
  coverImageCategorie: string;
  coverImage: string;
}

export const BOOKS_DATA: Book[] = [
  {
    id: "tome-1",
    
    title: "Gardiens des cités perdues, Tome 1:",
    releaseDates: {
      grandFormat: "15/05/2014",
      poche: "16/02/2017",
      collector: "04/04/2024"
    },
    excerptUrl: "/epub/tome1.epub",
    summary: "Depuis des années, Sophie sait qu'elle n'est  pas comme tout le monde. Elle se sent à part à l'école, où elle n'a pas  besoin d'écouter les cours pour comprendre. La raison ? Elle est dotée  d'une mémoire photographique... Mais ce n'est pas tout : ce qu'elle n'a  jamais révélé à personne, c'est qu'elle entend penser les autres comme s'ils lui parlaient à haute voix. Un casque vissé sur la tête pour empêcher ce bruit de fond permanent de la rendre folle, elle se promène un matin avec sa classe au musée d'histoire naturelle quand un étrange garçon l'aborde. Dès cet instant, la vie qu'elle connaissait est terminée : elle n'est pas humaine et doit abandonner son existence entière pour rejoindre un autre univers, qu'elle a quitté douze ans plus tôt. L'y attendent une pléiade de nouveaux condisciples, amis et  ennemis, et une question obsédante: qui est-elle ? Pourquoi l'a-t-on  cachée dans le monde des humains ? Pourquoi n'a-t-elle que des souvenirs partiels de son passé ? Un premier roman baigné de magie, dont la fantaisie et le sens du suspense font des miracles, et où éclate le talent indéniable de Shannon Messenger. Un nom à retenir !",
    coverImage: "https://res.cloudinary.com/dxtfa4bcx/image/upload/v1772189700/T1_eykf7c.png",
    coverImageCategorie: "https://res.cloudinary.com/dxtfa4bcx/image/upload/v1772189704/T1Categorie_r5mpow.png",
  },
  {
    id: "tome-2",
    
    title: "Gardiens des cités perdues, Tome 2:",
    subtitle: "Exil",
    releaseDates: {
      grandFormat: "15/01/2015",
      poche: "02/11/2017",
    },
    excerptUrl: "/epub/tome2.epub",
    summary: "Depuis des années, Sophie sait qu'elle n'est pas comme tout le monde. Elle se sent à part à l'école, où elle n'a pas besoin d'écouter les cours pour comprendre. La raison ? Elle est dotée d'une mémoire photographique... Mais ce n'est pas tout : ce qu'elle n'a  jamais révélé à personne, c'est qu'elle entend penser les autres comme s'ils lui parlaient à haute voix. Un casque vissé sur la tête pour empêcher ce bruit de fond permanent de la rendre folle, elle se promène un matin avec sa classe au musée d'histoire naturelle quand un étrange  garçon l'aborde. Dès cet instant, la vie qu'elle connaissait est terminée : elle n'est pas humaine et doit abandonner son existence entière pour rejoindre un autre univers, qu'elle a quitté douze ans plus tôt. L'y attendent une pléiade de nouveaux condisciples, amis et  ennemis, et une question obsédante: qui est-elle ? Pourquoi l'a-t-on  cachée dans le monde des humains ? Pourquoi n'a-t-elle que des souvenirs partiels de son passé ? Un premier roman baigné de magie, dont la fantaisie et le sens du suspense font des miracles, et où éclate le talent indéniable de Shannon Messenger.",
    coverImage: "https://res.cloudinary.com/dxtfa4bcx/image/upload/v1772211433/T2_srccb0.png",
    coverImageCategorie: "https://res.cloudinary.com/dxtfa4bcx/image/upload/v1772211432/T2Categorie_mitvsn.png",
  },
  {
      id: "tome-3",
      
      title: "Gardiens des cités perdues, Tome 3:",
      subtitle: "Le Grand Brasier",
      releaseDates: {
          grandFormat: "15/11/2015",
          poche: "15/02/2018",
        },
        excerptUrl: "/epub/tome3.epub",
        summary: "Voilà plusieurs semaines que Sophie Foster n'a plus aucune nouvelle du Cygne Noir, l'organisation clandestine qui l'a créée. Si elle se sent abandonnée, la jeune Télépathe redoute  surtout qu'un traître n'ait infiltré leurs rangs. Pourtant, elle a bien vite d'autres chats à fouetter : un mystérieux traqueur est découvert sur Silveny l'alicorne, Vertina, le miroir spectral de Jolie, refuse obstinément de révéler ce qu'elle sait, et le Conseil ordonne à Sophie de guérir Fintan, le Pyrokinésiste à l'esprit brisé, malgré l'immense menace qu'il représente… Toujours accompagnée de Keefe, Dex, Fitz et Biana, la jeune fille est entraînée dans un tourbillon de révélations et de rebondissements… à tel point que, déterminée à démasquer les rebelles qui menacent les Cités perdues, elle va commettre un terrible faux pas, et conduire les elfes au bord de la guerre !",
        coverImage: "https://res.cloudinary.com/dxtfa4bcx/image/upload/v1772211433/T3_c2g4bg.png",
        coverImageCategorie: "https://res.cloudinary.com/dxtfa4bcx/image/upload/v1772211434/T3Categorie_usbshc.png",
    },
    {
      id: "tome-4",
      
      title: "Gardiens des cités perdues, Tome 4:",
      subtitle: "Les Invisibles",
      releaseDates: {
        grandFormat: "02/06/2016",
        poche: "08/11/2018",
      },
      excerptUrl: "/epub/tome4.epub",
      summary: "Fini les cours à Foxfire, Sophie et ses  amis rejoignent le Cygne Noir et sont emportés dans des aventures dangereuses qui les unissent. Pour sauver les gnomes d'une épidémie, ils œuvrent ensemble, malgré la forte menace ogre qui pèse sur eux.",
      coverImage: "https://res.cloudinary.com/dxtfa4bcx/image/upload/v1772211434/T4_pwbbjv.png",
      coverImageCategorie:"https://res.cloudinary.com/dxtfa4bcx/image/upload/v1772211434/T4Categorie_c5w2uk.png",
    },
    
    {
      id: "tome-5",
      
      title: "Gardiens des cités perdues, Tome 5:",
      subtitle: "Projet Polaris",
      releaseDates: {
        grandFormat: "16/02/2017",
        poche: "16/05/2019",
      },
      excerptUrl: "/epub/tome5.epub",
      summary: "Après un passage mouvementé par Exillium, l'école réservée aux bannis, Sophie et ses amis sont de retour à l'académie Foxfire, où la jeune Télépathe n'est pas la seule, cette fois, à bénéficier de la protection d'un garde du corps. Car certains masques sont tombés : les nouveaux membres du Cygne Noir, ainsi que leurs familles, sont plus que jamais en danger… D'autant que les  Invisibles, ces rebelles qui menacent les Cités perdues, multiplient les attaques. Tandis que la tension monte avec les ogres, forçant les elfes à  accepter des changements drastiques de leurs modes de vie, notre petite  troupe tente d'en découvrir plus sur le plan de l'ennemi. Sophie ne dispose pourtant que de maigres indices : son nom de code est “Projet  Polaris”, un étrange symbole semble en être la clé et il serait depuis le début lié à… Keefe !",
      coverImage: "https://res.cloudinary.com/dxtfa4bcx/image/upload/v1772211435/T5_ptdj4l.png",
      coverImageCategorie: "https://res.cloudinary.com/dxtfa4bcx/image/upload/v1772211435/T5Categorie_xlenzh.png",
    },
    {
        id: "tome-6",
        
        title: "Gardiens des cités perdues, Tome 6:",
        subtitle: "Nocturna",
        releaseDates: {
        grandFormat: "16/11/2017",
        poche: "14/11/2019",
      },
      excerptUrl: "/epub/tome6.epub",
      summary: "Sophie Foster est en difficulté. Le deuil. L'incertitude. Mais elle sait une chose: elle ne perdra pas. Les Invisibles ont pour l'instant gagné - mais la bataille est loin  d'être terminée. Il est temps de changer de tactique. De faire des sacrifices. De reexaminez tout. Peut-être même le temps pour Sophie de faire confiance à ses ennemis. Tous les sentiers conduisent à Nightfall - une porte sinistre à un endroit encore plus sinistre - et Sophie et ses amis doivent résoudre une affaire dangereuse pour y arriver. Mais rien ne peut les préparer à ce qu'ils y découvriront. Les problèmes auxquels ils sont confrontés les ramènent à leur histoire. Et à cours de temps, Sophie et ses alliés doivent unir leurs forces comme ils n'ont jamais auparavant. Sophie doit découvrir la vérité à propos de l'insidieux passé des Cités Perdues, avant que l'histoire se répète.",
      coverImage: "https://res.cloudinary.com/dxtfa4bcx/image/upload/v1772211435/T6_pygpz9.png",
      coverImageCategorie: "https://res.cloudinary.com/dxtfa4bcx/image/upload/v1772211435/T6Categorie_aup95q.png",
    },
    {
      id: "tome-7",
      
      title: "Gardiens des cités perdues, Tome 7:",
      subtitle: "Réminiscences",
      releaseDates: {
        grandFormat: "15/11/2018",
        poche: "20/10/2022",
      },
      excerptUrl: "/epub/tome7.epub",
      summary: "Sophie ne sait plus quelle stratégie  adopter. Ses amis eux-mêmes semblent avoir perdu la foi: leur retentissante victoire en Atlantide aurait dû marquer un tournant décisif dans le combat contre les Invisibles, et pourtant la lutte parait au point mort. Toujours prêtes à déstabiliser le monde des elfes, Vespéra et Lady Gisela ont disparu dans la nature. Quant à Fintan, prisonnier du Conseil, il refuse obstinément de révéler quoi que ce soit de leurs sombres plans. Pour couronner le tout, les jeunes recrues du  Cygne Noir reçoivent un véritable coup de massue à l'énoncé du procès  d'Alvar, toujours amnésique. Mais quand Sophie et Fitz, victimes d'une nouvelle attaque, échappent de justesse à la mort, ils n'ont plus guerre le choix. S'ils veulent garder une chance de l'emporter face à ces ennemis sans pitié, il leur faut dès à présent changer radicalement de tactique pour adopter celle de leurs adversaires - quitte à trahir leur nature et leurs plus intimes convictions...",
      coverImage: "https://res.cloudinary.com/dxtfa4bcx/image/upload/v1772211435/T7_qodoqv.png",
      coverImageCategorie: "https://res.cloudinary.com/dxtfa4bcx/image/upload/v1772211435/T7Categorie_njjkcg.png",
    },
    {
      id: "tome-8",
      
      title: "Gardiens des cités perdues, Tome 8:",
      subtitle: "Héritages",
      releaseDates: {
        grandFormat: "14/11/2019",
        poche: "17/08/2023",
      },
      excerptUrl: "/epub/tome8.epub",
      summary: "Sophie n'en peut plus de vivre dans le mensonge et l'illusion : cette fois, il lui faut des réponses. Mais la  vérité n'est pas toujours bonne à entendre, surtout quand elle apporte  son lot de nouvelles responsabilités... Et que la jeune fille n'est pas  la seule concernée. Car le passé trouble certains de ses amis n'a rien d'un hasard. Beaucoup sont porteurs d'un destin qui les dépasse, qui se joue d'eux et de leurs principes Commence alors un jeu de piste dangereux, où la fidélité de chacun se voit remise en cause. Et si les indices s'accumulent, le doute, lui, s'insinue dans le petit groupe à mesure que la frontière entre le bien et le mal se trouble. Une question occupe désormais tous les esprits : qui est vraiment digne de confiance ? À force de creuser pour découvrir ce que cachent les mystères qui l'entourent, Sophie Foster se retrouve dans ce huitième tome de Gardiens des cités perdues face à elle-même et à ses illusions perdues. L'heure de la vérité à sonné. Il ne reste plus qu'à savoir si notre héroïne et ses amis sont prêts à l'affronter...",
      coverImage: "https://res.cloudinary.com/dxtfa4bcx/image/upload/v1772211436/T8_qo6m1q.png",
      coverImageCategorie: "https://res.cloudinary.com/dxtfa4bcx/image/upload/v1772211432/T8Categorie_gydxx8.png",
    },
    {
      id: "tome-8.5",
      
      title: "Gardiens des cités perdues, Tome 8.5:",
      subtitle: "Le Livre des secrets",
      releaseDates: {
        grandFormat: "19/11/2020",
        poche: "10/10/2024",
      },
      excerptUrl: "/epub/tome8.5.epub",
      summary: "Coup de théâtre dans les Cités perdues ! Si Sophie, désormais à la tête de la Brigade intrépide, croyait pouvoir  déjouer les plans des Invisibles, c'était sans compter sur la trahison  du roi des nains. Après ce rebondissement inattendu, Lady Gisela en a  profité pour faire subir à Keefe une transformation capable de lui faire accepter - de force - son héritage. Mais l'expérience tourne court et  l'Empathe tombe dans une sorte de coma dont personne, pas même sa mère, ne sait s'il se réveillera un jour. C'est sur ce suspense haletant que nous avions quitté Sophie et ses compagnons, avec plus de questions que de réponses : qu'est-il vraiment arrivé à Keefe ? Quand le garçon s'arrachera-t-il à son sommeil artificiel ? Sous quelle forme se manifestera son héritage ? Si le mystère plane toujours, Shannon Messenger s'apprête à nous faire quelques révélations explosives…",
      coverImage: "https://res.cloudinary.com/dxtfa4bcx/image/upload/v1772211436/T8.5_vvwsr2.png",
      coverImageCategorie: "https://res.cloudinary.com/dxtfa4bcx/image/upload/v1772211436/T8.5Categorie_nwpkhg.png",
    },
    {
      id: "tome-9",
      
      title: "Gardiens des cités perdues, Tome 9:",
      subtitle: "Lune stellaire",
      releaseDates: {
        grandFormat: "10/11/2022",
        poche: "02/10/2025",
      },
      excerptUrl: "/epub/tome9.epub",
      summary: "Sophie a frappé un grand coup. Lassée de  voir ses ennemis prendre sans cesse plusieurs longueurs d'avance sur elle, la jeune fille a même carrément mis le feu aux poudres en provoquant les Invisibles sur leurs propres terres. Hélas, à l'heure où  ses amis sont divisés et dispersés, alors qu'une crise interespèce menace, son audace risque bien de se retourner contre elle. Malgré le danger, ses instincts la poussent à enquêter sur le projet  Lune stellaire et sur Elyseus - qui pourrait bien être la clef de tout.  Mais au sein des Cités perdues, dévoiler la vérité exige toujours des sacrifices. Or les plans des Invisibles, qui se précisent peu à peu, se révèlent terrifiants. Il semblerait que tout le monde se soit trompé : le plus grand mensonge des elfes pourrait bien tout détruire… Dans la bataille qui s'annonce, une seule chose est sûre : rien ne sera jamais plus pareil. Dans ce neuvième tome de Gardiens des cités perdues, Sophie et ses amis s'apprêtent à découvrir la véritable signification du pouvoir - et du mal…",
      coverImage: "https://res.cloudinary.com/dxtfa4bcx/image/upload/v1772211433/T9_yn674h.png",
      coverImageCategorie: "https://res.cloudinary.com/dxtfa4bcx/image/upload/v1772211433/T9Categorie_h12ifa.png",
    },
    {
      id: "tome-9.5",
      
      title: "Gardiens des cités perdues, Tome 9.5:",
      subtitle: "Le Livre des révélations",
      releaseDates: {
        grandFormat: "10/11/2022",
        poche: "02/10/2025",
      },
      excerptUrl: "/epub/tome9.5.epub",
      summary: "Une lettre. C'est tout ce que Keefe a laissé à Sophie pour expliquer sa fugue après avoir découvert à quel point ses tout nouveaux pouvoirs étaient dangereux. La seule solution à ses yeux ? Quitter les Cités perdues afin d'assurer la sécurité de la jeune fille et de leurs amis. Mais qu'est-il véritablement arrivé au jeune elfe pendant que ses camarades tentaient de résoudre le mystère du projet Lune stellaire ? Où a-t-il disparu exactement ? Et qui a-t-il rencontré dans le monde des humains ? Les réponses dépassent de loin tout ce que l'on aurait pu imaginer... mais suffiront-elles à Keefe pour changer son destin ? Le passé et le présent s'entremêlent dans ce Livre des révélations. Car Keefe, le chouchou des fans de la série Gardiens des Cités perdues, s'apprête à exhumer les souvenirs enfouis dans sa mémoire altérée grâce à des alliés pour le moins inattendus...",
      coverImage: "https://res.cloudinary.com/dxtfa4bcx/image/upload/v1772211432/T9.5_hcwoan.png",
      coverImageCategorie: "https://res.cloudinary.com/dxtfa4bcx/image/upload/v1772211432/T9.5Categorie_gdlbin.png",
    },
    {
      id: "tome-10",
      
      title: "Gardiens des cités perdues, Tome 10:",
      subtitle: "Elyseus",
      releaseDates: {
        grandFormat: "Inconnu",
        poche: "Inconnu",
      },
      excerptUrl: "",
      summary: "",
      coverImage: "https://res.cloudinary.com/dxtfa4bcx/image/upload/v1772189700/T1_eykf7c.png",
      coverImageCategorie: "https://res.cloudinary.com/dxtfa4bcx/image/upload/v1772189704/T1Categorie_r5mpow.png",
    },
    
];
export const BOOKS_GRAPH_DATA: Book[] = [
  {
    id: "tome-vol-1-partie-1",
    
    title: "Gardiens des cités perdues, vol 1 partie 1",
    releaseDates: {
      date: "04/12/2025"
    },
    excerptUrl: "/epub/tome1p1.epub",
    summary: "Maintenant qu'elle sait qu'elle est une elfe, Sophie doit trouver sa place au sein du monde fantastique des Cités perdues. Mais des rumeurs de complot et des incendies mystérieux menacent de tout gâcher... L'univers baigné de magie créé par Shannon Messenger prend vie sous la forme d'un roman graphique haut en couleur. La célèbre série comme vous ne l'avez jamais vue !",
    coverImage: "https://res.cloudinary.com/dxtfa4bcx/image/upload/v1772211433/T1P1_oonxic.png",
    coverImageCategorie: "https://res.cloudinary.com/dxtfa4bcx/image/upload/v1772211433/T1P1Categorie_qbi4yz.png",
  },
 
  {
    id: "tome-vol-1-partie-2",
    
    title: "Gardiens des cités perdues, vol 1 partie 2",
    releaseDates: {
      date: "30/11/2023"
    },
    excerptUrl: "/epub/tome1p2.epub",
    summary: "Sophie Foster est un jeune fille d'étranges pouvoirs magiques qu'elle ne maîtrise pas vraiment. Quand elle découvre qu'elle est une elfe, c'est tout un monde fantastique, peuplé de créatures de toutes plus étonnantes les unes que les autres, qui s'offre à elle : celui des Cités perdues",
    coverImage: "https://res.cloudinary.com/dxtfa4bcx/image/upload/v1772211434/T1P2_qwh3dt.png",
    coverImageCategorie: "https://res.cloudinary.com/dxtfa4bcx/image/upload/v1772211434/T1P2Categorie_otfmxw.png",
  }, 
];