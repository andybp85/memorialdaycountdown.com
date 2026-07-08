---
# memorialdaycountdown.com-m4g2
title: Migrate memorialdaycountdown.com to GitHub Pages
status: in-progress
type: task
priority: normal
created_at: 2026-07-08T00:10:48Z
updated_at: 2026-07-08T00:12:11Z
---

Move hosting from S3/CloudFront (Route 53) to GitHub Pages, mirroring pandajamfromhamsterdam.com.

- [x] Add CNAME file (memorialdaycountdown.com), push to main
- [x] Enable GitHub Pages (source main/root)
- [x] Point apex A records to GitHub Pages IPs
- [x] Point www to CNAME andybp85.github.io
- [x] Set custom domain + verify
- [ ] Enable HTTPS enforcement
