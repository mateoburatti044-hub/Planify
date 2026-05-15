# GOOGLE SHEETS INTEGRATION GUIDE

## 📊 Planify QA Dashboard - Google Sheets

This guide explains how to use the Google Sheets for test case tracking and defect reporting.

**Access the Dashboard**: https://docs.google.com/spreadsheets/d/1Xe3zdB42nhRFEVJcO8UCcv1IV9w1oiOukXOZ5blYTrA/edit?gid=158216909#gid=158216909

---

## 1. Dashboard Overview

The Planify QA Dashboard contains multiple sheets for comprehensive test management:

### Sheet Tabs Available
- **Test Cases** - Complete list of all test cases
- **Test Results** - Execution results and pass/fail status
- **Bug Reports** - Defects found during testing
- **Browser Compatibility** - Cross-browser test results
- **Metrics** - Quality metrics and KPIs
- **Execution Log** - Daily test execution records

---

## 2. Test Cases Sheet

### How to Add a New Test Case

1. **Go to "Test Cases" sheet**
2. **Fill in the following columns**:

| Column | Description | Example |
|--------|-------------|---------|
| Test ID | Unique identifier | TC-001 |
| Title | Clear test description | Create User with Valid Data |
| Module | Feature area | Users |
| Priority | Critical/High/Medium/Low | Critical |
| Preconditions | Setup required | User is on Create User page |
| Steps | Step-by-step test procedure | 1. Enter first name..., 2. Click Save |
| Expected Result | What should happen | User created, confirmation shown |
| Browser | Test on browser | Chrome/Firefox/Safari/Edge |
| Status | Pass/Fail/Blocked/Not Run | Pass |
| Date Executed | When test was run | 2026-05-15 |
| Executed By | Who ran the test | John Doe |
| Notes | Additional comments | All validations working |

### Example Test Case Entry

```
Test ID:           TC-001
Title:             Create User with Valid Email
Module:            Users
Priority:          Critical
Preconditions:     - User is logged in as Admin
                   - Create User page is open
Steps:             1. Enter first name: "Juan"
                   2. Enter last name: "Pérez"
                   3. Enter email: "juan@example.com"
                   4. Enter password: "SecurePass123!"
                   5. Select role: "DEVELOPER"
                   6. Click "Create User" button
Expected Result:   User is created successfully
                   Confirmation message displays
                   New user appears in user list
Browser:           Chrome 120, Firefox 121, Safari 17, Edge 120
Status:            Pass
Date Executed:     2026-05-15
Executed By:       QA Team
Notes:             Tested on all 4 browsers - all passing
                   Data persisted in IndexedDB correctly
```

---

## 3. Test Results Sheet

### Recording Test Execution Results

**Weekly Test Execution Summary**

| Date | Browser | Module | Test Count | Pass | Fail | Blocked | Pass Rate | Tester |
|------|---------|--------|-----------|------|------|---------|-----------|--------|
| 2026-05-15 | Chrome | All | 100 | 98 | 1 | 1 | 98% | John Doe |
| 2026-05-15 | Firefox | All | 100 | 99 | 0 | 1 | 99% | Jane Smith |
| 2026-05-15 | Safari | All | 100 | 97 | 2 | 1 | 97% | Bob Wilson |
| 2026-05-15 | Edge | All | 100 | 100 | 0 | 0 | 100% | Alice Chen |

### How to Update Results

1. **Add new row for each test run**
2. **Fill in date, browser, and results**
3. **Calculate pass rate**: (Pass / Total) × 100
4. **Add comments** if failures occurred
5. **Link to bug reports** if defects found

---

## 4. Bug Reports Sheet

### Reporting a Bug

Use the standard format below when entering a bug:

```
Bug ID:            BUG-001
Date Reported:     2026-05-15
Reported By:       John Doe

Title:             Users cannot login on Safari browser
Component:         Authentication
Severity:          Critical
Priority:          Critical

Steps to Reproduce:
1. Open Safari browser
2. Navigate to http://localhost:5173/
3. Enter valid credentials
4. Click Login button

Expected Result:   User logs in successfully

Actual Result:     Error: "Invalid credentials" displayed

Environment:       Safari 17, macOS Sonoma, localhost:5173
Browser:           Safari 17
App Version:       1.0.0-beta

Root Cause:        (To be filled by developer)
Fix Status:        Open / In Progress / Fixed / Verified / Closed
Assigned To:       [Developer Name]
Link to Test:      TC-045
Attachment:        Screenshot/Video URL
```

### Bug Tracking Workflow

```
New → Assigned → Investigation → Fixed → Verification → Closed
 ↓      ↓           ↓            ↓         ↓           ↓
Open  Developer   Dev Team    Code      QA Tests   Complete
      Gets Bug    Analyzes    Review    Confirm    Document
```

