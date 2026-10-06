import { ServiceItem, ClientItem, WhyChooseItem } from '../types';

export const COMPANY_DETAILS = {
  name: 'MANYA ENTERPRISE',
  tagline: 'Industrial ETP & Environmental Solutions',
  subheading: 'Professional solutions for ETP plant setup, chemical supply, Bectofine bio-culture, chlorination systems, air diffuser systems, and industrial support services.',
  contactPerson: 'Nipul Mistry',
  gstin: '24BDKPM8520M1Z6',
  phones: [
    { display: '+91 9998378352', raw: '+919998378352' },
    { display: '+91 8490818651', raw: '+918490818651' },
  ],
  email: 'manyaenterprise2011@gamil.com',
  location: {
    village: 'AT & PO. Umaraya',
    taluka: 'Ta. Padra',
    district: 'Dist. Vadodara',
    state: 'Gujarat',
    pin: '391440',
    country: 'India',
    fullAddress: 'AT & PO. Umaraya, Ta. Padra, Dist. Vadodara, Gujarat - 391440, India'
  }
};

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'etp-plant-setup',
    number: '01',
    title: 'ETP Plant Setup',
    tag: 'Engineering & Installation',
    shortDescription: 'Comprehensive Effluent Treatment Plant (ETP) setup and execution solutions tailored to industrial wastewater discharge standards.',
    fullDescription: 'Manya Enterprise provides turnkey and modular Effluent Treatment Plant (ETP) setup services for diverse industrial facilities. We support end-to-end plant setup requirements including primary, secondary, and tertiary treatment system configurations, flow distribution civil/mechanical integration, and regulatory discharge alignment.',
    features: [
      'Customized plant capacity and layout planning',
      'Effluent characterization and process flow configuration',
      'Civil, mechanical, and piping assembly support',
      'Commissioning, trial run, and discharge parameter stabilization'
    ],
    inquiryServiceValue: 'ETP Plant Setup',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'etp-chemical-supply',
    number: '02',
    title: 'ETP Chemical Supply',
    tag: 'Specialty Chemicals',
    shortDescription: 'Reliable supply of coagulants, flocculants, neutralizing agents, and specialized treatment chemicals for optimal wastewater treatment.',
    fullDescription: 'We ensure a continuous and dependable supply of high-grade industrial treatment chemicals essential for efficient ETP functioning. From coagulation and flocculation chemicals to pH correction and color removal agents, our chemical solutions help industries achieve consistent settling and compliance.',
    features: [
      'Alum, PAC (Poly Aluminium Chloride), and coagulant supply',
      'Polyelectrolytes (Anionic, Cationic & Non-ionic flocculants)',
      'Lime, caustic soda, and acid neutralization chemicals',
      'De-foaming agents and specialized oxidizing formulations'
    ],
    inquiryServiceValue: 'ETP Chemical Supply',
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'chlorination-plant-supply',
    number: '03',
    title: 'Chlorination Plant Supply',
    tag: 'Disinfection & Sanitization',
    shortDescription: 'Gas and liquid chlorination plant systems, dosing pumps, and safety-certified hardware for industrial water disinfection.',
    fullDescription: 'Manya Enterprise supplies complete chlorination plant assemblies, gas chlorinators, electro-chlorination units, and automated chemical dosing systems. Designed for industrial treated water sanitization, cooling water conditioning, and biological control in secondary treatment effluents.',
    features: [
      'Gas chlorination and dosing skid supplies',
      'Sodium hypochlorite automated dosing systems',
      'Corrosion-resistant injectors, rotameters, and vacuum regulators',
      'Safety valves and process instrumentation hardware'
    ],
    inquiryServiceValue: 'Chlorination Plant',
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'air-diffuser-system',
    number: '04',
    title: 'Air Diffuser System',
    tag: 'Aeration Technology',
    shortDescription: 'High-efficiency fine bubble and coarse bubble air diffuser systems for aerobic biological aeration tanks in ETP plants.',
    fullDescription: 'Our industrial air diffuser system supplies provide elevated oxygen transfer efficiency (OTE) and uniform bubble distribution within aeration basins. We supply tubular, disc, and strip diffusers constructed with durable EPDM and silicone membranes resistant to harsh industrial effluents.',
    features: [
      'Fine bubble disc and tube membrane diffusers',
      'Coarse bubble diffusers for equalisation and mixing tanks',
      'Corrosion-proof UPVC and SS header grid assemblies',
      'High energy conservation through optimal oxygen dissolved rates'
    ],
    inquiryServiceValue: 'Air Diffuser System',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'labor-supply',
    number: '05',
    title: 'Labor Supply',
    tag: 'Manpower & Plant Operations',
    shortDescription: 'Trained technical manpower, plant operators, maintenance crews, and skilled labor for industrial and ETP facility support.',
    fullDescription: 'We provide vetted, safety-conscious, and experienced industrial manpower support for round-the-clock ETP operations, regular maintenance, chemical batch preparation, and facility support services. Our staffing solutions help manufacturing units ensure uninterrupted plant operation.',
    features: [
      'Certified ETP plant operators and shift technicians',
      'Skilled labor for chemical handling and tank desiltation',
      'Preventive mechanical maintenance and pipeline support crews',
      'Flexible deployment for short-term projects or annual contracts'
    ],
    inquiryServiceValue: 'Labor Supply',
    image: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'bectofine-bio-culture',
    number: '06',
    title: 'Bectofine Bio-Culture',
    tag: 'Microbial & Biological Treatment',
    shortDescription: 'High-potency bacterial bio-culture and enzyme formulation for accelerated COD/BOD reduction, biomass stabilization, and odor control in ETP plants.',
    fullDescription: 'Manya Enterprise supplies specialized Bectofine bio-culture formulations engineered for industrial effluent treatment plants (ETP) and sewage treatment systems. Composed of synergistically blended, non-pathogenic aerobic and facultative bacterial strains, Bectofine accelerates organic matter digestion, develops active MLSS in aeration basins, suppresses foul hydrogen sulfide odors, and swiftly restores biological equilibrium following hydraulic or chemical shock loads.',
    features: [
      'High-potency bacterial consortia for rapid COD and BOD reduction',
      'Accelerated MLSS (Mixed Liquor Suspended Solids) cultivation in aeration tanks',
      'Suppression of foul odors, mercaptans, and hydrogen sulfide (H2S) gases',
      'Rapid recovery and biological restoration following toxic shock loads',
      'Proven efficacy across chemical, pharmaceutical, dairy, textile, and dye effluents'
    ],
    inquiryServiceValue: 'Bectofine',
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1200&q=80'
  }
];

