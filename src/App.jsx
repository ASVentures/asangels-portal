import { useState, useEffect, useRef } from "react";

const PORTAL_PW = "ASAngels2026", ADMIN_PW = "AdminASA2026";
const NAVY = "#1B3A6B", GOLD = "#C9922A";

const VM = { "Strong":{color:"#166534",bg:"#EAF3DE",label:"STRONG ✅"}, "Developing":{color:"#92400E",bg:"#FAEEDA",label:"DEVELOPING 🔄"}, "Unknown":{color:"#5F5E5A",bg:"#F1EFE8",label:"UNKNOWN ❓"}, "Very Weak":{color:"#7F1D1D",bg:"#FCEBEB",label:"VERY WEAK ⚠️"}, "Pre-clinical":{color:"#7F1D1D",bg:"#FCEBEB",label:"PRE-CLINICAL ⚠️"}, "Conditional":{color:"#92400E",bg:"#FAEEDA",label:"CONDITIONAL 🔄"} };
const SM = { "Active Diligence — High Interest":{color:"#166534",bg:"#EAF3DE",dot:"🟢"}, "Active Diligence":{color:"#185FA5",bg:"#E6F1FB",dot:"🔵"}, "Discovery Stage — Gathering Information":{color:"#92400E",bg:"#FAEEDA",dot:"🟡"}, "Discovery Stage — High Skepticism":{color:"#7F1D1D",bg:"#FCEBEB",dot:"🔴"}, "Watch List — Too Early":{color:"#5F5E5A",bg:"#F1EFE8",dot:"⚫"} };
const DOCS = [{n:1,name:"Quick Hit",sub:"60-second summary"},{n:2,name:"Deal Email",sub:"LP announcement"},{n:3,name:"One-Pager",sub:"Full investment thesis"},{n:4,name:"Short GP Memo",sub:"Internal GP brief"},{n:5,name:"Eisenhower Memo",sub:"Full diligence report"},{n:6,name:"Diligence Call Agenda",sub:"Live call structure"}];