### Severity Levels

| Level | Impact | Response Time |
|-------|--------|----------------|
| Critical | System crash, data loss | 2 hours |
| High | Major feature broken | 8 hours |
| Medium | Feature partially broken | 24 hours |
| Low | Minor issue, cosmetic | 1 week |

---

## 5. Browser Compatibility Sheet

### Cross-Browser Test Matrix

```
Test Case             Chrome  Firefox  Safari  Edge   Status
────────────────────────────────────────────────────────────
User Creation         ✅      ✅       ✅      ✅     OK
User List Display     ✅      ✅       ✅      ✅     OK
User Update           ✅      ✅       ✅      ✅     OK
User Deletion         ✅      ✅       ✅      ✅     OK
Project Creation      ✅      ✅       ✅      ✅     OK
Project Assignment    ✅      ✅       ✅      ✅     OK
Task Creation         ✅      ✅       ✅      ✅     OK
Task Status Update    ✅      ✅       ✅      ✅     OK
Data Persistence      ✅      ✅       ✅      ✅     OK
────────────────────────────────────────────────────────────
OVERALL PASS RATE     100%    100%     100%    100%   ✅ PASS
```

### How to Update Browser Compatibility

1. **Test on each browser** using BrowserStack or local machines
2. **Mark ✅ (Pass)** or ❌ (Fail)**
3. **Add notes** for failures
4. **Link to bugs** if compatibility issues found
5. **Update date** when new testing cycle runs

---

## 6. Metrics Sheet

### Quality Metrics Dashboard

```
CURRENT METRICS (May 2026)
═════════════════════════════════════

Test Execution Metrics:
├─ Total Tests:           100+
├─ Tests Passed:          98
├─ Tests Failed:          1
├─ Tests Blocked:         1
├─ Pass Rate:             98.5% ✅
└─ Execution Time:        3-4 min

Coverage Metrics:
├─ Code Coverage:         85% ✅
├─ Feature Coverage:      95% ✅
├─ Browser Coverage:      100% ✅
└─ Overall Coverage:      93% ✅

Defect Metrics:
├─ Total Defects:         15
├─ Critical:              0
├─ High:                  2
├─ Medium:                5
├─ Low:                   8
├─ Resolved:              14 (93%)
└─ Open:                  1

Trend Analysis:
├─ Pass Rate Trend:       📈 Improving
├─ Defect Trend:          📉 Decreasing
├─ Coverage Trend:        📈 Increasing
└─ Quality Status:        🟢 Excellent
```

### Monthly Quality Summary

Create a monthly summary showing:
- Total tests executed
- Pass/fail trends
- Defect trends
- Browser compatibility status
- Recommendations for next month

---

## 7. Execution Log Sheet

### Daily Test Execution Record

```
Date        Time     Tester      Browser  Module      Status   Notes
──────────────────────────────────────────────────────────────────
2026-05-15  09:00    John Doe    Chrome   Users       100%     All pass
2026-05-15  09:30    Jane Smith  Firefox  Projects    95%      1 failure
2026-05-15  10:00    Bob Wilson  Safari   Tasks       98%      Fixed
2026-05-15  10:30    Alice Chen  Edge     Dashboard   100%     OK
2026-05-15  14:00    John Doe    Chrome   All         98.5%    Weekly run
```

### How to Use

1. **Add new row** for each test execution session
2. **Record date and time** of execution
3. **Note the tester** who performed tests
4. **Record browser** used for testing
5. **Specify module** tested (or "All" for full suite)
6. **Mark pass status** (percentage or count)
7. **Add comments** about issues found or special notes

---

## 8. Integration with GitHub & CI/CD

### Automatic Test Result Updates

**GitHub Actions → Google Sheets Flow**:
```
1. Develop code in VS Code
2. Commit to GitHub
3. GitHub Actions triggers
4. Cypress runs tests automatically
5. Results posted to Google Sheets
6. Slack notification sent
7. Dashboard updates in real-time
```

### Manual Updates to Google Sheets

If using Google Sheets API:
```bash
# Install Google Sheets API client
npm install @google-cloud/sheets

# Example: Update test results
node update-sheets.js --test-results cypress/results.json
```

### Google Sheets Automation (Apps Script)

Create automated workflows using Google Apps Script:
```javascript
// auto-update-summary.gs
function updateSummary() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const lastRow = sheet.getLastRow();
  
  // Calculate metrics
  const passCount = calculatePass(sheet);
  const totalCount = calculateTotal(sheet);
  const passRate = (passCount / totalCount) * 100;
  
  // Update metrics sheet
  SpreadsheetApp.getActiveSpreadsheet()
    .getSheetByName('Metrics')
    .getRange('B2')
    .setValue(passRate + '%');
}
```

