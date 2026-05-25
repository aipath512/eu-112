# EU-112.eu

**The free DIY EU AI Act readiness toolkit.** Make your site EU AI Act-ready — yourself, before the Article 50 enforcement date of **2 August 2026**. No consultant. No fee. Just the tools.

An independent educational initiative by **AiVenture S.R.L.** (CUI 51415878), the company behind [5thElement.ai](https://5thelement.ai/).

> ⚠️ **Disclaimer:** EU-112 is not affiliated with, endorsed by, or connected to the official 112 emergency service or any EU institution. "112" is used metaphorically to signal urgency around the compliance deadline. This toolkit **supports** EU AI Act readiness — it does **not** satisfy or certify compliance, and it is not legal advice.

---

## Structure

```
.
├── index.html              # Home — hero, funnel, EU markets grid, capture, trust
├── about/index.html        # About EU-112 + AiVenture + founder bio
├── blog/index.html         # Blog index (posts in production)
├── innovations/index.html  # The 8 Bitcoin-anchored innovation registry
├── assets/
│   ├── base.css            # Shared Industrial-Electric stylesheet
│   └── hero.jpg            # Hero background image
├── .nojekyll               # REQUIRED — stops GitHub Pages from breaking /assets/
├── .gitignore
└── README.md
```

## Deploy

### Cloudflare Pages (recommended)
1. Push this repo to GitHub.
2. Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
3. Select this repo. Build command: *(none)*. Output directory: `/` (root).
4. Deploy. Point `eu-112.eu` at it via **Custom domains**.

### GitHub Pages
1. Repo **Settings** → **Pages** → Source: `main` branch, `/root`.
2. The included `.nojekyll` file ensures `/assets/` is served correctly.

## Design system — Industrial-Electric
- **Fonts:** Barlow Condensed 900 (headings) · IBM Plex Mono (labels) · Barlow 300 (body)
- **Palette:** bg `#030508` · electric `#00d4ff` · red `#e03a1e`
- Dark-only. Scanline overlay. All shared styles live in `assets/base.css`.

## Provenance
Canonical trust layer inherited from ADI via 5thelement.ai — Bitcoin block **944442**, OpenTimestamps-verifiable. See [`/innovations/`](innovations/index.html).

## Contact
- WhatsApp: [+40 737 123 540](https://api.whatsapp.com/send/?phone=40737123540)
- Email: contact@5thelement.ai
- LinkedIn: [Dan Ionescu (Eli)](https://ro.linkedin.com/in/dan-ionesco-a856082a0)

---
© 2026 AiVenture S.R.L. · CUI 51415878 · București, Romania