const DEALS = [
  {id:"redskyhealth",name:"Red Sky Health",tagline:"AI-Powered Insurance Denial Remediation — Performance-Based",stage:"Active Diligence — High Interest",founder:"Dean Margolis, CEO — Columbia / Harvard MS CS / Harvard MBA",location:"Remote (Founded 2022)",raised:"$7.81M raised · 34 employees",round:"Current round TBD — likely Series A",tam:"$4.2B",tamNote:"US denial management market · $262B in denied claims annually · 10%+ annual growth",projections:"$25–40M ARR potential at 0.1% recovery volume capture",competitors:[{name:"Waystar",note:"Largest RCM vendor, absorbed Olive AI"},{name:"nThrive",note:"Established denial management incumbent"},{name:"Experian Health",note:"Payer intelligence and prior auth tools"}],vital:{V:{score:"Strong",summary:"Clients only pay when money is actually recovered — self-qualifying mechanism."},I:{score:"Developing",summary:"Reduces billing staff burden; frees clinical staff for patient-facing work."},T:{score:"Developing",summary:"OaaS pivot March 2026. Key question: demand-driven or SaaS stall?"},A:{score:"Strong",summary:"OaaS eliminates upfront cost barrier — standard API integration."},L:{score:"Developing",summary:"Payer-specific AI training data creates switching costs over time."}},docUrls:["https://www.dropbox.com/scl/fi/kkbron44vph02tu739ljn/ASAngels_REDSKYHEALTH_1_QuickHit.docx?rlkey=fo1v8nzqsmwc6lra6dndzex7u&dl=1","https://www.dropbox.com/scl/fi/n307rhrhusn2mgc8umzoz/ASAngels_REDSKYHEALTH_2_DealEmail.docx?rlkey=bcwch15jm250vtjzw5ifn44zm&dl=1","https://www.dropbox.com/scl/fi/xjuojma90ddyb9s6jx2lt/ASAngels_REDSKYHEALTH_3_OnePager.docx?rlkey=1y326knat5of2i065xtadffww&dl=1","https://www.dropbox.com/scl/fi/waofp2iahwp4b4882rxy3/ASAngels_REDSKYHEALTH_4_ShortMemo.docx?rlkey=jfrnenl4vqo36glkl98i5cqwk&dl=1","https://www.dropbox.com/scl/fi/w6vumkf898bccy26uchy5/ASAngels_REDSKYHEALTH_5_EisenhowerMemo.docx?rlkey=2xfo2dg2k1abdcrhn6g6zyggn&dl=1","https://www.dropbox.com/scl/fi/emknew603ds7eyg8az8v9/ASAngels_REDSKYHEALTH_6_DiligenceCallAgenda..docx?rlkey=i0tpghoheu3r9tha8ungdwjrc&st=nbibtjqo&dl=1"]},
  {id:"youlify",name:"Youlify",tagline:"End-to-End AI That Replaces Your Entire Medical Billing Department",stage:"Active Diligence — High Interest",founder:"Dr. Bo Gu MD (CEO, cardiac surgeon) · Sally Liang (COO) · Howard Peng (CTO, NLP PhD)",location:"San Francisco, CA (Founded 2023)",raised:"$4.3M seed · Bonfire · Illia Polosukhin · Oracle Chief AI Scientist",round:"Likely Series A ($15–25M) · ASAngels $500K–$1M",tam:"$15B",tamNote:"US medical billing industry. AI-augmented RCM market projected $6.2B by 2028.",projections:"$100M+ ARR at 1% of US physician practices at $50K/yr",competitors:[{name:"Waystar / Olive AI",note:"Largest incumbent but not physician-founded"},{name:"Athenahealth RCM",note:"Integrated EHR + billing — legacy stack"},{name:"Availity",note:"Connectivity platform, not AI replacement"}],vital:{V:{score:"Strong",summary:"Full RCM replacement: staff cost + recovery + payment cycle improvements compound."},I:{score:"Strong",summary:"Physician time reclaimed from admin burden. Payer surveillance agent prevents denials upstream."},T:{score:"Developing",summary:"Illia Polosukhin (Attention Is All You Need co-author) invested. ARR undisclosed."},A:{score:"Developing",summary:"Full billing replacement requires health system leadership buy-in and EHR integration."},L:{score:"Developing",summary:"Physician founder moat. NLP PhD CTO. Payer rule dataset builds switching costs."}}},
  {id:"adipothera",name:"Adipothera",tagline:"Novel Topical PPARγ Therapy for Cancer-Related Lymphedema",stage:"Active Diligence",founder:"Dr. Shailesh Agarwal MD — Harvard / Brigham & Women's Hospital",location:"Boston, MA",raised:"NIH-funded 2023–2028 (R01 equivalent)",round:"$2–5M to fund topical formulation dev + pre-IND",tam:"$1.2B",tamNote:"Global lymphedema treatment market. US pharmacological TAM if approved: $3–5B.",projections:"200K+ new US cases/yr · No approved drug anywhere in the world",competitors:[{name:"Compression garments / PT",note:"Palliative only — $3–6K/yr, zero disease modification"},{name:"Lymphovenous bypass surgery",note:"Not scalable, not widely available"},{name:"No approved pharmacological competitor",note:"White space — no FDA-approved drug for lymphedema exists"}],vital:{V:{score:"Developing",summary:"No health system cost data yet — pending clinical data to confirm V."},I:{score:"Strong",summary:"JCI Insight 2023 published data shows PPARγ reversal of fibroadipose deposits. World-class co-authors."},T:{score:"Pre-clinical",summary:"NIH-funded validates scientific merit. No IND filed, no clinical trial started."},A:{score:"Developing",summary:"Topical drug = prescribed by oncologist, used at home — minimal workflow disruption."},L:{score:"Developing",summary:"Co-authors Mehrara (MSKCC) and Greene are world's leading lymphedema researchers."}},docUrls:["https://www.dropbox.com/scl/fi/3ylu5msh9xfbewey36tyi/ASAngels_ADIPOTHERA_1_QuickHit.docx?rlkey=qd924v6z96oykb4eg5jf7jt69&st=6kj5xmx9&dl=1","https://www.dropbox.com/scl/fi/5qriyxpp3rx8icemv7es7/ASAngels_ADIPOTHERA_2_DealEmail.docx?rlkey=c8t797lnmpc27e65pbd62qbcl&st=msgpe2c5&dl=1","https://www.dropbox.com/scl/fi/1j8fw5ns5o5ie3rfucwtl/ASAngels_ADIPOTHERA_3_OnePager.docx?rlkey=rpem1l4gn3mxc9zluety5fm6g&st=173h3biq&dl=1","https://www.dropbox.com/scl/fi/5fgkok9y8ycymwidm4l9b/ASAngels_ADIPOTHERA_4_ShortMemo.docx?rlkey=zv9lfizpdlef65hcmxrc9neuh&st=5o2gyg9s&dl=1","https://www.dropbox.com/scl/fi/etyvn8wt8srajken303ey/ASAngels_ADIPOTHERA_5_EisenhowerMemo.docx?rlkey=l41ll8rdvcxnktozv6jajdx2z&st=1vn8xkd0&dl=1","https://www.dropbox.com/scl/fi/yzcskgsc6lpmn5ajfhhgp/ASAngels_ADIPOTHERA_6_DiligenceCallAgenda.docx?rlkey=b5tt8in6l6thl7famgg1e5orz&st=pda2hzcw&dl=1"]},
  {id:"ami",name:"AMI Healthcare — Saudi ASC",tagline:"Hybrid Ambulatory Surgery Center + Diabetes Clinic, North Riyadh",stage:"Active Diligence",founder:"Joachim Kriegel (CEO) & Jennifer Kriegel (Director BD) — AMI Healthcare Group",location:"Westborough MA (HQ) · North Riyadh, KSA",raised:"No institutional funding disclosed",round:"~$9M investor equity (30% of $30M build) · 70% via Ex-Im Bank",tam:"$69B",tamNote:"Saudi Vision 2030 health allocation. Private sector now 47% of Riyadh inpatient visits.",projections:"49.9% of Riyadh hospitalized patients have diabetes — direct clinical anchor",competitors:[{name:"Burjeel Holdings (Burjeel One)",note:"Two day surgery centers opening in Riyadh 2025 — direct ASC competitor"},{name:"Dr. Sulaiman Al Habib (HMG)",note:"$449M IPO Dec 2024 — most aggressive private group"},{name:"Saudi German Hospital Riyadh",note:"Central Riyadh — geographic complement to north Riyadh positioning"}],vital:{V:{score:"Unknown",summary:"No unit economics provided. Payer mix, CCHI reimbursement, per-case margin all TBD."},I:{score:"Developing",summary:"Diabetes + CKD surgical patient population is clinically validated."},T:{score:"Developing",summary:"MOU with GAD International. Building identified. Investor interest contingent on company formation."},A:{score:"Developing",summary:"Conversion only — no new foundation. 12-month revenue timeline claimed."},L:{score:"Developing",summary:"30-year tax holiday. North Riyadh positioning. JCI standards differentiation."}}},
  {id:"epicairway",name:"Epic Airway Systems",tagline:"The First Device Combining SGA Simplicity with ETT Security — Continuous Oxygenation, No Visualization Required",stage:"Active Diligence — High Interest",founder:"Dr. Eric Moses MD/MBA (CEO/CMO, Anesthesiologist Albany Med) · Keith McKenna (COO) · Dr. Sridhar Musuku (Inventor)",location:"Albany / Schenectady, New York (Founded 2021)",raised:"Pre-seed angel round open · $50K NYS Innovation Summit Award · Serial Stage Venture Partners invested",round:"Pre-seed angel round — funding 510(k) submission and initial US launch",tam:"$1.4B",tamNote:"Global airway management market. 250,000+ prehospital airway interventions annually in the US. Prehospital intubation attempts declining 30% — EMS moving to SGAs, creating urgent need for secure alternative.",projections:"First-mover in SGA+ETT combination category · EMS agency formulary approval pathway · Hospital and military secondary markets",competitors:[{name:"LMA Supreme / King LT / i-gel (SGAs)",note:"98% first-pass success but inferior airway security — do not provide ETT-equivalent protection"},{name:"Standard ETT + laryngoscope",note:"Gold standard security but 46% first-pass success in paramedics — requires visualization tools and skill"},{name:"Intubating LMAs (Fastrach)",note:"Require additional skill and visualization — not simpler than ETT for prehospital use"}],vital:{V:{score:"Strong",summary:"Reduces >10X complication increase from multiple intubation attempts. 86% vs 46% first-attempt success (p=0.003). Mean intubation time 1:06 vs 2:55. Direct cost savings for EMS systems via reduced complications and liability exposure."},I:{score:"Strong",summary:"In cardiac arrest, faster intubation = higher survival. Epic Airway cuts mean intubation time by 62%. Continuous oxygenation eliminates the ventilation gap during device transition. One paramedic in the study failed ETT after 3 attempts — would have succeeded with Epic Airway."},T:{score:"Developing",summary:"Pre-revenue, pre-510(k). $50K NYS Innovation Summit award, NSF I-Corps, Serial Stage Venture Partners invested, 2 patents filed, 15 prototype iterations complete — device is manufacturable. Published clinical white paper with statistically significant data."},A:{score:"Strong",summary:"Same blind insertion technique as SGAs already in widespread prehospital use — no new skill required. EMS already moving away from ETTs (30% decline). Epic Airway is the natural replacement: SGA simplicity + ETT security. FDA Class II 510(k) pathway — no clinical trials required."},L:{score:"Developing",summary:"2 patents filed. No current device combines SGA ease + ETT security + continuous oxygenation. Class II 510(k) predicate strategy is the key defensibility question — must be verified in diligence."}},docUrls:["https://www.dropbox.com/scl/fi/hmlr7g0t3rp3rcqlmxzq0/ASAngels_EpicAirway_1_QuickHit.docx?rlkey=1ziadp9na0kxbxhrmwba49wvf&dl=1","https://www.dropbox.com/scl/fi/vsu8linnska4dwnew6h4f/ASAngels_EpicAirway_2_DealEmail.docx?rlkey=6jivrnkeo6l3ulk72ptozxrtk&dl=1","https://www.dropbox.com/scl/fi/435v31slju9iz90ij20kp/ASAngels_EpicAirway_3_OnePager.docx?rlkey=jvi28mz25hdasp8rwmfx5n8x8&dl=1","https://www.dropbox.com/scl/fi/5h1xm9qc7s277bpn6er9h/ASAngels_EpicAirway_4_ShortMemo.docx?rlkey=hat1r7cj5l4r6ac9om05wbb0l&dl=1","https://www.dropbox.com/scl/fi/7c8ssgoos25f8mf32sjpn/ASAngels_EpicAirway_5_EisenhowerMemo.docx?rlkey=8r9d1xp2akwq0p4tb7nmnefwr&dl=1","https://www.dropbox.com/scl/fi/p4gggg7pkngisiojmn2ij/ASAngels_EpicAirway_6_DiligenceCallAgenda.docx?rlkey=pzq297qze9c2ni1y7q8a7wmvv&dl=1"]},
  {id:"evanesc",name:"Evanesc Therapeutics",tagline:"RF Evanescent Wave Device for GBM and CNS Treatment",stage:"Watch List — Too Early",founder:"80+ years combined RF engineering experience (team unnamed publicly)",location:"Van Nuys, CA (Founded 2017)",raised:"Octane SoCal accelerator · no institutional funding",round:"Pre-seed/pre-IND to fund FDA pre-sub + Phase 1",tam:"$8B",tamNote:"Novocure market cap comparator. 10,000–15,000 US GBM patients/yr.",projections:"8–12+ years from current position to any revenue comparable to Novocure",competitors:[{name:"Novocure (Optune)",note:"$8B market cap · FDA-approved · Medicare-covered · 25+ trials"},{name:"Standard GBM care",note:"Surgery/chemo/RT · 14–16mo median OS · Optune adds ~4 months"},{name:"4 awarded evanescent wave patents",note:"Technology differentiation — but competing with $8B incumbent"}],vital:{V:{score:"Unknown",summary:"No CPT code. No payer pathway. 8–12+ years from any revenue."},I:{score:"Conditional",summary:"GBM 5-yr survival is 5%. All impact conditional on human efficacy data."},T:{score:"Very Weak",summary:"Pre-IND. Zero paying customers. 7 years pre-clinical. 2–3 employees."},A:{score:"Developing",summary:"Same patient population as Optune. Lower QoL burden claimed but unvalidated."},L:{score:"Developing",summary:"4 awarded patents. But Novocure has 25+ trials and established oncologist relationships."}}},
  {id:"calaris",name:"Calaris Diagnostics",tagline:"Non-Invasive Salivary Biomarker Test for Early Liver Fibrosis Detection",stage:"Active Diligence",founder:"Jim Chen MD MPH — CEO, San Francisco Bay Area",location:"San Francisco Bay Area",raised:"Seed round raised · Pre-Series A",round:"Raising to fund US clinical validation and FDA pre-submission",tam:"$3.5B",tamNote:"US non-invasive liver fibrosis diagnostics market. 100M+ Americans at risk of NAFLD/MASLD.",projections:"SALF score: AUROC 0.97 discovery cohort · 0.92 validation · first-ever saliva-based liver fibrosis test",competitors:[{name:"FIB-4 Score",note:"Free, in every EHR — primary incumbent"},{name:"FibroScan (Echosens)",note:"Ultrasound gold standard — requires equipment and operator"},{name:"ELF Score (Siemens)",note:"Blood-based — CE marked, limited US adoption"}],vital:{V:{score:"Unknown",summary:"No documented cost data yet — pending US validation."},I:{score:"Strong",summary:"iScience 2023 published data. AUROC 0.97. World-first saliva-based liver fibrosis score."},T:{score:"Developing",summary:"Seed funded. Biotech Showcase 2026 presenter. No US trial started."},A:{score:"Strong",summary:"No needle, no phlebotomist. Drop-in for any primary care or GI workflow."},L:{score:"Developing",summary:"Punyadeera and Crawford are world leaders in salivary diagnostics. No direct competitor."}},docUrls:["https://www.dropbox.com/scl/fi/wnrfbsux58gdt44lky3m1/Calaris_CRC_VITAL_Member_Guide.pdf?rlkey=guhrjv5lgr2en65zbigl7bymg&st=qn3ywkeo&dl=1","https://www.dropbox.com/scl/fi/qu8b48g1ztyexgs6wk4tn/Calaris_CRC_Member_FAQ.pdf?rlkey=za0h775uus7ocwntq6eoc4lid&st=bvzyuwvk&dl=1","https://www.dropbox.com/scl/fi/iblqgi131o1ax6uk9ymjp/Calaris_CRC_Short_Memo.pdf?rlkey=8g55kxqhqxjnpxkpoyel41a2v&st=3l8wun0y&dl=1","https://www.dropbox.com/scl/fi/oj8bex2bn4pu50ettt0jp/Calaris_CRC_Eisenhower_Memo.pdf?rlkey=7wfaotu170ia7t90z9e5u07u9&st=yfiue8dp&dl=1","https://www.dropbox.com/scl/fi/jo6xk11xjoxy7ywjqbm5g/Calaris_CRC_One_Pager.pdf?rlkey=zfwgn4c3ornpjtncpf3sd85gn&st=kfq0p6cr&dl=1","https://www.dropbox.com/scl/fi/ukflduv1gxpb5znlfkuiw/Calaris-Diagnostics-Angel-Deck-Google-Slides.pdf?rlkey=6gi3jdwkzn3kh7r3cde3y&st=aumgiz18&dl=1"]},
  {id:"eit",name:"Extrinsic Immunity Therapeutics",tagline:"First-in-Class Localized Immunotherapy to Prevent Metastasis in Triple-Negative Breast Cancer",stage:"Active Diligence",founder:"Dr. Priyan Weerappuli PhD (CEO, ACS Fellow, UM Rogel) · Sam Currier MBA (CBO, Sanofi)",location:"Ann Arbor, MI — University of Michigan spin-out (2024)",raised:"Pre-seed · $220K near-term raise · $1.5M SAFE at $8M cap",round:"$1.5M post-money SAFE at $8M cap · YC standard form · IND-enabling studies funded by this raise",tam:"$11B",tamNote:"Global TNBC treatment market → $20B by 2030 at 8% CAGR · $1.6B US serviceable market · 46,000 new US cases annually.",projections:"Blockbuster peak sales potential exceeding $1B in US · TNBC beachhead → lung, pancreatic, prostate, ovarian platform",competitors:[{name:"Xenetic Biosciences",note:"Systemic DNase I for NETs in cancer — validates target but different (systemic vs. localized) delivery"},{name:"Neutrolis / Citryll",note:"Well-funded NET-targeting programs — autoimmune focus only, not oncology"},{name:"Current SOC (pembrolizumab + chemo)",note:"Complementary, not competitive — NETrolyze designed to enhance checkpoint inhibitor response"}],vital:{V:{score:"Strong",summary:"Preventing TNBC metastasis avoids $200K–$500K+ in downstream advanced cancer treatment per patient. Neoadjuvant single-injection model minimizes ongoing cost. First-in-class pricing premium justified if clinical data holds."},I:{score:"Strong",summary:"Metastatic TNBC 5-year survival ~7%. 86% of NETrolyze-treated tumors below 2.0g threshold vs. 62% controls. Delayed metastasis in immunocompetent model. Disproportionately affects younger women and African-American women."},T:{score:"Developing",summary:"GMP-certified formulation complete (Latitude Pharmaceuticals). 4 pilot studies underway, 2 complete with positive data. 2025 AND 2026 Renaissance Ventures HotList. MSK R&D partnership. AnchorBio CRO. No IND yet."},A:{score:"Developing",summary:"Slots directly into KEYNOTE-522 standard of care as Q2W intratumoral injection between existing cycles. No new hardware, no IT, no workflow change. Long regulatory path: IND → Phase I/II → NDA."},L:{score:"Developing",summary:"First-in-class localized NET-degrading injectable for oncology. All competitors systemic and autoimmune-focused. IP: 2 US patents, Invention Disclosure, Method of Use patent in-progress. MSK R&D partnership adds moat."}},docUrls:["https://www.dropbox.com/scl/fi/4o7f6aakr01nakl68tn9c/ASAngels_EIT_1_QuickHit.docx?rlkey=tgwzguq77b1azu7zit5r628qi&dl=1","https://www.dropbox.com/scl/fi/8vditqofvgss66ofv6ibc/ASAngels_EIT_2_DealEmail.docx?rlkey=911r16mdfn5a47gqrom0pen7r&dl=1","https://www.dropbox.com/scl/fi/kkbyubstqr5hbbvpu2c4o/ASAngels_EIT_3_OnePager.docx?rlkey=d8ub6n0t5a6p3wqjqu6o1d966&dl=1","https://www.dropbox.com/scl/fi/k5px25wm70ox3tmzwihu1/ASAngels_EIT_4_ShortMemo.docx?rlkey=ssy4j6h9obtnpn1vg58v7du1s&dl=1","https://www.dropbox.com/scl/fi/1yxl9jtrm2mlqvtnixr0p/ASAngels_EIT_5_EisenhowerMemo.docx?rlkey=3gyqle70tsl0n4wm00wm7puo4&dl=1","https://www.dropbox.com/scl/fi/agjmc3zpdc8b0odmahlgi/ASAngels_EIT_6_DiligenceCallAgenda.docx?rlkey=fr1b6m7btqoeo2cl3xjonyz6v&dl=1"]},
  {id:"circurabio",name:"Circurabio",tagline:"Biosensor-Driven Gene and Cell Therapy Platform",stage:"Discovery Stage — Gathering Information",founder:"Dr. Shailesh Agarwal MD — Harvard / Brigham & Women's Hospital",location:"Boston, MA",raised:"No public funding record",round:"Unknown · earliest stage deal in pipeline",tam:"$60B+",tamNote:"Gene and cell therapy market projected $60B+ by 2030. Biosensor-actuator approach is next-gen.",projections:"Platform technology — TAM is indication-dependent. Too early to model.",competitors:[{name:"MIT/Stanford synthetic biology programs",note:"Heavily patented gene circuit IP — FTO analysis required"},{name:"Twist Bioscience",note:"Synthetic biology commercial leader with broad IP"},{name:"CAR-T leaders (Bristol-Myers, Gilead)",note:"Static cell therapy incumbents · biosensor approach is differentiated if it works"}],vital:{V:{score:"Unknown",summary:"No public product description. Cannot score without a meeting."},I:{score:"Unknown",summary:"Could be transformative. 'If' carries all the weight."},T:{score:"Unknown",summary:"No public customers, revenue, or clinical data."},A:{score:"Unknown",summary:"Unknown until product is characterized."},L:{score:"Unknown",summary:"Approach may be proprietary — need a meeting before any assessment."}}},
  {id:"oratek",name:"OraTek Diagnostics",tagline:"Patented Umami-Pathway Salivary Platform — Drug Testing, TBI/Concussion, Alzheimer's, Cancer Markers",stage:"Active Diligence — High Interest",founder:"Nate Keel (CEO/Founder)",location:"[TBD — NDA Pending]",raised:"Revenue-generating · $500K raise · $200K committed · $300K remaining",round:"$500K total · NDA required for company name and full terms",tam:"$3.8B",tamNote:"3.8M US sports TBIs annually · No FDA-cleared salivary concussion test exists · Law enforcement DUI market active in 5 states",projections:"Platform play across concussion, Alzheimer's, cancer, cardiac, home monitoring kits",competitors:[{name:"Abbott SoToxa",note:"7–15 min collection vs. 90 sec — cannot use patented umami pathway"},{name:"Quanterix / Abbott Alinity i",note:"Blood-based TBI biomarkers — require needle and lab analyzer, not sideline POC"},{name:"Marker Diagnostics (UK)",note:"MicroRNA salivary concussion — no US regulatory path, no revenue"}],vital:{V:{score:"Developing",summary:"Eliminates phlebotomist, cold-chain, and lab fees. Replaces MRI ($1–3K per scan) with next-day result. Revenue-generating today on drugs of abuse."},I:{score:"Very Strong",summary:"345/376 NFL players autopsied had CTE. No FDA-cleared sideline concussion test at any price. 3.8M US TBIs/yr. No objective diagnostic — symptom-only evaluation for decades."},T:{score:"Developing",summary:"Revenue on drugs of abuse. 5 states: Missouri (court-approved DUI), Montana, Utah, Michigan, Oklahoma pilot. $200K of $500K committed. NFL concussion protocol chief engaged. UCLA and Hospital of Nepal in discussion."},A:{score:"Strong",summary:"90-second collection. No needle. CLIA lab deployable immediately while 510(k) runs in parallel. POC device validated for cortisol. Same collection system across all applications."},L:{score:"Strong",summary:"Patented umami-pathway collection — Abbott cannot replicate. Owns molds, manufacturing, proprietary software. No FDA-cleared salivary concussion competitor in the US. 5-state regulatory precedent already established."}},docUrls:["https://www.dropbox.com/scl/fi/1cq4rdbk7gjcic38axw5x/ASAngels_NateKeel_1_QuickHit.docx?rlkey=tppsal94zb911dph2mu13l8d2&dl=1","https://www.dropbox.com/scl/fi/x84b6p4qgqrdn6ku2bhjw/ASAngels_NateKeel_2_DealEmail.docx?rlkey=je6zd8d6htbogx5xwkspdnxxe&dl=1","https://www.dropbox.com/scl/fi/j76miv7682oejtgbw13a1/ASAngels_NateKeel_3_OnePager.docx?rlkey=qxf9or07npxv69rqz2le0sjw6&dl=1","https://www.dropbox.com/scl/fi/sou6vukfy7ml2abflvo8a/ASAngels_NateKeel_4_ShortMemo.docx?rlkey=ul9i6ee0kekji919kks5mkd5d&dl=1","https://www.dropbox.com/scl/fi/0b2vkklxnjd4hb8tlcin6/ASAngels_NateKeel_5_EisenhowerMemo.docx?rlkey=apyad7ja92z5yzw6mmszh468f&dl=1","https://www.dropbox.com/scl/fi/slvkfugldgdool1ulh4yu/ASAngels_NateKeel_6_DiligenceCallAgenda.docx?rlkey=t2w02bddnstqmgi7splauot1o&dl=1"],timeline:[{type:"ours",date:"2026-05-07",label:"Discovery Call — Nate Keel"},{type:"company",date:"2026-05-31",label:"$500K raise closes · Study initiates"},{type:"ours",date:"2026-05-14",label:"Meeting 2 + NDA execution (target)"},{type:"company",date:"2026-08-01",label:"First sensitivity/specificity data readout (est.)"},{type:"ours",date:"2026-05-28",label:"GP Vote — invest or pass"},{type:"company",date:"2026-09-01",label:"NFL/NCAA season study underway"},{type:"company",date:"2027-01-01",label:"CLIA lab commercial launch (est.)"},{type:"company",date:"2027-06-01",label:"510(k) POC submission (est.)"}]},
  {id:"seemedx",name:"SeeMedX",tagline:"Non-Invasive Bioimpedance Hemodynamic Monitoring for Congestive Heart Failure",stage:"Discovery Stage — Gathering Information",founder:"Deborah Simpson (CEO) · Rafael Campiz (VP BD) · E.J. Bird (CFO)",location:"Shingle Springs, CA / Las Vegas, NV (Founded 2020)",raised:"$8.51M (Arben Ventures, Evolution Accelerator) · Reg D $21M filed 2023",round:"Details pending — 510(k) submitted Nov 2024, clearance pending",tam:"$2.1B",tamNote:"US heart failure monitoring market. 6M Americans with HF. 30%+ readmission rate within 30 days creates massive payer incentive.",projections:"72-hour advance CHF detection · Replace invasive hemodynamic monitoring · Home monitoring runway",competitors:[{name:"CardioMEMS (Abbott)",note:"Implantable pulmonary artery pressure sensor — FDA cleared, invasive, high-cost"},{name:"Bodyport",note:"Scale-based impedance home monitoring for HF — well-funded, similar non-invasive thesis"},{name:"Impedimed",note:"Established bioimpedance platform for lymphedema — entering cardiac space"}],vital:{V:{score:"Unknown",summary:"HF readmission costs $26B annually. No payer model or reimbursement pathway disclosed. Unit economics and per-test cost TBD."},I:{score:"Strong",summary:"72-hour advance detection of CHF decompensation would allow outpatient intervention before hospitalization. 6M Americans with HF, 900K annual hospitalizations."},T:{score:"Developing",summary:"510(k) submitted November 2024 — clearance pending. $8.51M raised. 15 employees. Advisory board includes Dr. Peter Ganz (Harvard MD, UCSF, former BWH 25 years)."},A:{score:"Developing",summary:"Non-invasive Zo and CO measurement via bioimpedance. No needle. Home monitoring potential. EHR integration and clinical workflow adoption are open questions."},L:{score:"Developing",summary:"Bioimpedance concept is decades old. Differentiation must be algorithmic. 510(k) predicate argument and FTO not yet assessed. CardioMEMS and Bodyport are well-funded."}},docUrls:["https://www.dropbox.com/scl/fi/5shnh1nbg1myegcqbsoer/01_SeeMedX_QuickHit.docx?rlkey=23eq5bwdx8cvrriv3uigdlj8f&dl=1","https://www.dropbox.com/scl/fi/vcy6tf7jgpj6y27onbdj3/02_SeeMedX_DealEmail.docx?rlkey=joo4goymlkv72xkvtzez2gxaw&dl=1","https://www.dropbox.com/scl/fi/rimqs3g0shijxan7tvwxi/03_SeeMedX_OnePager.docx?rlkey=dsqldynpee6gerghqs8cyu5mo&dl=1","https://www.dropbox.com/scl/fi/kxu6m09rk2l997ngfvwrn/04_SeeMedX_ShortGPMemo.docx?rlkey=ddgpan66x98vgmdik8q9xpqmd&dl=1","https://www.dropbox.com/scl/fi/r2lkwf33nvrx7ezxbzo4c/05_SeeMedX_EisenhowerMemo.docx?rlkey=hse63bugohx3fevw8jrxfgqa7&dl=1","https://www.dropbox.com/scl/fi/j0dys65xgkpdmc8rkqp3b/06_SeeMedX_LiveDiligenceCallAgenda.docx?rlkey=1fyv91l4067fsmpmmez5l8pmv&dl=1"],timeline:[{type:"ours",date:"2026-05-07",label:"Discovery Call — Deborah Simpson, Rafael Campiz"},{type:"company",date:"2024-11-01",label:"510(k) submitted to FDA"},{type:"ours",date:"2026-05-21",label:"Meeting 2 — request 510(k) predicate + financials (target)"},{type:"company",date:"2026-07-01",label:"510(k) clearance expected (est.)"},{type:"ours",date:"2026-06-01",label:"GP go/no-go decision (target)"},{type:"company",date:"2026-09-01",label:"Post-clearance commercial launch (est.)"},{type:"company",date:"2027-01-01",label:"Home monitoring product launch (est.)"}]},
  {id:"karefusionai",name:"KareFusion AI",tagline:"Multilingual AI Voice Agents for Healthcare Administrative and Clinical Workflows",stage:"Discovery Stage — Gathering Information",founder:"Dr. Mukesh Misra MD (CEO/Founder, Neurosurgeon) · Kartik Misra (Co-Founder)",location:"Lancaster, CA / Dover, DE",raised:"Pre-seed — Founders Institute SF 2025 cohort · No institutional funding disclosed",round:"Pre-seed open — amount, terms, valuation TBD",tam:"$15B",tamNote:"US medical billing/admin automation market. Non-English-speaking patient population: 25M+ limited English proficiency adults in the US.",projections:"Multilingual AI voice agents targeting underserved Spanish/Hindi-speaking patient populations",competitors:[{name:"Suki / Nuance DAX (Microsoft)",note:"Best-funded healthcare AI voice — English-focused, well-established"},{name:"Abridge / Ambience",note:"Clinical documentation AI — significant funding, strong clinical adoption"},{name:"Sully.ai",note:"Similar multilingual healthcare AI voice agent thesis"}],vital:{V:{score:"Developing",summary:"Reduces no-shows, wait times, and administrative burden. Multilingual access may reduce costly miscommunication errors. ROI not yet documented."},I:{score:"Developing",summary:"25M+ limited English proficiency adults in US. Language barriers cause measurable healthcare disparities. Multilingual AI access is a genuine equity opportunity."},T:{score:"Unknown",summary:"Founders Institute graduate (pre-seed accelerator). Demo agent live (demoaiagent.osteos.io). No confirmed paying customers. Revenue unknown."},A:{score:"Developing",summary:"FHIR/HL7 EMR integration claimed. Status of Epic, Athena, eCW live integrations unconfirmed. No workflow disruption thesis is right but execution unproven."},L:{score:"Weak",summary:"Extremely crowded space. Suki, Nuance DAX, Abridge, Ambience, Sully all better funded. Multilingual angle is the differentiator — must be sharply proven in diligence."}},docUrls:["https://www.dropbox.com/scl/fi/ylh1qkrw5xjqssaio67x5/01_KareFusion_QuickHit.docx?rlkey=jyjhnc1ereynfam9jyjyi7f7v&dl=1","https://www.dropbox.com/scl/fi/tzywt3ylstds4taznrv8e/02_KareFusion_DealEmail.docx?rlkey=m1t03doa6g9b8kpjevl9f2zup&dl=1","https://www.dropbox.com/scl/fi/cxa273gjyz6vqtwl8dcnp/03_KareFusion_OnePager.docx?rlkey=22r132nv03u4pq9qr7yjic0eg&dl=1","https://www.dropbox.com/scl/fi/mccx4dxct8f0quf2xfu7y/04_KareFusion_ShortGPMemo.docx?rlkey=ga1ptcstx0k8jeh55ha6p6gyx&dl=1","https://www.dropbox.com/scl/fi/8le68ncpvcqy2shjundbu/05_KareFusion_EisenhowerMemo.docx?rlkey=guqt6k6l2bj0kcdiw95ozycaz&dl=1","https://www.dropbox.com/scl/fi/l6le814v1ov98sddzx9wy/06_KareFusion_LiveDiligenceCallAgenda.docx?rlkey=e6f7ei6fvkb2txj5jn9jc4z9q&dl=1"],timeline:[{type:"ours",date:"2026-05-07",label:"Discovery Call — Dr. Mukesh Misra"},{type:"ours",date:"2026-05-21",label:"Meeting 2 — request live product demo + paying customer evidence (target)"},{type:"ours",date:"2026-06-01",label:"GP go/no-go decision (target)"},{type:"company",date:"2026-06-01",label:"FHIR/HL7 integration completion (est.)"},{type:"company",date:"2026-09-01",label:"First paying customer go-live (est.)"}]},
];

