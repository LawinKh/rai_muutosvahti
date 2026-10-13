I made both: Finnish agent instructions and a single JSON file you can upload as the agent's knowledge source.

**1. Agent instructions: `agent/COPILOT_OHJEET.md`**
- **Copy-paste block:** 4,193 characters, so it fits Copilot Studio's 8,000-character instruction field. It tells the agent to:
  - say it's an AI and answer only from the JSON;
  - ask the user's role first and answer only from that role's view;
  - for every finding, give what changed, when, the sources and why to check it;
  - never diagnose, make decisions or interpret scores;
  - ask users to remove any real personal data they type in.
- **Setup notes:** how to create the agent, upload the file and add conversation starters, five test questions with expected answers, and how to put the embed address into `COPILOT_URL` in `js/app.js`.
- **Old instructions:** `agent/AGENTIN_OHJEET.md` is unchanged, because it still holds the old mock clients your earlier note says to keep.

**2. Knowledge file: `data/copilot-tietopohja.json` (268 KB)**
- **Per client (all 14):**
  - basic details and baseline;
  - RAI follow-up timing, such as "myöhässä 21 vrk";
  - who has a care relationship with the client;
  - a separate view for each role (sairaanhoitaja, lääkäri, asiakasohjaaja). Each view has the status, summary, findings with dated sources and counter-evidence, RAI domains, and things to check before the visit.
- **Shared reference:** the 18 rules with their limitations, roles and permissions, colour meanings, RAI domains, the PHQ-9/GAD-7/AUDIT questions, purpose, and the synthetic-data notice.
- **How it's made:** the app's own agent generates it, so it matches what the app shows. To refresh it after data or rule changes, open `tools/copilot-vienti.html` and click download.

**Important:** in Copilot Studio, the role limits are only instructions. The uploaded file is shared by everyone who uses the agent. The agent relies on the role the user tells it, so someone claiming to be a doctor gets the doctor's view. That's acceptable for a demo with synthetic data. In production you'd identify the user with Entra ID and fetch data with their own permissions (for example via Power Automate) instead of a shared file. The setup notes say this.

**Two things to verify in Copilot Studio:**
- **File type:** I'm not certain Copilot Studio accepts `.json` uploads in your environment. If it refuses, rename the file to `.txt`; the content is the same.
- **Client context:** the embedded agent can't automatically see which client is open in the app, so users need to type the client number (e.g. "Asiakas 9422"). Passing the open client automatically would mean switching from the simple iframe embed to Copilot Studio's Web Chat script, which needs a network connection. I can set that up if you want.

None of this, nor the earlier front page and logout changes, is pushed yet. Say "git push" when you want it on GitHub.