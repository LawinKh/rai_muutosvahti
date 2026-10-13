# Using the LUVN synthetic data

Quick start for working with the tables and generated texts. See
[README.md](README.md) for the contents, and `docs/clinical_schema_guide.html`
and `docs/social_schema_guide.html` for every table and field.

All examples run from this folder (the one with `README.md`) and use the
`2025/` cohort. To use the three-year cohort, replace `2025/` with
`2024-2026/` in the paths: the files and columns are the same, and in
`2024-2026/` the clinical and social people are the same.

| Example | Language | Install | Run |
|---|---|---|---|
| [`examples/python_polars.py`](examples/python_polars.py) | Python, Polars | `pip install polars` | `python examples/python_polars.py` |
| [`examples/python_pandas.py`](examples/python_pandas.py) | Python, pandas | `pip install pandas pyarrow` | `python examples/python_pandas.py` |
| [`examples/duckdb.sql`](examples/duckdb.sql) | SQL, DuckDB | [DuckDB CLI](https://duckdb.org/docs/installation/) or `pip install duckdb` | `duckdb < examples/duckdb.sql` |
| [`examples/r_arrow.R`](examples/r_arrow.R) | R, arrow + dplyr | `install.packages(c("arrow", "dplyr", "readr"))` | `Rscript examples/r_arrow.R` |

Every example does the same five things:

1. Join clinical notes to their contact (`kontakti`) and customer (`asiakas`), and compute age at visit.
2. Collect everything recorded for one visit: diagnoses, medications and lab results.
3. Build patient timelines from subjects with several notes.
4. Join social decisions to their referral (`vireilletulo`) and find the cases that also have a plan.
5. Read the same data from JSONL and CSV.

The Python and SQL examples were run against this release. The R example was
written to match them but has not been run.

## How the data fits together

```
<cohort>/clinical/text/clinical-notes  subject_id ──► asiakas.asiakas_id
                                       visit_id   ──► kontakti.kontakti_id
<cohort>/clinical/tables/
  kontakti ◄── kontakti_id ── ajanvaraus, diagnoosi, toimenpide
  kontakti ◄── kontakti_id ── laakitys_kontakti ── laakitys_avain ──► laakitys
  kontakti ◄── kontakti_id ── laboratorio_kontakti ── Avain ──► vastausarkistohistoria_view
  asiakas  ◄── asiakas_id ─── kontakti, laakitys, vastausarkistohistoria_view, ...

<cohort>/social/text/social-notes      subject_id  ──► asiakas.asiakas_id
                                       decision_id ──► paatos.paatos_id
<cohort>/social/tables/
  vireilletulo ── selvitys_id, paatos_id, palvelu_id ──► selvitys, paatos, palvelu
  asiakas ◄── asiakas_id ── vireilletulo, selvitys, paatos, palvelu, ...

2024-2026 only: clinical asiakas_id == social asiakas_id (same people)
```

## Minimal snippets

**Python (Polars)**

```python
import polars as pl
notes = pl.read_parquet("2025/clinical/text/clinical-notes.parquet")
kontakti = pl.read_parquet("2025/clinical/tables/kontakti.parquet")
visits = notes.join(kontakti, left_on="visit_id", right_on="kontakti_id")
```

**Python (pandas)**

```python
import pandas as pd
notes = pd.read_parquet("2025/clinical/text/clinical-notes.parquet")
kontakti = pd.read_parquet("2025/clinical/tables/kontakti.parquet")
visits = notes.merge(kontakti, left_on="visit_id", right_on="kontakti_id")
```

**SQL (DuckDB)**

```sql
SELECT n.visit_id, n.clinician_role, k.kesto_minuutit_kpl
FROM '2025/clinical/text/clinical-notes.parquet' n
JOIN '2025/clinical/tables/kontakti.parquet' k ON k.kontakti_id = n.visit_id;
```

**R (arrow + dplyr)**

```r
library(arrow); library(dplyr)
notes <- read_parquet("2025/clinical/text/clinical-notes.parquet")
kontakti <- read_parquet("2025/clinical/tables/kontakti.parquet")
visits <- inner_join(notes, kontakti, by = c("visit_id" = "kontakti_id"))
```

Medications and lab results join to visits through the link tables:

```python
import polars as pl
med = (pl.read_parquet("2025/clinical/tables/laakitys.parquet")
         .join(pl.read_parquet("2025/clinical/tables/laakitys_kontakti.parquet"), on="laakitys_avain"))
```

**2024–2026: one person's health and social texts**

```python
import polars as pl
clin = pl.read_parquet("2024-2026/clinical/text/clinical-notes.parquet")
soc = pl.read_parquet("2024-2026/social/text/social-notes.parquet")
people = clin.join(soc, on="subject_id", suffix="_social")       # 1,500 people with both
kontakti = pl.read_parquet("2024-2026/clinical/tables/kontakti.parquet")
visits = kontakti.filter(pl.col("asiakas_id") == people["subject_id"][0])  # all visits of one person
```

## Things to know

- **Pick one cohort.** `2025/` and `2024-2026/` are independent populations
  with their own IDs. Do not stack them: in 2025 both are active, so combined
  counts would double. Join each cohort's texts to the tables in the same
  cohort folder.
- **Only `2024-2026/` links across domains.** Its clinical and social folders
  share the same people and `asiakas_id`; in `2025/` they are separate
  populations.
- **Medications and lab results** have no contact ID of their own. Use the
  `laakitys_kontakti` and `laboratorio_kontakti` link tables; do not match by
  date.
- **Labels are in the texts.** The diagnosis code (`## DIAGNOOSI`) and the
  decision outcome (`Ratkaisu:`) appear in the note text. Mask them first if
  you build a model that predicts them from text.
- **Who wrote the note:** use `clinician_role`; the text names the role in only
  about two thirds of notes.
- **Social views repeat records.** `kotihoito_kontakti`, `kotihoito_paatos` and
  `palvelutarpeen_arviointi` are compatibility views over the core tables. Do
  not add their rows to the core tables' counts.
- **`osastohoitojakso` is empty by design** (outpatient model only).
- **CSV:** note texts contain quoted line breaks, so use a real CSV parser, not
  line-by-line tools. Read types from each table's `*.schema.json`, or use
  Parquet, which keeps dates and decimals.
- **Lab values** (`NumeerinenTutkimustulos`) are exact decimals; the unit is in
  `TulokseenLiittyvaInfokentta` (e.g. `SYNTHETIC; unit=mU/l`).
- Everything is **synthetic**. Counts and rates are modelling assumptions, not
  LUVN statistics, and the texts need human review before any real use.
