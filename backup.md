# RoasterAlert — UI & Logic Backup

> **Purpose:** Full reference to recreate this project's UI design system, color tokens, animations, component logic, and JS methods in any framework (React, Vue, Angular, plain HTML, mobile, etc.).

---

## 1. Font & Base Setup

```css
/* Google Font */
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

* { box-sizing: border-box; }

body {
  font-family: 'Plus Jakarta Sans', sans-serif;
  margin: 0;
  padding: 0;
  min-height: 100vh;
}
```

---

## 2. Color System

### 2.1 Dark Mode Background
```css
background: linear-gradient(135deg, #1a0533 0%, #0d1b6e 35%, #0a3d6b 65%, #0d1b3e 100%);
```

### 2.2 Light Mode Background
```css
background: linear-gradient(135deg, #eef2ff 0%, #fdf4ff 50%, #ecfeff 100%);
```

### 2.3 Per-Member Color Palette

Two sets — one for dark mode (neon/vivid), one for light mode (deep/saturated).

#### Dark Mode (neon)
| Member  | Background                   | Border    | Text      |
|---------|------------------------------|-----------|-----------|
| Mominul | rgba(255,193,7,0.22)         | #ffc107   | #ffe066   |
| Lira    | rgba(255,45,120,0.22)        | #ff2d78   | #ff80ab   |
| Topu    | rgba(0,229,255,0.18)         | #00e5ff   | #80f4ff   |
| Poly    | rgba(179,0,255,0.2)          | #b300ff   | #df80ff   |
| Kaniz   | rgba(0,230,118,0.18)         | #00e676   | #69ffa9   |
| Toma    | rgba(255,109,0,0.22)         | #ff6d00   | #ffab40   |
| Bithi   | rgba(41,182,246,0.2)         | #29b6f6   | #80d8ff   |
| Partho  | rgba(255,23,68,0.2)          | #ff1744   | #ff80ab   |

#### Light Mode (deep/saturated)
| Member  | Background                   | Border    | Text      |
|---------|------------------------------|-----------|-----------|
| Mominul | rgba(217,119,6,0.14)         | #d97706   | #92400e   |
| Lira    | rgba(219,39,119,0.12)        | #db2777   | #9d174d   |
| Topu    | rgba(8,145,178,0.13)         | #0891b2   | #0e7490   |
| Poly    | rgba(124,58,237,0.12)        | #7c3aed   | #5b21b6   |
| Kaniz   | rgba(5,150,105,0.13)         | #059669   | #065f46   |
| Toma    | rgba(234,88,12,0.13)         | #ea580c   | #9a3412   |
| Bithi   | rgba(37,99,235,0.12)         | #2563eb   | #1e40af   |
| Partho  | rgba(225,29,72,0.12)         | #e11d48   | #9f1239   |

### 2.4 Accent / Brand Colors
```
Primary gradient : #f472b6 → #a855f7 → #6366f1  (pink → purple → indigo)
Title gradient   : #f9a8d4 → #c084fc → #67e8f9  (soft pink → violet → cyan)
Highlight stat   : #f472b6 → #a855f7 → #22d3ee
Today border     : #a855f7
Active Now badge : #ff2d78 (hot pink)
Upcoming badge   : #00e676 (neon green, dark) / #4f46e5 (indigo, light)
Weekend calendar : #ff2d78 → #ff6b35
Weekday calendar : #a855f7 → #3b82f6
```

---

## 3. Glassmorphism Recipe

Used on all cards/panels:

```css
/* Dark glass panel */
.glass-dark {
  background: rgba(255,255,255,0.05);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255,255,255,0.10);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.25);
}

/* Light glass panel */
.glass-light {
  background: rgba(255,255,255,0.85);
  backdrop-filter: blur(24px);
  border: 1px solid rgba(168,85,247,0.15);
  border-radius: 20px;
  box-shadow: 0 8px 24px rgba(168,85,247,0.08);
}
```

**Border radius scale:**
- Header / main card: `24px`
- Filter panel: `20px`
- Input fields: `12px`
- Avatars: `12px`
- Badges: `999px` (pill)
- Calendar nav btn: `12px`
- Calendar day cell: `14px`