const PUBLIC_DEALS = [
  {id:"inbx",ticker:"INBX",name:"InhibRx",exchange:"NASDAQ",tagline:"Single-Domain Antibody Platform — DR5 Apoptosis (Approval Pending) + Hexavalent OX40 CoStim (Phase 2 Readout Imminent)",stage:"Meeting Complete — Active Watch",metWith:"Mark Lappe (CEO), Kelly Deck (CFO) via LifeSci Advisors · Apr 29, 2026",marketCap:"~$900M",cash:"TBD",analysts:"Strong Buy consensus",keyAsset:"DR5 (INBX-109): chondrosarcoma registrational study successful — FDA approval filing submitted, approval expected 2026 · Ewing's sarcoma 60%+ ORR vs 20% SOC · 4th-line CRC 20% ORR · 1st-line CRC registrational study starting end 2026. OX40 (INBX-106): hexavalent CoStim, head & neck Phase 2 (60 pts, Keytruda vs Keytruda+106) ORR + T-cell biomarker + depth of response readout: MAY 2026 — IMMINENT",catalysts:["OX40 Phase 2 ORR + T-cell data: May 2026 (imminent)","DR5 FDA approval: 2H 2026","Accelerated approval request for Ewing's + 4L CRC: Q3 2026","PFS data from OX40 head & neck: Fall 2026","OX40 perioperative NSCLC Phase 2 start: May 2026","Poplar (15% non-dilutable stake) IgE depletion readout: Summer 2026"],vital:{V:{score:"Strong",summary:"DR5 approval = $400M+ annual run rate (chondrosarcoma + Ewing's). CRC first-line = $6B+ opportunity at 33% capture. OX40 across $50B checkpoint space = transformational. Company projects $10B+ DR5, potentially $50B+ OX40 commercial opportunity."},I:{score:"Very Strong",summary:"First approved therapy for chondrosarcoma ever. 60%+ ORR in Ewing's vs 20% SOC — pediatric orphan indication. Complete responses in perioperative TNBC with immunotherapy alone. CoStim turbocharges checkpoint response — could double or triple CR rates in checkpoint-eligible patients."},T:{score:"Strong",summary:"DR5 approval filing submitted. Ewing's 60%+ ORR data. 4L CRC 20% ORR data. OX40 phase 2 readout imminent. 60+ global trial sites. 3 patients in perioperative TNBC: 2 complete responses. Management owns 33% of company — fully aligned."},A:{score:"Strong",summary:"Commercial infrastructure already built for oncology launch. Clinical operations team built out. COO from Roche registration program background. DR5 launching commercially this year — the machinery exists."},L:{score:"Very Strong",summary:"Only hexavalent OX40 in clinical development — no competition. 12-year biologic exclusivity. Single-domain antibody platform enables rapid reconfiguration. Sanofi spin-out with AATD drug (acquired by Sanofi) already proving track record. Management has zero failed later-stage studies."}}},
  {id:"fhtx",ticker:"FHTX",name:"Foghorn Therapeutics",exchange:"NASDAQ",tagline:"Gene Traffic Control® — SMARCA2 Synthetic Lethal Inhibitor + CBP/EP300/ARID1B Degrader Platform · Eli Lilly Partnership",stage:"Meeting Complete — Active Watch",metWith:"LifeSci Advisors C-suite meeting · April 2026",marketCap:"~$270M",cash:"$158.9M (Dec 2025) + $50M Jan 2026 raise = ~$150M est.",analysts:"8 analysts Strong Buy · avg $11.50 12-month target",keyAsset:"FHD-909 (LY4050784): SMARCA2 allosteric inhibitor, Phase 1 in SMARCA4-mutant NSCLC + solid tumors. Lilly partnership: $300M upfront + $80M equity at $20/share + up to $1.3B milestones, 50/50 US economics. AACR 2026: complete durable tumor regression + immune memory with anti-PD-1 combo in mouse models. Pipeline: FHT-171 (CBP degrader, IND-ready 2026), EP300 degrader (IND-enabling 2026), ARID1B degrader (in vivo POC 2026).",catalysts:["FHD-909 Phase 1 monotherapy dose-escalation data readout: 2026","AACR 2026: 4 simultaneous program presentations","FHT-171 CBP degrader IND submission: 2026","EP300 degrader IND-enabling studies: 2026","ARID1B degrader in vivo POC: 2026","Potential Lilly milestone payments on Phase 1 progression"],vital:{V:{score:"Strong",summary:"Enterprise value ~$110M for Lilly-partnered first-in-class Phase 1 asset with IND-ready CBP degrader pipeline. SMARCA4-mutant NSCLC patients have median OS <12 months on SOC. Synthetic lethal precision eliminates off-target toxicity — lower complication costs than broad-spectrum chemo."},I:{score:"Strong",summary:"SMARCA4 mutations in ~10% NSCLC (~46K US patients/yr). No targeted therapy for this population. AACR 2026 combination data showing immune memory — potential for durable responses. ARID1B program addresses endometrial, gastric, bladder, NSCLC."},T:{score:"Developing",summary:"Phase 1 enrolling. BVF Partners + Deerfield + Flagship Pioneering invested Jan 2026 at current prices. AACR 4-program presentation. Lilly 50/50 partnership is the strongest clinical validation signal."},A:{score:"Strong",summary:"Oral pill. Outpatient. SMARCA4 NGS testing is standard of care in NSCLC workup — no new testing infrastructure required. Same adoption model as osimertinib and lorlatinib."},L:{score:"Developing",summary:"AstraZeneca has a SMARCA2 program. Lilly partnership provides manufacturing and commercial infrastructure moat. Cash runway to H1 2028 even without milestones."}}},
  {id:"adag",ticker:"ADAG",name:"Adagene",exchange:"NASDAQ",tagline:"SAFEbody® Masked Anti-CTLA-4 (Muzastotug) — 0% Grade 3+ Colitis at 10–20x Conventional CTLA-4 Dosing · Sanofi Partnership",stage:"Meeting Scheduled — Week of May 12",metWith:"Mickael Chane-Du (Chief Strategy Officer, not CSO) scheduled via Gabriel Krantz · LifeSci Advisors",marketCap:"~$260M",cash:"~$150M post-April 2026 $70M offering",analysts:"Price target $8.00–$8.25",keyAsset:"ADG126 (muzastotug): masked anti-CTLA-4 SAFEbody in Phase 2 (randomized dose optimization: 10 vs 20 mg/kg) + Phase 1b/2 with pembrolizumab in 3L+ MSS CRC. 31% confirmed ORR at 20mg/kg. 0% Grade 3+ colitis (vs 13-15% ipilimumab). 19.4-month median OS at 10mg/kg. FDA Fast Track Dec 2025. Sanofi $25M strategic + Phase 1b/2 collaboration. Phase 3 registration trial planned 2027.",catalysts:["Phase 2 dose-optimization ORR readout: Q1–Q2 2026 (imminent)","Sanofi-sponsored Phase 1b/2 combination study initiation: 2026","Phase 3 registration trial start: 2027","INCA33890 (Incyte) combination Phase 1b/2 start: 2026","AACR 2026 two presentations"],vital:{V:{score:"Developing",summary:"MSS CRC (15-20% of all CRC, no targeted therapy) represents a massive unmet need. Avoiding Grade 3+ colitis vs ipilimumab reduces hospitalization costs significantly. Enterprise value ~$110M post-offering for a Sanofi-partnered Phase 2 asset."},I:{score:"Strong",summary:"MSS CRC median OS ~6–8 months in late-line. Muzastotug showing 19.4-month mOS at 10mg/kg vs historical controls. 0% severe colitis vs 13–15% for ipilimumab — transformative safety improvement if confirmed in randomized data."},T:{score:"Developing",summary:"Phase 2 randomized underway. Sanofi $25M + Phase 1b/2 collaboration. Incyte combination. 31% ORR at 20mg/kg. Fast Track designation. April 2026 $70M dilutive offering completed (note: 'runway to 2030' claim requires verification — actual runway est. mid-2028 to early 2029)."},A:{score:"Strong",summary:"IV infusion in outpatient oncology setting — standard checkpoint immunotherapy workflow. Existing pembrolizumab infrastructure at all oncology centers handles muzastotug addition."},L:{score:"Developing",summary:"No competitor has achieved CTLA-4 safety at this dosing level. SAFEbody platform validated by $3.1B in Sanofi + Incyte milestones. Cross-trial OS comparison vs FRESCO-2 historical controls — randomized Phase 2 OS readout (1H 2027) is the real de-risking event."}}},
  {id:"nsrx",ticker:"NSRX",name:"Nasus Pharma",exchange:"NASDAQ",tagline:"Needle-Free Intranasal Epinephrine Powder (NS002) — Faster Than EpiPen, 91% at Therapeutic Levels in 5 Minutes",stage:"Meeting Scheduled — Week of May 12",metWith:"Dan Teleman (CEO) and Eyal Rubin (EVP/CFO) scheduled via Gabriel Krantz · LifeSci Advisors",marketCap:"~$23M",cash:"~$15M post recent placement",analysts:"Limited coverage",keyAsset:"NS002 intranasal epinephrine powder: Phase 2 complete (50 subjects, Mar 16, 2026) — 91% reached therapeutic levels in 5 min vs EpiPen. Faster PK than both EpiPen and Neffy. Nasax proprietary engineered spherical particle delivery platform. IND Q3 2026. Pivotal trial Q4 2026. NDA mid-2027. Platform applicable beyond epinephrine.",catalysts:["IND submission: Q3 2026","Pivotal trial start: Q4 2026","Pediatric study start: Q4 2026","Pivotal trial readout: Q1 2027","NDA submission: mid-2027","Platform expansion to additional indications"],vital:{V:{score:"Developing",summary:"EpiPen market ~$1B+ US annually. 40% discount to ARS Pharma's Neffy likely required for formulary adoption. Phase 2 data positive but pivotal trial needed. At $23M market cap vs Neffy's $1B valuation, valuation gap is the thesis."},I:{score:"Strong",summary:"Anaphylaxis is time-critical — 91% at therapeutic levels in 5 minutes could save lives vs EpiPen delays. Needle-free removes administration barrier for needle-phobic patients and children. 40% drop on positive Phase 2 data creates asymmetric entry."},T:{score:"Developing",summary:"Phase 2 data: positive (Mar 16, 2026) but stock dropped 40% same day — pre-market run-up reversal plus 5.39M-share resale registration overhang (~46% of float). $15M raise completed. Management believes sufficient runway to NDA."},A:{score:"Developing",summary:"Intranasal delivery — no injection training required. Schools, parents, first responders are target users. Neffy (ARS Pharma) already in market validates category. Formulary competition vs approved Neffy is the key adoption hurdle."},L:{score:"Weak",summary:"Neffy (ARS Pharma) is already FDA-approved, partnered with ALK ex-US ($145M upfront), generating $84M TTM revenue. Nasus is 3+ years behind. Pivotal trial head-to-head vs EpiPen only — no direct Neffy comparison data planned. Fast-follower in an occupied space, not a category creator."}}},
];

