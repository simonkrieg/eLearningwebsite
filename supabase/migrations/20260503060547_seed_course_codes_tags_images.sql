/*
  # Seed course codes, tags, images, and learning outcomes

  Updates all seeded courses with:
  - course_code: Australian qualification code
  - tags: Feature badges shown on card
  - learning_outcomes: 3 bullet points shown on card
  - image_url: Pexels stock photo URL relevant to the topic
*/

-- AGED CARE / DISABILITY
UPDATE courses SET
  course_code = 'CHC33021',
  image_url = 'https://images.pexels.com/photos/7551617/pexels-photo-7551617.jpeg?auto=compress&cs=tinysrgb&w=800',
  tags = ARRAY['Nationally Recognised', 'NDIS Aligned', 'Fee-Free TAFE'],
  learning_outcomes = ARRAY['Apply person-centred care principles', 'Support daily living activities safely', 'Communicate effectively with clients and families']
WHERE slug = 'person-centred-care-foundations';

UPDATE courses SET
  course_code = 'CHC43121',
  image_url = 'https://images.pexels.com/photos/6303773/pexels-photo-6303773.jpeg?auto=compress&cs=tinysrgb&w=800',
  tags = ARRAY['Nationally Recognised', 'NDIS Aligned', 'Government Subsidised'],
  learning_outcomes = ARRAY['Understand the NDIS framework and supports', 'Implement individual support plans', 'Promote independence and community inclusion']
WHERE slug = 'disability-support-essentials';

UPDATE courses SET
  course_code = 'HLTMOV001',
  image_url = 'https://images.pexels.com/photos/6303607/pexels-photo-6303607.jpeg?auto=compress&cs=tinysrgb&w=800',
  tags = ARRAY['WHS Compliant', 'Practical Skills', 'Mandatory Training'],
  learning_outcomes = ARRAY['Apply safe manual handling techniques', 'Use assistive equipment correctly', 'Prevent workplace musculoskeletal injuries']
WHERE slug = 'manual-handling-support-workers';

UPDATE courses SET
  course_code = 'CHCAGE005',
  image_url = 'https://images.pexels.com/photos/7551442/pexels-photo-7551442.jpeg?auto=compress&cs=tinysrgb&w=800',
  tags = ARRAY['Nationally Recognised', 'Dementia Australia Aligned', 'CPD Points'],
  learning_outcomes = ARRAY['Recognise stages and symptoms of dementia', 'Apply dementia-friendly communication', 'Support dignity and quality of life']
WHERE slug = 'dementia-awareness-and-practice';

UPDATE courses SET
  course_code = 'CHCMHS001',
  image_url = 'https://images.pexels.com/photos/6303589/pexels-photo-6303589.jpeg?auto=compress&cs=tinysrgb&w=800',
  tags = ARRAY['Trauma-Informed', 'Nationally Recognised', 'Fee-Free TAFE'],
  learning_outcomes = ARRAY['Identify triggers and de-escalation strategies', 'Apply behaviour support plans', 'Maintain safe environments for clients and staff']
WHERE slug = 'managing-challenging-behaviours';

-- HEALTH / NURSING
UPDATE courses SET
  course_code = 'HLT54121',
  image_url = 'https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=800',
  tags = ARRAY['Nationally Recognised', 'AHPRA Aligned', 'Government Subsidised'],
  learning_outcomes = ARRAY['Apply foundational clinical skills', 'Understand nursing scope of practice', 'Support patient safety and quality care']
WHERE slug = 'introduction-to-nursing-practice';

UPDATE courses SET
  course_code = 'HLT37215',
  image_url = 'https://images.pexels.com/photos/3786157/pexels-photo-3786157.jpeg?auto=compress&cs=tinysrgb&w=800',
  tags = ARRAY['Nationally Recognised', 'Pathology Collect Endorsed', 'CPD Points'],
  learning_outcomes = ARRAY['Perform venepuncture and skin puncture safely', 'Manage specimen handling and transport', 'Apply infection control in collection procedures']
WHERE slug = 'pathology-collection-essentials';

