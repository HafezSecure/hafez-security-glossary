---
en: "Cross-Site Scripting (XSS)"
fa: "اسکریپت‌نویسی میان‌سایتی"
domains: [web, appsec]
status: draft
alternatives:
  - term: "XSS"
    script: latin
    status: accepted
    note: "سرنامِ انگلیسی، در گفت‌وگو پرکاربرد"
  - term: "تزریقِ اسکریپت"
    status: discouraged
    note: "رایج ولی نادقیق"
definition_fa: "آسیب‌پذیری‌ای که به مهاجم اجازه می‌دهد کدِ سمت‌کاربر (معمولاً جاوااسکریپت) را در مرورگرِ کاربرانِ دیگر اجرا کند و از اعتمادِ آنان به یک وب‌گاه سوءاستفاده نماید."
definition_en: "A vulnerability that lets an attacker run client-side code (usually JavaScript) in another user's browser, abusing that user's trust in a site."
example_fa: "با یک آسیب‌پذیریِ اسکریپت‌نویسی میان‌سایتی می‌توان کوکیِ نشستِ کاربر را ربود."
see_also: [sql-injection, payload]
sources:
  - title: "OWASP — Cross Site Scripting"
    url: "https://owasp.org/www-community/attacks/xss/"
added: "2026-11-04"
updated: "2026-11-04"
---