const NEWS_FEEDS = [
  {query:"Red Sky Health AI denial management insurance 2026",label:"Red Sky Health",type:"Portfolio"},
  {query:"Youlify medical billing AI automation 2026",label:"Youlify",type:"Portfolio"},
  {query:"Adipothera lymphedema PPARgamma topical 2026",label:"Adipothera",type:"Portfolio"},
  {query:"Calaris Diagnostics salivary liver fibrosis SALF 2026",label:"Calaris Dx",type:"Portfolio"},
  {query:"Extrinsic Immunity NETrolyze TNBC neutrophil 2026",label:"EIT",type:"Portfolio"},
  {query:"Epic Airway Systems 510k airway intubation EMS 2026",label:"Epic Airway",type:"Portfolio"},
  {query:"OraTek saliva concussion TBI biomarker NFL 2026",label:"OraTek",type:"Portfolio"},
  {query:"SeeMedX heart failure bioimpedance hemodynamic 2026",label:"SeeMedX",type:"Portfolio"},
  {query:"KareFusion AI multilingual healthcare voice agent 2026",label:"KareFusion AI",type:"Portfolio"},
  {query:"InhibRx INBX OX40 DR5 oncology 2026",label:"INBX",type:"Public"},
  {query:"Foghorn Therapeutics FHTX SMARCA2 Lilly 2026",label:"FHTX",type:"Public"},
  {query:"Adagene ADAG muzastotug CTLA4 colorectal 2026",label:"ADAG",type:"Public"},
  {query:"Nasus Pharma NSRX intranasal epinephrine NS002 2026",label:"NSRX",type:"Public"},
  {query:"insurance claim denial AI revenue cycle management 2026",label:"RCM Industry",type:"Industry"},
  {query:"salivary diagnostics biomarker FDA clearance 2026",label:"Salivary Dx",type:"Industry"},
  {query:"triple negative breast cancer immunotherapy metastasis 2026",label:"TNBC",type:"Industry"},
  {query:"NFL concussion CTE diagnosis sideline 2026",label:"CTE/Concussion",type:"Industry"},
  {query:"neutrophil extracellular traps cancer tumor microenvironment 2026",label:"NETs Science",type:"Industry"},
  {query:"lymphedema drug treatment clinical trial FDA 2026",label:"Lymphedema",type:"Industry"},
  {query:"Waystar nThrive RCM AI denial management competitor 2026",label:"Waystar",type:"Competitor"},
  {query:"Xenetic Biosciences DNase NETs cancer 2026",label:"Xenetic",type:"Competitor"},
  {query:"Abbott SoToxa oral fluid drug test law enforcement 2026",label:"Abbott SoToxa",type:"Competitor"},
  {query:"ARS Pharma Neffy intranasal epinephrine anaphylaxis 2026",label:"Neffy/ARS",type:"Competitor"},
];

async function sGet(k,sh=false){try{const r=await window.storage.get(k,sh);return r?JSON.parse(r.value):null;}catch{return null;}}
async function sSet(k,v,sh=false){try{await window.storage.set(k,JSON.stringify(v),sh);}catch{}}
function uid(){return Date.now().toString(36)+Math.random().toString(36).slice(2,7);}

function ScorePill({score}){const m=VM[score]||VM["Unknown"];return<span style={{background:m.bg,color:m.color,border:`1px solid ${m.color}44`,borderRadius:4,padding:"2px 8px",fontSize:11,fontWeight:600,whiteSpace:"nowrap"}}>{m.label}</span>;}

function makeWAPost(d){
  const dot=(SM[d.stage]||{}).dot||"🔵";
  const vl=(k,l)=>{const v=d.vital[k];const m=VM[v.score]||VM["Unknown"];return`*${k} — ${l}:* ${m.label}\n↳ ${v.summary}`;};
  return `🏥 *ASAngels | Deal Alert*\n━━━━━━━━━━━━━━━━━━━━━━━\n\n*${d.name.toUpperCase()}*\n_${d.tagline}_\n\n*Stage:* ${dot} ${d.stage}\n*Founder:* ${d.founder}\n*Location:* ${d.location}\n*Financing:* ${d.raised}\n\n━━━━━━━━━━━━━━━━━━━━━━━\n💰 *MARKET OPPORTUNITY*\n\n*TAM:* ${d.tam}\n${d.tamNote}\n\n📈 *Projections:* ${d.projections}\n\n━━━━━━━━━━━━━━━━━━━━━━━\n🏆 *KEY PLAYERS IN SPACE*\n${d.competitors.map(c=>`• *${c.name}* — ${c.note}`).join('\n')}\n\n━━━━━━━━━━━━━━━━━━━━━━━\n📊 *VITAL ASSESSMENT*\n\n${vl('V','Value')}\n\n${vl('I','Impact')}\n\n${vl('T','Traction')}\n\n${vl('A','Adoption')}\n\n${vl('L','Landscape')}\n\n━━━━━━━━━━━━━━━━━━━━━━━\n📁 *DEAL DOCUMENTS — 6 Available*\n\n🔒 asangels.shahrx.com\n_Message Dr. Shah for your access password_\n\n1️⃣ Quick Hit — 60-second summary\n2️⃣ Deal Email — LP announcement  \n3️⃣ One-Pager — Full investment thesis\n4️⃣ Short GP Memo — Internal GP brief\n5️⃣ Eisenhower Memo — Full diligence report\n6️⃣ Diligence Call Agenda\n\n━━━━━━━━━━━━━━━━━━━━━━━\n_ASAngels Management LLC · For accredited investors only_`;
}

