# 📅 AMI Roaster Schedule - Full Feature Documentation

This document contains everything required to replicate the **AMI Roaster Schedule** feature in another project. It includes the UI design, logic, styles, and data management scripts.

---

## 🏗️ 1. Architecture Overview
The AMI Roaster Schedule is a high-performance, client-side feature designed for workforce monitoring.
*   **Frontend:** Vue 3 (Composition API) with TypeScript.
*   **Data Source:** Static `roaster.json` file (generated from Excel).
*   **Styling:** Modern SaaS aesthetic using Glassmorphism, CSS Animations, and Responsive Grid.
*   **Zero Backend Dependency:** It loads data directly from an asset file for instant performance.

---

## 🖥️ 2. The UI Component (`AmiRoasterScheduleView.vue`)

Copy this entire block into your `src/views/` or `src/components/` directory.

```vue
<template>
  <div class="roaster-container">
    <!-- Sophisticated Header -->
    <header class="schedule-header animate-slide-down">
      <div class="header-main">
        <div class="icon-box">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z" />
          </svg>
        </div>
        <div class="title-group">
          <h1>AMI Roaster Schedule</h1>
          <p>Real-time monitoring duty assignments and tracking</p>
        </div>
      </div>
      <div class="header-stats">
        <div class="stat-item">
          <span class="stat-label">Total Entries</span>
          <span class="stat-value">{{ roaster.length }}</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <span class="stat-label">Completed</span>
          <span class="stat-value highlight">{{ completedCount }}</span>
        </div>
      </div>
    </header>

    <!-- Glassmorphic Filters -->
    <section class="filter-glass animate-fade-in">
      <div class="filter-row">
        <div class="input-wrapper">
          <label>Duty Member</label>
          <div class="select-custom">
            <select v-model="filters.name">
              <option value="">All Members</option>
              <option v-for="name in uniqueNames" :key="name" :value="name">{{ name }}</option>
            </select>
          </div>
        </div>

        <div class="input-wrapper">
          <label>Specific Date</label>
          <input type="date" v-model="filters.date" class="date-custom" />
        </div>

        <div class="input-wrapper">
          <label>Day of Week</label>
          <div class="select-custom">
            <select v-model="filters.day">
              <option value="">Every Day</option>
              <option v-for="day in weekDays" :key="day" :value="day">{{ day }}</option>
            </select>
          </div>
        </div>

        <div class="actions">
          <button class="btn-reset" @click="resetFilters" :disabled="!isFiltered">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
            </svg>
            Clear Filters
          </button>
        </div>
      </div>
    </section>

    <!-- Refined Schedule List -->
    <main class="schedule-card animate-fade-in-up">
      <div class="table-responsive">
        <table class="schedule-table">
          <thead>
            <tr>
              <th>Date Information</th>
              <th>Assignment</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in filteredRoaster" 
                :key="index" 
                :class="{ 'is-today': isToday(item.date), 'is-past': isPast(item.date) }"
                class="schedule-row">
              <td>
                <div class="date-block">
                  <div class="calendar-icon" :class="getDayClass(item.day)">
                    <span class="month-short">{{ getMonthShort(item.date) }}</span>
                    <span class="day-num">{{ getDayNum(item.date) }}</span>
                  </div>
                  <div class="date-text">
                    <span class="full-date">{{ formatDate(item.date) }}</span>
                    <span class="weekday">{{ item.day }}</span>
                  </div>
                </div>
              </td>
              <td>
                <div class="member-info">
                  <div class="avatar-mini">{{ item.name.charAt(0) }}</div>
                  <span class="member-name">{{ item.name }}</span>
                </div>
              </td>
              <td>
                <div class="status-wrap">
                  <span v-if="isToday(item.date)" class="badge-status today">
                    <span class="pulse-dot"></span> Active Now
                  </span>
                  <span v-else-if="isPast(item.date)" class="badge-status past">Completed</span>
                  <span v-else class="badge-status upcoming">Scheduled</span>
                </div>
              </td>
            </tr>
            <tr v-if="filteredRoaster.length === 0">
              <td colspan="3" class="empty-state">
                <div class="empty-msg">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" stroke-width="1.5">
                    <circle cx="12" cy="12" r="10"/><path d="M8 12h8"/>
                  </svg>
                  <p>No duty matches your current filter</p>
                  <button @click="resetFilters" class="text-btn">Reset all filters</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
// Ensure you have a roaster.json in your assets folder
import roasterData from '../assets/roaster.json';

interface RoasterItem {
  date: string;
  day: string;
  name: string;
}

const roaster = ref<RoasterItem[]>(roasterData);
const filters = ref({ name: '', date: '', day: '' });
const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const uniqueNames = computed(() => {
  const names = new Set(roaster.value.map(item => item.name).filter(Boolean));
  return Array.from(names).sort();
});

const isFiltered = computed(() => filters.value.name || filters.value.date || filters.value.day);

const filteredRoaster = computed(() => {
  return roaster.value.filter(item => {
    const matchesName = !filters.value.name || item.name === filters.value.name;
    const matchesDate = !filters.value.date || item.date === filters.value.date;
    const matchesDay = !filters.value.day || item.day === filters.value.day;
    return matchesName && matchesDate && matchesDay;
  });
});

const completedCount = computed(() => {
  const today = new Date().toISOString().split('T')[0];
  return roaster.value.filter(item => item.date < today).length;
});

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
};

const getMonthShort = (dateStr: string) => new Date(dateStr).toLocaleString('default', { month: 'short' }).toUpperCase();
const getDayNum = (dateStr: string) => new Date(dateStr).getDate();
const isToday = (dateStr: string) => dateStr === new Date().toISOString().split('T')[0];
const isPast = (dateStr: string) => dateStr < new Date().toISOString().split('T')[0];
const getDayClass = (day: string) => ['Friday', 'Saturday'].includes(day) ? 'weekend' : 'weekday';
const resetFilters = () => filters.value = { name: '', date: '', day: '' };

onMounted(() => {
  // Auto-scroll to today's duty on load
  setTimeout(() => {
    const todayRow = document.querySelector('.is-today');
    if (todayRow) todayRow.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 500);
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

.roaster-container {
  font-family: 'Plus Jakarta Sans', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  color: #1e293b;
}

/* Header Styling */
.schedule-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
}

.header-main {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.icon-box {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  width: 56px;
  height: 56px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 15px -3px rgba(37, 99, 235, 0.25);
}

.title-group h1 {
  font-size: 1.875rem;
  font-weight: 800;
  letter-spacing: -0.025em;
  margin: 0;
  color: #0f172a;
}

.title-group p {
  color: #64748b;
  margin: 0.25rem 0 0 0;
  font-size: 0.9375rem;
}

.header-stats {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  background: white;
  padding: 0.75rem 1.25rem;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}

.stat-item {
  display: flex;
  flex-direction: column;
}

.stat-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.stat-value {
  font-size: 1.125rem;
  font-weight: 700;
  color: #1e293b;
}

.stat-value.highlight { color: #3b82f6; }
.stat-divider { width: 1px; height: 24px; background: #e2e8f0; }

/* Filter Glassmorphism */
.filter-glass {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(226, 232, 240, 0.8);
  border-radius: 20px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 10px 15px -3px rgba(0, 0, 0, 0.05);
}

.filter-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  align-items: flex-end;
}

.input-wrapper label {
  display: block;
  font-size: 0.8125rem;
  font-weight: 700;
  color: #475569;
  margin-bottom: 0.5rem;
  margin-left: 0.25rem;
}

.select-custom, .date-custom {
  width: 100%;
  height: 44px;
  background: white;
  border: 1.5px solid #e2e8f0;
  border-radius: 10px;
  padding: 0 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #1e293b;
  transition: all 0.2s;
}

.select-custom select {
  width: 100%;
  height: 100%;
  border: none;
  background: transparent;
  outline: none;
  cursor: pointer;
}

.date-custom:focus, .select-custom:focus-within {
  border-color: #3b82f6;
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
}

.btn-reset {
  width: 100%;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: white;
  border: 1.5px solid #e2e8f0;
  border-radius: 10px;
  color: #64748b;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-reset:hover:not(:disabled) {
  background: #f8fafc;
  border-color: #cbd5e1;
  color: #1e293b;
}

.btn-reset:disabled { opacity: 0.5; cursor: not-allowed; }

/* Table Styling */
.schedule-card {
  background: white;
  border-radius: 24px;
  border: 1px solid #e2e8f0;
  overflow: hidden;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.05);
}

.schedule-table {
  width: 100%;
  border-collapse: collapse;
}

.schedule-table th {
  background: #f8fafc;
  padding: 1.25rem 1.5rem;
  text-align: left;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #64748b;
  border-bottom: 1px solid #e2e8f0;
}

.schedule-row {
  transition: background 0.2s;
}

.schedule-row:hover { background: #f8fafc; }

.schedule-row td {
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #f1f5f9;
}

/* Date Block */
.date-block {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.calendar-icon {
  width: 48px;
  height: 52px;
  background: #f1f5f9;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid #e2e8f0;
  flex-shrink: 0;
}

.calendar-icon.weekend { background: #fff1f2; border-color: #fecaca; }
.calendar-icon.weekend .month-short { background: #ef4444; }

.month-short {
  font-size: 0.625rem;
  font-weight: 800;
  background: #475569;
  color: white;
  padding: 2px 0;
  text-align: center;
}

.day-num {
  font-size: 1.25rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  color: #1e293b;
}

.date-text { display: flex; flex-direction: column; }
.full-date { font-weight: 600; color: #1e293b; font-size: 0.9375rem; }
.weekday { font-size: 0.8125rem; color: #64748b; }

/* Member Info */
.member-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.avatar-mini {
  width: 32px;
  height: 32px;
  background: #eff6ff;
  color: #3b82f6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.75rem;
  border: 1px solid #dbeafe;
}

.member-name { font-weight: 700; color: #334155; }

/* Status Badges */
.badge-status {
  padding: 0.375rem 0.75rem;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.badge-status.today { background: #dbeafe; color: #1d4ed8; }
.badge-status.past { background: #f1f5f9; color: #64748b; }
.badge-status.upcoming { background: #dcfce7; color: #15803d; }

.pulse-dot {
  width: 6px;
  height: 6px;
  background: #1d4ed8;
  border-radius: 50%;
  animation: pulse-dot 1.5s infinite;
}

@keyframes pulse-dot {
  0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(29, 78, 216, 0.7); }
  70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(29, 78, 216, 0); }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(29, 78, 216, 0); }
}

/* Row States */
.is-today {
  background: #f0f7ff !important;
  border-left: 4px solid #3b82f6;
}

.is-past { 
  opacity: 0.6; 
  filter: grayscale(0.2); 
}

.is-past td {
  text-decoration: line-through;
  color: #94a3b8;
}

.is-past .badge-status {
  text-decoration: none !important;
  display: inline-flex;
}

/* Empty State */
.empty-state { padding: 4rem 0 !important; }
.empty-msg {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.empty-msg p { color: #64748b; font-weight: 500; margin: 0; }
.text-btn {
  background: none;
  border: none;
  color: #3b82f6;
  font-weight: 700;
  cursor: pointer;
  padding: 0;
  text-decoration: underline;
}

/* Animations */
.animate-slide-down { animation: slideDown 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
.animate-fade-in { animation: fadeIn 0.8s ease; }
.animate-fade-in-up { animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1); }

@keyframes slideDown { from { transform: translateY(-20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes fadeInUp { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

@media (max-width: 768px) {
  .schedule-header { flex-direction: column; align-items: flex-start; gap: 1.5rem; }
  .header-stats { width: 100%; justify-content: space-around; }
}
</style>
```

