/*
  # Clear all tags and seed learning outcomes for all courses

  1. Changes
    - Sets tags = '{}' on every course (removes all tag pills sitewide)
    - Adds 3 specific, realistic learning outcomes per course for all ~40 courses
  2. No schema changes — data update only
*/

-- Clear all tags sitewide
UPDATE courses SET tags = '{}';

-- Seed learning outcomes per course
UPDATE courses SET learning_outcomes = ARRAY['Identify and control electrical hazards in the workplace','Apply relevant Australian standards for electrical safety','Conduct and document electrical safety inspections'] WHERE title = 'Electrical Safety Essentials';

UPDATE courses SET learning_outcomes = ARRAY['Apply HACCP principles to food handling and storage','Identify and manage food safety hazards in commercial settings','Meet supervisor obligations under Australian food safety law'] WHERE title = 'Food Safety Supervisor Essentials';

UPDATE courses SET learning_outcomes = ARRAY['Design and deliver engaging group learning sessions','Apply adult learning principles to facilitation practice','Manage group dynamics and difficult behaviours in training'] WHERE title = 'Facilitation Skills for Trainers';

UPDATE courses SET learning_outcomes = ARRAY['Understand developmental milestones for children 0–8','Apply play-based learning principles','Support cognitive, social and physical development'] WHERE title = 'Child Development Foundations';

UPDATE courses SET learning_outcomes = ARRAY['Apply ISO 9001 quality management principles to manufacturing processes','Use quality control tools including SPC and root cause analysis','Manage non-conformances and drive continuous improvement'] WHERE title = 'Quality Management in Manufacturing';

UPDATE courses SET learning_outcomes = ARRAY['Identify common cyber threats including phishing, ransomware and social engineering','Apply safe password, device and network practices','Respond appropriately to a suspected security incident'] WHERE title = 'Cyber Security Awareness for Business';

UPDATE courses SET learning_outcomes = ARRAY['Understand the scope of enrolled nursing practice in Australia','Apply clinical reasoning to patient assessment and care planning','Communicate effectively within multidisciplinary healthcare teams'] WHERE title = 'Introduction to Nursing Practice';

UPDATE courses SET learning_outcomes = ARRAY['Apply person-centred care principles','Support daily living activities safely','Communicate effectively with clients and families'] WHERE title = 'Person-Centred Care Foundations';

UPDATE courses SET learning_outcomes = ARRAY['Understand chain of responsibility obligations under the HVNL','Identify your role and liability in the transport supply chain','Implement practical CoR compliance measures in your organisation'] WHERE title = 'Chain of Responsibility Essentials';

UPDATE courses SET learning_outcomes = ARRAY['Apply WHS legislation and codes of practice on construction sites','Conduct hazard identification and risk assessments','Fulfil duties as a worker, supervisor or officer under the WHS Act'] WHERE title = 'Work Health and Safety for Construction';

UPDATE courses SET learning_outcomes = ARRAY['Implement 5S methodology to organise and sustain a clean workplace','Apply Lean principles to eliminate waste and improve flow','Lead a Kaizen event to achieve measurable workplace improvements'] WHERE title = 'Lean and 5S Workplace Principles';

UPDATE courses SET learning_outcomes = ARRAY['Design valid and reliable assessment tools aligned to unit requirements','Apply principles of assessment including fairness and flexibility','Conduct and document assessment validation processes'] WHERE title = 'Assessment Design and Validation';

UPDATE courses SET learning_outcomes = ARRAY['Identify forklift hazards and apply pre-operational safety checks','Understand operator licensing and duty of care obligations','Apply safe load handling and pedestrian separation practices'] WHERE title = 'Forklift Safety Awareness';

UPDATE courses SET learning_outcomes = ARRAY['Understand the NDIS framework and supports','Implement individual support plans','Promote independence and community inclusion'] WHERE title = 'Disability Support Essentials';

UPDATE courses SET learning_outcomes = ARRAY['Apply standard and transmission-based infection control precautions','Implement hand hygiene and PPE protocols correctly','Manage infection risks in clinical and community healthcare settings'] WHERE title = 'Infection Control in Healthcare Settings';

UPDATE courses SET learning_outcomes = ARRAY['Understand solar PV system components and how they work together','Read and interpret system specifications and electrical diagrams','Apply basic commissioning and safety checks for rooftop PV systems'] WHERE title = 'Solar PV System Fundamentals';

