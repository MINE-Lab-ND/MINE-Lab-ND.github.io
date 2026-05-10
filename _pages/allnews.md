---
title: "News · MINE Lab"
layout: default
excerpt: "All news and announcements from the MINE Lab."
sitemap: false
permalink: /allnews.html
---

<div class="page">

  <section class="home-hero" style="border-bottom: 1px solid var(--rule); margin-bottom: 28px;">
    <div class="hero-main">
      <span class="eyebrow">All updates</span>
      <h1 class="hero-headline">News<em>.</em></h1>
    </div>
    <div class="hero-side">
      <p class="lead">A timeline of paper acceptances, awards, talks, and lab milestones.</p>
    </div>
  </section>

  <section>
    <div class="news-list">
      {% for article in site.data.news %}
      <div class="news-row">
        <span class="news-date">{{ article.date }}</span>
        <div class="news-body">{{ article.headline | markdownify }}</div>
      </div>
      {% endfor %}
    </div>
  </section>

</div>
