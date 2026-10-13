"""LUVN synthetic data: basic usage with Polars.

Run from the release folder (the one with README.md):

    pip install polars
    python examples/python_polars.py
"""
import polars as pl

CLIN = "2025/clinical/tables"   # the notes belong to the 2025 cohorts
SOC = "2025/social/tables"

# 1. Clinical notes with their contact and customer --------------------------
notes = pl.read_parquet("2025/clinical/text/clinical-notes.parquet")
kontakti = pl.read_parquet(f"{CLIN}/kontakti.parquet")
asiakas = pl.read_parquet(f"{CLIN}/asiakas.parquet")

visits = (
    notes.join(kontakti, left_on="visit_id", right_on="kontakti_id", how="left")
    .join(asiakas.select("asiakas_id", "sukupuoli", "syntymapaiva"),
          left_on="subject_id", right_on="asiakas_id", how="left")
    .with_columns(age_at_visit=(pl.col("visit_date") - pl.col("syntymapaiva")).dt.total_days() // 365.25)
)
print(visits.select("visit_id", "visit_date", "clinician_role", "kesto_minuutit_kpl",
                    "sukupuoli", "age_at_visit").head())
print(visits.group_by("clinician_role").agg(pl.len(), pl.col("kesto_minuutit_kpl").median()))

# 2. Everything recorded for one visit: diagnoses, medications, lab results --
diagnoosi = pl.read_parquet(f"{CLIN}/diagnoosi.parquet")
laakitys = pl.read_parquet(f"{CLIN}/laakitys.parquet").join(
    pl.read_parquet(f"{CLIN}/laakitys_kontakti.parquet"), on="laakitys_avain")
lab = pl.read_parquet(f"{CLIN}/vastausarkistohistoria_view.parquet").join(
    pl.read_parquet(f"{CLIN}/laboratorio_kontakti.parquet"), on="Avain")

# Medication and lab tables have no contact ID of their own: the *_kontakti
# link tables give it. Pick the first note whose visit has lab results.
visit_id = notes.filter(pl.col("visit_id").is_in(lab["kontakti_id"].implode()))["visit_id"][0]
print(f"\nVisit {visit_id}")
print(diagnoosi.filter(pl.col("kontakti_id") == visit_id).select("icd10_id", "diagnoosi_ensisijaisuus"))
print(laakitys.filter(pl.col("kontakti_id") == visit_id).select("atc_koodi", "vaikuttava_aine", "laakkeen_kayttotapa"))
print(lab.filter(pl.col("kontakti_id") == visit_id).select("PaatutkimuksenLyhenne", "NumeerinenTutkimustulos",
                                                            "TulokseenLiittyvaInfokentta"))
print(notes.filter(pl.col("visit_id") == visit_id)["note_text"][0][:600], "...")

# 3. Patient timeline: subjects with more than one note -----------------------
timeline = (
    notes.filter(pl.len().over("subject_id") > 1)
    .sort("subject_id", "visit_date")
    .select("subject_id", "visit_date", "phase", "primary_diagnosis_code")
)
print(f"\n{timeline['subject_id'].n_unique()} subjects with several notes")
print(timeline.head(6))

# 4. Social decisions and plans with their referral ----------------------------
social = pl.read_parquet("2025/social/text/social-notes.parquet")
vireilletulo = pl.read_parquet(f"{SOC}/vireilletulo.parquet")
cases = social.join(
    vireilletulo.select("paatos_id", "vireilletulo_pvm", "vireilletulo_nimi", "onko_kiireellinen"),
    left_on="decision_id", right_on="paatos_id", how="left",
).with_columns(days_to_decision=(pl.col("decision_date") - pl.col("vireilletulo_pvm")).dt.total_days())
print(cases.group_by("service_task", "decision_outcome").agg(
    pl.len(), pl.col("days_to_decision").median()).sort("service_task", "decision_outcome"))
with_plan = cases.filter(pl.col("plan_text").is_not_null())
print(f"\n{with_plan.height} cases also have an implementation plan")
print(with_plan["plan_text"][0][:400], "...")

# 5. The same data from JSONL or CSV --------------------------------------------
# JSONL and CSV hold identical data. Pass the Parquet schema to keep the types
# (dates, decimals); CSV note texts contain quoted line breaks.
schema = notes.schema
from_jsonl = pl.read_ndjson("2025/clinical/text/clinical-notes.jsonl", schema=schema)
from_csv = pl.read_csv("2025/clinical/text/clinical-notes.csv", schema=schema)
print("\nJSONL == Parquet:", from_jsonl.equals(notes), "| CSV == Parquet:", from_csv.equals(notes))