UPDATE courses SET learning_outcomes = ARRAY['Apply safe sleep guidelines in line with current SIDS and SUDI evidence','Implement culturally sensitive and responsive settling strategies','Communicate safe sleep practices clearly with families and carers'] WHERE title = 'Safe Sleep and Settling Practices';

UPDATE courses SET learning_outcomes = ARRAY['Apply RSA legislation and identify intoxicated patrons','Refuse service appropriately and manage challenging situations','Understand your obligations and liability under liquor licensing laws'] WHERE title = 'Responsible Service of Alcohol';

UPDATE courses SET learning_outcomes = ARRAY['Use Microsoft 365 applications including Teams, Outlook and SharePoint effectively','Collaborate and share documents securely in a cloud environment','Automate routine tasks using Power Automate and Excel tools'] WHERE title = 'Microsoft 365 Productivity Essentials';

UPDATE courses SET learning_outcomes = ARRAY['Identify working at heights hazards and applicable legislative requirements','Select and inspect fall arrest and restraint equipment correctly','Plan and implement a safe system of work for heights tasks'] WHERE title = 'Working at Heights Awareness';

UPDATE courses SET learning_outcomes = ARRAY['Understand medication classifications and schedules','Support administration under delegation','Identify adverse reactions and reporting requirements'] WHERE title = 'Medication Assistance Fundamentals';

UPDATE courses SET learning_outcomes = ARRAY['Apply the Disability Discrimination Act and ECEC inclusion frameworks','Design learning environments and programs that support all children','Implement reasonable adjustments for children with additional needs'] WHERE title = 'Inclusive Practice in Early Childhood';

UPDATE courses SET learning_outcomes = ARRAY['Identify asbestos-containing materials common in Australian construction','Understand the health risks and legal obligations around asbestos','Apply correct procedures when asbestos is identified or disturbed'] WHERE title = 'Asbestos Awareness for Construction Workers';

UPDATE courses SET learning_outcomes = ARRAY['Apply safe manual handling techniques','Use assistive equipment correctly','Prevent workplace musculoskeletal injuries'] WHERE title = 'Manual Handling for Support Workers';

UPDATE courses SET learning_outcomes = ARRAY['Operate commercial espresso equipment to produce quality espresso','Steam and texture milk to achieve correct temperature and consistency','Maintain equipment hygiene and manage a busy service environment'] WHERE title = 'Barista and Coffee Essentials';

UPDATE courses SET learning_outcomes = ARRAY['Understand battery storage technologies and their role in clean energy systems','Interpret system designs and safety requirements for battery installations','Apply commissioning and maintenance checks to battery storage systems'] WHERE title = 'Battery Storage and Clean Energy Systems';

UPDATE courses SET learning_outcomes = ARRAY['Classify dangerous goods using the ADG Code and GHS system','Apply packing, labelling and placarding requirements for transport','Implement emergency response procedures for DG incidents'] WHERE title = 'Dangerous Goods Handling and Transport';

UPDATE courses SET learning_outcomes = ARRAY['Design effective online and blended learning experiences','Select appropriate digital tools and platforms for learner engagement','Apply accessibility principles to online course design and delivery'] WHERE title = 'Delivering Online and Blended Learning';

UPDATE courses SET learning_outcomes = ARRAY['Understand core cloud computing concepts including IaaS, PaaS and SaaS','Compare major cloud providers and their key services','Apply cloud security and data management best practices'] WHERE title = 'Introduction to Cloud Computing';

UPDATE courses SET learning_outcomes = ARRAY['Identify machinery hazards and apply guarding principles under Australian standards','Conduct pre-start checks and lockout/tagout procedures','Understand operator and employer responsibilities for machinery safety'] WHERE title = 'Safe Use of Machinery and Guarding';

UPDATE courses SET learning_outcomes = ARRAY['Understand the key obligations under the Australian Privacy Act 1988','Identify and manage personal information in compliance with the APPs','Respond to data breaches and privacy complaints effectively'] WHERE title = 'Data Privacy and the Australian Privacy Act';

UPDATE courses SET learning_outcomes = ARRAY['Apply warehouse safety procedures including traffic management and housekeeping','Conduct induction activities for new workers entering a warehouse environment','Identify and report hazards using site-specific safety systems'] WHERE title = 'Warehouse Induction and Safety';

