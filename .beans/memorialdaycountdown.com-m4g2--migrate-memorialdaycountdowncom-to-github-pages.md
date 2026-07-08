---
# memorialdaycountdown.com-m4g2
title: Migrate memorialdaycountdown.com to GitHub Pages
status: completed
type: task
priority: normal
created_at: 2026-07-08T00:10:48Z
updated_at: 2026-07-08T00:37:43Z
---

Move hosting from S3/CloudFront (Route 53) to GitHub Pages, mirroring pandajamfromhamsterdam.com.

- [x] Add CNAME file (memorialdaycountdown.com), push to main
- [x] Enable GitHub Pages (source main/root)
- [x] Point apex A records to GitHub Pages IPs
- [x] Point www to CNAME andybp85.github.io
- [x] Set custom domain + verify
- [x] Enable HTTPS enforcement

## Summary of Changes
Migrated memorialdaycountdown.com from S3/CloudFront (Route 53 aliases) to GitHub Pages, mirroring pandajamfromhamsterdam.com.
- Added CNAME file, enabled Pages (main/root)
- Route 53: apex A -> GitHub Pages IPs (185.199.108-111.153); www A(CloudFront alias) -> CNAME andybp85.github.io
- Let s Encrypt cert approved (apex+www), HTTPS enforced
- Old S3 bucket / CloudFront dist d2z7u22pp6uazk left orphaned (safe rollback); stale ACM-validation CNAME left in zone
