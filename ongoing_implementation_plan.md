# Implementation Plan — Industrial Visit Fix + Compulsory Events

## Bug: Industrial Visit Map Not Visible

**Root Cause**: The `LocationPicker` search box lives in the "Logistics & Venue" section (scroll-down), while the blue info banner is in "Event Details" above. User sees the banner but not the picker.

**Fix**: Move the `LocationPicker` directly below the blue info banner in Event Details section. Keep the preview map where it is.

---

## Feature: Compulsory / Selective Events (Teacher Events Only)

### What It Does
- Teacher can mark an event **Compulsory** for specific semesters/years/department
- On HOD approval → **all matching students are auto-registered** with individual QR codes
- **No manual registration needed** — students just visit the event page and scan their QR
- Works via the existing DB trigger `handle_compulsory_autoregistration` (migration 0021)

### What Already Exists in DB
- `events.is_compulsory` boolean column ✅ (migration 0021)
- Trigger `handle_compulsory_autoregistration` auto-inserts registrations on `approval_status = 'approved'` ✅
- `event_constraints` table for targeting semesters/years/departments ✅

### What Needs to Be Built

#### 1. Teacher Create Event Form (`app/teacher/events/create/page.tsx`)
- Add **Semester selector** (checkboxes 1–8)
- Add **Year selector** (1–4)
- Add **"Make Compulsory" toggle** — when enabled shows the selectors and a warning
- Pass data to server action

#### 2. Server Action (`lib/actions/teacher-events.ts`)
- Read `is_compulsory`, `semesters`, `years` from formData
- Set `is_compulsory` in DB insert
- Set `event_constraints.allowed_semesters` and `allowed_years`

#### 3. Student Event Detail Page (`app/student/events/[id]/page.tsx`)
- Add `is_compulsory` to the select query
- Show "Compulsory — Auto-Registered" badge when student is auto-registered

#### 4. HOD Approval Page (`app/hod/approvals/[id]/page.tsx`)
- Show compulsory badge + target info in the dossier

---

## Files Changed

| File | Action |
|---|---|
| `app/teacher/events/create/page.tsx` | MODIFY — move LocationPicker, add compulsory UI |
| `lib/actions/teacher-events.ts` | MODIFY — handle is_compulsory, semesters, years |
| `app/student/events/[id]/page.tsx` | MODIFY — compulsory badge |
| `app/hod/approvals/[id]/page.tsx` | MODIFY — compulsory indicator |

---

## Will NOT Break
- CC event creation — no changes to cc-events.ts or /cc routes
- Existing teacher verification flow — no changes to verify pages
- HOD/PR queues — compulsory events still go pending_hod first
- Student registration system — auto-reg uses existing trigger

---

## Verification
- `npm run build` — must pass with no errors
- `git push` to current branch