UPDATE courses SET
  course_code = 'HLT33115',
  image_url = 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=800',
  tags = ARRAY['Nationally Recognised', 'Allied Health Focus', 'Fee-Free TAFE'],
  learning_outcomes = ARRAY['Support allied health professionals in clinical settings', 'Assist with therapy and rehabilitation activities', 'Maintain client records and documentation']
WHERE slug = 'allied-health-assistant-skills';

UPDATE courses SET
  course_code = 'HLTINF006',
  image_url = 'https://images.pexels.com/photos/4226219/pexels-photo-4226219.jpeg?auto=compress&cs=tinysrgb&w=800',
  tags = ARRAY['Mandatory Training', 'Nationally Recognised', 'CPD Points'],
  learning_outcomes = ARRAY['Apply standard and transmission-based precautions', 'Use PPE correctly in clinical environments', 'Manage clinical waste and contamination risks']
WHERE slug = 'infection-control-in-healthcare';

UPDATE courses SET
  course_code = 'HLTAAP001',
  image_url = 'https://images.pexels.com/photos/208512/pexels-photo-208512.jpeg?auto=compress&cs=tinysrgb&w=800',
  tags = ARRAY['Nationally Recognised', 'Medication Endorsed', 'CPD Points'],
  learning_outcomes = ARRAY['Understand medication classifications and schedules', 'Support administration under delegation', 'Identify adverse reactions and reporting requirements']
WHERE slug = 'medication-assistance-fundamentals';

-- EARLY CHILDHOOD EDUCATION
UPDATE courses SET
  course_code = 'CHC30121',
  image_url = 'https://images.pexels.com/photos/296301/pexels-photo-296301.jpeg?auto=compress&cs=tinysrgb&w=800',
  tags = ARRAY['Nationally Recognised', 'EYLF Aligned', 'Fee-Free TAFE'],
  learning_outcomes = ARRAY['Understand developmental milestones for children 0–8', 'Apply play-based learning principles', 'Support cognitive, social and physical development']
WHERE slug = 'child-development-foundations';

UPDATE courses SET
  course_code = 'CHCECE054',
  image_url = 'https://images.pexels.com/photos/1682497/pexels-photo-1682497.jpeg?auto=compress&cs=tinysrgb&w=800',
  tags = ARRAY['Nationally Recognised', 'SIDS Aware', 'Mandatory Training'],
  learning_outcomes = ARRAY['Apply evidence-based safe sleep practices', 'Implement settling routines for infants', 'Recognise signs of sleep disturbance and distress']
WHERE slug = 'safe-sleep-and-settling-practices';

UPDATE courses SET
  course_code = 'CHCDIV002',
  image_url = 'https://images.pexels.com/photos/1720186/pexels-photo-1720186.jpeg?auto=compress&cs=tinysrgb&w=800',
  tags = ARRAY['Nationally Recognised', 'Inclusive Education', 'Government Subsidised'],
  learning_outcomes = ARRAY['Promote inclusion for children with additional needs', 'Implement culturally responsive practices', 'Collaborate with families and support services']
WHERE slug = 'inclusive-practice-in-ecec';

UPDATE courses SET
  course_code = 'CHCECE055',
  image_url = 'https://images.pexels.com/photos/1001914/pexels-photo-1001914.jpeg?auto=compress&cs=tinysrgb&w=800',
  tags = ARRAY['Nationally Recognised', 'Trauma-Informed', 'Positive Guidance'],
  learning_outcomes = ARRAY['Apply positive behaviour guidance strategies', 'Understand triggers and emotional regulation', 'Engage families in consistent behaviour approaches']
WHERE slug = 'behaviour-guidance-for-educators';

UPDATE courses SET
  course_code = 'CHCECE056',
  image_url = 'https://images.pexels.com/photos/3861943/pexels-photo-3861943.jpeg?auto=compress&cs=tinysrgb&w=800',
  tags = ARRAY['Nationally Recognised', 'EYLF Aligned', 'NQF Standards'],
  learning_outcomes = ARRAY['Design intentional learning programs', 'Document children''s learning and development', 'Evaluate and improve curriculum planning']
WHERE slug = 'programming-and-planning-for-learning';

-- CONSTRUCTION
UPDATE courses SET
  course_code = 'CPCCWHS1001',
  image_url = 'https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=800',
  tags = ARRAY['White Card', 'Nationally Recognised', 'Mandatory Training'],
  learning_outcomes = ARRAY['Identify hazards and apply risk controls on site', 'Understand WHS legislation for construction', 'Participate in site safety management systems']
