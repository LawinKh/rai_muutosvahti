# LUVN synthetic data: basic usage with R (arrow + dplyr).
#
# Run from the release folder (the one with README.md):
#   install.packages(c("arrow", "dplyr", "readr"))
#   Rscript examples/r_arrow.R

library(arrow)
library(dplyr)

clin <- "2025/clinical/tables"   # the notes belong to the 2025 cohorts
soc <- "2025/social/tables"

# 1. Clinical notes with their contact and customer --------------------------
notes <- read_parquet("2025/clinical/text/clinical-notes.parquet")
kontakti <- read_parquet(file.path(clin, "kontakti.parquet"))
asiakas <- read_parquet(file.path(clin, "asiakas.parquet"))

visits <- notes |>
  left_join(kontakti, by = c("visit_id" = "kontakti_id")) |>
  left_join(select(asiakas, asiakas_id, sukupuoli, syntymapaiva),
            by = c("subject_id" = "asiakas_id")) |>
  mutate(age_at_visit = floor(as.numeric(visit_date - syntymapaiva) / 365.25))
print(head(select(visits, visit_id, visit_date, clinician_role, kesto_minuutit_kpl, sukupuoli, age_at_visit)))
print(visits |> group_by(clinician_role) |>
        summarise(notes = n(), median_minutes = median(kesto_minuutit_kpl)))

# 2. Everything recorded for one visit: diagnoses, medications, lab results --
diagnoosi <- read_parquet(file.path(clin, "diagnoosi.parquet"))
# Medication and lab tables have no contact ID of their own: the *_kontakti
# link tables give it.
laakitys <- read_parquet(file.path(clin, "laakitys.parquet")) |>
  inner_join(read_parquet(file.path(clin, "laakitys_kontakti.parquet")), by = "laakitys_avain")
lab <- read_parquet(file.path(clin, "vastausarkistohistoria_view.parquet")) |>
  inner_join(read_parquet(file.path(clin, "laboratorio_kontakti.parquet")), by = "Avain")

one_visit <- notes$visit_id[notes$visit_id %in% lab$kontakti_id][1]
cat("\nVisit", one_visit, "\n")
print(diagnoosi |> filter(kontakti_id == .env$one_visit) |> select(icd10_id, diagnoosi_ensisijaisuus))
print(laakitys |> filter(kontakti_id == .env$one_visit) |> select(atc_koodi, vaikuttava_aine, laakkeen_kayttotapa))
print(lab |> filter(kontakti_id == .env$one_visit) |>
        select(PaatutkimuksenLyhenne, NumeerinenTutkimustulos, TulokseenLiittyvaInfokentta))
cat(substr(notes$note_text[notes$visit_id == one_visit], 1, 600), "...\n")

# 3. Patient timeline: subjects with more than one note -----------------------
timeline <- notes |>
  group_by(subject_id) |> filter(n() > 1) |> ungroup() |>
  arrange(subject_id, visit_date) |>
  select(subject_id, visit_date, phase, primary_diagnosis_code)
cat("\n", n_distinct(timeline$subject_id), "subjects with several notes\n")
print(head(timeline))

# 4. Social decisions and plans with their referral ----------------------------
social <- read_parquet("2025/social/text/social-notes.parquet")
vireilletulo <- read_parquet(file.path(soc, "vireilletulo.parquet"))
cases <- social |>
  left_join(select(vireilletulo, paatos_id, vireilletulo_pvm, vireilletulo_nimi, onko_kiireellinen),
            by = c("decision_id" = "paatos_id")) |>
  mutate(days_to_decision = as.numeric(decision_date - vireilletulo_pvm))
print(cases |> group_by(service_task, decision_outcome) |>
        summarise(cases = n(), median_days_to_decision = median(days_to_decision),
                  with_plan = sum(!is.na(plan_text)), .groups = "drop"))
with_plan <- filter(cases, !is.na(plan_text))
cat("\n", nrow(with_plan), "cases also have an implementation plan\n")
cat(substr(with_plan$plan_text[1], 1, 400), "...\n")

# 5. The same data from JSONL or CSV --------------------------------------------
# readr handles the quoted line breaks in CSV note texts.
from_jsonl <- read_json_arrow("2025/clinical/text/clinical-notes.jsonl")
from_csv <- readr::read_csv("2025/clinical/text/clinical-notes.csv", show_col_types = FALSE)
cat("\nrows: parquet", nrow(notes), "| jsonl", nrow(from_jsonl), "| csv", nrow(from_csv),
    "| same texts:", identical(from_jsonl$note_text, notes$note_text) && identical(from_csv$note_text, notes$note_text), "\n")
