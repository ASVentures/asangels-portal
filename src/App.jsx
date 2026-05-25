import { useState, useEffect, useRef } from "react";

const PORTAL_PW = "VigilanceCP2026", ADMIN_PW = "AdminVCP2026";
const NAVY = "#0F1F3D", GOLD = "#B8935D";
const NAVY_DEEP = "#091428", NAVY_LIGHT = "#1F2F4D";
const GOLD_LIGHT = "#C9A47A", GOLD_PALE = "#E8DCC4";
const CREAM = "#FAF8F3", CREAM_DEEP = "#F5F1E8", PAPER = "#FFFFFF";
const TEXT = "#1F2937", TEXT_LIGHT = "#6B7280", TEXT_MUTED = "#9CA3AF";
const BORDER = "#E5E0D5", BORDER_LIGHT = "#EFEAE0";
const SERIF = '"EB Garamond", Georgia, serif';
const SANS = '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

// VITAL score badges — palette tints only (no bright greens/reds)
const VM = {
  "Strong":       {color:CREAM,      bg:NAVY,       border:NAVY,       label:"STRONG"},
  "Very Strong":  {color:CREAM,      bg:NAVY,       border:NAVY,       label:"VERY STRONG"},
  "Developing":   {color:NAVY,       bg:GOLD_PALE,  border:GOLD,       label:"DEVELOPING"},
  "Conditional":  {color:NAVY,       bg:GOLD_PALE,  border:GOLD,       label:"CONDITIONAL"},
  "Unknown":      {color:TEXT_LIGHT, bg:CREAM_DEEP, border:BORDER,     label:"UNKNOWN"},
  "Weak":         {color:"#7A4E2E",  bg:"#F5E8DC",  border:"#D4B89D",  label:"WEAK"},
  "Very Weak":    {color:"#7A4E2E",  bg:"#F5E8DC",  border:"#D4B89D",  label:"VERY WEAK"},
  "Pre-clinical": {color:"#7A4E2E",  bg:"#F5E8DC",  border:"#D4B89D",  label:"PRE-CLINICAL"},
};
const SM = {
  "Active Diligence — High Interest":          {color:CREAM,      bg:NAVY,       dot:"●"},
  "Active Diligence":                          {color:NAVY,       bg:GOLD_PALE,  dot:"●"},
  "Discovery Stage — Gathering Information":   {color:NAVY,       bg:CREAM_DEEP, dot:"●"},
  "Discovery Stage — High Skepticism":         {color:"#7A4E2E",  bg:"#F5E8DC",  dot:"●"},
  "Watch List — Too Early":                    {color:TEXT_LIGHT, bg:BORDER_LIGHT, dot:"●"},
};
const DOCS = [{n:1,name:"Quick Hit",sub:"60-second summary"},{n:2,name:"Deal Email",sub:"LP announcement"},{n:3,name:"One-Pager",sub:"Full investment thesis"},{n:4,name:"Short GP Memo",sub:"Internal GP brief"},{n:5,name:"Eisenhower Memo",sub:"Full diligence report"},{n:6,name:"Diligence Call Agenda",sub:"Live call structure"}];

