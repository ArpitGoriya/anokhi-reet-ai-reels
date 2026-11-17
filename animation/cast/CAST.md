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
| `LAB_M`, `LAB_W` | **Researchers** for "a study found…" beats. | White coats, glasses | Hetal's lehenga |
| `KAVITA.shop` / `.night` / `.mall` | **Kavita**, 30s, owns a lehenga rental shop. Soft-hearted, said yes to every bargain until she learned. | Long braid, marigold kurta with red dupatta and red lehenga skirt at the shop; purple with glasses for late-night accounts; teal at the mall | Kavita aur Bargain (2026-11-17) |
| `MEENA.shop` / `.night` | **Meena**, 30s-40s, runs a lehenga rental shop in Ahmedabad. Hardworking; learns to put her stock online. | Bun, sindoor, emerald kurta with pink dupatta and pink lehenga skirt; marigold at night | Meena ki dukaan (2026-11-17) |
| `PATI` | **Meena's husband**, 40s. Calm; asks the simple question that matters. | Short hair, blue shirt | Meena ki dukaan |

Ideas for the cast's next members (make them when a story needs them): a young woman who rents for college
functions, a groom or brother, a kid, a vendor on the Anokhi Reet app.