WHERE slug = 'whs-for-construction';

UPDATE courses SET
  course_code = 'RIIWHS204E',
  image_url = 'https://images.pexels.com/photos/544966/pexels-photo-544966.jpeg?auto=compress&cs=tinysrgb&w=800',
  tags = ARRAY['Nationally Recognised', 'High Risk Licence', 'Mandatory Training'],
  learning_outcomes = ARRAY['Plan and prepare for working at heights', 'Select and use fall arrest systems', 'Rescue and emergency procedures at height']
WHERE slug = 'working-at-heights';

UPDATE courses SET
  course_code = 'CPCCBC4051',
  image_url = 'https://images.pexels.com/photos/3760529/pexels-photo-3760529.jpeg?auto=compress&cs=tinysrgb&w=800',
  tags = ARRAY['Nationally Recognised', 'SafeWork Aligned', 'CPD Points'],
  learning_outcomes = ARRAY['Identify asbestos-containing materials on site', 'Apply safe handling and reporting procedures', 'Comply with state asbestos regulations']
WHERE slug = 'asbestos-awareness';

UPDATE courses SET
  course_code = 'CPCCBC4010',
  image_url = 'https://images.pexels.com/photos/834892/pexels-photo-834892.jpeg?auto=compress&cs=tinysrgb&w=800',
  tags = ARRAY['Nationally Recognised', 'Trade Skills', 'Government Subsidised'],
  learning_outcomes = ARRAY['Interpret architectural and structural drawings', 'Understand dimensions, scales and symbols', 'Apply plans to estimate materials and scope']
WHERE slug = 'reading-construction-plans';

UPDATE courses SET
  course_code = 'RIIWHS302E',
  image_url = 'https://images.pexels.com/photos/3806753/pexels-photo-3806753.jpeg?auto=compress&cs=tinysrgb&w=800',
  tags = ARRAY['Nationally Recognised', 'Traffic Management', 'Licence Required'],
  learning_outcomes = ARRAY['Develop traffic management plans', 'Set up and control work zone traffic', 'Maintain traffic control signage and devices']
WHERE slug = 'traffic-management-fundamentals';

-- ELECTROTECHNOLOGY / CLEAN ENERGY
UPDATE courses SET
  course_code = 'UEE22020',
  image_url = 'https://images.pexels.com/photos/9875441/pexels-photo-9875441.jpeg?auto=compress&cs=tinysrgb&w=800',
  tags = ARRAY['Nationally Recognised', 'Clean Energy Council', 'Fee-Free TAFE'],
  learning_outcomes = ARRAY['Design and size residential solar PV systems', 'Install and commission solar arrays safely', 'Comply with AS/NZS wiring and grid standards']
WHERE slug = 'solar-pv-installation-essentials';

UPDATE courses SET
  course_code = 'UEENEEE101A',
  image_url = 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=800',
  tags = ARRAY['Nationally Recognised', 'Electrotechnology', 'Industry Endorsed'],
  learning_outcomes = ARRAY['Apply safe working practices with electricity', 'Use test instruments and measuring devices', 'Interpret and apply electrical regulations']
WHERE slug = 'electrical-safety-fundamentals';

UPDATE courses SET
  course_code = 'UEE40420',
  image_url = 'https://images.pexels.com/photos/1166209/pexels-photo-1166209.jpeg?auto=compress&cs=tinysrgb&w=800',
  tags = ARRAY['Nationally Recognised', 'Smart Grid', 'Government Subsidised'],
  learning_outcomes = ARRAY['Configure and commission battery storage systems', 'Integrate storage with solar and grid systems', 'Apply energy monitoring and control strategies']
WHERE slug = 'battery-storage-and-energy-management';

UPDATE courses SET
  course_code = 'UEEEL0011',
  image_url = 'https://images.pexels.com/photos/110844/pexels-photo-110844.jpeg?auto=compress&cs=tinysrgb&w=800',
  tags = ARRAY['Nationally Recognised', 'EV Infrastructure', 'Emerging Technology'],
  learning_outcomes = ARRAY['Understand EV charging standards and infrastructure', 'Install and test EV charging equipment', 'Commission and fault-find EV charge points']
