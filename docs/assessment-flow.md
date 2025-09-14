# Assessment & Nilai Flow (Frontend ⇄ Backend)

This document explains the aligned data flow between frontend (Vue + Pinia) and backend (Express + MySQL) for creating Assessments and entering Nilai.

## Key Backend Endpoints

- POST /add/assessment
  - Body: { id_capaian_kelas, nama_assessment, deskripsi, bobot }
- POST /add/nilai
  - Body: { id_siswa, id_pengampu, id_assessment, nilai, tanggal_input }
- PUT /update/nilai/:id_siswa/:id_assessment
  - Body: { nilai }
- GET /filter/assessment/:id/nilai
- GET /filter/nilai?id_assessment=..&id_siswa=..
- GET /list/capaian_kelas, /list/assessment, /list/nilai, /list/pengampu, /list/siswa

## Selection Chain (Frontend)
1) Kelas → 2) Dimensi → 3) Elemen → 4) Sub Elemen → 5) Capaian Kelas

Notes:
- “Capaian” in the UI is mapped from capaian_kelas table. We use ck.id (id from capaian_kelas) as the canonical identifier.
- For display, we show ck.nama_ck.

## Create Assessment (src/stores/assesment.js)
- createAssessment requires id_capaian_kelas and builds the exact backend payload.
- Defaults: nama_assessment auto if missing; deskripsi optional; bobot coerced to number.

## Assessment Page (src/views/assesment/index.vue)
- Fetches capaian list from /list/capaian_kelas and maps items to include:
  - id_ck (ck.id), id_sub_elemen, and a fallback id_capaian = ck.id for legacy UI usage.
- When saving a new assessment, it resolves id_capaian_kelas (ck.id) using the selected Kelas + Sub Elemen (+ selected “Capaian”).
- After creating the assessment, it resolves id_pengampu using current guru + selected kelas and then submits nilai per siswa via POST /add/nilai.
- Nilai are recorded with string values (MB/SB/BSH/SAB) and a date (YYYY-MM-DD).

## Edit Assessment (src/views/assesment/AssessmentEdit.vue)
- Traces relationships via capaian_kelas → sub_elemen → elemen → dimensi → kelas.
- Updates existing nilai via PUT /update/nilai/:id_siswa/:id_assessment.

## Assessment Results (src/stores/assessmentResults.js)
- Uses id_capaian_kelas end-to-end to find or create an assessment.
- Loads/saves nilai through the official endpoints.

## Migration Notes
- Any legacy code referencing id_capaian has been adapted to work with capaian_kelas (ck.id). Prefer id_capaian_kelas going forward.
- AssessmentPenilaian.vue still uses old endpoints (e.g., /update/nilai, /update/nilai/batch) and numeric validation. Consider updating it to:
  - Validate nilai as one of MB/SB/BSH/SAB
  - Check existing nilai via GET /filter/nilai
  - Create (POST /add/nilai) or update (PUT /update/nilai/:id_siswa/:id_assessment) accordingly
  - Derive id_pengampu from current guru + selected kelas.

## Quick Checks
- You should be able to:
  1) Select Kelas → Dimensi → Elemen → Sub Elemen → Capaian, then create an Assessment
  2) Submit nilai; verify they appear in /filter/assessment/:id/nilai results
  3) Edit nilai on AssessmentEdit.vue and see the changes persisted

If something fails with 401/403, re-login to refresh the token.
