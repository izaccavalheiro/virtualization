# Security Policy

## Supported versions

Only the latest published `1.x` release receives security fixes.

| Version | Supported |
| --- | --- |
| latest `1.x` | ✅ |
| older | ❌ |

## Reporting a vulnerability

Please **do not** open a public issue for security problems.

Report privately through [GitHub private vulnerability reporting](https://github.com/izaccavalheiro/virtualization/security/advisories/new), or email izac@izaccavalheiro.com with the subject `[security] simple-virtualization`.

Please include the affected version, a description of the issue, and a minimal reproduction if you can. You can expect an acknowledgement within 7 days. Once a fix is released, the advisory is published with credit to the reporter unless you ask otherwise.

## Scope notes

`Virtualization` renders **string** items as raw HTML (`dangerouslySetInnerHTML`). This is documented behaviour, not a vulnerability: applications must sanitize untrusted strings (for example with DOMPurify) or pass React elements instead. Reports that a consumer can inject HTML by passing unsanitized strings are out of scope.

## Supply chain

Releases are published from GitHub Actions with npm provenance attestations. You can verify a release with:

```bash
npm audit signatures
```