---

## 📊 3. Data Structure (`roaster.json`)

The component expects a JSON array at `src/assets/roaster.json`.

**Sample Format:**
```json
[
  {
    "date": "2026-04-12",
    "day": "Sunday",
    "name": "Partho"
  },
  {
    "date": "2026-04-13",
    "day": "Monday",
    "name": "John Doe"
  }
]
```

---

## ⚙️ 4. Data Generation Script (Excel to JSON)

Use this Node.js script to convert your `RoasterList.xlsx` into the required `roaster.json` format.

**Prerequisites:** `npm install xlsx`

**Command:**
```bash
node -e "const XLSX = require('xlsx'); const fs = require('fs'); try { const workbook = XLSX.readFile('RoasterList.xlsx'); const sheet = workbook.Sheets[workbook.SheetNames[0]]; const data = XLSX.utils.sheet_to_json(sheet); const formattedData = data.map(row => { let date = row.Date; if (typeof date === 'number') { date = new Date(Math.round((date - 25569) * 86400 * 1000)).toISOString().split('T')[0]; } return { date, day: row.DayH, name: row.Name }; }); fs.writeFileSync('frontend/src/assets/roaster.json', JSON.stringify(formattedData, null, 2)); console.log('Successfully updated roaster.json!'); } catch (err) { console.error('Error:', err.message); }"
```

