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
| `LAB_M`, `LAB_W` | **Researchers** for "a study found…" beats. | White coats, glasses | Hetal's lehenga |

Ideas for the cast's next members (make them when a story needs them): a young woman who rents for college
functions, a shop owner in a rental shop, a groom or brother, a kid, a vendor on the Anokhi Reet app.