const DEALS = [
  {id:"redskyhealth",name:"Red Sky Health",tagline:"AI-Powered Insurance Denial Remediation — Performance-Based",stage:"Active Diligence — High Interest",founder:"Dean Margolis, CEO — Columbia / Harvard MS CS / Harvard MBA",location:"Remote (Founded 2022)",raised:"$7.81M raised · 34 employees",round:"Current round TBD — likely Series A",tam:"$4.2B",tamNote:"US denial management market · $262B in denied claims annually · 10%+ annual growth",projections:"$25–40M ARR potential at 0.1% recovery volume capture",competitors:[{name:"Waystar",note:"Largest RCM vendor, absorbed Olive AI"},{name:"nThrive",note:"Established denial management incumbent"},{name:"Experian Health",note:"Payer intelligence and prior auth tools"}],vital:{V:{score:"Strong",summary:"Clients only pay when money is actually recovered — self-qualifying mechanism."},I:{score:"Developing",summary:"Reduces billing staff burden; frees clinical staff for patient-facing work."},T:{score:"Developing",summary:"OaaS pivot March 2026. Key question: demand-driven or SaaS stall?"},A:{score:"Strong",summary:"OaaS eliminates upfront cost barrier — standard API integration."},L:{score:"Developing",summary:"Payer-specific AI training data creates switching costs over time."}},docUrls:["https://www.dropbox.com/scl/fi/kkbron44vph02tu739ljn/ASAngels_REDSKYHEALTH_1_QuickHit.docx?rlkey=fo1v8nzqsmwc6lra6dndzex7u&dl=1","https://www.dropbox.com/scl/fi/n307rhrhusn2mgc8umzoz/ASAngels_REDSKYHEALTH_2_DealEmail.docx?rlkey=bcwch15jm250vtjzw5ifn44zm&dl=1","https://www.dropbox.com/scl/fi/xjuojma90ddyb9s6jx2lt/ASAngels_REDSKYHEALTH_3_OnePager.docx?rlkey=1y326knat5of2i065xtadffww&dl=1","https://www.dropbox.com/scl/fi/waofp2iahwp4b4882rxy3/ASAngels_REDSKYHEALTH_4_ShortMemo.docx?rlkey=jfrnenl4vqo36glkl98i5cqwk&dl=1","https://www.dropbox.com/scl/fi/w6vumkf898bccy26uchy5/ASAngels_REDSKYHEALTH_5_EisenhowerMemo.docx?rlkey=2xfo2dg2k1abdcrhn6g6zyggn&dl=1","https://www.dropbox.com/scl/fi/emknew603ds7eyg8az8v9/ASAngels_REDSKYHEALTH_6_DiligenceCallAgenda..docx?rlkey=i0tpghoheu3r9tha8ungdwjrc&st=nbibtjqo&dl=1"],pitchDeck:{name:"Investor Deck",sub:"Investor Deck (from company) — May 2026",url:"https://www.dropbox.com/scl/fi/omt4q3rvtjxcssn0o5phn/Red-Sky-Health-Investor-Deck-May-2026.pdf?rlkey=6flslcxjetvesklq08thldos3&dl=1"}},
  {id:"youlify",name:"Youlify",tagline:"End-to-End AI That Replaces Your Entire Medical Billing Department",stage:"Active Diligence — High Interest",founder:"Dr. Bo Gu MD (CEO, cardiac surgeon) · Sally Liang (COO) · Howard Peng (CTO, NLP PhD)",location:"San Francisco, CA (Founded 2023)",raised:"$4.3M seed · Bonfire · Illia Polosukhin · Oracle Chief AI Scientist",round:"Likely Series A ($15–25M) · Vigilance Capital Partners $500K–$1M",tam:"$15B",tamNote:"US medical billing industry. AI-augmented RCM market projected $6.2B by 2028.",projections:"$100M+ ARR at 1% of US physician practices at $50K/yr",competitors:[{name:"Waystar / Olive AI",note:"Largest incumbent but not physician-founded"},{name:"Athenahealth RCM",note:"Integrated EHR + billing — legacy stack"},{name:"Availity",note:"Connectivity platform, not AI replacement"}],vital:{V:{score:"Strong",summary:"Full RCM replacement: staff cost + recovery + payment cycle improvements compound."},I:{score:"Strong",summary:"Physician time reclaimed from admin burden. Payer surveillance agent prevents denials upstream."},T:{score:"Developing",summary:"Illia Polosukhin (Attention Is All You Need co-author) invested. ARR undisclosed."},A:{score:"Developing",summary:"Full billing replacement requires health system leadership buy-in and EHR integration."},L:{score:"Developing",summary:"Physician founder moat. NLP PhD CTO. Payer rule dataset builds switching costs."}}},
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


async function sGet(k,sh=false){try{const r=await window.storage.get(k,sh);return r?JSON.parse(r.value):null;}catch{return null;}}
async function sSet(k,v,sh=false){try{await window.storage.set(k,JSON.stringify(v),sh);}catch{}}
function uid(){return Date.now().toString(36)+Math.random().toString(36).slice(2,7);}

function ScorePill({score}){const m=VM[score]||VM["Unknown"];return<span style={{background:m.bg,color:m.color,border:`1px solid ${m.color}44`,borderRadius:4,padding:"2px 8px",fontSize:11,fontWeight:600,whiteSpace:"nowrap"}}>{m.label}</span>;}

function makeWAPost(d){
  const dot=(SM[d.stage]||{}).dot||"🔵";
  const vl=(k,l)=>{const v=d.vital[k];const m=VM[v.score]||VM["Unknown"];return`*${k} — ${l}:* ${m.label}\n↳ ${v.summary}`;};
  return `🏥 *Vigilance Capital Partners | Deal Alert*\n━━━━━━━━━━━━━━━━━━━━━━━\n\n*${d.name.toUpperCase()}*\n_${d.tagline}_\n\n*Stage:* ${dot} ${d.stage}\n*Founder:* ${d.founder}\n*Location:* ${d.location}\n*Financing:* ${d.raised}\n\n━━━━━━━━━━━━━━━━━━━━━━━\n💰 *MARKET OPPORTUNITY*\n\n*TAM:* ${d.tam}\n${d.tamNote}\n\n📈 *Projections:* ${d.projections}\n\n━━━━━━━━━━━━━━━━━━━━━━━\n🏆 *KEY PLAYERS IN SPACE*\n${d.competitors.map(c=>`• *${c.name}* — ${c.note}`).join('\n')}\n\n━━━━━━━━━━━━━━━━━━━━━━━\n📊 *VITAL ASSESSMENT*\n\n${vl('V','Value')}\n\n${vl('I','Impact')}\n\n${vl('T','Traction')}\n\n${vl('A','Adoption')}\n\n${vl('L','Landscape')}\n\n━━━━━━━━━━━━━━━━━━━━━━━\n📁 *DEAL DOCUMENTS — 6 Available*\n\n🔒 vcp.shahrx.com\n_Message Dr. Shah for your access password_\n\n1️⃣ Quick Hit — 60-second summary\n2️⃣ Deal Email — LP announcement  \n3️⃣ One-Pager — Full investment thesis\n4️⃣ Short GP Memo — Internal GP brief\n5️⃣ Eisenhower Memo — Full diligence report\n6️⃣ Diligence Call Agenda\n\n━━━━━━━━━━━━━━━━━━━━━━━\n_Vigilance Capital Partners LLC · For accredited investors only_`;
}

function TickerBand({user}) {
  const [items,setItems]=useState([]);
  const [loading,setLoading]=useState(true);
  const [pos,setPos]=useState(0);
  const tickerRef=useRef(null);
  const GOLD="#B8935D", NAVY="#0F1F3D";

  useEffect(()=>{
    async function fetchNews(){
      try {
        const res = await fetch("/api/news");
        const data = await res.json();
        if (data.articles && data.articles.length) setItems(data.articles);
      } catch(e) { console.error(e); }
      finally { setLoading(false); }
    }
    fetchNews();
  },[]);

  useEffect(()=>{
    if(items.length===0)return;
    const interval=setInterval(()=>setPos(p=>p-1),30);
    return()=>clearInterval(interval);
  },[items]);

  const typeColor={Portfolio:NAVY,Industry:NAVY,Competitor:"#7A4E2E"};
  const typeBg={Portfolio:GOLD_PALE,Industry:CREAM_DEEP,Competitor:"#F5E8DC"};

  if(loading)return(
    <div style={{background:NAVY,borderTop:`2px solid ${GOLD}`,borderBottom:`2px solid ${GOLD}`,padding:"8px 16px",display:"flex",alignItems:"center",gap:12}}>
      <div style={{fontSize:10,color:GOLD,fontWeight:700,fontFamily:SERIF,whiteSpace:"nowrap",flexShrink:0}}>📡 LIVE FEED</div>
      <div style={{fontSize:11,color:"rgba(250,248,243,0.65)",fontFamily:SERIF,fontStyle:"italic"}}>Loading latest news on portfolio companies and industry...</div>
    </div>
  );

  if(items.length===0)return null;

  const doubled=[...items,...items,...items];
  const totalWidth=doubled.length*340;

  return(
    <div style={{background:NAVY,borderTop:`2px solid ${GOLD}`,borderBottom:`2px solid ${GOLD}`,padding:"6px 0",overflow:"hidden",position:"relative"}}>
      <div style={{display:"flex",alignItems:"center"}}>
        <div style={{background:GOLD,padding:"4px 12px",fontWeight:700,fontSize:10,color:CREAM,fontFamily:SERIF,whiteSpace:"nowrap",flexShrink:0,letterSpacing:"0.1em",zIndex:2}}>📡 LIVE</div>
        <div style={{overflow:"hidden",flex:1,position:"relative"}}>
          <div style={{display:"flex",gap:0,transform:`translateX(${pos % totalWidth}px)`,whiteSpace:"nowrap",transition:"none"}}>
            {doubled.map((item,i)=>(
              <div key={i} style={{display:"inline-flex",alignItems:"center",gap:8,padding:"0 24px",borderRight:"1px solid rgba(255,255,255,0.15)",flexShrink:0}}>
                <span style={{background:typeBg[item.type]||CREAM_DEEP,color:typeColor[item.type]||NAVY,fontSize:9,fontWeight:700,padding:"1px 6px",borderRadius:2,fontFamily:SERIF,whiteSpace:"nowrap"}}>{item.label}</span>
                <span style={{fontSize:11,color:"rgba(250,248,243,0.85)",fontFamily:SERIF,whiteSpace:"nowrap",maxWidth:380,overflow:"hidden",textOverflow:"ellipsis"}}>{item.headline}</span>
                <span style={{fontSize:10,color:"rgba(250,248,243,0.5)",fontFamily:SERIF,whiteSpace:"nowrap"}}>{item.source} · {item.date}</span>
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
  const NAVY="#0F1F3D", GOLD="#B8935D";
  const typeColor={Portfolio:NAVY,Industry:NAVY,Competitor:"#7A4E2E",Public:NAVY};
  const typeBg={Portfolio:GOLD_PALE,Industry:CREAM_DEEP,Competitor:"#F5E8DC",Public:CREAM_DEEP};

  useEffect(()=>{
    fetch("/api/news")
      .then(r => r.json())
      .then(data => {
        if (data.articles && data.articles.length) {
          setArticles(data.articles);
        } else {
          setError(data.error || "No articles loaded");
        }
        setLoading(false);
      })
      .catch(e => { setError(e.message); setLoading(false); });
  },[]);

  if(loading) return(
    <div style={{background:PAPER,border:"1px solid #E5E0D5",borderRadius:4,padding:"20px 24px",marginBottom:16}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
        <div style={{width:8,height:8,borderRadius:"50%",background:GOLD,animation:"pulse 1.5s infinite"}}/>
        <div style={{fontSize:10,color:GOLD,letterSpacing:"0.2em",fontFamily:SERIF,fontWeight:700}}>LIVE MARKET INTELLIGENCE — LOADING...</div>
      </div>
      {[1,2,3,4].map(i=>(
        <div key={i} style={{height:60,background:"#EFEAE0",borderRadius:2,marginBottom:8,animation:"pulse 1.5s infinite"}}/>
      ))}
    </div>
  );

  if(error||articles.length===0) return(
    <div style={{background:PAPER,border:"1px solid #E5E0D5",borderRadius:4,padding:"20px 24px",marginBottom:16}}>
      <div style={{fontSize:10,color:GOLD,letterSpacing:"0.2em",fontFamily:SERIF,marginBottom:8}}>MARKET INTELLIGENCE</div>
      <div style={{fontSize:12,color:TEXT_MUTED,fontStyle:"italic",fontFamily:SERIF}}>News feed unavailable. Check API connectivity.</div>
    </div>
  );

  return(
    <div style={{background:PAPER,border:"1px solid #E5E0D5",borderRadius:4,padding:"20px 24px",marginBottom:16}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}>
        <div style={{width:8,height:8,borderRadius:"50%",background:GOLD}}/>
        <div style={{fontSize:10,color:GOLD,letterSpacing:"0.2em",fontFamily:SERIF,fontWeight:700}}>LIVE MARKET INTELLIGENCE — {articles.length} ARTICLES LOADED</div>
        <div style={{fontSize:9,color:TEXT_MUTED,fontFamily:SERIF,marginLeft:"auto"}}>Updated {new Date().toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}</div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:10}}>
        {articles.map((a,i)=>(
          <div key={i} style={{background:"#F5F1E8",borderRadius:2,padding:"14px 16px",border:"1px solid #EFEAE0",display:"flex",flexDirection:"column",gap:6}}>
            <div style={{display:"flex",alignItems:"center",gap:6,flexWrap:"wrap"}}>
              <span style={{background:typeBg[a.type]||CREAM_DEEP,color:typeColor[a.type]||NAVY,fontSize:9,fontWeight:700,padding:"2px 8px",borderRadius:2,fontFamily:SERIF,flexShrink:0}}>{a.label}</span>
              <span style={{fontSize:9,background:"#EFEAE0",color:TEXT_LIGHT,padding:"2px 6px",borderRadius:2,fontFamily:SERIF,flexShrink:0}}>{a.type}</span>
              <span style={{fontSize:9,color:TEXT_MUTED,fontFamily:SERIF,marginLeft:"auto",flexShrink:0}}>{a.date} · {a.source}</span>
            </div>
            <div style={{fontSize:12,fontWeight:600,color:NAVY,fontFamily:SERIF,lineHeight:1.4}}>{a.headline}</div>
            {a.summary&&<div style={{fontSize:11,color:TEXT_LIGHT,fontFamily:SERIF,lineHeight:1.4}}>{a.summary}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

function VettingTimeline({timeline}) {
  if(!timeline||!timeline.length) return null;
  const NAVY="#0F1F3D", GOLD="#B8935D";
  const sorted=[...timeline].sort((a,b)=>new Date(a.date)-new Date(b.date));
  const ours=sorted.filter(t=>t.type==="ours");
  const theirs=sorted.filter(t=>t.type==="company");
  const fmt=d=>new Date(d).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"2-digit"});

  return(
    <div style={{background:PAPER,border:"1px solid #E5E0D5",borderRadius:4,padding:"20px 24px",marginBottom:16}}>
      <div style={{fontSize:10,color:GOLD,letterSpacing:"0.2em",fontFamily:SERIF,marginBottom:16}}>VETTING TIMELINE</div>
      <div style={{display:"flex",gap:0,position:"relative"}}>
        {/* Left column — Our milestones */}
        <div style={{flex:1,paddingRight:20}}>
          <div style={{fontSize:9,color:NAVY,fontWeight:500,letterSpacing:"0.32em",textTransform:"uppercase",marginBottom:10,fontFamily:SANS,textAlign:"right"}}>VCP Milestones</div>
          {ours.map((t,i)=>(
            <div key={i} style={{display:"flex",justifyContent:"flex-end",alignItems:"flex-start",marginBottom:10,gap:8}}>
              <div style={{textAlign:"right"}}>
                <div style={{fontSize:11,fontWeight:600,color:NAVY,fontFamily:SERIF}}>{t.label}</div>
                <div style={{fontSize:10,color:TEXT_MUTED,fontFamily:SERIF}}>{fmt(t.date)}</div>
              </div>
              <div style={{width:8,height:8,borderRadius:"50%",background:GOLD,flexShrink:0,marginTop:3}}/>
            </div>
          ))}
        </div>
        {/* Center line */}
        <div style={{width:1,background:BORDER,flexShrink:0,minHeight:80}}/>
        {/* Right column — Company milestones */}
        <div style={{flex:1,paddingLeft:20}}>
          <div style={{fontSize:9,color:NAVY,fontWeight:500,letterSpacing:"0.32em",textTransform:"uppercase",marginBottom:10,fontFamily:SANS}}>Company Milestones</div>
          {theirs.map((t,i)=>(
            <div key={i} style={{display:"flex",alignItems:"flex-start",marginBottom:10,gap:8}}>
              <div style={{width:8,height:8,borderRadius:"50%",background:NAVY,flexShrink:0,marginTop:3}}/>
              <div>
                <div style={{fontSize:11,fontWeight:600,color:NAVY,fontFamily:SERIF}}>{t.label}</div>
                <div style={{fontSize:10,color:TEXT_MUTED,fontFamily:SERIF}}>{fmt(t.date)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return(
    <footer style={{background:NAVY_DEEP,padding:"40px 24px 28px",marginTop:48}}>
      <div style={{maxWidth:1080,margin:"0 auto"}}>
        <div style={{fontFamily:SERIF,fontSize:18,fontWeight:500,color:CREAM,letterSpacing:"-0.01em",marginBottom:16}}>
          Vigilance <em style={{fontStyle:"italic",color:GOLD,fontWeight:500}}>Capital</em> Partners
        </div>
        <div style={{fontFamily:SANS,fontSize:11,color:"rgba(250,248,243,0.4)",lineHeight:1.7,maxWidth:760,marginBottom:18}}>
          Vigilance Capital Partners is not a registered investment adviser. This portal is for informational purposes only and does not constitute an offer to sell, or a solicitation of an offer to buy, any securities. All investments involve risk, including possible loss of principal.
        </div>
        <div style={{fontFamily:SANS,fontSize:11,color:"rgba(250,248,243,0.55)",letterSpacing:"0.02em"}}>
          © 2026 Vigilance Capital Partners. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

function VcpLogo({size=20, onCream=false}) {
  const baseColor = onCream ? NAVY : CREAM;
  return(
    <div style={{fontFamily:SERIF,fontSize:size,fontWeight:500,color:baseColor,letterSpacing:"-0.01em",lineHeight:1}}>
      Vigilance <em style={{fontStyle:"italic",color:GOLD,fontWeight:500}}>Capital</em> Partners
    </div>
  );
}

function PublicDealCard({d, onClick}) {
  const NAVY="#0F1F3D", GOLD="#B8935D";
  const vitalColors={Strong:NAVY,Developing:"#7A4E2E","Very Strong":NAVY,Weak:"#7A4E2E",Unknown:TEXT};
  const vitalBg={Strong:GOLD_PALE,Developing:"#F5E8DC","Very Strong":CREAM_DEEP,Weak:"#F5E8DC",Unknown:"#EFEAE0"};
  const stageColor=d.stage.includes("Complete")?NAVY:d.stage.includes("Scheduled")?NAVY:"#7A4E2E";
  const stageBg=d.stage.includes("Complete")?GOLD_PALE:d.stage.includes("Scheduled")?CREAM_DEEP:"#F5E8DC";
  return(
    <div onClick={()=>onClick(d)} style={{background:PAPER,border:`1px solid ${BORDER}`,borderRadius:4,padding:"22px 24px",cursor:"pointer",transition:"border-color 0.2s ease"}} onMouseEnter={e=>e.currentTarget.style.borderColor=GOLD} onMouseLeave={e=>e.currentTarget.style.borderColor=BORDER}>
      <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:8}}>
        <div>
          <span style={{fontSize:22,fontWeight:700,color:NAVY,fontFamily:SERIF}}>{d.ticker}</span>
          <span style={{fontSize:14,color:TEXT_LIGHT,fontFamily:SERIF,marginLeft:8}}>{d.name}</span>
        </div>
        <span style={{background:stageBg,color:stageColor,fontSize:9,fontWeight:700,padding:"3px 8px",borderRadius:4,fontFamily:SERIF,whiteSpace:"nowrap"}}>{d.stage}</span>
      </div>
      <div style={{fontSize:11,color:TEXT_LIGHT,fontFamily:SERIF,marginBottom:10,lineHeight:1.4}}>{d.tagline}</div>
      <div style={{display:"flex",gap:16,marginBottom:10,flexWrap:"wrap"}}>
        <div><div style={{fontSize:9,color:GOLD,letterSpacing:"0.1em",fontFamily:SERIF}}>MKT CAP</div><div style={{fontSize:12,fontWeight:600,color:NAVY,fontFamily:SERIF}}>{d.marketCap}</div></div>
        <div><div style={{fontSize:9,color:GOLD,letterSpacing:"0.1em",fontFamily:SERIF}}>CASH</div><div style={{fontSize:12,fontWeight:600,color:NAVY,fontFamily:SERIF}}>{d.cash}</div></div>
        <div><div style={{fontSize:9,color:GOLD,letterSpacing:"0.1em",fontFamily:SERIF}}>ANALYSTS</div><div style={{fontSize:12,fontWeight:600,color:NAVY,fontFamily:SERIF}}>{d.analysts}</div></div>
      </div>
      <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
        {Object.entries(d.vital).map(([k,v])=>(
          <span key={k} style={{background:vitalBg[v.score]||"#EFEAE0",color:vitalColors[v.score]||TEXT,fontSize:9,fontWeight:700,padding:"2px 7px",borderRadius:2,fontFamily:SERIF}}>{k}: {v.score}</span>
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

  if(ld)return<div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100vh",background:CREAM}}><div style={{color:NAVY,fontSize:18,fontFamily:SERIF,fontWeight:500,letterSpacing:"-0.01em"}}>Loading Vigilance <em style={{color:GOLD,fontStyle:"italic"}}>Capital</em>…</div></div>;

  // LOGIN
  if(view==="login")return(
    <div style={{minHeight:"100vh",background:CREAM,display:"flex",flexDirection:"column"}}>
      <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",padding:24}}>
        <div style={{width:"100%",maxWidth:440}}>
          <div style={{textAlign:"center",marginBottom:40}}>
            <div style={{fontFamily:SANS,fontSize:10,color:GOLD,letterSpacing:"0.32em",textTransform:"uppercase",fontWeight:500,marginBottom:18}}>Physician-Led Venture Platform</div>
            <div style={{fontFamily:SERIF,fontSize:44,fontWeight:500,color:NAVY,letterSpacing:"-0.015em",lineHeight:1.1}}>
              Vigilance <em style={{fontStyle:"italic",color:GOLD,fontWeight:500}}>Capital</em><br/>Partners
            </div>
            <div style={{fontFamily:SANS,fontSize:13,color:TEXT_LIGHT,marginTop:14,letterSpacing:"0.02em"}}>Deal Room · Confidential Access</div>
          </div>
          <div style={{background:PAPER,border:`1px solid ${BORDER}`,borderRadius:4,padding:32}}>
            {step==="password"?(<>
              <div style={{fontFamily:SANS,fontSize:12,color:TEXT_LIGHT,marginBottom:18,textAlign:"center"}}>Enter your access password</div>
              <input value={pw} onChange={e=>setPw(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handlePw()} type="password" placeholder="Access Password" style={{width:"100%",padding:"12px 14px",borderRadius:2,border:`1px solid ${BORDER}`,background:CREAM,color:TEXT,fontSize:14,outline:"none",boxSizing:"border-box",fontFamily:SANS,marginBottom:12,transition:"border-color 0.2s"}} onFocus={e=>e.target.style.borderColor=GOLD} onBlur={e=>e.target.style.borderColor=BORDER}/>
              {err&&<div style={{color:"#7A4E2E",fontSize:12,marginBottom:10,textAlign:"center",fontFamily:SANS}}>{err}</div>}
              <button onClick={handlePw} className="vcp-btn-primary" style={{width:"100%"}}>Enter Deal Room</button>
              <div style={{textAlign:"center",marginTop:18,fontFamily:SANS,fontSize:11,color:TEXT_MUTED}}>Contact Dr. Aalap Shah, MD for access</div>
            </>):(<>
              <div style={{fontFamily:SANS,fontSize:12,color:TEXT_LIGHT,marginBottom:18,textAlign:"center"}}>Welcome. Please identify yourself.</div>
              <input value={nameV} onChange={e=>setName(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleName()} type="text" placeholder="Your full name (e.g. Dr. Jane Smith)" style={{width:"100%",padding:"12px 14px",borderRadius:2,border:`1px solid ${BORDER}`,background:CREAM,color:TEXT,fontSize:14,outline:"none",boxSizing:"border-box",fontFamily:SANS,marginBottom:12,transition:"border-color 0.2s"}} onFocus={e=>e.target.style.borderColor=GOLD} onBlur={e=>e.target.style.borderColor=BORDER}/>
              {err&&<div style={{color:"#7A4E2E",fontSize:12,marginBottom:10,textAlign:"center",fontFamily:SANS}}>{err}</div>}
              <button onClick={handleName} className="vcp-btn-primary" style={{width:"100%"}}>Access Deals</button>
            </>)}
          </div>
          <div style={{textAlign:"center",marginTop:24,fontFamily:SANS,fontSize:10,color:TEXT_MUTED,lineHeight:1.7,letterSpacing:"0.02em"}}>For accredited investors only · These materials do not constitute an offer to sell securities</div>
        </div>
      </div>
      <Footer/>
    </div>
  );

  // DEAL ROOM
  if(view==="room"){
    const active=DEALS.filter(d=>d.stage.includes("Active"));
    const other=DEALS.filter(d=>!d.stage.includes("Active"));
    return(
      <div style={{minHeight:"100vh",background:CREAM,display:"flex",flexDirection:"column"}}>
        <div style={{background:"rgba(250,248,243,0.85)",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",padding:"16px 28px",display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",top:0,zIndex:10,borderBottom:`1px solid ${BORDER}`}}>
          <div style={{display:"flex",alignItems:"center",gap:14}}>
            <VcpLogo size={18} onCream={true}/>
            <div style={{fontFamily:SANS,fontSize:10,color:GOLD,letterSpacing:"0.32em",textTransform:"uppercase",fontWeight:500,borderLeft:`1px solid ${BORDER}`,paddingLeft:14}}>Deal Room</div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:14}}>
            <div style={{fontFamily:SANS,fontSize:12,color:TEXT_LIGHT}}>Welcome, {u?.name}</div>
            {u?.isAdmin&&<button onClick={()=>setView("admin")} style={{background:"transparent",color:NAVY,border:`1px solid ${NAVY}`,borderRadius:2,padding:"6px 12px",fontSize:10,letterSpacing:"0.15em",textTransform:"uppercase",cursor:"pointer",fontFamily:SANS,fontWeight:500}}>Analytics</button>}
            <button onClick={logout} style={{background:"transparent",color:TEXT_LIGHT,border:`1px solid ${BORDER}`,borderRadius:2,padding:"6px 12px",fontSize:10,letterSpacing:"0.15em",textTransform:"uppercase",cursor:"pointer",fontFamily:SANS,fontWeight:500}}>Sign Out</button>
          </div>
        </div>
        <TickerBand user={u}/>
        <div style={{maxWidth:1080,margin:"0 auto",padding:"56px 20px 24px",width:"100%",boxSizing:"border-box",flex:1}}>
          <div style={{marginBottom:36}}>
            <div className="vcp-eyebrow" style={{marginBottom:14}}>Vigilance Capital Partners Portfolio — April 2026</div>
            <div style={{fontFamily:SERIF,fontSize:38,fontWeight:500,color:NAVY,letterSpacing:"-0.015em",lineHeight:1.1,marginBottom:14}}>Active <em style={{fontStyle:"italic",color:GOLD,fontWeight:500}}>deals</em> under review</div>
            <div style={{fontFamily:SANS,fontSize:14,color:TEXT_LIGHT,maxWidth:620,lineHeight:1.7}}>Review documents 1–6 in order for the most complete diligence experience. Your access is tracked for GP analytics.</div>
          </div>
          <div className="vcp-eyebrow" style={{marginBottom:14,color:NAVY}}>Active Diligence ({active.length})</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(310px,1fr))",gap:14,marginBottom:28}}>
            {active.map(d=>{
              const s=SM[d.stage]||SM["Active Diligence"];
              return<div key={d.id} onClick={()=>handleDeal(d)} style={{background:PAPER,border:`1px solid ${BORDER}`,borderRadius:4,padding:"22px 24px",cursor:"pointer",transition:"border-color 0.2s ease"}} onMouseEnter={e=>e.currentTarget.style.borderColor=GOLD} onMouseLeave={e=>e.currentTarget.style.borderColor=BORDER}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
                  <div><div style={{fontSize:16,fontWeight:700,color:NAVY,fontFamily:SERIF,marginBottom:2}}>{d.name}</div><div style={{fontSize:11,color:TEXT_LIGHT,lineHeight:1.4,maxWidth:250}}>{d.tagline}</div></div>
                  <span style={{background:s.bg,color:s.color,fontSize:9,fontWeight:600,padding:"2px 7px",borderRadius:4,whiteSpace:"nowrap",marginLeft:8,flexShrink:0}}>{s.dot} {d.stage.split(" — ")[0]}</span>
                </div>
                <div style={{marginBottom:10}}><div style={{fontSize:10,color:TEXT_LIGHT}}>TAM: <strong style={{color:NAVY}}>{d.tam}</strong> · {d.raised.split(" · ")[0]}</div></div>
                <div style={{display:"flex",gap:3,flexWrap:"wrap"}}>
                  {["V","I","T","A","L"].map(k=>{const m=VM[d.vital[k].score]||VM["Unknown"];return<span key={k} style={{background:m.bg,color:m.color,border:`1px solid ${m.color}33`,borderRadius:2,padding:"1px 5px",fontSize:9,fontWeight:700}}>{k}: {m.label.split(" ")[0]}</span>;})}
                </div>
                <div style={{marginTop:14,fontSize:10,color:GOLD,fontWeight:500,letterSpacing:"0.32em",textTransform:"uppercase",fontFamily:SANS}}>View deal room →</div>
              </div>;
            })}
          </div>
          <div style={{fontSize:10,fontWeight:700,color:TEXT_LIGHT,letterSpacing:"0.12em",fontFamily:SERIF,marginBottom:10}}>DISCOVERY / WATCH LIST ({other.length})</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(310px,1fr))",gap:14}}>
            {other.map(d=>{
              const s=SM[d.stage]||SM["Active Diligence"];
              return<div key={d.id} onClick={()=>handleDeal(d)} style={{background:PAPER,border:`1px solid ${BORDER}`,borderRadius:4,padding:"20px 22px",cursor:"pointer",transition:"border-color 0.2s ease"}} onMouseEnter={e=>e.currentTarget.style.borderColor=GOLD} onMouseLeave={e=>e.currentTarget.style.borderColor=BORDER}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
                  <div><div style={{fontSize:15,fontWeight:700,color:NAVY,fontFamily:SERIF,marginBottom:2}}>{d.name}</div><div style={{fontSize:11,color:TEXT_LIGHT,lineHeight:1.4,maxWidth:240}}>{d.tagline}</div></div>
                  <span style={{background:s.bg,color:s.color,fontSize:9,fontWeight:600,padding:"2px 7px",borderRadius:4,whiteSpace:"nowrap",marginLeft:8,flexShrink:0}}>{s.dot} {d.stage.split(" — ")[0]}</span>
                </div>
                <div style={{display:"flex",gap:3,flexWrap:"wrap",marginBottom:6}}>
                  {["V","I","T","A","L"].map(k=>{const m=VM[d.vital[k].score]||VM["Unknown"];return<span key={k} style={{background:m.bg,color:m.color,border:`1px solid ${m.color}33`,borderRadius:2,padding:"1px 5px",fontSize:9,fontWeight:700}}>{k}: {m.label.split(" ")[0]}</span>;})}
                </div>
                <div style={{fontSize:10,color:GOLD,fontWeight:600}}>VIEW →</div>
              </div>;
            })}
          </div>
          <NewsFeedSection />
          <div style={{marginTop:32,marginBottom:8}}>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:4}}>
              <div style={{fontSize:10,color:"#B8935D",letterSpacing:"0.2em",fontFamily:SERIF,fontWeight:700}}>PUBLIC MARKETS WATCH — VIA GABRIEL KRANTZ / LIFESCI ADVISORS</div>
              <div style={{flex:1,height:1,background:"#E5E0D5"}}/>
            </div>
            <div style={{fontSize:11,color:TEXT_LIGHT,fontFamily:SERIF,marginBottom:16}}>Post-IPO C-suite exposure meetings facilitated by Gabriel Krantz (LifeSci Advisors). These are small-cap public companies — evaluated through the VITAL framework on public evidence. Not SPV investments.</div>
            {pubSel ? (
              <div style={{background:PAPER,border:"1px solid #E5E0D5",borderRadius:4,padding:"24px 28px"}}>
                <button onClick={()=>setPubSel(null)} style={{background:CREAM_DEEP,color:"#0F1F3D",border:"none",borderRadius:2,padding:"4px 12px",fontSize:10,cursor:"pointer",fontFamily:SERIF,marginBottom:16}}>← Back to Public Watch</button>
                <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:4}}>
                  <div style={{fontSize:28,fontWeight:700,color:"#0F1F3D",fontFamily:SERIF}}>{pubSel.ticker}</div>
                  <div style={{fontSize:16,color:TEXT_LIGHT,fontFamily:SERIF}}>{pubSel.name}</div>
                  <span style={{background:CREAM_DEEP,color:"#0F1F3D",fontSize:9,fontWeight:700,padding:"3px 8px",borderRadius:4,fontFamily:SERIF}}>{pubSel.exchange}</span>
                </div>
                <div style={{fontSize:12,color:TEXT,fontFamily:SERIF,marginBottom:16,lineHeight:1.5}}>{pubSel.tagline}</div>
                <div style={{display:"flex",gap:20,marginBottom:16,flexWrap:"wrap"}}>
                  {[["Market Cap",pubSel.marketCap],["Cash",pubSel.cash],["Analysts",pubSel.analysts],["Met With",pubSel.metWith]].map(([l,v])=>(
                    <div key={l}><div style={{fontSize:9,color:"#B8935D",letterSpacing:"0.1em",fontFamily:SERIF}}>{l}</div><div style={{fontSize:12,fontWeight:600,color:"#0F1F3D",fontFamily:SERIF,maxWidth:320}}>{v}</div></div>
                  ))}
                </div>
                <div style={{fontSize:10,color:"#B8935D",letterSpacing:"0.15em",fontFamily:SERIF,marginBottom:8}}>KEY ASSET & CLINICAL STAGE</div>
                <div style={{fontSize:12,color:TEXT,fontFamily:SERIF,lineHeight:1.6,marginBottom:16,background:"#F5F1E8",padding:"12px 16px",borderRadius:2,border:"1px solid #EFEAE0"}}>{pubSel.keyAsset}</div>
                <div style={{fontSize:10,color:"#B8935D",letterSpacing:"0.15em",fontFamily:SERIF,marginBottom:8}}>NEAR-TERM CATALYSTS</div>
                <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:16}}>
                  {pubSel.catalysts.map((c,i)=>(
                    <span key={i} style={{background:CREAM_DEEP,color:"#0F1F3D",fontSize:10,padding:"4px 10px",borderRadius:2,fontFamily:SERIF}}>{c}</span>
                  ))}
                </div>
                <div style={{fontSize:10,color:"#B8935D",letterSpacing:"0.15em",fontFamily:SERIF,marginBottom:10}}>VITAL ASSESSMENT</div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:8}}>
                  {Object.entries(pubSel.vital).map(([k,v])=>{
                    const c={Strong:NAVY,Developing:"#7A4E2E","Very Strong":NAVY,Weak:"#7A4E2E",Unknown:TEXT};
                    const b={Strong:GOLD_PALE,Developing:"#F5E8DC","Very Strong":CREAM_DEEP,Weak:"#F5E8DC",Unknown:"#EFEAE0"};
                    return(
                      <div key={k} style={{background:"#F5F1E8",borderRadius:2,padding:"12px 14px",border:"1px solid #EFEAE0"}}>
                        <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:4}}>
                          <span style={{fontSize:12,fontWeight:700,color:"#0F1F3D",fontFamily:SERIF}}>{k}</span>
                          <span style={{background:b[v.score]||"#EFEAE0",color:c[v.score]||TEXT,fontSize:9,fontWeight:700,padding:"1px 6px",borderRadius:2,fontFamily:SERIF}}>{v.score}</span>
                        </div>
                        <div style={{fontSize:11,color:TEXT,fontFamily:SERIF,lineHeight:1.4}}>{v.summary}</div>
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
        <Footer/>
      </div>
    );
  }

  // DEAL DETAIL
  if(view==="deal"&&sel){
    const s=SM[sel.stage]||SM["Active Diligence"];
    return(
      <div style={{minHeight:"100vh",background:CREAM,display:"flex",flexDirection:"column"}}>
        <div style={{background:"rgba(250,248,243,0.85)",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",padding:"14px 28px",display:"flex",alignItems:"center",gap:14,position:"sticky",top:0,zIndex:10,borderBottom:`1px solid ${BORDER}`}}>
          <button onClick={()=>setView("room")} style={{background:"transparent",color:TEXT_LIGHT,border:`1px solid ${BORDER}`,borderRadius:2,padding:"6px 14px",fontSize:10,letterSpacing:"0.15em",textTransform:"uppercase",cursor:"pointer",fontFamily:SANS,fontWeight:500}}>← Deal Room</button>
          <div style={{fontFamily:SERIF,fontSize:18,fontWeight:500,color:NAVY,letterSpacing:"-0.01em"}}>{sel.name}</div>
          <span style={{background:s.bg,color:s.color,fontSize:9,fontWeight:500,padding:"3px 10px",borderRadius:2,letterSpacing:"0.1em",textTransform:"uppercase",fontFamily:SANS}}>{sel.stage}</span>
        </div>
        <div style={{maxWidth:860,margin:"0 auto",padding:"40px 20px 24px",width:"100%",boxSizing:"border-box",flex:1}}>
          {/* Company Header */}
          <div style={{background:PAPER,border:"1px solid #E5E0D5",borderRadius:4,padding:"24px 28px",marginBottom:16}}>
            <div style={{fontSize:10,color:GOLD,letterSpacing:"0.2em",marginBottom:6,fontFamily:SERIF}}>COMPANY OVERVIEW</div>
            <div style={{fontSize:24,fontWeight:700,color:NAVY,fontFamily:SERIF,marginBottom:4}}>{sel.name}</div>
            <div style={{fontSize:13,color:TEXT,fontFamily:SERIF,marginBottom:14,lineHeight:1.5}}>{sel.tagline}</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              {[["Founder",sel.founder],["Location",sel.location],["Capital Raised",sel.raised],["Current Round",sel.round]].map(([k,v])=>(
                <div key={k}><div style={{fontSize:9,color:TEXT_MUTED,letterSpacing:"0.1em",marginBottom:1,fontFamily:SERIF}}>{k}</div><div style={{fontSize:11,color:TEXT,fontFamily:SERIF,lineHeight:1.4}}>{v}</div></div>
              ))}
            </div>
          </div>

          {/* Market + Competitors */}
          <div style={{background:PAPER,border:"1px solid #E5E0D5",borderRadius:4,padding:"22px 28px",marginBottom:16}}>
            <div style={{fontSize:10,color:GOLD,letterSpacing:"0.2em",marginBottom:14,fontFamily:SERIF}}>MARKET OPPORTUNITY</div>
            <div style={{display:"grid",gridTemplateColumns:"120px 1fr",gap:20,marginBottom:16}}>
              <div><div style={{fontSize:34,fontWeight:700,color:NAVY,fontFamily:SERIF}}>{sel.tam}</div><div style={{fontSize:10,color:TEXT_MUTED,fontFamily:SERIF}}>TAM</div></div>
              <div><div style={{fontSize:12,color:TEXT,fontFamily:SERIF,lineHeight:1.6,marginBottom:6}}>{sel.tamNote}</div><div style={{fontSize:11,color:NAVY,fontFamily:SERIF,fontWeight:600}}>{sel.projections}</div></div>
            </div>
            <div style={{borderTop:"1px solid #EFEAE0",paddingTop:14}}>
              <div style={{fontSize:10,color:GOLD,letterSpacing:"0.15em",marginBottom:10,fontFamily:SERIF}}>KEY PLAYERS</div>
              {sel.competitors.map((c,i)=>(
                <div key={i} style={{display:"flex",gap:10,alignItems:"flex-start",marginBottom:7}}>
                  <span style={{fontSize:9,fontWeight:700,color:NAVY,padding:"2px 6px",background:CREAM_DEEP,borderRadius:2,whiteSpace:"nowrap",marginTop:2,fontFamily:SERIF,flexShrink:0}}>{c.name}</span>
                  <span style={{fontSize:11,color:TEXT_LIGHT,fontFamily:SERIF,lineHeight:1.4}}>{c.note}</span>
                </div>
              ))}
            </div>
          </div>

          {/* VITAL */}
          <div style={{background:PAPER,border:"1px solid #E5E0D5",borderRadius:4,padding:"22px 28px",marginBottom:16}}>
            <div style={{fontSize:10,color:GOLD,letterSpacing:"0.2em",marginBottom:18,fontFamily:SERIF}}>VITAL FRAMEWORK ASSESSMENT</div>
            {[["V","Value"],["I","Impact"],["T","Traction"],["A","Adoption"],["L","Landscape"]].map(([k,lbl],i)=>{
              const v=sel.vital[k];const m=VM[v.score]||VM["Unknown"];
              return<div key={k} style={{display:"grid",gridTemplateColumns:"28px 120px 120px 1fr",gap:12,alignItems:"start",padding:"12px 0",borderBottom:i<4?"1px solid #EFEAE0":"none"}}>
                <div style={{fontSize:20,fontWeight:700,color:NAVY,fontFamily:SERIF}}>{k}</div>
                <div style={{fontSize:12,fontWeight:600,color:NAVY,fontFamily:SERIF,paddingTop:2}}>{lbl}</div>
                <div style={{paddingTop:2}}><ScorePill score={v.score}/></div>
                <div style={{fontSize:11,color:TEXT,fontFamily:SERIF,lineHeight:1.5}}>{v.summary}</div>
              </div>;
            })}
          </div>

          {sel.timeline && <VettingTimeline timeline={sel.timeline} />}

          {/* Documents */}
          <div style={{background:PAPER,border:`2px solid ${NAVY}`,borderRadius:4,padding:"22px 28px",marginBottom:16}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
              <div>
                <div style={{fontSize:10,color:GOLD,letterSpacing:"0.2em",fontFamily:SERIF,marginBottom:3}}>DEAL DOCUMENTS — ACCESS IN ORDER</div>
                <div style={{fontSize:11,color:TEXT_LIGHT,fontFamily:SERIF}}>Each document click is logged for GP analytics. Proceed 1 → 6.</div>
              </div>
              <div style={{fontSize:11,color:TEXT_MUTED,fontFamily:SERIF}}>{Object.keys(docAcc).length}/6 accessed</div>
            </div>
            {sel.pitchDeck&&<div onClick={()=>{setDocAcc(p=>({...p,pitch:true}));if(u&&sel)track({userId:u.id,userName:u.name,type:"doc",dealId:sel.id,dealName:sel.name,docIdx:0,docName:sel.pitchDeck.name});window.open(sel.pitchDeck.url,"_blank");}} style={{display:"flex",alignItems:"center",gap:14,padding:"12px 16px",borderRadius:2,border:`1px solid ${docAcc["pitch"]?"#B8935D44":"#E5E0D5"}`,background:docAcc["pitch"]?CREAM_DEEP:"#F5F1E8",cursor:"pointer",marginBottom:8,transition:"all 0.15s"}} onMouseEnter={e=>e.currentTarget.style.background="#EFEAE0"} onMouseLeave={e=>e.currentTarget.style.background=docAcc["pitch"]?CREAM_DEEP:"#F5F1E8"}><div style={{width:30,height:30,borderRadius:2,background:docAcc["pitch"]?GOLD:NAVY,color:CREAM,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:700,fontFamily:SERIF,flexShrink:0}}>0</div><div style={{flex:1}}><div style={{fontSize:12,fontWeight:600,color:NAVY,fontFamily:SERIF}}>{sel.pitchDeck.name}</div><div style={{fontSize:10,color:TEXT_LIGHT,fontFamily:SERIF}}>{sel.pitchDeck.sub}</div></div>{docAcc["pitch"]?<span style={{fontSize:10,color:GOLD,fontWeight:600,fontFamily:SERIF}}>ACCESSED ✓</span>:<span style={{fontSize:10,color:TEXT_MUTED,fontFamily:SERIF}}>→ Open</span>}</div>}
            {DOCS.map((doc,i)=>{
              const acc=!!docAcc[i];
              return<div key={i} onClick={()=>handleDoc(i,doc.name)} style={{display:"flex",alignItems:"center",gap:14,padding:"12px 16px",borderRadius:2,border:`1px solid ${acc?"#B8935D44":"#E5E0D5"}`,background:acc?CREAM_DEEP:"#F5F1E8",cursor:"pointer",marginBottom:8,transition:"all 0.15s"}} onMouseEnter={e=>e.currentTarget.style.background="#EFEAE0"} onMouseLeave={e=>e.currentTarget.style.background=acc?CREAM_DEEP:"#F5F1E8"}>
                <div style={{width:30,height:30,borderRadius:2,background:acc?GOLD:NAVY,color:CREAM,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:700,fontFamily:SERIF,flexShrink:0}}>{doc.n}</div>
                <div style={{flex:1}}><div style={{fontSize:12,fontWeight:600,color:NAVY,fontFamily:SERIF}}>{doc.name}</div><div style={{fontSize:10,color:TEXT_LIGHT,fontFamily:SERIF}}>{doc.sub}</div></div>
                {acc?<span style={{fontSize:10,color:GOLD,fontWeight:600,fontFamily:SERIF}}>ACCESSED ✓</span>:<span style={{fontSize:10,color:TEXT_MUTED,fontFamily:SERIF}}>→ Open</span>}
              </div>;
            })}
          </div>

          {/* WhatsApp Generator (admin only) */}
          {u?.isAdmin&&(
            <div style={{background:CREAM_DEEP,border:`1px solid ${BORDER}`,borderRadius:4,padding:"22px 28px"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:showWA?14:0}}>
                <div><div className="vcp-eyebrow" style={{marginBottom:6}}>Admin — WhatsApp Post Generator</div><div style={{fontSize:12,color:TEXT_LIGHT,fontFamily:SANS}}>Generate standardized WhatsApp group announcement for this deal</div></div>
                <div style={{display:"flex",gap:8}}>
                  <button onClick={()=>setShowWA(p=>!p)} className="vcp-btn-outline" style={{padding:"6px 14px",fontSize:10}}>{showWA?"Hide":"Preview"}</button>
                  <button onClick={copyWA} className="vcp-btn-primary" style={{padding:"6px 14px",fontSize:10,background:copied?GOLD:NAVY,borderColor:copied?GOLD:NAVY}}>{copied?"Copied":"Copy"}</button>
                </div>
              </div>
              {showWA&&<pre style={{background:PAPER,border:`1px solid ${BORDER_LIGHT}`,borderRadius:2,padding:16,fontSize:10,fontFamily:"ui-monospace, SFMono-Regular, Menlo, monospace",whiteSpace:"pre-wrap",lineHeight:1.7,color:TEXT,maxHeight:360,overflowY:"auto",marginTop:14}}>{makeWAPost(sel)}</pre>}
            </div>
          )}
        </div>
        <Footer/>
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
      <div style={{minHeight:"100vh",background:CREAM,display:"flex",flexDirection:"column"}}>
        {/* Header */}
        <div style={{background:"rgba(250,248,243,0.85)",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",padding:"14px 28px",display:"flex",alignItems:"center",gap:12,position:"sticky",top:0,zIndex:10,borderBottom:`1px solid ${BORDER}`,flexWrap:"wrap"}}>
          <button onClick={()=>setView("room")} style={{background:"transparent",color:TEXT_LIGHT,border:`1px solid ${BORDER}`,borderRadius:2,padding:"6px 14px",fontSize:10,letterSpacing:"0.15em",textTransform:"uppercase",cursor:"pointer",fontFamily:SANS,fontWeight:500}}>← Deal Room</button>
          <div style={{fontFamily:SERIF,fontSize:18,fontWeight:500,color:NAVY,letterSpacing:"-0.01em"}}>Admin <em style={{fontStyle:"italic",color:GOLD,fontWeight:500}}>Analytics</em></div>
          <div style={{flex:1}}/>
          {["overview","members","documents","activity","funnel"].map(tab=>(
            <button key={tab} onClick={()=>setAdminTab(tab)} style={{background:adminTab===tab?NAVY:"transparent",color:adminTab===tab?CREAM:TEXT_LIGHT,border:`1px solid ${adminTab===tab?NAVY:BORDER}`,borderRadius:2,padding:"6px 12px",fontSize:10,cursor:"pointer",fontFamily:SANS,fontWeight:500,letterSpacing:"0.15em",textTransform:"uppercase"}}>{tab}</button>
          ))}
          <button onClick={logout} style={{background:"transparent",color:TEXT_LIGHT,border:`1px solid ${BORDER}`,borderRadius:2,padding:"6px 12px",fontSize:10,letterSpacing:"0.15em",textTransform:"uppercase",cursor:"pointer",fontFamily:SANS,fontWeight:500,marginLeft:8}}>Sign Out</button>
        </div>

        <div style={{maxWidth:1240,margin:"0 auto",padding:"28px 20px"}}>

          {/* OVERVIEW TAB */}
          {adminTab==="overview"&&<>
            <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:12,marginBottom:24}}>
              {[["Members",users.length,"unique investors"],["Logins",loginEvts.length,"total sessions"],["Deal Views",dealEvts.length,"total"],["Doc Opens",docEvts.length,"total"],["Hours on Site",totalTimeOnSite,"cumulative"]].map(([l,v,s])=>(
                <div key={l} style={{background:PAPER,border:"1px solid #E5E0D5",borderRadius:4,padding:"16px 20px"}}>
                  <div style={{fontSize:28,fontWeight:700,color:NAVY,fontFamily:SERIF}}>{v}</div>
                  <div style={{fontSize:12,fontWeight:600,color:NAVY,fontFamily:SERIF}}>{l}</div>
                  <div style={{fontSize:10,color:TEXT_MUTED,fontFamily:SERIF}}>{s}</div>
                </div>
              ))}
            </div>

            <div style={{background:PAPER,border:"1px solid #E5E0D5",borderRadius:4,padding:"20px 24px",marginBottom:16}}>
              <div style={{fontSize:10,color:GOLD,letterSpacing:"0.2em",fontFamily:SERIF,marginBottom:14}}>DEAL ENGAGEMENT RANKING</div>
              {[...DEALS].sort((a,b)=>docEvts.filter(e=>e.dealId===b.id).length-docEvts.filter(e=>e.dealId===a.id).length).map(d=>{
                const views=dealEvts.filter(e=>e.dealId===d.id).length;
                const opens=docEvts.filter(e=>e.dealId===d.id).length;
                const uniq=[...new Set(ev.filter(e=>e.dealId===d.id).map(e=>e.userId))].length;
                const maxOpens=Math.max(1,...DEALS.map(x=>docEvts.filter(e=>e.dealId===x.id).length));
                if(!views&&!opens)return null;
                return(
                  <div key={d.id} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 0",borderBottom:"1px solid #EFEAE0",flexWrap:"wrap"}}>
                    <div style={{flex:1,minWidth:140,fontSize:13,fontWeight:600,color:NAVY,fontFamily:SERIF}}>{d.name}</div>
                    <div style={{display:"flex",gap:16,alignItems:"center"}}>
                      <span style={{fontSize:11,color:TEXT_LIGHT,fontFamily:SERIF}}>{uniq} investors</span>
                      <span style={{fontSize:11,color:TEXT_LIGHT,fontFamily:SERIF}}>{views} views</span>
                      <span style={{fontSize:11,color:GOLD,fontWeight:700,fontFamily:SERIF}}>{opens} doc opens</span>
                    </div>
                    <div style={{width:160,background:"#EFEAE0",borderRadius:4,height:6}}>
                      <div style={{width:`${(opens/maxOpens)*100}%`,background:GOLD,height:6,borderRadius:4,transition:"width 0.3s"}}/>
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{background:PAPER,border:"1px solid #E5E0D5",borderRadius:4,padding:"20px 24px"}}>
              <div style={{fontSize:10,color:GOLD,letterSpacing:"0.2em",fontFamily:SERIF,marginBottom:14}}>RECENT ACTIVITY — LAST 20 EVENTS</div>
              {[...ev].reverse().slice(0,20).map((e,i)=>{
                const bg={doc:CREAM_DEEP,login:GOLD_PALE,deal_view:"#F5E8DC"}[e.type]||"#EFEAE0";
                const tc={doc:NAVY,login:NAVY,deal_view:"#7A4E2E"}[e.type]||TEXT;
                return(
                  <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"7px 0",borderBottom:"1px solid #F5F1E8",flexWrap:"wrap"}}>
                    <span style={{background:bg,color:tc,fontSize:9,fontWeight:700,padding:"2px 7px",borderRadius:2,fontFamily:SERIF,flexShrink:0}}>{e.type}</span>
                    <span style={{fontSize:12,fontWeight:600,color:NAVY,fontFamily:SERIF,flexShrink:0}}>{e.userName||"—"}</span>
                    {e.dealName&&<span style={{fontSize:11,color:TEXT_LIGHT,fontFamily:SERIF}}>{e.dealName}</span>}
                    {e.docName&&<span style={{fontSize:11,color:GOLD,fontFamily:SERIF}}>Doc {(e.docIdx||0)+1}: {e.docName}</span>}
                    <span style={{fontSize:10,color:TEXT_MUTED,fontFamily:SERIF,marginLeft:"auto",flexShrink:0}}>{new Date(e.ts).toLocaleString()}</span>
                  </div>
                );
              })}
              {ev.length===0&&<div style={{fontSize:12,color:TEXT_MUTED,fontStyle:"italic",textAlign:"center",padding:24}}>No events yet.</div>}
            </div>
          </>}

          {/* MEMBERS TAB */}
          {adminTab==="members"&&<>
            <div style={{background:PAPER,border:"1px solid #E5E0D5",borderRadius:4,padding:"20px 24px",marginBottom:16}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
                <div style={{fontSize:10,color:GOLD,letterSpacing:"0.2em",fontFamily:SERIF}}>ALL MEMBERS — DETAILED PROFILES ({users.length} total)</div>
                <input value={memberFilter} onChange={e=>setMemberFilter(e.target.value)} placeholder="Search by name..." style={{padding:"5px 10px",border:"1px solid #E5E0D5",borderRadius:2,fontSize:12,fontFamily:SERIF,color:NAVY,width:220,outline:"none"}}/>
              </div>
              {users.filter(uid=>!memberFilter||(userNames[uid]||"").toLowerCase().includes(memberFilter.toLowerCase())).map(uid=>{
                const s=getMemberStats(uid);
                return(
                  <div key={uid} style={{padding:"18px 0",borderBottom:"1px solid #EFEAE0"}}>
                    <div style={{display:"flex",alignItems:"flex-start",gap:20,flexWrap:"wrap"}}>
                      <div style={{minWidth:180}}>
                        <div style={{fontSize:15,fontWeight:700,color:NAVY,fontFamily:SERIF}}>{s.name}</div>
                        <div style={{fontSize:10,color:TEXT_MUTED,fontFamily:SERIF,marginTop:2}}>Last active: {s.lastSeen?new Date(s.lastSeen).toLocaleString():"Never"}</div>
                      </div>
                      <div style={{display:"flex",gap:20,flexWrap:"wrap"}}>
                        {[["Logins",s.loginCount],["Deals Viewed",s.dealsViewed.length],["Docs Opened",s.docsOpened],["Avg Session",s.avgSession+"min"]].map(([l,v])=>(
                          <div key={l}><div style={{fontSize:20,fontWeight:700,color:NAVY,fontFamily:SERIF}}>{v}</div><div style={{fontSize:10,color:TEXT_MUTED,fontFamily:SERIF}}>{l}</div></div>
                        ))}
                      </div>
                      <div style={{flex:1,minWidth:240}}>
                        <div style={{fontSize:10,color:TEXT_MUTED,fontFamily:SERIF,marginBottom:4}}>DEALS ACCESSED</div>
                        <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
                          {s.dealsViewed.map(did=>{
                            const d=DEALS.find(x=>x.id===did);
                            const depth=s.dealProgress[did]?.size||0;
                            return d?<span key={did} style={{background:CREAM_DEEP,color:NAVY,fontSize:9,padding:"2px 7px",borderRadius:2,fontFamily:SERIF,fontWeight:600}}>{d.name} ({depth}/6)</span>:null;
                          })}
                        </div>
                        {s.deepestDeal&&<div style={{fontSize:10,color:GOLD,fontFamily:SERIF,marginTop:4,fontWeight:600}}>Deepest engagement: {DEALS.find(x=>x.id===s.deepestDeal[0])?.name} — {s.deepestDeal[1].size} of 6 docs opened</div>}
                      </div>
                    </div>
                  </div>
                );
              })}
              {users.length===0&&<div style={{fontSize:12,color:TEXT_MUTED,fontStyle:"italic",textAlign:"center",padding:24}}>No members have logged in yet.</div>}
            </div>
          </>}

          {/* DOCUMENTS TAB */}
          {adminTab==="documents"&&<>
            <div style={{background:PAPER,border:"1px solid #E5E0D5",borderRadius:4,padding:"20px 24px",marginBottom:16}}>
              <div style={{fontSize:10,color:GOLD,letterSpacing:"0.2em",fontFamily:SERIF,marginBottom:18}}>DOCUMENT ENGAGEMENT — OPENS PER DOC PER DEAL</div>
              {DEALS.map(d=>{
                const anyOpens=docEvts.some(e=>e.dealId===d.id);
                if(!anyOpens)return null;
                return(
                  <div key={d.id} style={{marginBottom:20}}>
                    <div style={{fontSize:13,fontWeight:700,color:NAVY,fontFamily:SERIF,marginBottom:8,paddingBottom:4,borderBottom:"2px solid #EFEAE0"}}>{d.name}</div>
                    <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                      {DOCS.map((doc,i)=>{
                        const eng=getDocEngagement(d.id,i);
                        const hasLink=d.docUrls&&d.docUrls[i]&&d.docUrls[i]!=="#";
                        return(
                          <div key={i} style={{background:eng.opens>0?CREAM_DEEP:CREAM,border:`1px solid ${eng.opens>0?GOLD_LIGHT:BORDER}`,borderRadius:2,padding:"10px 14px",minWidth:150}}>
                            <div style={{fontSize:10,fontWeight:700,color:NAVY,fontFamily:SERIF}}>{i+1}. {doc.name}</div>
                            <div style={{fontSize:9,color:TEXT_LIGHT,fontFamily:SERIF,marginBottom:4}}>{doc.sub}</div>
                            <div style={{fontSize:18,fontWeight:700,color:eng.opens>0?NAVY:TEXT_MUTED,fontFamily:SERIF}}>{eng.opens}</div>
                            <div style={{fontSize:9,color:TEXT_MUTED,fontFamily:SERIF}}>opens</div>
                            {eng.users.length>0&&<div style={{fontSize:9,color:GOLD,fontFamily:SERIF,marginTop:3}}>{eng.users.slice(0,3).join(", ")}{eng.users.length>3?` +${eng.users.length-3}`:""}</div>}
                            {!hasLink&&<div style={{fontSize:8,color:GOLD,fontFamily:SERIF,marginTop:2}}>⚠ Link pending</div>}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
              {!docEvts.length&&<div style={{fontSize:12,color:TEXT_MUTED,fontStyle:"italic",textAlign:"center",padding:24}}>No document opens recorded yet.</div>}
            </div>
          </>}

          {/* ACTIVITY TAB */}
          {adminTab==="activity"&&<>
            <div style={{background:PAPER,border:"1px solid #E5E0D5",borderRadius:4,padding:"20px 24px"}}>
              <div style={{fontSize:10,color:GOLD,letterSpacing:"0.2em",fontFamily:SERIF,marginBottom:14}}>FULL ACCESS LOG — CHRONOLOGICAL (MOST RECENT FIRST)</div>
              <div style={{maxHeight:600,overflowY:"auto"}}>
                <table style={{width:"100%",borderCollapse:"collapse",fontSize:11,fontFamily:SERIF}}>
                  <thead style={{position:"sticky",top:0,background:PAPER,zIndex:1}}>
                    <tr style={{borderBottom:"2px solid #EFEAE0"}}>
                      {["Timestamp","Member","Event","Deal","Document","Session ID"].map(h=>(
                        <th key={h} style={{textAlign:"left",padding:"7px 10px",color:NAVY,fontWeight:700,fontSize:10,whiteSpace:"nowrap"}}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[...ev].reverse().slice(0,500).map((e,i)=>{
                      const bg={doc:CREAM_DEEP,login:GOLD_PALE,deal_view:"#F5E8DC"}[e.type]||"#EFEAE0";
                      const tc={doc:NAVY,login:NAVY,deal_view:"#7A4E2E"}[e.type]||TEXT;
                      return(
                        <tr key={i} style={{borderBottom:"1px solid #F5F1E8",background:i%2===0?"white":"#F5F1E8"}}>
                          <td style={{padding:"6px 10px",color:TEXT_LIGHT,fontSize:10,whiteSpace:"nowrap"}}>{new Date(e.ts).toLocaleString()}</td>
                          <td style={{padding:"6px 10px",fontWeight:600,color:NAVY}}>{e.userName||"—"}</td>
                          <td style={{padding:"6px 10px"}}><span style={{background:bg,color:tc,padding:"1px 6px",borderRadius:2,fontSize:9,fontWeight:700}}>{e.type}</span></td>
                          <td style={{padding:"6px 10px",color:TEXT}}>{e.dealName||"—"}</td>
                          <td style={{padding:"6px 10px",color:GOLD,fontWeight:600}}>{e.docName?`${(e.docIdx||0)+1}. ${e.docName}`:"—"}</td>
                          <td style={{padding:"6px 10px",color:TEXT_MUTED,fontSize:9}}>{(e.userId||"").substring(0,12)}</td>
                        </tr>
                      );
                    })}
                    {ev.length===0&&<tr><td colSpan={6} style={{padding:24,textAlign:"center",color:TEXT_MUTED,fontStyle:"italic"}}>No events logged yet.</td></tr>}
                  </tbody>
                </table>
              </div>
            </div>
          </>}

          {/* FUNNEL TAB */}
          {adminTab==="funnel"&&<>
            <div style={{background:PAPER,border:"1px solid #E5E0D5",borderRadius:4,padding:"20px 24px",marginBottom:16}}>
              <div style={{fontSize:10,color:GOLD,letterSpacing:"0.2em",fontFamily:SERIF,marginBottom:18}}>DOCUMENT FUNNEL — UNIQUE INVESTORS PER DOCUMENT</div>
              <div style={{overflowX:"auto"}}>
                <table style={{width:"100%",borderCollapse:"collapse",fontSize:11,fontFamily:SERIF,minWidth:700}}>
                  <thead>
                    <tr style={{borderBottom:"2px solid #EFEAE0"}}>
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
                        <tr key={d.id} style={{borderBottom:"1px solid #EFEAE0"}}>
                          <td style={{padding:"10px 10px",fontWeight:600,color:NAVY,fontSize:12}}>{d.name}</td>
                          {f.map((n,i)=>(
                            <td key={i} style={{textAlign:"center",padding:"10px 6px"}}>
                              <div style={{display:"inline-flex",alignItems:"center",justifyContent:"center",background:n>0?`rgba(15,31,61,${0.15+0.7*(n/mx)})`:BORDER_LIGHT,color:n>0?CREAM:TEXT_MUTED,borderRadius:2,width:34,height:34,fontSize:13,fontWeight:500,fontFamily:SERIF}}>{n}</div>
                            </td>
                          ))}
                          <td style={{textAlign:"center",padding:"10px 8px"}}>
                            <span style={{background:fullRead>50?GOLD_PALE:fullRead>20?"#F5E8DC":"#EFEAE0",color:fullRead>50?NAVY:fullRead>20?"#7A4E2E":TEXT_MUTED,fontSize:11,fontWeight:700,padding:"3px 10px",borderRadius:2}}>{fullRead}%</span>
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
        <Footer/>
      </div>
    );
  }

  return null;
}