UPDATE courses SET learning_outcomes = ARRAY['Contextualise training and assessment resources to meet workplace needs','Apply RTO requirements when modifying learning materials','Document contextualisation decisions for compliance and validation purposes'] WHERE title = 'Contextualising Training Resources';

UPDATE courses SET learning_outcomes = ARRAY['Interpret architectural and structural drawings','Understand dimensions, scales and symbols','Apply plans to estimate materials and scope'] WHERE title = 'Reading and Interpreting Construction Plans';

UPDATE courses SET learning_outcomes = ARRAY['Apply evidence-based behaviour guidance strategies in ECEC settings','Understand the role of environment and routine in behaviour support','Document and communicate behaviour concerns to families and support services'] WHERE title = 'Behaviour Guidance for ECEC Educators';

UPDATE courses SET learning_outcomes = ARRAY['Understand the stages and impact of dementia on cognition and behaviour','Apply person-centred and responsive care strategies for people with dementia','Support families and carers with communication and emotional wellbeing'] WHERE title = 'Dementia Awareness and Responsive Practice';

UPDATE courses SET learning_outcomes = ARRAY['Perform venepuncture and skin puncture safely','Manage specimen handling and transport','Apply infection control in collection procedures'] WHERE title = 'Pathology Collection Essentials';

UPDATE courses SET learning_outcomes = ARRAY['Understand the principles and objectives of sovereign supply chain strategy','Identify critical dependencies and vulnerabilities in Australian supply chains','Apply risk management frameworks to sourcing and logistics decisions'] WHERE title = 'Sovereign Supply Chain Awareness';

UPDATE courses SET learning_outcomes = ARRAY['Understand EV charging infrastructure types, standards and grid requirements','Interpret installation specifications for AC and DC charging equipment','Apply safety and compliance requirements for EV charging installations'] WHERE title = 'EV Charging Infrastructure Basics';

UPDATE courses SET learning_outcomes = ARRAY['Deliver professional front of house service across dining and events','Handle customer complaints and difficult situations with confidence','Apply food safety and RSA obligations in a front of house role'] WHERE title = 'Front of House Service Skills';

UPDATE courses SET learning_outcomes = ARRAY['Diagnose and resolve common hardware, software and network issues','Apply ITIL-aligned processes for incident logging and resolution','Communicate technical solutions clearly to non-technical end users'] WHERE title = 'IT Helpdesk and Support Fundamentals';

UPDATE courses SET learning_outcomes = ARRAY['Support allied health professionals in clinical settings','Assist with therapy and rehabilitation activities','Maintain client records and documentation'] WHERE title = 'Allied Health Assistant Skills';

UPDATE courses SET learning_outcomes = ARRAY['Apply food safety and hygiene practices in a commercial kitchen environment','Identify and manage kitchen hazards including burns, cuts and chemical exposure','Maintain a clean and compliant kitchen to meet food safety standards'] WHERE title = 'Commercial Kitchen Safety and Hygiene';

UPDATE courses SET learning_outcomes = ARRAY['Apply the Load Restraint Guide to select appropriate restraint methods','Calculate and verify restraint forces for common load types','Meet Chain of Responsibility obligations for load security'] WHERE title = 'Load Restraint Fundamentals';

UPDATE courses SET learning_outcomes = ARRAY['Identify triggers and early warning signs of escalating behaviour in care settings','Apply de-escalation and trauma-informed response strategies','Document incidents and implement debrief processes for care teams'] WHERE title = 'Managing Challenging Behaviours in Care';

UPDATE courses SET learning_outcomes = ARRAY['Develop traffic management plans','Set up and control work zone traffic','Maintain traffic control signage and devices'] WHERE title = 'Traffic Management Fundamentals';

UPDATE courses SET learning_outcomes = ARRAY['Design learning programs that reflect children''s interests, strengths and needs','Apply documentation practices to make learning visible and assessable','Use the EYLF and NQS to guide program planning and reflection'] WHERE title = 'Programming and Planning for Learning';

UPDATE courses SET learning_outcomes = ARRAY['Understand the Standards for RTOs 2015 and AQF qualification framework','Conduct a self-audit against key compliance obligations','Prepare for an ASQA audit with confidence and evidence-based documentation'] WHERE title = 'RTO Compliance and the AQF';
