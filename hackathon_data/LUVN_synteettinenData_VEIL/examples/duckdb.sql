-- LUVN synthetic data: basic usage with DuckDB SQL.
--
-- Run from the release folder (the one with README.md):
--   duckdb < examples/duckdb.sql
-- or from Python:  import duckdb; duckdb.sql(open("examples/duckdb.sql").read())
-- DuckDB reads Parquet, JSONL (read_json) and CSV (read_csv) files directly.

-- Views over the 2025 cohorts (the notes belong to them).
CREATE VIEW notes        AS SELECT * FROM '2025/clinical/text/clinical-notes.parquet';
CREATE VIEW kontakti     AS SELECT * FROM '2025/clinical/tables/kontakti.parquet';
CREATE VIEW asiakas      AS SELECT * FROM '2025/clinical/tables/asiakas.parquet';
CREATE VIEW diagnoosi    AS SELECT * FROM '2025/clinical/tables/diagnoosi.parquet';
-- Medication and lab tables have no contact ID of their own: join the link tables.
CREATE VIEW laakitys     AS SELECT l.*, k.kontakti_id
                            FROM '2025/clinical/tables/laakitys.parquet' l
                            JOIN '2025/clinical/tables/laakitys_kontakti.parquet' k USING (laakitys_avain);
CREATE VIEW lab          AS SELECT l.*, k.kontakti_id
                            FROM '2025/clinical/tables/vastausarkistohistoria_view.parquet' l
                            JOIN '2025/clinical/tables/laboratorio_kontakti.parquet' k USING (Avain);
CREATE VIEW social       AS SELECT * FROM '2025/social/text/social-notes.parquet';
CREATE VIEW vireilletulo AS SELECT * FROM '2025/social/tables/vireilletulo.parquet';

-- 1. Clinical notes with their contact and customer
SELECT n.visit_id, n.visit_date, n.clinician_role, k.kesto_minuutit_kpl, a.sukupuoli,
       floor(datediff('day', a.syntymapaiva, n.visit_date) / 365.25) AS age_at_visit
FROM notes n
JOIN kontakti k ON k.kontakti_id = n.visit_id
JOIN asiakas a  ON a.asiakas_id = n.subject_id
ORDER BY n.visit_date
LIMIT 5;

SELECT n.clinician_role, count(*) AS notes, median(k.kesto_minuutit_kpl) AS median_minutes
FROM notes n JOIN kontakti k ON k.kontakti_id = n.visit_id
GROUP BY ALL ORDER BY 1;

-- 2. Everything recorded for one visit (a note whose visit has lab results)
CREATE TEMP TABLE one_visit AS
    SELECT visit_id FROM notes WHERE visit_id IN (SELECT kontakti_id FROM lab) LIMIT 1;
SELECT 'diagnosis' AS kind, icd10_id AS code, diagnoosi_ensisijaisuus AS detail
    FROM diagnoosi WHERE kontakti_id = (SELECT visit_id FROM one_visit)
UNION ALL
SELECT 'medication', atc_koodi, vaikuttava_aine
    FROM laakitys WHERE kontakti_id = (SELECT visit_id FROM one_visit)
UNION ALL
SELECT 'lab', PaatutkimuksenLyhenne, CAST(NumeerinenTutkimustulos AS VARCHAR) || ' ' || TulokseenLiittyvaInfokentta
    FROM lab WHERE kontakti_id = (SELECT visit_id FROM one_visit);

-- 3. Patient timeline: subjects with more than one note
SELECT subject_id, visit_date, phase, primary_diagnosis_code
FROM notes
QUALIFY count(*) OVER (PARTITION BY subject_id) > 1
ORDER BY subject_id, visit_date
LIMIT 6;

-- 4. Social decisions with their referral; cases that also have a plan
SELECT s.service_task, s.decision_outcome, count(*) AS cases,
       median(datediff('day', v.vireilletulo_pvm, s.decision_date)) AS median_days_to_decision,
       count(s.plan_text) AS with_plan
FROM social s
LEFT JOIN vireilletulo v ON v.paatos_id = s.decision_id
GROUP BY ALL ORDER BY 1, 2;

-- 5. The same data from JSONL or CSV (identical content)
SELECT (SELECT count(*) FROM read_json('2025/clinical/text/clinical-notes.jsonl', format = 'newline_delimited')) AS jsonl_rows,
       (SELECT count(*) FROM read_csv('2025/clinical/text/clinical-notes.csv')) AS csv_rows,
       (SELECT count(*) FROM notes) AS parquet_rows;
