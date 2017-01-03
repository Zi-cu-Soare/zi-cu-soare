---
layout: page
title:  "Detalii postare"
teaser: "Cum se scrie o postare"
permalink: /detalii_postare/
sitemap: false
---
{:.ui.dividing.header}
# Cum se scrie un articol pe Zi-cu-Soare


{:.ui.violet.dividing.header}
## Numele unui articol

O postare e doar un fisier simplu, dar care trebuie sa respecte un **format foarte strict**.

Articolul trebuie sa inceapa cu data, urmat de titlu, urmat de extensia "**.md**".

Separarea cuvintelor se poate face **doar cu liniute** si textul poate contine doar caractere
latine, niciodata [ă, î, ș, ț].

Exemple:

```
2016-03-31-ziua-lui-rares.md
2016-12-31-este-revelion.md
```

Fisierul se poate redenumi (de ex. pentru a modifica data), dar in acest caz
link-urile catre articol se vor strica si oricine a share-uit articolul pe Facebook sau Twitter
nu il mai poate accesa.

Deci cel mai bine, odata ce a fost postat un articol, **sa nu se mai redenumeasca**.


{:.ui.violet.dividing.header}
## META info

Detaliile META ale articolului sunt absolut vitale pentru identificarea continutului dupa tip si tag-uri.

Un articol poate fi intr-una, sau mai multe categorii, dar cel mai bine **doar una**.

Lista de categorii valide:
- bucatarie = Mami găteșteee
- montessori = Montessori acasă
- pasiuni = Pasiunile mele
- timp_liber = Timp liber
- vacanta = În vacanță

Tag-urile pot fi oricat de multe si se separa cu spatiu. Pot fi folosite orice cuvinte.

Tag-urile se folosesc pentru cautarea articolelor.

Exemple:

```
---
title:  "Un titlu smecher"
teaser: "Acesta este un titlu smecher. Mi-a luat mult sa-l scriu."
categories: bucatarie
tags: blog content post
---
```

Alte meta-uri folositoare:
- **image**: numele unei imagini deja incarcate pe blog (ex: bridge-sun.jpg); aceasta imagine va fi pusa ca background al titlului;
- **head_color**: culoarea titlului (ex: red, orange, yellow, olive, green, teal, blue, purple, violet, pink, brown, grey); are sens mai mult atunci cand se folosesc imagini de background;
- **image_left**: numele unei imagini care sa fie pusa in stanga textului (ex: poza_about.jpg);


{:.ui.violet.dividing.header}
## Titluri

{% include grid2 left='# Un titlu mare' right='`# Un titlu mare`' %}

{% include grid2 left='## Titlu mediu' right='`## Titlu mediu`' %}

{% include grid2 left='### Titlu mic' right='`### Titlu mic`' %}

{% include grid2 left='#### Titlu micr' right='`#### Titlu micro`' %}

<br />

{:.ui.violet.dividing.header}
## Formatare text

{% include grid2 left='**Bold**, *Italic*, _Subliniat_' right='`**Bold**, *Italic*, _Subliniat_`' %}

<div class="ui grid" markdown="1">
<div class="four wide column" markdown="1">
O lista simpla:
- prima chestie
- a doua chestie
- a treia
- ultima
</div>

<div class="eight wide column" markdown="1">
```
O lista simpla:
- prima chestie
- a doua chestie
- a treia
- ultima
```
</div>
</div>

<div class="ui grid" markdown="1">
<div class="four wide column" markdown="1">
O lista numerotata:
1. prima chestie
1. a doua chestie
1. a treia
1. ultima
</div>

<div class="eight wide column" markdown="1">
```
O lista numerotata:
1. prima chestie
1. a doua chestie
1. a treia
1. ultima
```
</div>
</div>

{:.ui.violet.dividing.header}
## Emoticoane Emoji

#### Cateva exemple mai interesante;

{% include grid2 left=':smile: :blush: :grinning: :rage:' right='`:smile: :blush: :grinning: :rage:`' %}

{% include grid2 left=':baby: :man: :woman:' right='`:baby: :man: :woman:`' %}

{% include grid2 left=':scream: :imp: :ghost: :alien: :skull:' right='`:scream: :imp: :ghost: :alien: :skull:`' %}

{% include grid2 left=':heart: :green_heart: :blue_heart: :star: :sparkles:' right='`:heart: :green_heart: :blue_heart: :star: :sparkles:`' %}

{% include grid2 left=':musical_note: :notes: :musical_score: :violin: :guitar: :musical_keyboard:' right='`:musical_note: :notes: :musical_score: :violin: :guitar: :musical_keyboard:`' %}

{% include grid2 left=':four_leaf_clover: :mushroom: :sunflower: :rose:' right='`:four_leaf_clover: :mushroom: :sunflower: :rose:`' %}

{% include grid2 left=':snowflake: :snowman: :santa: :package: :gift:' right='`:snowflake: :snowman: :santa: :package: :gift:`' %}

#### Lista completa: "[Emoji lists](http://emoji-cheat-sheet.com/)".


{:.ui.violet.dividing.header}
## Inserare video


{:.ui.violet.dividing.header}
## Inserare imagini

Cele mai interesante imagini CC0-license le gasesti pe:

- https://unsplash.com/collections (probabil cea mai mare colectie de poze)
- http://foodshot.co (specializati pe mancare)
- http://creativevix.com/stock (multe poze in Romania)
- https://bossfight.co
- http://cc0.photo
- https://www.splitshire.com/topbestphotos
- https://pixabay.com/en/editors_choice
- http://www.photocrops.com/photos/
- http://minimography.com
- http://epicantus.tumblr.com (inspiratie excelenta pentru fotografie)

Sunt mai multe feluri in care pot fi inserate poze in post-uri.


{:.ui.violet.dividing.header}
## Chestii avansate

{% include alert positive='Show a positive *information*.' %}

{% include alert info='Show an info alert with *outstanding* info.' %}

{% include alert warning='Oh man, this is not looking good at all...' %}

{% include alert error='Damn !This was a big error !' %}

Alert-urile se fac cu:

```
{ % include alert positive='Positive info.' %}
{ % include alert info='General info.' %}
{ % include alert warning='A warning.' %}
{ % include alert error='An error.' %}
```

Pentru [Stilizare Markdown Avansata](http://digitaldrummerj.me/styling-jekyll-markdown/).