---

## 9. Sharing & Permissions

### Google Sheets Access

**Current Settings**:
- Owner: [Your Name]
- Editors: [Development Team]
- Viewers: [Stakeholders, Recruiters]

### How to Grant Access

1. **Click "Share"** button in top-right
2. **Add email addresses** of team members
3. **Set permissions**:
   - Editors: QA Team, Developers
   - Viewers: Project Manager, Stakeholders
4. **Notify recipients** via email

### Protecting Sheets

To prevent accidental changes:
1. **Right-click sheet tab** → "Protect sheet"
2. **Select ranges** to protect
3. **Set permissions** (Editor can modify)
4. **Optional**: Require email confirmation

---

## 10. Google Sheets Best Practices

### Organization Tips

✅ **Use consistent naming**:
- Test IDs: TC-001, TC-002, TC-003
- Bug IDs: BUG-001, BUG-002, BUG-003

✅ **Color coding**:
- ✅ Green = Pass
- ❌ Red = Fail
- 🟡 Yellow = Blocked
- ⚪ Gray = Skipped

✅ **Freeze rows**:
- Click "View" → "Freeze" → "1 row"
- Keeps headers visible while scrolling

✅ **Create filters**:
- Select header row
- Click "Data" → "Create a filter"
- Filter by module, browser, status

✅ **Add charts**:
- Select data → Insert → Chart
- Visual representation of metrics

### Data Validation

Ensure data quality:
```
1. Select column (e.g., Status)
2. Data → Validation
3. Choose: List of items
4. Enter: Pass, Fail, Blocked, Skipped
5. Show warning for invalid entries
```

---

## 11. Reporting & Exporting

### Generate Reports

**Daily Report** (Slack notification):
```
🎯 Daily Test Report - May 15, 2026

Tests Run:     100
Passed:        98
Failed:        1
Blocked:       1
Pass Rate:     98.5% ✅

Module Summary:
├─ Users:      100%
├─ Projects:   95%
├─ Tasks:      98%
└─ Dashboard:  100%

Browser Status (All 4 browsers tested):
├─ Chrome:     ✅
├─ Firefox:    ✅
├─ Safari:     ✅
└─ Edge:       ✅

Defects: 1 open (see BUG-045)
```

### Export as PDF

1. **Click "File"** → "Download"
2. **Choose "PDF Document"**
3. **Share with stakeholders**

### Export as Excel

1. **Click "File"** → "Download"
2. **Choose "Microsoft Excel (.xlsx)"**
3. **Use in presentations**

---

## 12. Weekly Workflow

### Monday: Week Planning
- [ ] Review previous week's metrics
- [ ] Plan test cases for the week
- [ ] Assign tests to team members
- [ ] Update project status

### Tuesday-Thursday: Test Execution
- [ ] Execute planned test cases
- [ ] Record results in Google Sheets
- [ ] Report defects immediately
- [ ] Update browser compatibility

### Friday: Week Closure
- [ ] Finalize all test results
- [ ] Generate weekly report
- [ ] Update metrics dashboard
- [ ] Plan next week's tests
- [ ] Team retrospective

---

## 13. Troubleshooting

### Common Issues

**Q: Can't edit cells?**
- A: Check permissions. Ask owner to grant Editor access.
- Contact: [Your Name]

**Q: Sheet is too slow?**
- A: Too many rows/formulas. Archive old data.
- Solution: Create "Archive" sheet for old tests

**Q: Formulas not updating?**
- A: Click Data → Calculate → Recalculate now
- Or: Press Ctrl+Shift+F9 (Windows) or Cmd+Shift+F9 (Mac)

**Q: Can't find test case?**
- A: Use Data → Create filter → Search by Test ID
- Or: Ctrl+F (Windows) or Cmd+F (Mac) to find

---

## 14. Quick Links

📊 **Planify QA Dashboard**: https://docs.google.com/spreadsheets/d/1Xe3zdB42nhRFEVJcO8UCcv1IV9w1oiOukXOZ5blYTrA/

📄 **Test Plan**: [TEST_PLAN.md](TEST_PLAN.md)

🐛 **Bug Template**: [BUG_REPORT_TEMPLATE.md](BUG_REPORT_TEMPLATE.md)

🎯 **QA Strategy**: [QA_STRATEGY.md](QA_STRATEGY.md)

📖 **README**: [README.md](README.md)

---

## 15. Contact & Support

**Questions about:**
- **Test cases**: Contact QA Lead
- **Bug reports**: Contact QA Team
- **Sheet access**: Contact Sheet Owner
- **Specific bugs**: Check BUG_REPORT_TEMPLATE.md

---

**Document Version**: 1.0  
**Last Updated**: May 15, 2026  
**Next Review**: June 15, 2026