function TickerBand({user}) {
  const [items,setItems]=useState([]);
  const [loading,setLoading]=useState(true);
  const [pos,setPos]=useState(0);
  const tickerRef=useRef(null);
  const GOLD="#C9922A", NAVY="#1B3A6B";

  useEffect(()=>{
    async function fetchNews(){
      try {
        const results=[];
        for(const feed of NEWS_FEEDS.slice(0,6)){
          const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:400,messages:[{role:"user",content:`Search for the 2 most recent news headlines (2025-2026) about: "${feed.query}". Return ONLY a JSON array like: [{"headline":"...","source":"...","date":"..."}]. No other text.`}],tools:[{type:"web_search_20250305",name:"web_search"}]})});
          const data=await res.json();
          const text=data.content?.filter(c=>c.type==="text").map(c=>c.text).join("");
          try{
            const clean=text.replace(/```json|```/g,"").trim();
            const parsed=JSON.parse(clean);
            parsed.forEach(item=>results.push({...item,label:feed.label,type:feed.type}));
          }catch{}
        }
        if(results.length>0)setItems(results);
      }catch(e){console.error(e);}
      finally{setLoading(false);}
    }
    fetchNews();
  },[]);

  useEffect(()=>{
    if(items.length===0)return;
    const interval=setInterval(()=>setPos(p=>p-1),30);
    return()=>clearInterval(interval);
  },[items]);

  const typeColor={Portfolio:"#166534",Industry:"#185FA5",Competitor:"#7F1D1D"};
  const typeBg={Portfolio:"#EAF3DE",Industry:"#E6F1FB",Competitor:"#FCEBEB"};

  if(loading)return(
    <div style={{background:NAVY,borderTop:`2px solid ${GOLD}`,borderBottom:`2px solid ${GOLD}`,padding:"8px 16px",display:"flex",alignItems:"center",gap:12}}>
      <div style={{fontSize:10,color:GOLD,fontWeight:700,fontFamily:"Georgia,serif",whiteSpace:"nowrap",flexShrink:0}}>📡 LIVE FEED</div>
      <div style={{fontSize:11,color:"#8fa8c8",fontFamily:"Georgia,serif",fontStyle:"italic"}}>Loading latest news on portfolio companies and industry...</div>
    </div>
  );

  if(items.length===0)return null;

  const doubled=[...items,...items,...items];
  const totalWidth=doubled.length*340;

  return(
    <div style={{background:NAVY,borderTop:`2px solid ${GOLD}`,borderBottom:`2px solid ${GOLD}`,padding:"6px 0",overflow:"hidden",position:"relative"}}>
      <div style={{display:"flex",alignItems:"center"}}>
        <div style={{background:GOLD,padding:"4px 12px",fontWeight:700,fontSize:10,color:"white",fontFamily:"Georgia,serif",whiteSpace:"nowrap",flexShrink:0,letterSpacing:"0.1em",zIndex:2}}>📡 LIVE</div>
        <div style={{overflow:"hidden",flex:1,position:"relative"}}>
          <div style={{display:"flex",gap:0,transform:`translateX(${pos % totalWidth}px)`,whiteSpace:"nowrap",transition:"none"}}>
            {doubled.map((item,i)=>(
              <div key={i} style={{display:"inline-flex",alignItems:"center",gap:8,padding:"0 24px",borderRight:"1px solid rgba(255,255,255,0.15)",flexShrink:0}}>
                <span style={{background:typeBg[item.type]||"#EBF1F8",color:typeColor[item.type]||NAVY,fontSize:9,fontWeight:700,padding:"1px 6px",borderRadius:3,fontFamily:"Georgia,serif",whiteSpace:"nowrap"}}>{item.label}</span>
                <span style={{fontSize:11,color:"#e0e8f4",fontFamily:"Georgia,serif",whiteSpace:"nowrap",maxWidth:380,overflow:"hidden",textOverflow:"ellipsis"}}>{item.headline}</span>
                <span style={{fontSize:10,color:"#6080a0",fontFamily:"Georgia,serif",whiteSpace:"nowrap"}}>{item.source} · {item.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function NewsFeedSection({feeds, maxFeeds=8}) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const NAVY="#1B3A6B", GOLD="#C9922A";
  const typeColor={Portfolio:"#166534",Industry:"#185FA5",Competitor:"#7F1D1D",Public:"#1e40af"};
  const typeBg={Portfolio:"#EAF3DE",Industry:"#E6F1FB",Competitor:"#FCEBEB",Public:"#EBF1F8"};

  useEffect(()=>{
    let cancelled=false;
    (async()=>{
      try{
        const results=[];
        const toFetch=(feeds||NEWS_FEEDS).slice(0,maxFeeds);
        for(const feed of toFetch){
          try{
            const res=await fetch("https://api.anthropic.com/v1/messages",{
              method:"POST",
              headers:{"Content-Type":"application/json"},
              body:JSON.stringify({
                model:"claude-sonnet-4-20250514",
                max_tokens:500,
                tools:[{type:"web_search_20250305",name:"web_search"}],
                messages:[{role:"user",content:`Search for the single most recent and relevant news article or development (from 2025 or 2026) about: ${feed.query}. Reply ONLY with a JSON object in this exact format with no other text: {"headline":"exact headline here","source":"publication name","date":"Month DD YYYY","summary":"one sentence summary of why this matters"}`}]
              })
            });
            const data=await res.json();
            const textBlocks=(data.content||[]).filter(c=>c.type==="text").map(c=>c.text).join("").trim();
            if(textBlocks){
              try{
                const clean=textBlocks.replace(/```json|```/g,"").trim();
                const parsed=JSON.parse(clean);
                if(parsed.headline&&parsed.headline.length>5){
                  results.push({...parsed,label:feed.label,type:feed.type});
                }
              }catch(e){/* skip malformed */}
            }
          }catch(e){/* skip failed fetch */}
        }
        if(!cancelled){
          if(results.length>0) setArticles(results);
          else setError("No articles loaded");
          setLoading(false);
        }
      }catch(e){
        if(!cancelled){setError(e.message);setLoading(false);}
      }
    })();
    return()=>{cancelled=true;};
  },[]);

  if(loading) return(
    <div style={{background:"white",border:"1px solid #e5e2d9",borderRadius:10,padding:"20px 24px",marginBottom:16}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
        <div style={{width:8,height:8,borderRadius:"50%",background:GOLD,animation:"pulse 1.5s infinite"}}/>
        <div style={{fontSize:10,color:GOLD,letterSpacing:"0.2em",fontFamily:"Georgia,serif",fontWeight:700}}>LIVE MARKET INTELLIGENCE — LOADING...</div>
      </div>
      {[1,2,3,4].map(i=>(
        <div key={i} style={{height:60,background:"#f5f3ee",borderRadius:6,marginBottom:8,animation:"pulse 1.5s infinite"}}/>
      ))}
    </div>
  );

  if(error||articles.length===0) return(
    <div style={{background:"white",border:"1px solid #e5e2d9",borderRadius:10,padding:"20px 24px",marginBottom:16}}>
      <div style={{fontSize:10,color:GOLD,letterSpacing:"0.2em",fontFamily:"Georgia,serif",marginBottom:8}}>MARKET INTELLIGENCE</div>
      <div style={{fontSize:12,color:"#bbb",fontStyle:"italic",fontFamily:"Georgia,serif"}}>News feed unavailable. Check API connectivity.</div>
    </div>
  );

  return(
    <div style={{background:"white",border:"1px solid #e5e2d9",borderRadius:10,padding:"20px 24px",marginBottom:16}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}>
        <div style={{width:8,height:8,borderRadius:"50%",background:"#22c55e"}}/>
        <div style={{fontSize:10,color:GOLD,letterSpacing:"0.2em",fontFamily:"Georgia,serif",fontWeight:700}}>LIVE MARKET INTELLIGENCE — {articles.length} ARTICLES LOADED</div>
        <div style={{fontSize:9,color:"#bbb",fontFamily:"Georgia,serif",marginLeft:"auto"}}>Updated {new Date().toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}</div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:10}}>
        {articles.map((a,i)=>(
          <div key={i} style={{background:"#fafaf8",borderRadius:8,padding:"14px 16px",border:"1px solid #f0ede6",display:"flex",flexDirection:"column",gap:6}}>
            <div style={{display:"flex",alignItems:"center",gap:6,flexWrap:"wrap"}}>
              <span style={{background:typeBg[a.type]||"#EBF1F8",color:typeColor[a.type]||NAVY,fontSize:9,fontWeight:700,padding:"2px 8px",borderRadius:3,fontFamily:"Georgia,serif",flexShrink:0}}>{a.label}</span>
              <span style={{fontSize:9,background:"#f0ede6",color:"#888",padding:"2px 6px",borderRadius:3,fontFamily:"Georgia,serif",flexShrink:0}}>{a.type}</span>
              <span style={{fontSize:9,color:"#bbb",fontFamily:"Georgia,serif",marginLeft:"auto",flexShrink:0}}>{a.date} · {a.source}</span>
            </div>
            <div style={{fontSize:12,fontWeight:600,color:NAVY,fontFamily:"Georgia,serif",lineHeight:1.4}}>{a.headline}</div>
            {a.summary&&<div style={{fontSize:11,color:"#666",fontFamily:"Georgia,serif",lineHeight:1.4}}>{a.summary}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

function VettingTimeline({timeline}) {
  if(!timeline||!timeline.length) return null;
  const NAVY="#1B3A6B", GOLD="#C9922A";
  const sorted=[...timeline].sort((a,b)=>new Date(a.date)-new Date(b.date));
  const ours=sorted.filter(t=>t.type==="ours");
  const theirs=sorted.filter(t=>t.type==="company");
  const fmt=d=>new Date(d).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"2-digit"});

  return(
    <div style={{background:"white",border:"1px solid #e5e2d9",borderRadius:10,padding:"20px 24px",marginBottom:16}}>
      <div style={{fontSize:10,color:GOLD,letterSpacing:"0.2em",fontFamily:"Georgia,serif",marginBottom:16}}>VETTING TIMELINE</div>
      <div style={{display:"flex",gap:0,position:"relative"}}>
        {/* Left column — Our milestones */}
        <div style={{flex:1,paddingRight:20}}>
          <div style={{fontSize:9,color:NAVY,fontWeight:700,letterSpacing:"0.15em",marginBottom:10,fontFamily:"Georgia,serif",textAlign:"right"}}>ASAngels MILESTONES</div>
          {ours.map((t,i)=>(
            <div key={i} style={{display:"flex",justifyContent:"flex-end",alignItems:"flex-start",marginBottom:10,gap:8}}>
              <div style={{textAlign:"right"}}>
                <div style={{fontSize:11,fontWeight:600,color:NAVY,fontFamily:"Georgia,serif"}}>{t.label}</div>
                <div style={{fontSize:10,color:"#999",fontFamily:"Georgia,serif"}}>{fmt(t.date)}</div>
              </div>
              <div style={{width:8,height:8,borderRadius:"50%",background:GOLD,flexShrink:0,marginTop:3}}/>
            </div>
          ))}
        </div>
        {/* Center line */}
        <div style={{width:2,background:"linear-gradient(to bottom, #e5e2d9, "+NAVY+", #e5e2d9)",borderRadius:2,flexShrink:0,minHeight:80}}/>
        {/* Right column — Company milestones */}
        <div style={{flex:1,paddingLeft:20}}>
          <div style={{fontSize:9,color:NAVY,fontWeight:700,letterSpacing:"0.15em",marginBottom:10,fontFamily:"Georgia,serif"}}>COMPANY MILESTONES</div>
          {theirs.map((t,i)=>(
            <div key={i} style={{display:"flex",alignItems:"flex-start",marginBottom:10,gap:8}}>
              <div style={{width:8,height:8,borderRadius:"50%",background:NAVY,flexShrink:0,marginTop:3}}/>
              <div>
                <div style={{fontSize:11,fontWeight:600,color:NAVY,fontFamily:"Georgia,serif"}}>{t.label}</div>
                <div style={{fontSize:10,color:"#999",fontFamily:"Georgia,serif"}}>{fmt(t.date)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PublicDealCard({d, onClick}) {
  const NAVY="#1B3A6B", GOLD="#C9922A";
  const vitalColors={Strong:"#166534",Developing:"#92400E","Very Strong":"#1e40af",Weak:"#7F1D1D",Unknown:"#555"};
  const vitalBg={Strong:"#EAF3DE",Developing:"#FAEEDA","Very Strong":"#EBF1F8",Weak:"#FCEBEB",Unknown:"#f0ede6"};
  const stageColor=d.stage.includes("Complete")?"#166534":d.stage.includes("Scheduled")?"#185FA5":"#92400E";
  const stageBg=d.stage.includes("Complete")?"#EAF3DE":d.stage.includes("Scheduled")?"#E6F1FB":"#FAEEDA";
  return(
    <div onClick={()=>onClick(d)} style={{background:"white",border:"1px solid #e5e2d9",borderRadius:12,padding:"20px 22px",cursor:"pointer",transition:"box-shadow 0.15s",boxShadow:"0 1px 4px rgba(0,0,0,0.06)"}}>
      <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:8}}>
        <div>
          <span style={{fontSize:22,fontWeight:700,color:NAVY,fontFamily:"Georgia,serif"}}>{d.ticker}</span>
          <span style={{fontSize:14,color:"#888",fontFamily:"Georgia,serif",marginLeft:8}}>{d.name}</span>
        </div>
        <span style={{background:stageBg,color:stageColor,fontSize:9,fontWeight:700,padding:"3px 8px",borderRadius:4,fontFamily:"Georgia,serif",whiteSpace:"nowrap"}}>{d.stage}</span>
      </div>
      <div style={{fontSize:11,color:"#666",fontFamily:"Georgia,serif",marginBottom:10,lineHeight:1.4}}>{d.tagline}</div>
      <div style={{display:"flex",gap:16,marginBottom:10,flexWrap:"wrap"}}>
        <div><div style={{fontSize:9,color:GOLD,letterSpacing:"0.1em",fontFamily:"Georgia,serif"}}>MKT CAP</div><div style={{fontSize:12,fontWeight:600,color:NAVY,fontFamily:"Georgia,serif"}}>{d.marketCap}</div></div>
        <div><div style={{fontSize:9,color:GOLD,letterSpacing:"0.1em",fontFamily:"Georgia,serif"}}>CASH</div><div style={{fontSize:12,fontWeight:600,color:NAVY,fontFamily:"Georgia,serif"}}>{d.cash}</div></div>
        <div><div style={{fontSize:9,color:GOLD,letterSpacing:"0.1em",fontFamily:"Georgia,serif"}}>ANALYSTS</div><div style={{fontSize:12,fontWeight:600,color:NAVY,fontFamily:"Georgia,serif"}}>{d.analysts}</div></div>
      </div>
      <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
        {Object.entries(d.vital).map(([k,v])=>(
          <span key={k} style={{background:vitalBg[v.score]||"#f0ede6",color:vitalColors[v.score]||"#555",fontSize:9,fontWeight:700,padding:"2px 7px",borderRadius:3,fontFamily:"Georgia,serif"}}>{k}: {v.score}</span>
        ))}
      </div>
    </div>
  );
}

export default function App(){
  const [pubSel, setPubSel] = useState(null);
  const [view,setView]=useState("login");
  const [step,setStep]=useState("password");
  const [pw,setPw]=useState(""),nm=useState(""),error=useState(""),user=useState(null),deal=useState(null),analytics=useState([]),loading=useState(true);
  const [nameV,setName]=nm,[err,setErr]=error,[u,setU]=user,[sel,setSel]=deal,[ev,setEv]=analytics,[ld,setLd]=loading;
  const [docAcc,setDocAcc]=useState({});
  const [showWA,setShowWA]=useState(false);
  const [copied,setCopied]=useState(false);
  const [adminTab, setAdminTab] = useState("overview");
  const [memberFilter, setMemberFilter] = useState("");
  const [docTimers, setDocTimers] = useState({});

  useEffect(()=>{(async()=>{const s=await sGet("asa:s");if(s){setU(s);setView(s.isAdmin?"admin":"room");}const e=await sGet("asa:e",true);if(e)setEv(e);setLd(false);})();},[]);

  async function track(evt){const e={...evt,ts:Date.now()};const c=await sGet("asa:e",true)||[];const up=[...c,e];await sSet("asa:e",up,true);setEv(up);}

  async function handlePw(){if(pw===ADMIN_PW){setStep("name");setErr("");setPw("__a__");}else if(pw===PORTAL_PW){setStep("name");setErr("");}else setErr("Incorrect password. Contact Dr. Shah for access.");}
  async function handleName(){if(!nameV.trim()){setErr("Please enter your name.");return;}const ad=pw==="__a__";const uu={id:uid(),name:nameV.trim(),isAdmin:ad};setU(uu);await sSet("asa:s",uu);await track({userId:uu.id,userName:uu.name,type:"login"});setView(ad?"admin":"room");setErr("");}
  async function handleDeal(d){setSel(d);setView("deal");setDocAcc({});if(u)await track({userId:u.id,userName:u.name,type:"deal_view",dealId:d.id,dealName:d.name});}
  async function handleDoc(i,n){setDocAcc(p=>({...p,[i]:true}));if(u&&sel)await track({userId:u.id,userName:u.name,type:"doc",dealId:sel.id,dealName:sel.name,docIdx:i,docName:n});if(sel.docUrls&&sel.docUrls[i]&&sel.docUrls[i]!=="#")window.open(sel.docUrls[i],"_blank");}
  async function logout(){await sSet("asa:s",null);setU(null);setView("login");setStep("password");setPw("");setName("");setSel(null);}
  function copyWA(){if(sel){navigator.clipboard?.writeText(makeWAPost(sel)).then(()=>{setCopied(true);setTimeout(()=>setCopied(false),2500);});}}

  function handleDocOpen(deal, docIdx) {
    const now = Date.now();
    const key = `${deal.id}_${docIdx}`;
    const evt = {
      type:"doc",
      ts: now,
      userId: u?.id || "anon",
      userName: u?.name || "Unknown",
      dealId: deal.id,
      dealName: deal.name,
      docIdx,
      docName: DOCS[docIdx]?.name || "",
    };
    track(evt);
    setDocTimers(prev => ({...prev, [key]: now}));
    window.open(deal.docUrls[docIdx], "_blank");
  }

  function getDocTimeSpent(dealId, docIdx) {
    const key = `${dealId}_${docIdx}`;
    if(!docTimers[key]) return null;
    const elapsed = Math.round((Date.now() - docTimers[key]) / 1000);
    return elapsed;
  }

  if(ld)return<div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100vh",background:NAVY}}><div style={{color:GOLD,fontSize:18,fontFamily:"Georgia,serif"}}>Loading ASAngels...</div></div>;

  // LOGIN
  if(view==="login")return(
    <div style={{minHeight:"100vh",background:NAVY,display:"flex",alignItems:"center",justifyContent:"center",padding:24}}>
      <div style={{width:"100%",maxWidth:400}}>
        <div style={{textAlign:"center",marginBottom:36}}>
          <div style={{fontSize:11,color:GOLD,letterSpacing:"0.25em",fontFamily:"Georgia,serif",marginBottom:10}}>PHYSICIAN-LED VENTURE PLATFORM</div>
          <div style={{fontSize:48,fontWeight:700,color:"white",fontFamily:"Georgia,serif"}}>ASAngels</div>
          <div style={{fontSize:13,color:"#8fa8c8",fontFamily:"Georgia,serif",marginTop:4}}>Deal Room — Confidential Access</div>
        </div>
        <div style={{background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.12)",borderRadius:12,padding:28}}>
          {step==="password"?(<>
            <div style={{fontSize:12,color:"#aac",marginBottom:18,fontFamily:"Georgia,serif",textAlign:"center"}}>Enter your access password</div>
            <input value={pw} onChange={e=>setPw(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handlePw()} type="password" placeholder="Access Password" style={{width:"100%",padding:"11px 14px",borderRadius:7,border:"1px solid rgba(255,255,255,0.2)",background:"rgba(255,255,255,0.08)",color:"white",fontSize:14,outline:"none",boxSizing:"border-box",fontFamily:"Georgia,serif",marginBottom:10}}/>
            {err&&<div style={{color:"#f87171",fontSize:12,marginBottom:8,textAlign:"center"}}>{err}</div>}
            <button onClick={handlePw} style={{width:"100%",padding:"11px 0",background:GOLD,color:"white",border:"none",borderRadius:7,fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"Georgia,serif",letterSpacing:"0.05em"}}>ENTER DEAL ROOM</button>
            <div style={{textAlign:"center",marginTop:14,fontSize:11,color:"#4a6080",fontFamily:"Georgia,serif"}}>Contact Dr. Aalap Shah, MD for access</div>
          </>):(<>
            <div style={{fontSize:12,color:"#aac",marginBottom:18,fontFamily:"Georgia,serif",textAlign:"center"}}>Welcome. Please identify yourself.</div>
            <input value={nameV} onChange={e=>setName(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleName()} type="text" placeholder="Your full name (e.g. Dr. Jane Smith)" style={{width:"100%",padding:"11px 14px",borderRadius:7,border:"1px solid rgba(255,255,255,0.2)",background:"rgba(255,255,255,0.08)",color:"white",fontSize:14,outline:"none",boxSizing:"border-box",fontFamily:"Georgia,serif",marginBottom:10}}/>
            {err&&<div style={{color:"#f87171",fontSize:12,marginBottom:8,textAlign:"center"}}>{err}</div>}
            <button onClick={handleName} style={{width:"100%",padding:"11px 0",background:GOLD,color:"white",border:"none",borderRadius:7,fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"Georgia,serif",letterSpacing:"0.05em"}}>ACCESS DEALS</button>
          </>)}
        </div>
        <div style={{textAlign:"center",marginTop:20,fontSize:10,color:"#2d4060",fontFamily:"Georgia,serif",lineHeight:1.6}}>For accredited investors only · These materials do not constitute an offer to sell securities</div>
      </div>
    </div>
  );

  // DEAL ROOM
  if(view==="room"){
    const active=DEALS.filter(d=>d.stage.includes("Active"));
    const other=DEALS.filter(d=>!d.stage.includes("Active"));
    return(
      <div style={{minHeight:"100vh",background:"#f8f7f4"}}>
        <div style={{background:NAVY,padding:"14px 28px",display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",top:0,zIndex:10,boxShadow:"0 2px 12px rgba(0,0,0,0.2)"}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}><div style={{fontSize:20,fontWeight:700,color:"white",fontFamily:"Georgia,serif"}}>ASAngels</div><div style={{fontSize:10,color:GOLD,letterSpacing:"0.15em"}}>DEAL ROOM</div></div>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <div style={{fontSize:11,color:"#8fa8c8",fontFamily:"Georgia,serif"}}>Welcome, {u?.name}</div>
            {u?.isAdmin&&<button onClick={()=>setView("admin")} style={{background:"rgba(201,146,42,0.2)",color:GOLD,border:`1px solid ${GOLD}`,borderRadius:5,padding:"4px 10px",fontSize:10,cursor:"pointer",fontFamily:"Georgia,serif",fontWeight:600}}>ANALYTICS</button>}
            <button onClick={logout} style={{background:"rgba(255,255,255,0.07)",color:"#8fa8c8",border:"1px solid rgba(255,255,255,0.15)",borderRadius:5,padding:"4px 10px",fontSize:10,cursor:"pointer",fontFamily:"Georgia,serif"}}>Sign Out</button>
          </div>
        </div>
        <TickerBand user={u}/>
        <div style={{maxWidth:1080,margin:"0 auto",padding:"36px 20px"}}>
          <div style={{marginBottom:28}}>
            <div style={{fontSize:10,color:GOLD,letterSpacing:"0.2em",fontFamily:"Georgia,serif",marginBottom:6}}>ASANGELS PORTFOLIO — APRIL 2026</div>
            <div style={{fontSize:26,fontWeight:700,color:NAVY,fontFamily:"Georgia,serif",marginBottom:4}}>Active Deal Room</div>
            <div style={{fontSize:12,color:"#666",maxWidth:580,lineHeight:1.6,fontFamily:"Georgia,serif"}}>Review documents 1–6 in order for the most complete diligence experience. Your access is tracked for GP analytics.</div>
          </div>
          <div style={{fontSize:10,fontWeight:700,color:NAVY,letterSpacing:"0.12em",fontFamily:"Georgia,serif",marginBottom:10}}>ACTIVE DILIGENCE ({active.length})</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(310px,1fr))",gap:14,marginBottom:28}}>
            {active.map(d=>{
              const s=SM[d.stage]||SM["Active Diligence"];
              return<div key={d.id} onClick={()=>handleDeal(d)} style={{background:"white",border:"1px solid #e5e2d9",borderRadius:10,padding:"18px 20px",cursor:"pointer",transition:"box-shadow 0.2s",boxShadow:"0 1px 4px rgba(0,0,0,0.05)"}} onMouseEnter={e=>e.currentTarget.style.boxShadow="0 6px 24px rgba(27,58,107,0.12)"} onMouseLeave={e=>e.currentTarget.style.boxShadow="0 1px 4px rgba(0,0,0,0.05)"}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
                  <div><div style={{fontSize:16,fontWeight:700,color:NAVY,fontFamily:"Georgia,serif",marginBottom:2}}>{d.name}</div><div style={{fontSize:11,color:"#6b6b6b",lineHeight:1.4,maxWidth:250}}>{d.tagline}</div></div>
                  <span style={{background:s.bg,color:s.color,fontSize:9,fontWeight:600,padding:"2px 7px",borderRadius:4,whiteSpace:"nowrap",marginLeft:8,flexShrink:0}}>{s.dot} {d.stage.split(" — ")[0]}</span>
                </div>
                <div style={{marginBottom:10}}><div style={{fontSize:10,color:"#888"}}>TAM: <strong style={{color:NAVY}}>{d.tam}</strong> · {d.raised.split(" · ")[0]}</div></div>
                <div style={{display:"flex",gap:3,flexWrap:"wrap"}}>
                  {["V","I","T","A","L"].map(k=>{const m=VM[d.vital[k].score]||VM["Unknown"];return<span key={k} style={{background:m.bg,color:m.color,border:`1px solid ${m.color}33`,borderRadius:3,padding:"1px 5px",fontSize:9,fontWeight:700}}>{k}: {m.label.split(" ")[0]}</span>;})}
                </div>
                <div style={{marginTop:10,fontSize:10,color:GOLD,fontWeight:600,letterSpacing:"0.03em"}}>VIEW DEAL ROOM →</div>
              </div>;
            })}
          </div>
          <div style={{fontSize:10,fontWeight:700,color:"#888",letterSpacing:"0.12em",fontFamily:"Georgia,serif",marginBottom:10}}>DISCOVERY / WATCH LIST ({other.length})</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(310px,1fr))",gap:14}}>
            {other.map(d=>{
              const s=SM[d.stage]||SM["Active Diligence"];
              return<div key={d.id} onClick={()=>handleDeal(d)} style={{background:"white",border:"1px solid #e5e2d9",borderRadius:10,padding:"18px 20px",cursor:"pointer",opacity:0.85,transition:"opacity 0.15s"}} onMouseEnter={e=>e.currentTarget.style.opacity="1"} onMouseLeave={e=>e.currentTarget.style.opacity="0.85"}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
                  <div><div style={{fontSize:15,fontWeight:700,color:NAVY,fontFamily:"Georgia,serif",marginBottom:2}}>{d.name}</div><div style={{fontSize:11,color:"#6b6b6b",lineHeight:1.4,maxWidth:240}}>{d.tagline}</div></div>
                  <span style={{background:s.bg,color:s.color,fontSize:9,fontWeight:600,padding:"2px 7px",borderRadius:4,whiteSpace:"nowrap",marginLeft:8,flexShrink:0}}>{s.dot} {d.stage.split(" — ")[0]}</span>
                </div>
                <div style={{display:"flex",gap:3,flexWrap:"wrap",marginBottom:6}}>
                  {["V","I","T","A","L"].map(k=>{const m=VM[d.vital[k].score]||VM["Unknown"];return<span key={k} style={{background:m.bg,color:m.color,border:`1px solid ${m.color}33`,borderRadius:3,padding:"1px 5px",fontSize:9,fontWeight:700}}>{k}: {m.label.split(" ")[0]}</span>;})}
                </div>
                <div style={{fontSize:10,color:GOLD,fontWeight:600}}>VIEW →</div>
              </div>;
            })}
          </div>
          <NewsFeedSection />
          <div style={{marginTop:32,marginBottom:8}}>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:4}}>
              <div style={{fontSize:10,color:"#C9922A",letterSpacing:"0.2em",fontFamily:"Georgia,serif",fontWeight:700}}>PUBLIC MARKETS WATCH — VIA GABRIEL KRANTZ / LIFESCI ADVISORS</div>
              <div style={{flex:1,height:1,background:"#e5e2d9"}}/>
            </div>
            <div style={{fontSize:11,color:"#888",fontFamily:"Georgia,serif",marginBottom:16}}>Post-IPO C-suite exposure meetings facilitated by Gabriel Krantz (LifeSci Advisors). These are small-cap public companies — evaluated through the VITAL framework on public evidence. Not SPV investments.</div>
            {pubSel ? (
              <div style={{background:"white",border:"1px solid #e5e2d9",borderRadius:12,padding:"24px 28px"}}>
                <button onClick={()=>setPubSel(null)} style={{background:"#EBF1F8",color:"#1B3A6B",border:"none",borderRadius:5,padding:"4px 12px",fontSize:10,cursor:"pointer",fontFamily:"Georgia,serif",marginBottom:16}}>← Back to Public Watch</button>
                <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:4}}>
                  <div style={{fontSize:28,fontWeight:700,color:"#1B3A6B",fontFamily:"Georgia,serif"}}>{pubSel.ticker}</div>
                  <div style={{fontSize:16,color:"#888",fontFamily:"Georgia,serif"}}>{pubSel.name}</div>
                  <span style={{background:"#EBF1F8",color:"#1B3A6B",fontSize:9,fontWeight:700,padding:"3px 8px",borderRadius:4,fontFamily:"Georgia,serif"}}>{pubSel.exchange}</span>
                </div>
                <div style={{fontSize:12,color:"#555",fontFamily:"Georgia,serif",marginBottom:16,lineHeight:1.5}}>{pubSel.tagline}</div>
                <div style={{display:"flex",gap:20,marginBottom:16,flexWrap:"wrap"}}>
                  {[["Market Cap",pubSel.marketCap],["Cash",pubSel.cash],["Analysts",pubSel.analysts],["Met With",pubSel.metWith]].map(([l,v])=>(
                    <div key={l}><div style={{fontSize:9,color:"#C9922A",letterSpacing:"0.1em",fontFamily:"Georgia,serif"}}>{l}</div><div style={{fontSize:12,fontWeight:600,color:"#1B3A6B",fontFamily:"Georgia,serif",maxWidth:320}}>{v}</div></div>
                  ))}
                </div>
                <div style={{fontSize:10,color:"#C9922A",letterSpacing:"0.15em",fontFamily:"Georgia,serif",marginBottom:8}}>KEY ASSET & CLINICAL STAGE</div>
                <div style={{fontSize:12,color:"#333",fontFamily:"Georgia,serif",lineHeight:1.6,marginBottom:16,background:"#fafaf8",padding:"12px 16px",borderRadius:7,border:"1px solid #f0ede6"}}>{pubSel.keyAsset}</div>
                <div style={{fontSize:10,color:"#C9922A",letterSpacing:"0.15em",fontFamily:"Georgia,serif",marginBottom:8}}>NEAR-TERM CATALYSTS</div>
                <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:16}}>
                  {pubSel.catalysts.map((c,i)=>(
                    <span key={i} style={{background:"#EBF1F8",color:"#1B3A6B",fontSize:10,padding:"4px 10px",borderRadius:5,fontFamily:"Georgia,serif"}}>{c}</span>
                  ))}
                </div>
                <div style={{fontSize:10,color:"#C9922A",letterSpacing:"0.15em",fontFamily:"Georgia,serif",marginBottom:10}}>VITAL ASSESSMENT</div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:8}}>
                  {Object.entries(pubSel.vital).map(([k,v])=>{
                    const c={Strong:"#166534",Developing:"#92400E","Very Strong":"#1e40af",Weak:"#7F1D1D",Unknown:"#555"};
                    const b={Strong:"#EAF3DE",Developing:"#FAEEDA","Very Strong":"#EBF1F8",Weak:"#FCEBEB",Unknown:"#f0ede6"};
                    return(
                      <div key={k} style={{background:"#fafaf8",borderRadius:7,padding:"12px 14px",border:"1px solid #f0ede6"}}>
                        <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:4}}>
                          <span style={{fontSize:12,fontWeight:700,color:"#1B3A6B",fontFamily:"Georgia,serif"}}>{k}</span>
                          <span style={{background:b[v.score]||"#f0ede6",color:c[v.score]||"#555",fontSize:9,fontWeight:700,padding:"1px 6px",borderRadius:3,fontFamily:"Georgia,serif"}}>{v.score}</span>
                        </div>
                        <div style={{fontSize:11,color:"#555",fontFamily:"Georgia,serif",lineHeight:1.4}}>{v.summary}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))",gap:14}}>
                {PUBLIC_DEALS.map(d=><PublicDealCard key={d.id} d={d} onClick={setPubSel}/>)}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // DEAL DETAIL
  if(view==="deal"&&sel){
    const s=SM[sel.stage]||SM["Active Diligence"];
    return(
      <div style={{minHeight:"100vh",background:"#f8f7f4"}}>
        <div style={{background:NAVY,padding:"12px 28px",display:"flex",alignItems:"center",gap:12,position:"sticky",top:0,zIndex:10,boxShadow:"0 2px 12px rgba(0,0,0,0.2)"}}>
          <button onClick={()=>setView("room")} style={{background:"rgba(255,255,255,0.08)",color:"#8fa8c8",border:"1px solid rgba(255,255,255,0.15)",borderRadius:5,padding:"4px 12px",fontSize:10,cursor:"pointer",fontFamily:"Georgia,serif"}}>← Deal Room</button>
          <div style={{fontSize:17,fontWeight:700,color:"white",fontFamily:"Georgia,serif"}}>{sel.name}</div>
          <span style={{background:s.bg,color:s.color,fontSize:9,fontWeight:600,padding:"2px 7px",borderRadius:4}}>{s.dot} {sel.stage}</span>
        </div>
        <div style={{maxWidth:860,margin:"0 auto",padding:"30px 20px"}}>
          {/* Company Header */}
          <div style={{background:"white",border:"1px solid #e5e2d9",borderRadius:12,padding:"24px 28px",marginBottom:16}}>
            <div style={{fontSize:10,color:GOLD,letterSpacing:"0.2em",marginBottom:6,fontFamily:"Georgia,serif"}}>COMPANY OVERVIEW</div>
            <div style={{fontSize:24,fontWeight:700,color:NAVY,fontFamily:"Georgia,serif",marginBottom:4}}>{sel.name}</div>
            <div style={{fontSize:13,color:"#555",fontFamily:"Georgia,serif",marginBottom:14,lineHeight:1.5}}>{sel.tagline}</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              {[["Founder",sel.founder],["Location",sel.location],["Capital Raised",sel.raised],["Current Round",sel.round]].map(([k,v])=>(
                <div key={k}><div style={{fontSize:9,color:"#999",letterSpacing:"0.1em",marginBottom:1,fontFamily:"Georgia,serif"}}>{k}</div><div style={{fontSize:11,color:"#333",fontFamily:"Georgia,serif",lineHeight:1.4}}>{v}</div></div>
              ))}
            </div>
          </div>

          {/* Market + Competitors */}
          <div style={{background:"white",border:"1px solid #e5e2d9",borderRadius:12,padding:"22px 28px",marginBottom:16}}>
            <div style={{fontSize:10,color:GOLD,letterSpacing:"0.2em",marginBottom:14,fontFamily:"Georgia,serif"}}>MARKET OPPORTUNITY</div>
            <div style={{display:"grid",gridTemplateColumns:"120px 1fr",gap:20,marginBottom:16}}>
              <div><div style={{fontSize:34,fontWeight:700,color:NAVY,fontFamily:"Georgia,serif"}}>{sel.tam}</div><div style={{fontSize:10,color:"#999",fontFamily:"Georgia,serif"}}>TAM</div></div>
              <div><div style={{fontSize:12,color:"#444",fontFamily:"Georgia,serif",lineHeight:1.6,marginBottom:6}}>{sel.tamNote}</div><div style={{fontSize:11,color:NAVY,fontFamily:"Georgia,serif",fontWeight:600}}>{sel.projections}</div></div>
            </div>
            <div style={{borderTop:"1px solid #f0ede6",paddingTop:14}}>
              <div style={{fontSize:10,color:GOLD,letterSpacing:"0.15em",marginBottom:10,fontFamily:"Georgia,serif"}}>KEY PLAYERS</div>
              {sel.competitors.map((c,i)=>(
                <div key={i} style={{display:"flex",gap:10,alignItems:"flex-start",marginBottom:7}}>
                  <span style={{fontSize:9,fontWeight:700,color:NAVY,padding:"2px 6px",background:"#EBF1F8",borderRadius:3,whiteSpace:"nowrap",marginTop:2,fontFamily:"Georgia,serif",flexShrink:0}}>{c.name}</span>
                  <span style={{fontSize:11,color:"#666",fontFamily:"Georgia,serif",lineHeight:1.4}}>{c.note}</span>
                </div>
              ))}
            </div>
          </div>

          {/* VITAL */}
          <div style={{background:"white",border:"1px solid #e5e2d9",borderRadius:12,padding:"22px 28px",marginBottom:16}}>
            <div style={{fontSize:10,color:GOLD,letterSpacing:"0.2em",marginBottom:18,fontFamily:"Georgia,serif"}}>VITAL FRAMEWORK ASSESSMENT</div>
            {[["V","Value"],["I","Impact"],["T","Traction"],["A","Adoption"],["L","Landscape"]].map(([k,lbl],i)=>{
              const v=sel.vital[k];const m=VM[v.score]||VM["Unknown"];
              return<div key={k} style={{display:"grid",gridTemplateColumns:"28px 120px 120px 1fr",gap:12,alignItems:"start",padding:"12px 0",borderBottom:i<4?"1px solid #f5f3ee":"none"}}>
                <div style={{fontSize:20,fontWeight:700,color:NAVY,fontFamily:"Georgia,serif"}}>{k}</div>
                <div style={{fontSize:12,fontWeight:600,color:NAVY,fontFamily:"Georgia,serif",paddingTop:2}}>{lbl}</div>
                <div style={{paddingTop:2}}><ScorePill score={v.score}/></div>
                <div style={{fontSize:11,color:"#555",fontFamily:"Georgia,serif",lineHeight:1.5}}>{v.summary}</div>
              </div>;
            })}
          </div>

          {sel.timeline && <VettingTimeline timeline={sel.timeline} />}

          {/* Documents */}
          <div style={{background:"white",border:`2px solid ${NAVY}`,borderRadius:12,padding:"22px 28px",marginBottom:16}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
              <div>
                <div style={{fontSize:10,color:GOLD,letterSpacing:"0.2em",fontFamily:"Georgia,serif",marginBottom:3}}>DEAL DOCUMENTS — ACCESS IN ORDER</div>
                <div style={{fontSize:11,color:"#666",fontFamily:"Georgia,serif"}}>Each document click is logged for GP analytics. Proceed 1 → 6.</div>
              </div>
              <div style={{fontSize:11,color:"#999",fontFamily:"Georgia,serif"}}>{Object.keys(docAcc).length}/6 accessed</div>
            </div>
            {DOCS.map((doc,i)=>{
              const acc=!!docAcc[i];
              return<div key={i} onClick={()=>handleDoc(i,doc.name)} style={{display:"flex",alignItems:"center",gap:14,padding:"12px 16px",borderRadius:8,border:`1px solid ${acc?"#C9922A44":"#e5e2d9"}`,background:acc?"#FDF8EE":"#fafaf8",cursor:"pointer",marginBottom:8,transition:"all 0.15s"}} onMouseEnter={e=>e.currentTarget.style.background="#f0ede6"} onMouseLeave={e=>e.currentTarget.style.background=acc?"#FDF8EE":"#fafaf8"}>
                <div style={{width:30,height:30,borderRadius:6,background:acc?GOLD:NAVY,color:"white",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:700,fontFamily:"Georgia,serif",flexShrink:0}}>{doc.n}</div>
                <div style={{flex:1}}><div style={{fontSize:12,fontWeight:600,color:NAVY,fontFamily:"Georgia,serif"}}>{doc.name}</div><div style={{fontSize:10,color:"#888",fontFamily:"Georgia,serif"}}>{doc.sub}</div></div>
                {acc?<span style={{fontSize:10,color:GOLD,fontWeight:600,fontFamily:"Georgia,serif"}}>ACCESSED ✓</span>:<span style={{fontSize:10,color:"#bbb",fontFamily:"Georgia,serif"}}>→ Open</span>}
              </div>;
            })}
          </div>

          {/* WhatsApp Generator (admin only) */}
          {u?.isAdmin&&(
            <div style={{background:"#f0fdf4",border:"1px solid #86efac",borderRadius:12,padding:"22px 28px"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:showWA?14:0}}>
                <div><div style={{fontSize:10,color:"#166534",letterSpacing:"0.2em",fontFamily:"Georgia,serif",marginBottom:2}}>ADMIN — WHATSAPP POST GENERATOR</div><div style={{fontSize:11,color:"#555",fontFamily:"Georgia,serif"}}>Generate standardized WhatsApp group announcement for this deal</div></div>
                <div style={{display:"flex",gap:8}}>
                  <button onClick={()=>setShowWA(p=>!p)} style={{background:"white",color:"#166534",border:"1px solid #86efac",borderRadius:5,padding:"6px 12px",fontSize:10,cursor:"pointer",fontFamily:"Georgia,serif",fontWeight:600}}>{showWA?"HIDE":"PREVIEW"}</button>
                  <button onClick={copyWA} style={{background:copied?"#166534":GOLD,color:"white",border:"none",borderRadius:5,padding:"6px 12px",fontSize:10,cursor:"pointer",fontFamily:"Georgia,serif",fontWeight:600}}>{copied?"COPIED ✓":"COPY"}</button>
                </div>
              </div>
              {showWA&&<pre style={{background:"white",border:"1px solid #d1fae5",borderRadius:8,padding:16,fontSize:10,fontFamily:"monospace",whiteSpace:"pre-wrap",lineHeight:1.7,color:"#333",maxHeight:360,overflowY:"auto",marginTop:14}}>{makeWAPost(sel)}</pre>}
            </div>
          )}
        </div>
      </div>
    );
  }

  // ADMIN ANALYTICS
  if(view==="admin"&&u?.isAdmin){
    const docEvts=ev.filter(e=>e.type==="doc");
    const loginEvts=ev.filter(e=>e.type==="login");
    const dealEvts=ev.filter(e=>e.type==="deal_view");
    const users=[...new Set(ev.map(e=>e.userId).filter(Boolean))];
    const userNames={};ev.forEach(e=>{if(e.userId&&e.userName)userNames[e.userId]=e.userName;});

    function getMemberStats(userId){
      const uev=ev.filter(e=>e.userId===userId);
      const lastSeen=uev.map(e=>e.ts).sort().reverse()[0];
      const dealsViewed=[...new Set(uev.filter(e=>e.type==="deal_view").map(e=>e.dealId))];
      const docsOpened=uev.filter(e=>e.type==="doc");
      const loginCount=uev.filter(e=>e.type==="login").length;
      const dealProgress={};
      docsOpened.forEach(e=>{if(!dealProgress[e.dealId])dealProgress[e.dealId]=new Set();dealProgress[e.dealId].add(e.docIdx);});
      const deepestDeal=Object.entries(dealProgress).sort((a,b)=>b[1].size-a[1].size)[0];
      const sessionDurations=[];
      const loginTimes=uev.filter(e=>e.type==="login").map(e=>e.ts).sort();
      loginTimes.forEach((lt,i)=>{
        const nextLogin=loginTimes[i+1]||Date.now();
        const sessionEvts=uev.filter(e=>e.ts>=lt&&e.ts<nextLogin);
        if(sessionEvts.length>1){
          const sessionEnd=Math.max(...sessionEvts.map(e=>e.ts));
          sessionDurations.push(Math.round((sessionEnd-lt)/60000));
        }
      });
      const avgSession=sessionDurations.length?Math.round(sessionDurations.reduce((a,b)=>a+b,0)/sessionDurations.length):0;
      return{name:userNames[userId]||"Unknown",lastSeen,dealsViewed,docsOpened:docsOpened.length,loginCount,deepestDeal,avgSession,dealProgress};
    }

    function funnel(did){
      const de=docEvts.filter(e=>e.dealId===did);
      const ub={};
      de.forEach(e=>{if(!ub[e.docIdx])ub[e.docIdx]=new Set();ub[e.docIdx].add(e.userId);});
      return DOCS.map((_,i)=>(ub[i]||new Set()).size);
    }

    function getDocEngagement(dealId, docIdx){
      const opens=docEvts.filter(e=>e.dealId===dealId&&e.docIdx===docIdx);
      return{opens:opens.length,users:[...new Set(opens.map(e=>e.userName))].filter(Boolean)};
    }

    const totalTimeOnSite=ev.length>1?Math.round((Math.max(...ev.map(e=>e.ts))-Math.min(...ev.map(e=>e.ts)))/3600000*10)/10:0;

    return(
      <div style={{minHeight:"100vh",background:"#f8f7f4"}}>
        {/* Header */}
        <div style={{background:NAVY,padding:"12px 28px",display:"flex",alignItems:"center",gap:12,position:"sticky",top:0,zIndex:10,boxShadow:"0 2px 12px rgba(0,0,0,0.2)"}}>
          <button onClick={()=>setView("room")} style={{background:"rgba(255,255,255,0.08)",color:"#8fa8c8",border:"1px solid rgba(255,255,255,0.15)",borderRadius:5,padding:"4px 12px",fontSize:10,cursor:"pointer",fontFamily:"Georgia,serif"}}>← Deal Room</button>
          <div style={{fontSize:17,fontWeight:700,color:"white",fontFamily:"Georgia,serif"}}>Admin Analytics</div>
          <div style={{flex:1}}/>
          {["overview","members","documents","activity","funnel"].map(tab=>(
            <button key={tab} onClick={()=>setAdminTab(tab)} style={{background:adminTab===tab?GOLD:"rgba(255,255,255,0.07)",color:adminTab===tab?"white":"#8fa8c8",border:"none",borderRadius:5,padding:"5px 12px",fontSize:10,cursor:"pointer",fontFamily:"Georgia,serif",fontWeight:adminTab===tab?700:400,textTransform:"capitalize"}}>{tab}</button>
          ))}
          <button onClick={logout} style={{background:"rgba(255,255,255,0.07)",color:"#8fa8c8",border:"1px solid rgba(255,255,255,0.15)",borderRadius:5,padding:"4px 10px",fontSize:10,cursor:"pointer",fontFamily:"Georgia,serif",marginLeft:8}}>Sign Out</button>
        </div>

        <div style={{maxWidth:1240,margin:"0 auto",padding:"28px 20px"}}>

          {/* OVERVIEW TAB */}
          {adminTab==="overview"&&<>
            <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:12,marginBottom:24}}>
              {[["Members",users.length,"unique investors"],["Logins",loginEvts.length,"total sessions"],["Deal Views",dealEvts.length,"total"],["Doc Opens",docEvts.length,"total"],["Hours on Site",totalTimeOnSite,"cumulative"]].map(([l,v,s])=>(
                <div key={l} style={{background:"white",border:"1px solid #e5e2d9",borderRadius:10,padding:"16px 20px"}}>
                  <div style={{fontSize:28,fontWeight:700,color:NAVY,fontFamily:"Georgia,serif"}}>{v}</div>
                  <div style={{fontSize:12,fontWeight:600,color:NAVY,fontFamily:"Georgia,serif"}}>{l}</div>
                  <div style={{fontSize:10,color:"#999",fontFamily:"Georgia,serif"}}>{s}</div>
                </div>
              ))}
            </div>

            <div style={{background:"white",border:"1px solid #e5e2d9",borderRadius:10,padding:"20px 24px",marginBottom:16}}>
              <div style={{fontSize:10,color:GOLD,letterSpacing:"0.2em",fontFamily:"Georgia,serif",marginBottom:14}}>DEAL ENGAGEMENT RANKING</div>
              {[...DEALS].sort((a,b)=>docEvts.filter(e=>e.dealId===b.id).length-docEvts.filter(e=>e.dealId===a.id).length).map(d=>{
                const views=dealEvts.filter(e=>e.dealId===d.id).length;
                const opens=docEvts.filter(e=>e.dealId===d.id).length;
                const uniq=[...new Set(ev.filter(e=>e.dealId===d.id).map(e=>e.userId))].length;
                const maxOpens=Math.max(1,...DEALS.map(x=>docEvts.filter(e=>e.dealId===x.id).length));
                if(!views&&!opens)return null;
                return(
                  <div key={d.id} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 0",borderBottom:"1px solid #f5f3ee",flexWrap:"wrap"}}>
                    <div style={{flex:1,minWidth:140,fontSize:13,fontWeight:600,color:NAVY,fontFamily:"Georgia,serif"}}>{d.name}</div>
                    <div style={{display:"flex",gap:16,alignItems:"center"}}>
                      <span style={{fontSize:11,color:"#888",fontFamily:"Georgia,serif"}}>{uniq} investors</span>
                      <span style={{fontSize:11,color:"#888",fontFamily:"Georgia,serif"}}>{views} views</span>
                      <span style={{fontSize:11,color:GOLD,fontWeight:700,fontFamily:"Georgia,serif"}}>{opens} doc opens</span>
                    </div>
                    <div style={{width:160,background:"#f0ede6",borderRadius:4,height:6}}>
                      <div style={{width:`${(opens/maxOpens)*100}%`,background:GOLD,height:6,borderRadius:4,transition:"width 0.3s"}}/>
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{background:"white",border:"1px solid #e5e2d9",borderRadius:10,padding:"20px 24px"}}>
              <div style={{fontSize:10,color:GOLD,letterSpacing:"0.2em",fontFamily:"Georgia,serif",marginBottom:14}}>RECENT ACTIVITY — LAST 20 EVENTS</div>
              {[...ev].reverse().slice(0,20).map((e,i)=>{
                const bg={doc:"#EBF1F8",login:"#EAF3DE",deal_view:"#FAEEDA"}[e.type]||"#f0ede6";
                const tc={doc:NAVY,login:"#166534",deal_view:"#92400E"}[e.type]||"#555";
                return(
                  <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"7px 0",borderBottom:"1px solid #fafaf8",flexWrap:"wrap"}}>
                    <span style={{background:bg,color:tc,fontSize:9,fontWeight:700,padding:"2px 7px",borderRadius:3,fontFamily:"Georgia,serif",flexShrink:0}}>{e.type}</span>
                    <span style={{fontSize:12,fontWeight:600,color:NAVY,fontFamily:"Georgia,serif",flexShrink:0}}>{e.userName||"—"}</span>
                    {e.dealName&&<span style={{fontSize:11,color:"#666",fontFamily:"Georgia,serif"}}>{e.dealName}</span>}
                    {e.docName&&<span style={{fontSize:11,color:GOLD,fontFamily:"Georgia,serif"}}>Doc {(e.docIdx||0)+1}: {e.docName}</span>}
                    <span style={{fontSize:10,color:"#bbb",fontFamily:"Georgia,serif",marginLeft:"auto",flexShrink:0}}>{new Date(e.ts).toLocaleString()}</span>
                  </div>
                );
              })}
              {ev.length===0&&<div style={{fontSize:12,color:"#bbb",fontStyle:"italic",textAlign:"center",padding:24}}>No events yet.</div>}
            </div>
          </>}

          {/* MEMBERS TAB */}
          {adminTab==="members"&&<>
            <div style={{background:"white",border:"1px solid #e5e2d9",borderRadius:10,padding:"20px 24px",marginBottom:16}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
                <div style={{fontSize:10,color:GOLD,letterSpacing:"0.2em",fontFamily:"Georgia,serif"}}>ALL MEMBERS — DETAILED PROFILES ({users.length} total)</div>
                <input value={memberFilter} onChange={e=>setMemberFilter(e.target.value)} placeholder="Search by name..." style={{padding:"5px 10px",border:"1px solid #e5e2d9",borderRadius:6,fontSize:12,fontFamily:"Georgia,serif",color:NAVY,width:220,outline:"none"}}/>
              </div>
              {users.filter(uid=>!memberFilter||(userNames[uid]||"").toLowerCase().includes(memberFilter.toLowerCase())).map(uid=>{
                const s=getMemberStats(uid);
                return(
                  <div key={uid} style={{padding:"18px 0",borderBottom:"1px solid #f5f3ee"}}>
                    <div style={{display:"flex",alignItems:"flex-start",gap:20,flexWrap:"wrap"}}>
                      <div style={{minWidth:180}}>
                        <div style={{fontSize:15,fontWeight:700,color:NAVY,fontFamily:"Georgia,serif"}}>{s.name}</div>
                        <div style={{fontSize:10,color:"#999",fontFamily:"Georgia,serif",marginTop:2}}>Last active: {s.lastSeen?new Date(s.lastSeen).toLocaleString():"Never"}</div>
                      </div>
                      <div style={{display:"flex",gap:20,flexWrap:"wrap"}}>
                        {[["Logins",s.loginCount],["Deals Viewed",s.dealsViewed.length],["Docs Opened",s.docsOpened],["Avg Session",s.avgSession+"min"]].map(([l,v])=>(
                          <div key={l}><div style={{fontSize:20,fontWeight:700,color:NAVY,fontFamily:"Georgia,serif"}}>{v}</div><div style={{fontSize:10,color:"#999",fontFamily:"Georgia,serif"}}>{l}</div></div>
                        ))}
                      </div>
                      <div style={{flex:1,minWidth:240}}>
                        <div style={{fontSize:10,color:"#999",fontFamily:"Georgia,serif",marginBottom:4}}>DEALS ACCESSED</div>
                        <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
                          {s.dealsViewed.map(did=>{
                            const d=DEALS.find(x=>x.id===did);
                            const depth=s.dealProgress[did]?.size||0;
                            return d?<span key={did} style={{background:"#EBF1F8",color:NAVY,fontSize:9,padding:"2px 7px",borderRadius:3,fontFamily:"Georgia,serif",fontWeight:600}}>{d.name} ({depth}/6)</span>:null;
                          })}
                        </div>
                        {s.deepestDeal&&<div style={{fontSize:10,color:GOLD,fontFamily:"Georgia,serif",marginTop:4,fontWeight:600}}>Deepest engagement: {DEALS.find(x=>x.id===s.deepestDeal[0])?.name} — {s.deepestDeal[1].size} of 6 docs opened</div>}
                      </div>
                    </div>
                  </div>
                );
              })}
              {users.length===0&&<div style={{fontSize:12,color:"#bbb",fontStyle:"italic",textAlign:"center",padding:24}}>No members have logged in yet.</div>}
            </div>
          </>}

          {/* DOCUMENTS TAB */}
          {adminTab==="documents"&&<>
            <div style={{background:"white",border:"1px solid #e5e2d9",borderRadius:10,padding:"20px 24px",marginBottom:16}}>
              <div style={{fontSize:10,color:GOLD,letterSpacing:"0.2em",fontFamily:"Georgia,serif",marginBottom:18}}>DOCUMENT ENGAGEMENT — OPENS PER DOC PER DEAL</div>
              {DEALS.map(d=>{
                const anyOpens=docEvts.some(e=>e.dealId===d.id);
                if(!anyOpens)return null;
                return(
                  <div key={d.id} style={{marginBottom:20}}>
                    <div style={{fontSize:13,fontWeight:700,color:NAVY,fontFamily:"Georgia,serif",marginBottom:8,paddingBottom:4,borderBottom:"2px solid #f0ede6"}}>{d.name}</div>
                    <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                      {DOCS.map((doc,i)=>{
                        const eng=getDocEngagement(d.id,i);
                        const hasLink=d.docUrls&&d.docUrls[i]&&d.docUrls[i]!=="#";
                        return(
                          <div key={i} style={{background:eng.opens>0?"#EBF1F8":"#f8f7f4",border:`1px solid ${eng.opens>0?"#c5d8f0":"#e5e2d9"}`,borderRadius:7,padding:"10px 14px",minWidth:150}}>
                            <div style={{fontSize:10,fontWeight:700,color:NAVY,fontFamily:"Georgia,serif"}}>{i+1}. {doc.name}</div>
                            <div style={{fontSize:9,color:"#888",fontFamily:"Georgia,serif",marginBottom:4}}>{doc.sub}</div>
                            <div style={{fontSize:18,fontWeight:700,color:eng.opens>0?NAVY:"#ccc",fontFamily:"Georgia,serif"}}>{eng.opens}</div>
                            <div style={{fontSize:9,color:"#999",fontFamily:"Georgia,serif"}}>opens</div>
                            {eng.users.length>0&&<div style={{fontSize:9,color:GOLD,fontFamily:"Georgia,serif",marginTop:3}}>{eng.users.slice(0,3).join(", ")}{eng.users.length>3?` +${eng.users.length-3}`:""}</div>}
                            {!hasLink&&<div style={{fontSize:8,color:"#e5a000",fontFamily:"Georgia,serif",marginTop:2}}>⚠ Link pending</div>}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
              {!docEvts.length&&<div style={{fontSize:12,color:"#bbb",fontStyle:"italic",textAlign:"center",padding:24}}>No document opens recorded yet.</div>}
            </div>
          </>}

          {/* ACTIVITY TAB */}
          {adminTab==="activity"&&<>
            <div style={{background:"white",border:"1px solid #e5e2d9",borderRadius:10,padding:"20px 24px"}}>
              <div style={{fontSize:10,color:GOLD,letterSpacing:"0.2em",fontFamily:"Georgia,serif",marginBottom:14}}>FULL ACCESS LOG — CHRONOLOGICAL (MOST RECENT FIRST)</div>
              <div style={{maxHeight:600,overflowY:"auto"}}>
                <table style={{width:"100%",borderCollapse:"collapse",fontSize:11,fontFamily:"Georgia,serif"}}>
                  <thead style={{position:"sticky",top:0,background:"white",zIndex:1}}>
                    <tr style={{borderBottom:"2px solid #f0ede6"}}>
                      {["Timestamp","Member","Event","Deal","Document","Session ID"].map(h=>(
                        <th key={h} style={{textAlign:"left",padding:"7px 10px",color:NAVY,fontWeight:700,fontSize:10,whiteSpace:"nowrap"}}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[...ev].reverse().slice(0,500).map((e,i)=>{
                      const bg={doc:"#EBF1F8",login:"#EAF3DE",deal_view:"#FAEEDA"}[e.type]||"#f0ede6";
                      const tc={doc:NAVY,login:"#166534",deal_view:"#92400E"}[e.type]||"#555";
                      return(
                        <tr key={i} style={{borderBottom:"1px solid #fafaf8",background:i%2===0?"white":"#fafaf8"}}>
                          <td style={{padding:"6px 10px",color:"#666",fontSize:10,whiteSpace:"nowrap"}}>{new Date(e.ts).toLocaleString()}</td>
                          <td style={{padding:"6px 10px",fontWeight:600,color:NAVY}}>{e.userName||"—"}</td>
                          <td style={{padding:"6px 10px"}}><span style={{background:bg,color:tc,padding:"1px 6px",borderRadius:3,fontSize:9,fontWeight:700}}>{e.type}</span></td>
                          <td style={{padding:"6px 10px",color:"#555"}}>{e.dealName||"—"}</td>
                          <td style={{padding:"6px 10px",color:GOLD,fontWeight:600}}>{e.docName?`${(e.docIdx||0)+1}. ${e.docName}`:"—"}</td>
                          <td style={{padding:"6px 10px",color:"#bbb",fontSize:9}}>{(e.userId||"").substring(0,12)}</td>
                        </tr>
                      );
                    })}
                    {ev.length===0&&<tr><td colSpan={6} style={{padding:24,textAlign:"center",color:"#bbb",fontStyle:"italic"}}>No events logged yet.</td></tr>}
                  </tbody>
                </table>
              </div>
            </div>
          </>}

          {/* FUNNEL TAB */}
          {adminTab==="funnel"&&<>
            <div style={{background:"white",border:"1px solid #e5e2d9",borderRadius:10,padding:"20px 24px",marginBottom:16}}>
              <div style={{fontSize:10,color:GOLD,letterSpacing:"0.2em",fontFamily:"Georgia,serif",marginBottom:18}}>DOCUMENT FUNNEL — UNIQUE INVESTORS PER DOCUMENT</div>
              <div style={{overflowX:"auto"}}>
                <table style={{width:"100%",borderCollapse:"collapse",fontSize:11,fontFamily:"Georgia,serif",minWidth:700}}>
                  <thead>
                    <tr style={{borderBottom:"2px solid #f0ede6"}}>
                      <th style={{textAlign:"left",padding:"8px 10px",color:NAVY,fontWeight:700}}>Deal</th>
                      {DOCS.map(d=><th key={d.n} style={{textAlign:"center",padding:"8px 8px",color:NAVY,fontWeight:700,fontSize:10}}>{d.n}. {d.name.split(" ")[0]}</th>)}
                      <th style={{textAlign:"center",padding:"8px 8px",color:NAVY,fontWeight:700,fontSize:10}}>Full Read %</th>
                    </tr>
                  </thead>
                  <tbody>
                    {DEALS.map(d=>{
                      const f=funnel(d.id);
                      const mx=Math.max(1,...f);
                      const fullRead=f[5]>0&&f[0]>0?Math.round((f[5]/f[0])*100):0;
                      return(
                        <tr key={d.id} style={{borderBottom:"1px solid #f5f3ee"}}>
                          <td style={{padding:"10px 10px",fontWeight:600,color:NAVY,fontSize:12}}>{d.name}</td>
                          {f.map((n,i)=>(
                            <td key={i} style={{textAlign:"center",padding:"10px 6px"}}>
                              <div style={{display:"inline-flex",alignItems:"center",justifyContent:"center",background:n>0?`rgba(27,58,107,${0.15+0.7*(n/mx)})`:"#f5f3ee",color:n>0?"white":"#ccc",borderRadius:5,width:34,height:34,fontSize:13,fontWeight:700}}>{n}</div>
                            </td>
                          ))}
                          <td style={{textAlign:"center",padding:"10px 8px"}}>
                            <span style={{background:fullRead>50?"#EAF3DE":fullRead>20?"#FAEEDA":"#f5f3ee",color:fullRead>50?"#166534":fullRead>20?"#92400E":"#999",fontSize:11,fontWeight:700,padding:"3px 10px",borderRadius:5}}>{fullRead}%</span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </>}

        </div>
      </div>
    );
  }

  return null;
}