WHERE slug = 'ev-charging-infrastructure';

UPDATE courses SET
  course_code = 'CPP30519',
  image_url = 'https://images.pexels.com/photos/433308/pexels-photo-433308.jpeg?auto=compress&cs=tinysrgb&w=800',
  tags = ARRAY['Nationally Recognised', 'NCC Aligned', 'CPD Points'],
  learning_outcomes = ARRAY['Apply NCC energy efficiency requirements', 'Assess building envelope and insulation performance', 'Produce energy compliance documentation']
WHERE slug = 'energy-efficiency-and-green-building';

-- DIGITAL / IT / CYBER
UPDATE courses SET
  course_code = 'ICT50220',
  image_url = 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=800',
  tags = ARRAY['Nationally Recognised', 'ASD Aligned', 'Government Subsidised'],
  learning_outcomes = ARRAY['Identify and assess cyber threats and vulnerabilities', 'Implement security controls and countermeasures', 'Respond to security incidents and breaches']
WHERE slug = 'cybersecurity-essentials';

UPDATE courses SET
  course_code = 'ICT40120',
  image_url = 'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=800',
  tags = ARRAY['Nationally Recognised', 'Cloud Platforms', 'Fee-Free TAFE'],
  learning_outcomes = ARRAY['Design and deploy cloud infrastructure solutions', 'Configure cloud networking and security', 'Manage cloud costs and resource optimisation']
WHERE slug = 'cloud-computing-fundamentals';

UPDATE courses SET
  course_code = 'BSBINS601',
  image_url = 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=800',
  tags = ARRAY['Nationally Recognised', 'Privacy Act Aligned', 'CPD Points'],
  learning_outcomes = ARRAY['Understand Australian data privacy legislation', 'Apply data governance frameworks', 'Manage data breaches and reporting obligations']
WHERE slug = 'data-privacy-and-governance';

UPDATE courses SET
  course_code = 'ICT30120',
  image_url = 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=800',
  tags = ARRAY['Nationally Recognised', 'Programming Skills', 'Government Subsidised'],
  learning_outcomes = ARRAY['Write and debug code using Python and web languages', 'Apply software development methodologies', 'Build and test simple applications']
WHERE slug = 'programming-and-software-development';

UPDATE courses SET
  course_code = 'ICT50120',
  image_url = 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800',
  tags = ARRAY['Nationally Recognised', 'AI & Automation', 'Emerging Technology'],
  learning_outcomes = ARRAY['Apply AI and machine learning concepts', 'Use data analytics tools and visualisation', 'Interpret data to support business decisions']
WHERE slug = 'ai-and-data-analytics';

-- TRAINING & ASSESSMENT / VET
UPDATE courses SET
  course_code = 'TAE40122',
  image_url = 'https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=800',
  tags = ARRAY['Nationally Recognised', 'Stackable Skill Sets', 'Government Subsidised'],
  learning_outcomes = ARRAY['Design and develop learning programs and resources', 'Deliver and facilitate training in the VET sector', 'Develop and conduct competency-based assessments']
WHERE slug = 'certificate-iv-training-and-assessment';

UPDATE courses SET
  course_code = 'TAEASS502',
  image_url = 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
  tags = ARRAY['Nationally Recognised', 'RTO Compliance', 'CPD Points'],
  learning_outcomes = ARRAY['Design valid and reliable assessment tools', 'Map assessments to training package requirements', 'Apply principles of reasonable adjustment']
WHERE slug = 'design-assessment-tools';

UPDATE courses SET
  course_code = 'TAEDEL401',
  image_url = 'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=800',
  tags = ARRAY['Nationally Recognised', 'Facilitation Skills', 'Industry Endorsed'],
  learning_outcomes = ARRAY['Plan and prepare training programs', 'Facilitate group-based and one-on-one learning', 'Evaluate training effectiveness and learner progress']
WHERE slug = 'facilitate-work-based-learning';

UPDATE courses SET
  course_code = 'TAEASS401',
  image_url = 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=800',
  tags = ARRAY['Nationally Recognised', 'RPL Endorsed', 'CPD Points'],
  learning_outcomes = ARRAY['Plan and organise recognition of prior learning assessments', 'Gather and evaluate evidence of competency', 'Make and document RPL assessment decisions']