export const CLIENTS_DATA: ClientItem[] = [
  { id: 'client-1', number: '01', name: 'Colorband', category: 'Chemical & Dyestuff Industry', initials: 'CB' },
  { id: 'client-2', number: '02', name: 'Banas Dairy', category: 'Dairy & Food Processing Sector', initials: 'BD' },
  { id: 'client-3', number: '03', name: 'Meghmani Industries', category: 'Agrochemical & Pigment Manufacturing', initials: 'MI' },
  { id: 'client-4', number: '04', name: 'Tymk', category: 'Industrial Manufacturing', initials: 'TM' },
  { id: 'client-5', number: '05', name: 'Dyne Chemical LLP', category: 'Specialty Chemical Processing', initials: 'DC' },
  { id: 'client-6', number: '06', name: 'Praj Industries', category: 'Process Engineering & Biotechnology', initials: 'PI' },
  { id: 'client-7', number: '07', name: 'Kiri Industries', category: 'Dyes & Basic Chemical Manufacturing', initials: 'KI' },
];

export const WHY_CHOOSE_ITEMS: WhyChooseItem[] = [
  {
    id: 'wc-1',
    title: 'Professional Approach',
    description: 'We conduct all operations with strict commercial integrity, rigorous planning, disciplined execution, and dependable coordination.',
    iconName: 'Briefcase'
  },
  {
    id: 'wc-2',
    title: 'Quality-Focused Service',
    description: 'Commitment to high-grade industrial equipment, certified treatment chemicals, and precision-engineered installation standards.',
    iconName: 'ShieldCheck'
  },
  {
    id: 'wc-3',
    title: 'Industrial Solutions',
    description: 'Tailored industrial solutions spanning wastewater treatment plant setup, biological aeration, chlorination, and reliable chemical supplies.',
    iconName: 'Factory'
  },
  {
    id: 'wc-4',
    title: 'Reliable Support',
    description: 'Prompt communication, dependable technical assistance, and continuous service availability for critical plant requirements.',
    iconName: 'Headphones'
  },
  {
    id: 'wc-5',
    title: 'Customer-Oriented Service',
    description: 'A service model designed around understanding precise customer facility needs, prompt query resolution, and clear proposals.',
    iconName: 'Users'
  },
  {
    id: 'wc-6',
    title: 'Environmental Responsibility',
    description: 'Dedicated focus on sustainable water stewardship, industrial effluent treatment efficiency, and helping industries meet environmental standards.',
    iconName: 'Leaf'
  },
];