*Note: Adjust paths (`RoasterList.xlsx` and `roaster.json`) according to your new project structure.*

---

## 🛣️ 5. Routing Configuration

Add this to your `router/index.ts`:

```typescript
{
  path: '/roaster-schedule',
  name: 'roaster-schedule',
  component: () => import('../views/AmiRoasterScheduleView.vue'),
  meta: { requiresAuth: true }
}
```

---

## 💎 6. Design Principles & CSS Techniques

### **A. Glassmorphism**
The filters use a semi-transparent white background with a blur effect:
```css
background: rgba(255, 255, 255, 0.8);
backdrop-filter: blur(12px);
```

### **B. "Active Now" Pulse**
The pulse effect for today's duty is achieved via keyframe animations:
```css
@keyframes pulse-dot {
  0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(29, 78, 216, 0.7); }
  70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(29, 78, 216, 0); }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(29, 78, 216, 0); }
}
```

### **C. Past State Dimming**
Completed duties are de-emphasized using opacity and grayscale:
```css
.is-past { 
  opacity: 0.6; 
  filter: grayscale(0.2); 
}
```

---

## 📦 7. Dependencies Checklist
*   **Vue 3** (Composition API)
*   **TypeScript** (Optional, but recommended)
*   **Google Fonts:** Plus Jakarta Sans
*   **xlsx** (For the conversion script)
*   **Tailwind CSS** (Optional, the component uses custom CSS but layout benefits from a reset)