---

## 4. Component Styles

### 4.1 Header
```css
.schedule-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.75rem 2rem;
  /* uses glass-dark recipe */
  border-radius: 24px;
  box-shadow: 0 8px 40px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.08);
}

/* Icon box (calendar icon) */
.icon-box {
  background: linear-gradient(135deg, #f472b6 0%, #a855f7 50%, #6366f1 100%);
  width: 60px; height: 60px;
  border-radius: 18px;
  box-shadow: 0 8px 28px rgba(168,85,247,0.65), 0 0 0 1px rgba(244,114,182,0.4);
}

/* Gradient title text */
.title-h1 {
  font-size: 1.875rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  background: linear-gradient(135deg, #f9a8d4 0%, #c084fc 40%, #67e8f9 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Stat panel */
.header-stats {
  display: flex;
  align-items: center;
  gap: 1.75rem;
  background: rgba(255,255,255,0.05);
  padding: 1rem 1.75rem;
  border-radius: 16px;
  border: 1px solid rgba(255,255,255,0.08);
}

.stat-label {
  font-size: 0.7rem;
  font-weight: 700;
  color: #94a3b8;              /* dark mode */
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.stat-value {
  font-size: 1.375rem;
  font-weight: 800;
  color: #ffffff;              /* dark mode — pure white */
  /* light mode override: color: #0f172a */
}

/* Highlight stat uses gradient text (same as title) */
.stat-value.highlight {
  background: linear-gradient(135deg, #f472b6, #a855f7, #22d3ee);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

### 4.2 Filter Panel
```css
/* Input / Select */
.input-field {
  height: 46px;
  background: rgba(255,255,255,0.07);
  border: 1.5px solid rgba(255,255,255,0.1);
  border-radius: 12px;
  padding: 0 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #e2e8f0;
  transition: all 0.25s;
}
.input-field:focus {
  border-color: #7c3aed;
  box-shadow: 0 0 0 4px rgba(124,58,237,0.18);
  background: rgba(124,58,237,0.08);
}

/* Reset button */
.btn-reset {
  background: linear-gradient(135deg, rgba(244,114,182,0.2), rgba(168,85,247,0.2));
  border: 1.5px solid rgba(244,114,182,0.45);
  border-radius: 12px;
  color: #f9a8d4;
  font-weight: 700;
}
.btn-reset:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 22px rgba(244,114,182,0.4);
}
```

### 4.3 Schedule Table

```css
/* Table card */
.schedule-card {
  background: rgba(255,255,255,0.04);
  border-radius: 24px;
  border: 1px solid rgba(255,255,255,0.08);
  box-shadow: 0 24px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06);
}

/* Table header */
th {
  background: rgba(255,255,255,0.04);
  font-size: 0.7rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #475569;
  border-bottom: 1px solid rgba(255,255,255,0.07);
}

/* Row — left border uses member color */
.schedule-row {
  border-left: 3px solid transparent;  /* color set via inline style from memberColors */
  transition: background 0.2s;
}
.schedule-row:hover { background: rgba(255,255,255,0.04); }

/* Today row */
.is-today {
  background: linear-gradient(90deg, rgba(168,85,247,0.15) 0%, rgba(99,102,241,0.07) 100%) !important;
  border-left: 3px solid #a855f7 !important;
  box-shadow: inset 4px 0 20px rgba(168,85,247,0.1);
}

/* Past row */
.is-past {
  opacity: 0.4;
  /* td: text-decoration: line-through */
}
```

### 4.4 Calendar Icon (in list row date cell)
```css
/* 50×56px mini calendar widget */
.calendar-icon {
  width: 50px; height: 56px;
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,0.1);
}

/* Top color bar — month name */
.month-short {
  font-size: 0.6rem; font-weight: 800; color: white;
  padding: 3px 0; text-align: center;
}
/* Weekday top: background: linear-gradient(135deg, #a855f7, #3b82f6) */
/* Weekend top: background: linear-gradient(135deg, #ff2d78, #ff6b35) */

