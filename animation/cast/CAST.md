# The Anokhi Reet cast

Reusable characters for 2D reels. Code: [`cast.js`](cast.js). Picture: [`cast-sheet.png`](cast-sheet.png)
(re-make it with `PY tools/render_reel.py animation/cast/sheet --at 0.5 --out animation/cast/cast-sheet.png`).

Reuse a character when the story fits: a recurring cast makes the channel feel like a show. Put them in a new
situation, usually in a new outfit (`dress(LOOK, {...})`), and write their acting fresh for each reel. New
characters are added here after their first reel (add them to `cast.js`, to the sheet's `scenes.js`, and below).

| Name in code | Who | Look | Appeared in |
|---|---|---|---|
| `HETAL.home` / `.lehenga` / `.pink` / `.emerald` | **Hetal ben**, Surat, 40s. Warm, a little proud, learns fast; our lead. | Bun with gajra on special days, bindi + sindoor, teal saree at home, maroon-gold lehenga, pink and emerald looks | Hetal's lehenga (2026-11-13) |
| `MAUSI` | **Mausi**, 60s. Notices everything and says it out loud. | Grey bun, round glasses, green saree | Hetal's lehenga |
| `BRIDE` | A bride, 20s. | Red lehenga, peach dupatta, gajra | Hetal's lehenga |
| `GUEST_M` | **Uncle**, wedding guest, buffet lover. | Short hair, moustache, mustard kurta | Hetal's lehenga |
| `GUEST_W1`, `GUEST_W2` | **Aunties**, wedding guests and crowd. | Long hair in purple / bun in orange saree | Hetal's lehenga |
| `PANKAJ` | **Pankaj bhai**, 40s, rental shop owner. Hardworking and hopeful; dreams of a busy season. | Short hair, moustache, indigo kurta with gold buttons | Season ka sapna (2026-11-17) |
| `CUSTOMER_W` | A young customer, 20s, who shows the outfit she wants on her phone. | Ponytail, pink kurti (add a skirt with `dress` for standing shots) | Season ka sapna |
| `AARTI.office` / `.home` / `.sangeet` | **Aarti**, 20s, young working woman, Ahmedabad. Gets last-minute invitations. | Long hair; blue office kurti, mint tee at home, yellow chaniya choli with pink dupatta at the sangeet | Last minute invitation (2026-11-17) |
| `DIMPLE.home` / `.sangeet` | **Dimple**, 20s, Aarti's best friend. Calm, always has a plan. | Short hair, round glasses, emerald top; pink lehenga at the sangeet | Last minute invitation |
| `HETALBEN` | **Hetalben**, 50s, friendly rental shop owner near Aarti's office, Ahmedabad (not Surat's Hetal ben). | Bun, sindoor, wine-red saree with gold pallu | Last minute invitation |
| `HEMABEN` | **Hemaben**, 40s, rental shop owner. Confident and practical; works out the numbers on a chalkboard and talks to camera. | Bun, round glasses, sindoor, marigold kurta with maroon dupatta, maroon skirt | Ek lehenge ka hisaab (2026-11-18) |
| `LAB_M`, `LAB_W` | **Researchers** for "a study found…" beats. | White coats, glasses | Hetal's lehenga |
| `KAVITA.shop` / `.night` / `.mall` | **Kavita**, 30s, owns a lehenga rental shop. Soft-hearted, said yes to every bargain until she learned. | Long braid, marigold kurta with red dupatta and red lehenga skirt at the shop; purple with glasses for late-night accounts; teal at the mall | Kavita aur Bargain (2026-11-17) |
| `MEENA.shop` / `.night` | **Meena**, 30s-40s, runs a lehenga rental shop in Ahmedabad. Hardworking; learns to put her stock online. | Bun, sindoor, emerald kurta with pink dupatta and pink lehenga skirt; marigold at night | Meena ki dukaan (2026-11-17) |
| `PATI` | **Meena's husband**, 40s. Calm; asks the simple question that matters. | Short hair, blue shirt | Meena ki dukaan |
| `PAPA.shop` / `.young` / `.night` | **Papa**, 50s-60s, has run his rental shop since 1998. Proud, warm, trusts face to face. | Grey hair, moustache, cream kurta (black hair when young; glasses at night) | Papa aur beti (2026-11-17) |
| `BETI` | **Beti**, 20s, his daughter. Puts the shop online. | Ponytail, teal kurti, yellow dupatta | Papa aur beti |
| `DIDI` | **Anokhi Didi**, 30s, presenter who talks to camera ("Toh guys…"). Owner to confirm her name and look. | Long hair, maroon kurta, gold dupatta, necklace | Lehenga 2X (2026-11-18) |
| `NISHA` | **Nisha**, 30s, homemaker in Surat with 12 lehengas in her almirah; learns to rent them out. | Braid, sindoor, blue kurta, yellow dupatta, blue skirt | ₹2.5 lakh ki almari (2026-11-18) |
| `HARESH` | **Hareshbhai**, 50s, rental shop owner. Careful, a little doubtful; asks every question before he says yes. | Glasses, moustache, rust kurta | Sawal bahut hain (2026-11-19) |
| `NEHA` | **Neha**, 20s, friendly Anokhi Reet team member who answers shop owners' questions. | Ponytail, cream kurta, maroon dupatta | Sawal bahut hain |
| `KOMAL.purani` / `.smart` | **Komal**, 20s, shopping for a reception outfit; shown as two versions of herself (old way vs Anokhi Reet). | Long hair; marigold kurta with pink dupatta (Purani), pink kurta with necklace (Smart) | Dukaan-dukaan ki bhaag-daud (2026-11-19) |
| `REKHA` | **Rekhaben**, 40s, rental shop owner who priced everything cheap, then learned to set a fair rent. | Bun, sindoor, green saree with yellow pallu | Rent kam rakha (2026-11-19) |
| `JIGNA` | **Jignaben**, 40s, confident rental shop owner across the street. | Bun, sindoor, necklace, deep blue saree with gold pallu | Rent kam rakha |
| `BHAVESH` | **Bhaveshbhai**, 40s-50s, calm and clever rental shop owner; keeps one premium lehenga on purpose. | Moustache, plum kurta with gold embroidery | Mehenga lehenga (2026-11-19) |
| `CHINTU` | **Chintu**, late teens, Bhaveshbhai's quick, chatty helper. | Short hair, orange tee | Mehenga lehenga |
| `KAVYA` | **Kavya**, 25-30, cupboard full but "nothing to wear"; finds a new look on Anokhi Reet. | Long hair, lilac kurti (peach lehenga at the function) | Cupboard full (2026-11-20) |
| `MUMMY` | **Mummy**, 50s, Kavya's mother; says the famous line. | Greying bun, sindoor, orange saree | Cupboard full |
| `SHITAL` | **Shital**, late 20s, young rental shop owner; learns that fewer, better options sell. | Braid, teal kurti, coral dupatta | 3 options (2026-11-20) |
| `KHUSHI` | **Khushi**, 20s, a customer who can't decide when shown too much. | Ponytail, yellow top, pink dupatta | 3 options |
| `MEENABEN` | **Meenaben**, 40s, busy rental shop owner; stops sending 30 photos and sends one shop link. | Bun with gajra, plum kurta, marigold dupatta, sindoor | Ek link, poori dukaan (2026-11-23) |
| `MAHESH` | **Maheshbhai**, 40s-50s, rental shop owner, not online; customers find him only by his board. | Teal kurta, glasses, moustache | Do dukaan, do kahaniyan (2026-11-23) |
| `KIRAN` | **Kiranben**, 30s-40s, rental shop owner next door, on Anokhi Reet; calm and smiling. | Braid, marigold kurti, red dupatta, maroon skirt | Do dukaan, do kahaniyan |
| `dress(PAPA.shop, {…})` | **Kavya's Papa** (Shaadi season): the cast's Papa in a white kurta-pajama with glasses. | White kurta-pajama, glasses | Shaadi season 2026 (2026-11-23) |
| `ISHITA.wedding` / `.home` | **Ishita**, 20s, a wedding guest who rents a heavy maroon lehenga on a small budget. | Long hair; maroon lehenga with gold dupatta / blue top at home | Asli price (2026-11-24) |
| `RIDDHI` | **Riddhi**, 30s, a mother whose son outgrows every wedding outfit after one wear; lists them for rent from home. | Bun, rani-pink top, pink dupatta, sindoor | ₹6,000 ki sherwani (2026-11-24) |
| `KRUPA` | **Krupa**, 30s, another mother in the same city, panicking before a wedding next week. | Long hair, green top, yellow dupatta | ₹6,000 ki sherwani |
| `VIHAAN.tight` / `.home` | **Vihaan**, 5, Riddhi's son (the cast's first kid). | Outgrown cream sherwani (short sleeves and hem) / orange tee, blue pants | ₹6,000 ki sherwani |
| `KRUPA_BETA.vest` / `.sherwani` | **Krupa's son**, 4, jumps on the bed; looks like a little raja in Riddhi's sherwani. | White vest / cream sherwani with long sleeves | ₹6,000 ki sherwani |
| `RIYA` | **Riya**, 20s, a friendly presenter from the Anokhi Reet team who talks straight to the camera. | Long open hair, brand-maroon kurti, gold dupatta | Customer kahan hain? (2026-11-24) |
| `BINDIYA` | **Inspector Bindiya**, 30s, a playful crime-show detective who "investigates" shopping habits. | Beige trench coat, brown fedora, short hair | Shaadi season ka sabse bada scam (2026-11-24) |
| `JAY.maroon` / `.ivory` / `.bandhgala` / `.jodhpuri` / `.casual` | **Jay**, 20s, wears a new (rented) sherwani to every wedding and rents out his own. | Four sherwanis / blue tee and jeans | Har shaadi mein nayi sherwani (2026-11-24) |
| `HARSH` | **Harsh**, 20s, Jay's friend and the narrator. | Glasses, orange kurta | Har shaadi mein nayi sherwani |
| `MITESH` | **Mitesh**, 20s, Jay's broad, moustached friend who asks about money. | Green kurta | Har shaadi mein nayi sherwani |
| `PRACHI.morning` / `.lehenga` / `.home` | **Prachi**, 20s, the bride's sister; her darzi's "kal pakka" never comes, so she finds a nearby shop's outfit. | Towel on her hair / peach lehenga / purple kurti | Darzi ne kaha: "Kal pakka!" (2026-11-24) |
| `RAMESH` | **Rameshbhai**, 50s, a warm, always-smiling darzi who always says "kal pakka". | Glasses, moustache, white kurta, measuring tape round his neck | Darzi ne kaha: "Kal pakka!" |
| `JHALAK.prep` / `.bride` | **Jhalak**, 20s, a bride who quietly books her friend's outfits on rent so nobody is left out. | Pink kurti with gajra / red bridal lehenga | Dulhan ka dress code (2026-11-26) |
| `MAYA.home` / `.haldi` / `.mehendi` / `.sangeet` / `.shaadi` | **Maya**, 20s, the quiet bridesmaid who shines at every function. | Braid; old grey suit / yellow, emerald, purple, rose-pink | Dulhan ka dress code |
| `BRIDESMAIDS[0..5]` | **Hetvi, Palak, Saloni, Vrunda, Meera, Disha**, the bride's squad. | Pink lehengas (the dress code) | Dulhan ka dress code |
| `AARAV` | **Aarav**, late 20s, a groom whose squad wears rented sherwanis; his own gets booked before the wedding ends. | Cream-gold sherwani, red safa | Dulhe ke 7 dost (2026-11-26) |
| `GROOM_SQUAD[0..6]` | **Kunal, Meet, Dhruv, Yash, Neel, Rohan, Parth**, Aarav's friends. | Maroon, ivory, navy, black, emerald, mustard, wine sherwanis | Dulhe ke 7 dost |
| `MAMAJI` / `FUAJI` | **Mama ji** and **Fua ji**, the uncles who do the maths (and want to list their own sherwanis). | Rust kurta, glasses / blue kurta | Dulhe ke 7 dost |

Ideas for the cast's next members (make them when a story needs them): a young woman who rents for college
functions, a vendor on the Anokhi Reet app.