WHERE slug = 'rpl-and-competency-assessment';

UPDATE courses SET
  course_code = 'TAEASS502',
  image_url = 'https://images.pexels.com/photos/3184398/pexels-photo-3184398.jpeg?auto=compress&cs=tinysrgb&w=800',
  tags = ARRAY['Nationally Recognised', 'eLearning Design', 'Government Subsidised'],
  learning_outcomes = ARRAY['Apply instructional design models to digital learning', 'Create engaging eLearning content and activities', 'Evaluate and improve online learning experiences']
WHERE slug = 'instructional-design-for-elearning';

-- HOSPITALITY / TOURISM
UPDATE courses SET
  course_code = 'SIT30821',
  image_url = 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=800',
  tags = ARRAY['Nationally Recognised', 'Kitchen Practical', 'Fee-Free TAFE'],
  learning_outcomes = ARRAY['Prepare and present food to commercial standards', 'Apply food safety and hygiene practices', 'Work efficiently in a commercial kitchen environment']
WHERE slug = 'commercial-cookery-fundamentals';

UPDATE courses SET
  course_code = 'SITXFSA005',
  image_url = 'https://images.pexels.com/photos/3170611/pexels-photo-3170611.jpeg?auto=compress&cs=tinysrgb&w=800',
  tags = ARRAY['Nationally Recognised', 'Food Handler Card', 'Mandatory Training'],
  learning_outcomes = ARRAY['Follow food safety procedures and hygiene practices', 'Identify temperature danger zones and controls', 'Maintain food safety records and documentation']
WHERE slug = 'food-safety-supervisor';

UPDATE courses SET
  course_code = 'SITHFAB021',
  image_url = 'https://images.pexels.com/photos/1283219/pexels-photo-1283219.jpeg?auto=compress&cs=tinysrgb&w=800',
  tags = ARRAY['Nationally Recognised', 'RSA Endorsed', 'Mandatory Training'],
  learning_outcomes = ARRAY['Provide responsible alcohol service to patrons', 'Identify and manage intoxicated patrons', 'Comply with Australian liquor licensing laws']
WHERE slug = 'responsible-service-of-alcohol';

UPDATE courses SET
  course_code = 'SIT50422',
  image_url = 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800',
  tags = ARRAY['Nationally Recognised', 'Revenue Management', 'Government Subsidised'],
  learning_outcomes = ARRAY['Manage front office and housekeeping operations', 'Apply revenue management and pricing strategies', 'Deliver exceptional guest service experiences']
WHERE slug = 'hotel-and-accommodation-management';

UPDATE courses SET
  course_code = 'SIT40122',
  image_url = 'https://images.pexels.com/photos/1537640/pexels-photo-1537640.jpeg?auto=compress&cs=tinysrgb&w=800',
  tags = ARRAY['Nationally Recognised', 'Barista Certified', 'Industry Endorsed'],
  learning_outcomes = ARRAY['Prepare espresso-based beverages to café standards', 'Operate and maintain commercial coffee equipment', 'Deliver consistent quality and customer service']
WHERE slug = 'coffee-and-barista-skills';

-- TRANSPORT / LOGISTICS
UPDATE courses SET
  course_code = 'TLI31221',
  image_url = 'https://images.pexels.com/photos/1427541/pexels-photo-1427541.jpeg?auto=compress&cs=tinysrgb&w=800',
  tags = ARRAY['Nationally Recognised', 'Chain of Responsibility', 'Government Subsidised'],
  learning_outcomes = ARRAY['Apply chain of responsibility obligations', 'Manage freight documentation and compliance', 'Optimise load planning and vehicle utilisation']
WHERE slug = 'road-transport-and-freight-operations';

UPDATE courses SET
  course_code = 'TLID0013',
  image_url = 'https://images.pexels.com/photos/906494/pexels-photo-906494.jpeg?auto=compress&cs=tinysrgb&w=800',
  tags = ARRAY['High Risk Licence', 'Nationally Recognised', 'Mandatory Training'],
  learning_outcomes = ARRAY['Operate forklift equipment safely and efficiently', 'Apply load handling and stacking principles', 'Perform pre-start checks and maintenance inspections']