/* Bottom — day number */
.day-num {
  font-size: 1.375rem; font-weight: 800;
  display: flex; align-items: center; justify-content: center;
  flex-grow: 1;
  background: rgba(255,255,255,0.05);
}
```

### 4.5 Member Avatar
```css
.avatar-mini {
  width: 38px; height: 38px;
  border-radius: 12px;
  font-weight: 800; font-size: 0.9rem;
  /* background, border, color set via inline style from memberColors */
}
```

### 4.6 Status Badges
```css
/* Base pill */
.badge {
  padding: 0.4rem 1rem;
  border-radius: 999px;
  font-size: 0.75rem; font-weight: 700;
  display: inline-flex; align-items: center; gap: 0.5rem;
}

/* Active Now (today) */
.badge.today {
  background: linear-gradient(135deg, rgba(255,45,120,0.25), rgba(255,107,53,0.2));
  color: #ff8fab;
  border: 1px solid rgba(255,45,120,0.55);
  box-shadow: 0 0 18px rgba(255,45,120,0.35), inset 0 1px 0 rgba(255,255,255,0.1);
}

/* Scheduled (upcoming) */
.badge.upcoming {
  background: linear-gradient(135deg, rgba(0,230,118,0.15), rgba(0,184,212,0.12));
  color: #00e676;
  border: 1px solid rgba(0,230,118,0.4);
  box-shadow: 0 0 12px rgba(0,230,118,0.2);
}
/* Light mode upcoming: color:#4f46e5, bg indigo tint */

/* Completed (past) */
.badge.past {
  background: rgba(71,85,105,0.18);
  color: #4a5568;
  border: 1px solid rgba(71,85,105,0.2);
}
```

### 4.7 Pulse Dot (Active Now indicator)
```css
.pulse-dot {
  width: 7px; height: 7px;
  background: #ff2d78;
  border-radius: 50%;
  animation: pulse-dot 1.5s infinite;
}
@keyframes pulse-dot {
  0%   { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(255,45,120,0.8); }
  70%  { transform: scale(1);    box-shadow: 0 0 0 9px rgba(255,45,120,0); }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(255,45,120,0); }
}
```

---

## 5. Calendar View

### 5.1 Layout
```css
.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 6px;
}

/* Day-of-week header */
.cal-dow {
  text-align: center; font-size: 0.7rem; font-weight: 800;
  text-transform: uppercase; letter-spacing: 0.08em;
  color: #334155;  /* weekend: #f472b6 */
}

/* Day cell */
.cal-day {
  min-height: 84px; border-radius: 14px; padding: 0.55rem;
  border: 1px solid rgba(255,255,255,0.05);
  background: rgba(255,255,255,0.03);
  display: flex; flex-direction: column; gap: 0.4rem;
}
.cal-day.other-month { opacity: 0.2; background: transparent; border-color: transparent; }
.cal-day.has-duty:hover { transform: translateY(-3px); box-shadow: 0 10px 24px rgba(0,0,0,0.35); }

/* Date number */
.cal-date-num {
  font-size: 0.8rem; font-weight: 800;
  color: #f1f5f9;  /* dark mode — bright */
  /* light mode: color: #0f172a — near black */
}

/* Duty chip (uses member color inline style) */
.cal-duty-chip {
  display: flex; align-items: center; gap: 0.35rem;
  padding: 0.3rem 0.45rem; border-radius: 8px;
  font-size: 0.7rem; font-weight: 800;
}
```

### 5.2 Filter Highlight / Dim in Calendar View

When a filter is active, non-matching days are blurred and faded. Matching days are subtly lifted.

```css
/* Non-matching day — blurred and near-invisible */
.cal-day.cal-dimmed {
  opacity: 0.12;
  filter: blur(1.5px) grayscale(0.6);
  pointer-events: none;
  transform: none !important;  /* cancel any hover lift */
}

/* Matching day — lifted and glowing */
.cal-day.cal-highlighted {
  box-shadow: 0 0 0 1.5px rgba(255,255,255,0.18), 0 6px 20px rgba(0,0,0,0.3);
  background: rgba(255,255,255,0.07);
  transform: translateY(-2px);
}

