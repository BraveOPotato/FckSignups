# FckSignups

[![Discord](https://img.shields.io/badge/Discord-%235865F2.svg?style=for-the-badge&logo=discord&logoColor=white)](https://discord.gg/hbDDqdmcm)
[![Reddit](https://img.shields.io/badge/Reddit-FF4500?style=for-the-badge&logo=reddit&logoColor=white)](https://www.reddit.com/r/fucksignups/)

> **Open Source Tools. Zero Bullsh*t.**
A curated collection of open-source tools you can use instantly in your browser. no accounts, no emails, no tracking. Just tools that work.

---

## What is this?

FckSignups is a React + TypeScript project. If you want to run it locally, simply clone the repo, install the depedencies, and run the server.

Here's a command that would do all the previous steps in one go:
```bash
git clone https://github.com/BraveOPotato/FckSignups.git && \
cd FckSignups && \
npm install && \
npm run dev
```

---

## Philosophy

| We believe | We reject |
|------------|-----------|
| Tools should work immediately | Forced registration walls |
| Your data belongs to you | Data harvesting and tracking |
| Open source is the default | Proprietary black boxes |
| Simple is better | Bloat and unnecessary complexity |

---

## Tool schema

| Field | Required | Description |
|-------|----------|-------------|
| `id` | Yes | URL-friendly unique identifier |
| `name` | Yes | Display name |
| `description` | Yes | One-sentence summary |
| `url` | Yes | Direct link to the tool |
| `category` | Yes | Must match a category `id` |
| `tags` | No | Array of searchable keywords |
| `github` | No | Link to source repository |
| `license` | No | SPDX license identifier |
| `stars` | No | GitHub star count (for display) |
| `featured` | No | Boolean; pins to top |
| `notRecommendedReason` | No | Reason why the entry isn't recommended |

---

## Categories

The default categories are:

| ID | Name | Icon |
|----|------|------|
| `all` | All | ◈ |
| `productivity` | Productivity | ⚡ |
| `design` | Design & Graphics | 🎨 |
| `development` | Development | 💻 |
| `writing` | Writing & Docs | ✍️ |
| `privacy` | Privacy | 🔒 |
| `utilities` | Utilities | 🛠️ |
| `data` | Data & Analytics | 📊 |
| `media` | Media | 🎬 |
| `education` | Education | 🎓 |


---

## Contributing

### Contribution guidelines
- The tool must work **without creating an account**
- Keep descriptions under 140 characters
- Use 3-5 relevant tags per tool
- Use the following link to add a tool you [found/made](https://github.com/BraveOPotato/FckSignups/issues/new?template=request-to-add-a-tool.md) or simply use the "SUBMIT A TOOL" button on the website.

---

## Discussions

If you'd like to voice your opinion, we have a community on reddit [r/fucksignups](https://www.reddit.com/r/fucksignups/).

Don't be afraid to critique. 

---

## License

The FckSignups directory code is released under the **MIT License**.

Individual tools listed in the directory retain their own licenses. We do not claim ownership of any third-party projects.

---

## Credits

Curated with spite by people who are tired of typing their email into everything.

---

*No cookies. No analytics. No bullsh*t.*
