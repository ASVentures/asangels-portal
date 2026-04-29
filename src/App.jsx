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
];

const NEWS_FEEDS = [
  {query:"Red Sky Health AI denial management",label:"Red Sky Health",type:"Portfolio"},
  {query:"Youlify medical billing AI automation",label:"Youlify",type:"Portfolio"},
  {query:"Adipothera lymphedema PPARgamma",label:"Adipothera",type:"Portfolio"},
  {query:"Calaris Diagnostics liver fibrosis saliva",label:"Calaris Dx",type:"Portfolio"},
  {query:"Extrinsic Immunity Therapeutics NETrolyze TNBC",label:"EIT",type:"Portfolio"},
  {query:"Epic Airway Systems airway device",label:"Epic Airway",type:"Portfolio"},
  {query:"Waystar AI revenue cycle denial management 2026",label:"Waystar",type:"Competitor"},
  {query:"Experian Health nThrive RCM AI 2026",label:"nThrive / Experian",type:"Competitor"},
  {query:"Xenetic Biosciences NETs cancer DNase 2026",label:"Xenetic Bio",type:"Competitor"},
  {query:"Neutrolis Citryll NET targeting therapy 2026",label:"Neutrolis/Citryll",type:"Competitor"},
  {query:"FibroScan ELF score liver fibrosis diagnostics 2026",label:"FibroScan/ELF",type:"Competitor"},
  {query:"LMA Supreme King LT supraglottic airway EMS 2026",label:"LMA/King LT",type:"Competitor"},
  {query:"sacituzumab govitecan pembrolizumab TNBC 2026",label:"TNBC SOC",type:"Competitor"},
  {query:"insurance claim denial AI healthcare revenue cycle 2026",label:"RCM Industry",type:"Industry"},
  {query:"salivary biomarker diagnostics FDA clearance 2026",label:"Salivary Dx",type:"Industry"},
  {query:"triple negative breast cancer immunotherapy metastasis 2026",label:"TNBC Research",type:"Industry"},
  {query:"lymphedema drug treatment clinical trial 2026",label:"Lymphedema",type:"Industry"},
  {query:"neutrophil extracellular traps cancer tumor 2026",label:"NETs Science",type:"Industry"},
  {query:"NFL concussion CTE biomarker brain injury 2026",label:"CTE/Concussion",type:"Industry"},
  {query:"FDA 510k medical device clearance airway 2026",label:"Device Regulation",type:"Industry"},
  {query:"Saudi Arabia healthcare Vision 2030 ASC hospital 2026",label:"Saudi Health",type:"Industry"},
  {query:"NAFLD MASLD liver disease diagnosis treatment 2026",label:"Liver Disease",type:"Industry"},
  {query:"prehospital emergency airway management EMS 2026",label:"EMS Airway",type:"Industry"},
  {query:"physician burnout financial independence investing 2026",label:"Physician Finance",type:"Industry"},
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

export default function App(){
  const [view,setView]=useState("login");
  const [step,setStep]=useState("password");
  const [pw,setPw]=useState(""),nm=useState(""),error=useState(""),user=useState(null),deal=useState(null),analytics=useState([]),loading=useState(true);
  const [nameV,setName]=nm,[err,setErr]=error,[u,setU]=user,[sel,setSel]=deal,[ev,setEv]=analytics,[ld,setLd]=loading;
  const [docAcc,setDocAcc]=useState({});
  const [showWA,setShowWA]=useState(false);
  const [copied,setCopied]=useState(false);

  useEffect(()=>{(async()=>{const s=await sGet("asa:s");if(s){setU(s);setView(s.isAdmin?"admin":"room");}const e=await sGet("asa:e",true);if(e)setEv(e);setLd(false);})();},[]);

  async function track(evt){const e={...evt,ts:new Date().toISOString()};const c=await sGet("asa:e",true)||[];const up=[...c,e];await sSet("asa:e",up,true);setEv(up);}

  async function handlePw(){if(pw===ADMIN_PW){setStep("name");setErr("");setPw("__a__");}else if(pw===PORTAL_PW){setStep("name");setErr("");}else setErr("Incorrect password. Contact Dr. Shah for access.");}
  async function handleName(){if(!nameV.trim()){setErr("Please enter your name.");return;}const ad=pw==="__a__";const uu={id:uid(),name:nameV.trim(),isAdmin:ad};setU(uu);await sSet("asa:s",uu);await track({userId:uu.id,userName:uu.name,type:"login"});setView(ad?"admin":"room");setErr("");}
  async function handleDeal(d){setSel(d);setView("deal");setDocAcc({});if(u)await track({userId:u.id,userName:u.name,type:"deal_view",dealId:d.id,dealName:d.name});}
  async function handleDoc(i,n){setDocAcc(p=>({...p,[i]:true}));if(u&&sel)await track({userId:u.id,userName:u.name,type:"doc",dealId:sel.id,dealName:sel.name,docIdx:i,docName:n});if(sel.docUrls&&sel.docUrls[i]&&sel.docUrls[i]!=="#")window.open(sel.docUrls[i],"_blank");}
  async function logout(){await sSet("asa:s",null);setU(null);setView("login");setStep("password");setPw("");setName("");setSel(null);}
  function copyWA(){if(sel){navigator.clipboard?.writeText(makeWAPost(sel)).then(()=>{setCopied(true);setTimeout(()=>setCopied(false),2500);});}}

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
  if(view==="admin"){
    const docEvts=ev.filter(e=>e.type==="doc");
    const users=[...new Set(ev.map(e=>e.userName).filter(Boolean))];
    function funnel(did){const de=docEvts.filter(e=>e.dealId===did);const ub={};de.forEach(e=>{if(!ub[e.docIdx])ub[e.docIdx]=new Set();ub[e.docIdx].add(e.userId);});return DOCS.map((_,i)=>(ub[i]||new Set()).size);}
    return(
      <div style={{minHeight:"100vh",background:"#f8f7f4"}}>
        <div style={{background:NAVY,padding:"12px 28px",display:"flex",alignItems:"center",gap:12,position:"sticky",top:0,zIndex:10,boxShadow:"0 2px 12px rgba(0,0,0,0.2)"}}>
          <button onClick={()=>setView("room")} style={{background:"rgba(255,255,255,0.08)",color:"#8fa8c8",border:"1px solid rgba(255,255,255,0.15)",borderRadius:5,padding:"4px 12px",fontSize:10,cursor:"pointer",fontFamily:"Georgia,serif"}}>← Deal Room</button>
          <div style={{fontSize:17,fontWeight:700,color:"white",fontFamily:"Georgia,serif"}}>Analytics Dashboard</div>
          <div style={{fontSize:10,color:GOLD,fontFamily:"Georgia,serif"}}>Admin: {u?.name}</div>
          <div style={{flex:1}}/>
          <button onClick={logout} style={{background:"rgba(255,255,255,0.07)",color:"#8fa8c8",border:"1px solid rgba(255,255,255,0.15)",borderRadius:5,padding:"4px 10px",fontSize:10,cursor:"pointer",fontFamily:"Georgia,serif"}}>Sign Out</button>
        </div>
        <div style={{maxWidth:1080,margin:"0 auto",padding:"30px 20px"}}>
          {/* Summary */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginBottom:24}}>
            {[["Members",users.length,"unique physician investors"],["Deal Views",ev.filter(e=>e.type==="deal_view").length,"total"],["Doc Opens",docEvts.length,"total accesses"],["Logins",ev.filter(e=>e.type==="login").length,"total"]].map(([l,v,s])=>(
              <div key={l} style={{background:"white",border:"1px solid #e5e2d9",borderRadius:10,padding:"18px 22px"}}>
                <div style={{fontSize:30,fontWeight:700,color:NAVY,fontFamily:"Georgia,serif"}}>{v}</div>
                <div style={{fontSize:11,fontWeight:600,color:NAVY,fontFamily:"Georgia,serif",marginBottom:1}}>{l}</div>
                <div style={{fontSize:10,color:"#999",fontFamily:"Georgia,serif"}}>{s}</div>
              </div>
            ))}
          </div>

          {/* Funnel Table */}
          <div style={{background:"white",border:"1px solid #e5e2d9",borderRadius:12,padding:"22px 28px",marginBottom:20}}>
            <div style={{fontSize:10,color:GOLD,letterSpacing:"0.2em",marginBottom:18,fontFamily:"Georgia,serif"}}>DOCUMENT FUNNEL — UNIQUE USERS PER DOCUMENT PER DEAL</div>
            <div style={{overflowX:"auto"}}>
              <table style={{width:"100%",borderCollapse:"collapse",fontSize:11,fontFamily:"Georgia,serif"}}>
                <thead><tr style={{borderBottom:"2px solid #f0ede6"}}>
                  <th style={{textAlign:"left",padding:"7px 10px",color:NAVY,fontWeight:700}}>Deal</th>
                  {DOCS.map(d=><th key={d.n} style={{textAlign:"center",padding:"7px 6px",color:NAVY,fontWeight:700,fontSize:10}}>{d.n}. {d.name.split(" ")[0]}</th>)}
                </tr></thead>
                <tbody>{DEALS.map(d=>{const f=funnel(d.id);const mx=Math.max(1,...f);return<tr key={d.id} style={{borderBottom:"1px solid #f5f3ee"}}>
                  <td style={{padding:"9px 10px",fontWeight:600,color:NAVY,fontSize:11}}>{d.name}</td>
                  {f.map((n,i)=><td key={i} style={{textAlign:"center",padding:"9px 6px"}}><div style={{display:"inline-flex",alignItems:"center",justifyContent:"center",background:n>0?`rgba(27,58,107,${0.15+0.7*(n/mx)})`:"#f5f3ee",color:n>0?"white":"#ccc",borderRadius:4,width:30,height:30,fontSize:12,fontWeight:700}}>{n}</div></td>)}
                </tr>;})}
                </tbody>
              </table>
            </div>
          </div>

          {/* Access Log */}
          <div style={{background:"white",border:"1px solid #e5e2d9",borderRadius:12,padding:"22px 28px"}}>
            <div style={{fontSize:10,color:GOLD,letterSpacing:"0.2em",marginBottom:14,fontFamily:"Georgia,serif"}}>ACCESS LOG (MOST RECENT FIRST)</div>
            <div style={{maxHeight:380,overflowY:"auto"}}>
              <table style={{width:"100%",borderCollapse:"collapse",fontSize:11,fontFamily:"Georgia,serif"}}>
                <thead style={{position:"sticky",top:0,background:"white"}}><tr style={{borderBottom:"2px solid #f0ede6"}}>
                  {["Time","Member","Event","Deal","Document"].map(h=><th key={h} style={{textAlign:"left",padding:"7px 10px",color:NAVY,fontWeight:700,fontSize:10}}>{h}</th>)}
                </tr></thead>
                <tbody>{[...ev].reverse().slice(0,150).map((e,i)=>(
                  <tr key={i} style={{borderBottom:"1px solid #f8f7f4",background:i%2===0?"white":"#fafaf8"}}>
                    <td style={{padding:"7px 10px",color:"#666",fontSize:10,whiteSpace:"nowrap"}}>{new Date(e.ts).toLocaleString()}</td>
                    <td style={{padding:"7px 10px",fontWeight:600,color:NAVY}}>{e.userName||"—"}</td>
                    <td style={{padding:"7px 10px"}}><span style={{background:e.type==="doc"?"#EBF1F8":e.type==="login"?"#EAF3DE":"#F1EFE8",color:NAVY,padding:"1px 5px",borderRadius:3,fontSize:9,fontWeight:600}}>{e.type}</span></td>
                    <td style={{padding:"7px 10px",color:"#555"}}>{e.dealName||"—"}</td>
                    <td style={{padding:"7px 10px",color:"#555"}}>{e.docName?`${(e.docIdx||0)+1}. ${e.docName}`:"—"}</td>
                  </tr>
                ))}
                {ev.length===0&&<tr><td colSpan={5} style={{padding:24,textAlign:"center",color:"#bbb",fontStyle:"italic",fontFamily:"Georgia,serif"}}>No events yet. Logs appear here as members access documents.</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