/* Light mode highlighted */
body.light-mode .cal-day.cal-highlighted {
  box-shadow: 0 0 0 1.5px rgba(168,85,247,0.35), 0 6px 20px rgba(168,85,247,0.12);
  background: rgba(168,85,247,0.04);
}
```

**Class application logic in template:**
```html
:class="{
  'other-month':    !day.current,
  'is-today-cal':    day.isToday,
  'has-duty':       !!day.duty,
  'cal-dimmed':      isFiltered && day.current && !calDayMatches(day),
  'cal-highlighted': isFiltered && day.current &&  calDayMatches(day)
}"
```

> `cal-dimmed` and `cal-highlighted` are only applied to `day.current` cells — padding cells from adjacent months are left untouched.

### 5.2 Today Cell — Fast Blinking Effect

Three layers running simultaneously:

```css
/* 1. Border hard-blink — 0.65s, steps(1) for crisp cut */
.cal-day.is-today-cal {
  position: relative;
  background: rgba(168,85,247,0.12);
  animation: today-border-blink 0.65s steps(1) infinite;
}
@keyframes today-border-blink {
  0%, 49%  { border-color: rgba(192,132,252,0.95); box-shadow: 0 0 18px rgba(168,85,247,0.55); }
  50%, 100%{ border-color: rgba(168,85,247,0.15);  box-shadow: none; }
}

/* 2. Ping ring — expands outward */
.cal-day.is-today-cal::before {
  content: ''; position: absolute; top: 7px; right: 7px;
  width: 9px; height: 9px; border-radius: 50%;
  background: rgba(192,132,252,0.55);
  animation: today-ping 1s ease-out infinite;
}
@keyframes today-ping {
  0%        { transform: scale(1);   opacity: 0.85; }
  70%, 100% { transform: scale(3.2); opacity: 0; }
}

/* 3. Solid dot — blinks on/off */
.cal-day.is-today-cal::after {
  content: ''; position: absolute; top: 7px; right: 7px;
  width: 9px; height: 9px; border-radius: 50%;
  background: #c084fc; box-shadow: 0 0 8px rgba(192,132,252,0.9);
  animation: today-dot-blink 0.65s steps(1) infinite;
}
@keyframes today-dot-blink {
  0%, 49%  { opacity: 1; }
  50%, 100%{ opacity: 0; }
}

