# BUG REPORT TEMPLATE

Use this template for reporting bugs and defects found during testing. Submit all bug reports through the Google Sheets QA Dashboard.

---

## Bug Report Header

**Report ID**: `BUG-###` (Auto-assigned)  
**Date Reported**: `YYYY-MM-DD`  
**Reported By**: [Your Name]  
**Project**: Planify Project Management System  
**Version**: [App Version]  

---

## 1. General Information

### 1.1 Bug Title
*Provide a clear, concise title describing the issue*

**Title**: [One-line summary of the bug]

### 1.2 Priority & Severity

**Priority**:  
- [ ] Critical (Blocks release)
- [ ] High (Significant impact)
- [ ] Medium (Moderate impact)
- [ ] Low (Minor impact)

**Severity**:  
- [ ] Critical (System crash, data loss, security)
- [ ] High (Major feature broken)
- [ ] Medium (Feature partially broken)
- [ ] Low (Cosmetic or minor issue)

**Assigned To**: [Developer Name]  
**Component**: 
- [ ] User Management
- [ ] Project Management
- [ ] Task Management
- [ ] Dashboard
- [ ] Authentication
- [ ] UI/UX
- [ ] Other: ___________

---

## 2. Environment Information

### 2.1 Test Environment
- **Browser**: [Chrome/Firefox/Safari/Edge] Version: ____
- **OS**: [Windows/macOS/Linux] Version: ____
- **Device**: [Desktop/Tablet/Mobile]
- **Screen Resolution**: [e.g., 1920x1080]
- **Network**: [LAN/WiFi/VPN]

### 2.2 Application Details
- **Application URL**: `http://localhost:5173/`
- **App Version**: [e.g., 1.0.0-beta]
- **Build Date**: [YYYY-MM-DD]
- **Database**: IndexedDB

### 2.3 Testing Tool
- **Automation Tool**: Cypress / Manual Testing
- **Test Case ID**: [If automated, reference the test]
- **Test Environment**: Development / Staging / Production

---

## 3. Issue Description

### 3.1 Summary
*Provide a detailed description of the bug*

[Write a clear description of what the bug is]

### 3.2 Steps to Reproduce

**Preconditions**:
- [ ] User is logged in as: [Role/Type]
- [ ] Precondition 1: ___________
- [ ] Precondition 2: ___________

**Steps**:
1. [Step 1]
2. [Step 2]
3. [Step 3]
4. [Continue as needed]

**Expected Result**:
[What should happen according to requirements]

**Actual Result**:
[What actually happened instead]

---

## 4. Evidence & Documentation

### 4.1 Screenshots
- [ ] Screenshot attached (Show the error/issue)
- [ ] Screenshot added to: [File path]

**Screenshot 1**: 
```
[Describe screenshot - paste image or link]
```

**Screenshot 2**:
```
[If multiple screenshots, describe each]
```

### 4.2 Video Recording
- [ ] Screen recording attached
- [ ] Video location: [Path or link]
- [ ] Duration: [MM:SS]

**Video Description**: 
[Brief description of what the video shows]

### 4.3 Logs & Data
- [ ] Browser Console Logs: 
```
[Paste relevant console errors]
```

- [ ] Network Tab Errors:
```
[Paste network failures if applicable]
```

- [ ] Application Logs:
```
[Paste app-level error logs]
```

### 4.4 Test Case (If Automated)
```javascript
// Reference the failing test
// File: cypress/e2e/Pruebas-Planify/Pruebas Planify.cy.js
// Test: it("should [description]", () => {
//   ...
// });
```

---

## 5. Bug Classification

