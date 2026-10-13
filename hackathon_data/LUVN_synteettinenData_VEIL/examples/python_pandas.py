"""LUVN synthetic data: basic usage with pandas.

Run from the release folder (the one with README.md):

    pip install pandas pyarrow
    python examples/python_pandas.py
"""
import pandas as pd

CLIN = "2025/clinical/tables"   # the notes belong to the 2025 cohorts
SOC = "2025/social/tables"

# 1. Clinical notes with their contact and customer --------------------------
notes = pd.read_parquet("2025/clinical/text/clinical-notes.parquet")
kontakti = pd.read_parquet(f"{CLIN}/kontakti.parquet")
asiakas = pd.read_parquet(f"{CLIN}/asiakas.parquet")

visits = (
    notes.merge(kontakti, left_on="visit_id", right_on="kontakti_id", how="left")
    .merge(asiakas[["asiakas_id", "sukupuoli", "syntymapaiva"]],
           left_on="subject_id", right_on="asiakas_id", how="left")
)
visits["age_at_visit"] = (pd.to_datetime(visits["visit_date"]) - pd.to_datetime(visits["syntymapaiva"])).dt.days // 365.25
print(visits[["visit_id", "visit_date", "clinician_role", "kesto_minuutit_kpl", "sukupuoli", "age_at_visit"]].head())
print(visits.groupby("clinician_role")["kesto_minuutit_kpl"].agg(["count", "median"]))

# 2. Everything recorded for one visit: diagnoses, medications, lab results --
diagnoosi = pd.read_parquet(f"{CLIN}/diagnoosi.parquet")
# Medication and lab tables have no contact ID of their own: the *_kontakti
# link tables give it.
laakitys = pd.read_parquet(f"{CLIN}/laakitys.parquet").merge(
    pd.read_parquet(f"{CLIN}/laakitys_kontakti.parquet"), on="laakitys_avain")
lab = pd.read_parquet(f"{CLIN}/vastausarkistohistoria_view.parquet").merge(
    pd.read_parquet(f"{CLIN}/laboratorio_kontakti.parquet"), on="Avain")

visit_id = notes.loc[notes["visit_id"].isin(lab["kontakti_id"]), "visit_id"].iloc[0]
print(f"\nVisit {visit_id}")
print(diagnoosi.loc[diagnoosi["kontakti_id"] == visit_id, ["icd10_id", "diagnoosi_ensisijaisuus"]])
print(laakitys.loc[laakitys["kontakti_id"] == visit_id, ["atc_koodi", "vaikuttava_aine", "laakkeen_kayttotapa"]])
print(lab.loc[lab["kontakti_id"] == visit_id, ["PaatutkimuksenLyhenne", "NumeerinenTutkimustulos", "TulokseenLiittyvaInfokentta"]])
print(notes.loc[notes["visit_id"] == visit_id, "note_text"].iloc[0][:600], "...")

# 3. Patient timeline: subjects with more than one note -----------------------
several = notes[notes.groupby("subject_id")["subject_id"].transform("size") > 1]
timeline = several.sort_values(["subject_id", "visit_date"])[["subject_id", "visit_date", "phase", "primary_diagnosis_code"]]
print(f"\n{timeline['subject_id'].nunique()} subjects with several notes")
print(timeline.head(6))

# 4. Social decisions and plans with their referral ----------------------------
social = pd.read_parquet("2025/social/text/social-notes.parquet")
vireilletulo = pd.read_parquet(f"{SOC}/vireilletulo.parquet")
cases = social.merge(
    vireilletulo[["paatos_id", "vireilletulo_pvm", "vireilletulo_nimi", "onko_kiireellinen"]],
    left_on="decision_id", right_on="paatos_id", how="left")
cases["days_to_decision"] = (pd.to_datetime(cases["decision_date"]) - pd.to_datetime(cases["vireilletulo_pvm"])).dt.days
print(cases.groupby(["service_task", "decision_outcome"])["days_to_decision"].agg(["count", "median"]))
with_plan = cases[cases["plan_text"].notna()]
print(f"\n{len(with_plan)} cases also have an implementation plan")
print(with_plan["plan_text"].iloc[0][:400], "...")

# 5. The same data from JSONL or CSV --------------------------------------------
# Dates arrive as strings: convert them. CSV note texts contain quoted line
# breaks, which pandas handles.
from_jsonl = pd.read_json("2025/clinical/text/clinical-notes.jsonl", lines=True, dtype={"visit_date": str})
from_csv = pd.read_csv("2025/clinical/text/clinical-notes.csv", parse_dates=["visit_date"])
print("\nrows: parquet", len(notes), "| jsonl", len(from_jsonl), "| csv", len(from_csv),
      "| same texts:", from_jsonl["note_text"].equals(notes["note_text"]) and from_csv["note_text"].equals(notes["note_text"]))