WHERE slug = 'forklift-operations-and-licensing';

UPDATE courses SET
  course_code = 'TLI41422',
  image_url = 'https://images.pexels.com/photos/4481259/pexels-photo-4481259.jpeg?auto=compress&cs=tinysrgb&w=800',
  tags = ARRAY['Nationally Recognised', 'Supply Chain', 'Industry Endorsed'],
  learning_outcomes = ARRAY['Analyse and optimise supply chain processes', 'Implement inventory management systems', 'Manage supplier relationships and procurement']
WHERE slug = 'supply-chain-and-inventory-management';

UPDATE courses SET
  course_code = 'TLID2010',
  image_url = 'https://images.pexels.com/photos/4483610/pexels-photo-4483610.jpeg?auto=compress&cs=tinysrgb&w=800',
  tags = ARRAY['Nationally Recognised', 'Dangerous Goods', 'Mandatory Training'],
  learning_outcomes = ARRAY['Classify and handle dangerous goods safely', 'Apply ADG Code requirements for transport', 'Complete dangerous goods documentation']
WHERE slug = 'dangerous-goods-and-hazmat-transport';

UPDATE courses SET
  course_code = 'TLI50421',
  image_url = 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800',
  tags = ARRAY['Nationally Recognised', 'Port Operations', 'Government Subsidised'],
  learning_outcomes = ARRAY['Manage import and export customs processes', 'Coordinate port and stevedoring operations', 'Apply maritime transport regulations and compliance']
WHERE slug = 'port-and-maritime-logistics';

-- MANUFACTURING / DEFENCE
UPDATE courses SET
  course_code = 'MSS40322',
  image_url = 'https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=800',
  tags = ARRAY['Nationally Recognised', 'Lean Manufacturing', 'Government Subsidised'],
  learning_outcomes = ARRAY['Apply lean and continuous improvement methodologies', 'Identify and eliminate waste in production processes', 'Lead process improvement projects on the shop floor']
WHERE slug = 'lean-manufacturing-and-continuous-improvement';

UPDATE courses SET
  course_code = 'MEM40105',
  image_url = 'https://images.pexels.com/photos/3862627/pexels-photo-3862627.jpeg?auto=compress&cs=tinysrgb&w=800',
  tags = ARRAY['Nationally Recognised', 'Advanced Manufacturing', 'Industry Endorsed'],
  learning_outcomes = ARRAY['Set up and operate CNC machining equipment', 'Read and interpret engineering drawings', 'Apply quality control and measurement techniques']
WHERE slug = 'advanced-manufacturing-and-cnc-operations';

UPDATE courses SET
  course_code = 'DEF40120',
  image_url = 'https://images.pexels.com/photos/2098624/pexels-photo-2098624.jpeg?auto=compress&cs=tinysrgb&w=800',
  tags = ARRAY['Defence Industry', 'Security Clearance Pathway', 'Sovereign Capability'],
  learning_outcomes = ARRAY['Understand Australian defence industry structure', 'Apply security and compliance requirements', 'Support sovereign capability development programs']
WHERE slug = 'defence-industry-fundamentals';

UPDATE courses SET
  course_code = 'MEM30219',
  image_url = 'https://images.pexels.com/photos/1108117/pexels-photo-1108117.jpeg?auto=compress&cs=tinysrgb&w=800',
  tags = ARRAY['Nationally Recognised', 'Quality Systems', 'Industry Endorsed'],
  learning_outcomes = ARRAY['Implement quality management systems in manufacturing', 'Apply ISO 9001 principles and documentation', 'Conduct audits and non-conformance reporting']
WHERE slug = 'quality-management-in-manufacturing';

UPDATE courses SET
  course_code = 'MSA30220',
  image_url = 'https://images.pexels.com/photos/236722/pexels-photo-236722.jpeg?auto=compress&cs=tinysrgb&w=800',
  tags = ARRAY['Nationally Recognised', 'WHS Compliant', 'Mandatory Training'],
  learning_outcomes = ARRAY['Apply WHS procedures specific to manufacturing', 'Identify and control hazardous machine guarding', 'Respond to workplace incidents and emergencies']
WHERE slug = 'workplace-health-and-safety-manufacturing';