/* Light mode — same animations, different colors */
body.light-mode .cal-day.is-today-cal {
  background: rgba(124,58,237,0.07);
  animation: today-border-blink-light 0.65s steps(1) infinite;
}
body.light-mode .cal-day.is-today-cal::before { background: rgba(124,58,237,0.4); }
body.light-mode .cal-day.is-today-cal::after  { background: #7c3aed; box-shadow: 0 0 8px rgba(124,58,237,0.85); }
@keyframes today-border-blink-light {
  0%, 49%  { border-color: rgba(124,58,237,0.9);  box-shadow: 0 0 14px rgba(124,58,237,0.35); }
  50%, 100%{ border-color: rgba(124,58,237,0.12); box-shadow: none; }
}
```

---

## 6. Floating Controls Bar

Always-visible fixed pill at bottom-center — survives page scroll.

```css
.floating-bar {
  position: fixed;
  bottom: 1.75rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  display: flex; align-items: center; gap: 4px;
  background: rgba(10,8,35,0.82);
  backdrop-filter: blur(24px);
  border: 1px solid rgba(255,255,255,0.14);
  border-radius: 999px;
  padding: 5px;
  box-shadow: 0 8px 40px rgba(0,0,0,0.5), 0 2px 8px rgba(168,85,247,0.2);
  animation: floatIn 0.5s cubic-bezier(0.16,1,0.3,1);
}
@keyframes floatIn {
  from { opacity: 0; transform: translateX(-50%) translateY(20px); }
  to   { opacity: 1; transform: translateX(-50%) translateY(0); }
}

/* Active pill */
.view-pill.active {
  background: linear-gradient(135deg, #f472b6, #a855f7, #6366f1);
  color: white;
  box-shadow: 0 4px 14px rgba(168,85,247,0.5);
}

/* Light mode floating bar */
body.light-mode .floating-bar {
  background: rgba(255,255,255,0.92);
  border-color: rgba(168,85,247,0.22);
  box-shadow: 0 8px 40px rgba(168,85,247,0.18), 0 2px 12px rgba(0,0,0,0.1);
}
```

> **Note:** Add `padding-bottom: 6rem` to the main container so content is never hidden behind the floating bar.

---

## 7. Entrance Animations

```css
.animate-slide-down { animation: slideDown 0.6s cubic-bezier(0.16,1,0.3,1); }
.animate-fade-in    { animation: fadeIn    0.8s ease; }
.animate-fade-in-up { animation: fadeInUp  0.8s cubic-bezier(0.16,1,0.3,1); }

@keyframes slideDown { from { transform: translateY(-20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
@keyframes fadeIn    { from { opacity: 0; }                               to { opacity: 1; } }
@keyframes fadeInUp  { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
```

Usage pattern: header gets `slideDown`, filters get `fadeIn`, main content gets `fadeInUp`.

---

## 8. Custom Scrollbar

```css
::-webkit-scrollbar       { width: 6px; height: 6px; }
::-webkit-scrollbar-track { background: rgba(255,255,255,0.02); }
::-webkit-scrollbar-thumb { background: linear-gradient(180deg, #f472b6, #a855f7); border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: linear-gradient(180deg, #fb7bb8, #c084fc); }
/* Light mode track: background: rgba(0,0,0,0.04); */
```

---

## 9. Vue 3 State & Logic

### 9.1 Reactive State
```js
const roaster     = ref(roasterData)       // array of { date, day, name }
const filters     = ref({ name:'', date:'', day:'' })
const viewMode    = ref('list')            // 'list' | 'calendar'
const isDark      = ref(true)              // theme
const calYear     = ref(new Date().getFullYear())
const calMonth    = ref(new Date().getMonth())  // 0-indexed
```

### 9.2 Computed Properties
```js
// Unique sorted names for filter dropdown
const uniqueNames = computed(() => {
  const names = new Set(roaster.value.map(i => i.name).filter(Boolean));
  return Array.from(names).sort();
});

// Whether any filter is active (disables reset btn when false)
const isFiltered = computed(() =>
  filters.value.name || filters.value.date || filters.value.day
);

// Filtered list for table view
const filteredRoaster = computed(() =>
  roaster.value.filter(item => {
    const matchName = !filters.value.name || item.name === filters.value.name;
    const matchDate = !filters.value.date || item.date === filters.value.date;
    const matchDay  = !filters.value.day  || item.day  === filters.value.day;
    return matchName && matchDate && matchDay;
  })
);

// Count of past entries
const completedCount = computed(() => {
  const today = new Date().toISOString().split('T')[0];
  return roaster.value.filter(i => i.date < today).length;
});

// Calendar month label e.g. "April 2026"
const calMonthLabel = computed(() =>
  new Date(calYear.value, calMonth.value, 1)
    .toLocaleString('default', { month: 'long', year: 'numeric' })
);

// O(1) date → duty lookup
const dutyMap = computed(() => {
  const map = {};
  roaster.value.forEach(item => { map[item.date] = item; });
  return map;
});

// Day-of-week name lookup
const DOW_NAMES = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

// 42-cell calendar grid (6 rows × 7 cols)
// Each cell carries dateStr + dayName so filters can match on non-duty days too
const calendarDays = computed(() => {
  const yr    = calYear.value;
  const mo    = calMonth.value;
  const today = new Date().toISOString().split('T')[0];
  const firstDow  = new Date(yr, mo, 1).getDay();   // 0=Sun
  const lastDate  = new Date(yr, mo + 1, 0).getDate();
  const days = [];

  // Pad with prev-month days (dateStr/dayName left blank — not filterable)
  for (let i = 0; i < firstDow; i++) {
    const d = new Date(yr, mo, -(firstDow - i - 1));
    days.push({ num: d.getDate(), current: false, isToday: false, duty: null, dateStr: '', dayName: '' });
  }
  // Current month — includes dateStr and dayName for filter matching
  for (let d = 1; d <= lastDate; d++) {
    const dateStr = `${yr}-${String(mo+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    const dayName = DOW_NAMES[new Date(yr, mo, d).getDay()];
    days.push({ num: d, current: true, isToday: dateStr === today, duty: dutyMap.value[dateStr] || null, dateStr, dayName });
  }
  // Pad to 42 cells (dateStr/dayName left blank)
  const remaining = 42 - days.length;
  for (let i = 1; i <= remaining; i++) {
    days.push({ num: i, current: false, isToday: false, duty: null, dateStr: '', dayName: '' });
  }
  return days;
});
```

### 9.3 Methods
```js
// Date helpers
const isToday     = (dateStr) => dateStr === new Date().toISOString().split('T')[0];
const isPast      = (dateStr) => dateStr < new Date().toISOString().split('T')[0];
const getDayClass = (day) => ['Friday','Saturday'].includes(day) ? 'weekend' : 'weekday';

const formatDate = (dateStr) => {
  const [y,m,d] = dateStr.split('-').map(Number);
  return new Date(y,m-1,d).toLocaleDateString(undefined, { year:'numeric', month:'long', day:'numeric' });
};
const getMonthShort = (dateStr) => {
  const [y,m,d] = dateStr.split('-').map(Number);
  return new Date(y,m-1,d).toLocaleString('default',{month:'short'}).toUpperCase();
};
const getDayNum = (dateStr) => parseInt(dateStr.split('-')[2]);

// Filter
const resetFilters = () => filters.value = { name:'', date:'', day:'' };

// Calendar navigation
const prevMonth = () => {
  if (calMonth.value === 0) { calMonth.value = 11; calYear.value--; }
  else calMonth.value--;
};
const nextMonth = () => {
  if (calMonth.value === 11) { calMonth.value = 0; calYear.value++; }
  else calMonth.value++;
};

// Per-member color (picks dark or light palette based on isDark)
const getAvatarStyle = (name) => {
  const palette = isDark.value ? memberColors : memberColorsLight;
  const fallback = isDark.value ? defaultColor : defaultColorLight;
  const c = palette[name] || fallback;
  return { background: c.bg, border: `1.5px solid ${c.border}`, color: c.text };
};

// Row left-border color (skip for today row — has its own style)
const getRowStyle = (item) => {
  if (isToday(item.date)) return {};
  const palette = isDark.value ? memberColors : memberColorsLight;
  const fallback = isDark.value ? defaultColor : defaultColorLight;
  const c = palette[item.name] || fallback;
  return { borderLeftColor: c.border };
};

// Calendar chip style
const getChipStyle = (name) => {
  const palette = isDark.value ? memberColors : memberColorsLight;
  const fallback = isDark.value ? defaultColor : defaultColorLight;
  const c = palette[name] || fallback;
  return { background: c.bg, border: `1px solid ${c.border}`, color: c.text };
};
const getDotColor = (name) => {
  const palette = isDark.value ? memberColors : memberColorsLight;
  return (palette[name] || (isDark.value ? defaultColor : defaultColorLight)).border;
};

// Calendar filter match — returns true if a calendar day satisfies all active filters
// Priority: exact date match short-circuits name/day filters
const calDayMatches = (day) => {
  const { name, date, day: dayFilter } = filters.value;
  if (date) return day.dateStr === date;   // exact date wins
  let ok = true;
  if (name)      ok = ok && !!(day.duty && day.duty.name === name);
  if (dayFilter) ok = ok && day.dayName === dayFilter;
  return ok;
};
// Usage in template: :class="{ 'cal-dimmed': isFiltered && day.current && !calDayMatches(day),
//                              'cal-highlighted': isFiltered && day.current && calDayMatches(day) }"
// Note: filters panel has NO v-show guard — it is visible in both list and calendar views.

// Theme toggle — persisted in localStorage
const applyTheme = () => {
  document.body.classList.toggle('light-mode', !isDark.value);
  localStorage.setItem('roaster-theme', isDark.value ? 'dark' : 'light');
};
const toggleTheme = () => { isDark.value = !isDark.value; applyTheme(); };

// On mount: restore theme + scroll to today
onMounted(() => {
  applyTheme();
  setTimeout(() => {
    const todayRow = document.querySelector('.is-today');
    if (todayRow) todayRow.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 500);
});
```

### 9.4 Theme Persistence (localStorage)
```js
// On init — read saved preference, default to dark
const savedTheme = localStorage.getItem('roaster-theme');
const isDark = ref(savedTheme ? savedTheme === 'dark' : true);
// Toggle adds/removes class 'light-mode' on document.body
```

---

## 10. Notification System (Node.js)

### 10.1 Email Transporter (Gmail / Google Workspace)
```js
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,  // stored in GitHub Secrets
    pass: process.env.EMAIL_PASS   // App Password (not regular password)
  }
});
```

> **Requirement:** Gmail account must have 2FA enabled + an App Password generated at myaccount.google.com.

### 10.2 Bangladesh Time Calculation
```js
// UTC+6 offset
const nowBD      = new Date(Date.now() + 6 * 60 * 60 * 1000);
const todayStr   = nowBD.toISOString().split('T')[0];  // "YYYY-MM-DD"
const tomorrowStr = new Date(nowBD.getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];
```

### 10.3 Notification Logic
```js
for (const entry of roaster) {
  if (!entry.email) continue;              // skip if no email mapped

  if (entry.date === todayStr) {
    await sendEmail(entry.email, `Today duty alert`, `Hi ${entry.name}...`);
  }
  if (entry.date === tomorrowStr) {
    await sendEmail(entry.email, `Tomorrow duty reminder`, `Hi ${entry.name}...`);
  }
}
```

### 10.4 GitHub Actions Cron Schedule
```yaml
on:
  schedule:
    - cron: '1 18 * * *'   # 18:01 UTC = 12:01 AM Dhaka time (UTC+6)
  workflow_dispatch:         # allows manual trigger

jobs:
  notify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '22' }
      - run: npm install nodemailer@6
      - run: node send-notifications.js
        env:
          EMAIL_USER: ${{ secrets.EMAIL_USER }}
          EMAIL_PASS: ${{ secrets.EMAIL_PASS }}
```

> **Cron formula:** `Desired Dhaka time − 6 hours = UTC time for cron`

---

## 11. Data Structure

### Roaster Entry
```json
{
  "date": "2026-04-13",
  "day": "Monday",
  "name": "Toma",
  "email": "mahfuja.toma@oculintech.com"
}
```

### Member Color Map Object Shape
```js
const memberColors = {
  'MemberName': {
    bg:     'rgba(R,G,B,alpha)',   // chip/avatar background
    border: '#hexcolor',           // border + dot color
    text:   '#hexcolor'            // label text
  }
};
const defaultColor = { bg: 'rgba(100,116,139,0.18)', border: '#64748b', text: '#94a3b8' };
```

---

## 12. Responsive Breakpoints

```css
@media (max-width: 768px) {
  .schedule-header    { flex-direction: column; align-items: flex-start; gap: 1.25rem; }
  .header-stats       { width: 100%; justify-content: space-around; }
  .roaster-container  { padding: 1.5rem 1rem; }
  /* floating-bar stays fixed — no change needed on mobile */
}
```

---

## 13. Adapting to Another Framework

| Concept | Vue 3 (current) | React equivalent | Angular equivalent |
|---|---|---|---|
| `ref()` | `ref(value)` | `useState(value)` | `signal(value)` |
| `computed()` | `computed(() => ...)` | `useMemo(() => ..., [deps])` | `computed(() => ...)` |
| `v-model` | `v-model="filters.name"` | `value={} onChange={}` | `[(ngModel)]` |
| `v-for` | `v-for="item in list"` | `list.map(item => ...)` | `*ngFor="let item of list"` |
| `v-show` | `v-show="condition"` | `style={{display: condition ? '' : 'none'}}` | `[hidden]="!condition"` |
| `:style` | `:style="getStyle()"` | `style={getStyle()}` | `[ngStyle]="getStyle()"` |
| `onMounted` | `onMounted(() => ...)` | `useEffect(() => ..., [])` | `ngOnInit()` |

**CSS is framework-agnostic** — all styles, animations, and color tokens work identically in any framework. Only the template binding syntax changes.
