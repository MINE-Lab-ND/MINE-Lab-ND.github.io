---
title: "News"
layout: textlay
excerpt: "MINE Lab@ND"
sitemap: false
permalink: /allnews.html
---

# News

{% for article in site.data.news %}
<p>{{ article.date }} <br> {{ article.headline }}</p>
{% endfor %}