### 5.1 Bug Type
- [ ] Functional Bug (Feature doesn't work as specified)
- [ ] Performance Bug (Slow response/timeout)
- [ ] UI Bug (Visual/layout issue)
- [ ] Data Bug (Data corruption/loss)
- [ ] Security Bug (Unauthorized access/data leak)
- [ ] Compatibility Bug (Cross-browser issue)
- [ ] Regression (Previously working, now broken)
- [ ] Other: ___________

### 5.2 Affected Modules
- [ ] User Management
- [ ] Project Management
- [ ] Task Management
- [ ] Dashboard
- [ ] Reports
- [ ] Settings

### 5.3 Reproducibility
- [ ] Always reproducible (100%)
- [ ] Often reproducible (75-99%)
- [ ] Sometimes reproducible (25-74%)
- [ ] Rarely reproducible (<25%)
- [ ] Cannot reproduce

---

## 6. Root Cause Analysis (After Investigation)

### 6.1 Root Cause
*To be filled after developer investigation*

**Identified Root Cause**:
```
[Describe the root cause]
```

**Code Location**:
```
[File path and line numbers]
```

**Related Code**:
```javascript
// Code snippet that causes the bug
```

---

## 7. Resolution & Verification

### 7.1 Fix Details
- **Fix Status**: 
  - [ ] Not Started
  - [ ] In Progress
  - [ ] Fixed
  - [ ] Pending Review
  - [ ] Closed

- **Fixed Version**: [Version number or branch name]
- **Date Fixed**: [YYYY-MM-DD]
- **Fixed By**: [Developer Name]

**Fix Description**:
```
[Describe the changes made to fix the bug]
```

### 7.2 Verification Steps

**Verification Checklist**:
- [ ] Fix deployed to development environment
- [ ] Bug reproduction steps no longer produce error
- [ ] Related test case passes
- [ ] No regressions introduced
- [ ] Performance metrics acceptable
- [ ] Documentation updated (if needed)
- [ ] QA sign-off obtained

**Verification Date**: [YYYY-MM-DD]  
**Verified By**: [QA Engineer Name]

---

## 8. Workaround (If Applicable)

**Temporary Workaround Available**:
- [ ] Yes
- [ ] No

**Workaround Steps**:
```
[If yes, describe steps to work around the issue]
```

**Workaround Limitations**:
```
[Any limitations or side effects of using the workaround]
```

---

## 9. Impact Assessment

### 9.1 Business Impact
- [ ] Blocks critical workflows
- [ ] Affects multiple users
- [ ] Data integrity issue
- [ ] Security concern
- [ ] User experience degraded

**Impact Description**:
```
[Describe business impact]
```

### 9.2 Technical Impact
- [ ] Affects other modules
- [ ] Database corruption risk
- [ ] Performance impact
- [ ] Security vulnerability
- [ ] Scalability concern

**Technical Impact**:
```
[Describe technical implications]
```

---

## 10. Release Notes

### 10.1 Release Information
- **Target Release**: [Version]
- **Release Date**: [YYYY-MM-DD]
- **Deployed To**: 
  - [ ] Development
  - [ ] Staging
  - [ ] Production

### 10.2 Release Notes Entry
```markdown
**Fixed**: [Description of the fix for release notes]
```

---

## 11. Tracking & Status

### 11.1 Status Timeline

| Status | Date | Owner | Notes |
|--------|------|-------|-------|
| Reported | [YYYY-MM-DD] | [QA Name] | Initial report |
| Assigned | [YYYY-MM-DD] | [Dev Name] | Assigned to developer |
| Fixed | [YYYY-MM-DD] | [Dev Name] | Code fix completed |
| Verified | [YYYY-MM-DD] | [QA Name] | Fix verified |
| Closed | [YYYY-MM-DD] | [QA Lead] | Released |

### 11.2 Linked Issues
- Related Bug: [BUG-XXX](link)
- Related Feature: [FEATURE-XXX](link)
- Related Test Case: [TC-XXX](link)

---

## 12. Comments & Discussion

### 12.1 Developer Comments
```
[Developer can add investigation notes here]
```

### 12.2 QA Comments
```
[QA can add verification notes here]
```

### 12.3 Product Owner Comments
```
[Product owner can add business context here]
```

---

## 13. Attachments

### 13.1 File Attachments
- [ ] Screenshot: `bug-screenshot-01.png`
- [ ] Video: `bug-recording-01.mp4`
- [ ] Log File: `error-log.txt`
- [ ] Code Diff: `fix.patch`
- [ ] Other: ___________

### 13.2 Related Documents
- Test Plan: [TEST_PLAN.md](TEST_PLAN.md)
- QA Strategy: [QA_STRATEGY.md](QA_STRATEGY.md)
- Google Sheets: [Planify QA Dashboard](https://docs.google.com/spreadsheets/d/1Xe3zdB42nhRFEVJcO8UCcv1IV9w1oiOukXOZ5blYTrA)

---

## 14. Sign-Off

| Role | Name | Date | Signature |
|------|------|------|-----------|
| **Reported By** (QA) | [Name] | [Date] | _________ |
| **Assigned To** (Dev) | [Name] | [Date] | _________ |
| **Reviewed By** (Lead) | [Name] | [Date] | _________ |
| **Closed By** (QA Lead) | [Name] | [Date] | _________ |

---

## 15. Example Bug Report

### Example: Critical Login Issue

**Report ID**: `BUG-001`  
**Date**: `2026-05-15`  
**Reported By**: John Doe  

**Title**: Users cannot login with valid credentials on Safari browser

**Priority**: Critical  
**Severity**: Critical  
**Component**: Authentication  

**Environment**:
- Browser: Safari 16.4
- OS: macOS 13.3
- URL: http://localhost:5173/

**Steps to Reproduce**:
1. Open application in Safari
2. Navigate to login page
3. Enter valid email (test@example.com)
4. Enter valid password (Password123!)
5. Click "Login" button

**Expected**: User logs in successfully and redirected to dashboard

**Actual**: Page shows "Invalid credentials" error despite correct credentials

**Root Cause** (After Fix):
Authentication token not properly set in Safari due to cookie settings. Fixed by using localStorage instead of sessionStorage.

**Status**: Fixed in v1.0.1

---

## 16. Submission Checklist

Before submitting the bug report, verify:

- [ ] Title is clear and descriptive
- [ ] Steps to reproduce are detailed and easy to follow
- [ ] Expected vs. Actual results clearly documented
- [ ] Screenshots/videos attached (if applicable)
- [ ] Priority and Severity assigned correctly
- [ ] Environment information complete
- [ ] No duplicate bug reports exist
- [ ] Report is assigned to correct owner
- [ ] Related test case referenced (if automated)
- [ ] Submitted through Google Sheets QA Dashboard

---

## 17. Support & Contact

**Questions About This Template?**
- QA Lead: [Contact Info]
- Development Team: [Contact Info]
- Project Manager: [Contact Info]

**Report Bug To**: [Google Sheets Link](https://docs.google.com/spreadsheets/d/1Xe3zdB42nhRFEVJcO8UCcv1IV9w1oiOukXOZ5blYTrA)

**Related Documentation**:
- [TEST_PLAN.md](TEST_PLAN.md) - Overall test plan
- [QA_STRATEGY.md](QA_STRATEGY.md) - QA strategy and approach
- [README.md](README.md) - Project overview

---

*Document Version*: 1.0  
*Last Updated*: May 2026  
*Next Review*: June 2026

