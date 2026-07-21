# Handoff: Strona firmowa — firma remontowo‑renowacyjna + laser

## Overview
Jednostronicowa (one‑page) witryna wizytówka dla małej, rodzinnej firmy remontowej, malarskiej,
renowacyjnej i oferującej laserowe czyszczenie/obróbkę drewna. Cele: prezentacja firmy,
katalog usług, portfolio realizacji, budowanie zaufania i generowanie zapytań o wycenę.
Język treści: **polski**. Kod/komponenty/komentarze: angielski.

Główne akcje konwersji (CTA):
- „Poproś o  wycenę" /  "Wycena" → sekcja kontakt
- „Zadzwoń" → `tel:`
- „Zobacz realizacje" → sekcja realizacje
- „Zapytaj o usługę laserową" → kontakt z preselekcją usługi

## About the Design Files
Pliki w tym pakiecie to **referencja projektowa wykonana w HTML** — prototyp pokazujący docelowy
wygląd i zachowanie, **a nie kod produkcyjny do skopiowania 1:1**. Zadaniem jest **odtworzenie tego
designu w docelowym środowisku** (np. Next.js + TypeScript + Tailwind + Framer Motion + lucide‑react,
zgodnie z pierwotnym briefem) z użyciem istniejących wzorców i bibliotek projektu. Jeśli środowisko
jeszcze nie istnieje — wybrać framework (rekomendacja: **Next.js + TS + Tailwind + Framer Motion**)
i zaimplementować tam.

Prototyp został zbudowany jako pojedynczy komponent (framework wewnętrzny oparty o React); w prawdziwym
kodzie należy rozbić go na komponenty (Nav, Hero, Values, Services, Realizacje, Metamorfoza,
BeforeAfter, Gallery, Lightbox, Laser, About, Process, FAQ, Contact, Footer).

## Fidelity
**High‑fidelity (hifi).** Finalne kolory, typografia, odstępy i interakcje. Odtwórz UI wiernie,
korzystając z bibliotek i wzorców docelowego repo. Dane (usługi, galeria, FAQ, kroki procesu,
etapy metamorfozy) trzymaj w tablicach/CMS — w prototypie są to edytowalne tablice.

## Design Tokens

### Kolory (motyw ciemny, ciepły neutralny)
| Rola | Hex |
|------|-----|
| Tło główne | `#1C1A16` |
| Tło sekcji naprzemiennej (services, about, contact) | `#232019` |
| Karty / powierzchnie | `#2A2620` |
| Najciemniejsze (footer, start gradientu laser) | `#141210` |
| Laser — koniec gradientu tła sekcji | `#1E1A14` |
| Laser — tło „ekranu"/wizualizacji | `#15120D` |
| Tekst główny | `#F4F1EA` |
| Tekst drugorzędny | `#E6E2D9` |
| Tekst wyciszony (muted) | `#ABA08D` |
| Tekst przygaszony (dim) | `#8F8574` |
| Akcent — mosiądz/złoto (primary) | `#CBA657` |
| Akcent — baza/ciemniejszy | `#A98A45` |
| Akcent — jasne złoto (gradienty) | `#E2CF95` |
| Laser — cyjan (tylko elementy laserowe) | `#55D9FF` |
| Tekst na przyciskach akcentowych | `#1C1A16` |
| Błąd walidacji | `#ff9a8a` |
| Obramowania | `rgba(244,241,234, 0.05–0.16)` |
| Ciemne nakładki na zdjęcia | `rgba(17,13,9, 0.25–0.9)` |

### Typografia
- **Manrope** (Google Fonts), wagi 300–800 — nagłówki i tekst. Nagłówki 700–800, `letter-spacing:-0.02em`.
- **Space Mono** (Google Fonts), 400/700 — „kickery", etykiety techniczne, PRZED/PO, mierniki lasera,
  `text-transform:uppercase; letter-spacing:0.14–0.3em`.
- Skala nagłówków (clamp, responsywna): H1 `clamp(30px,4.4vw,50px)`, H2 duże `clamp(23px,3.1vw,37px)`,
  H2 średnie `clamp(22px,2.8vw,33px)`, lead/tekst `clamp(14px,1.05vw,16px)`, body 14.5–16px, line-height 1.6–1.75.

### Layout / spacing
- Kontener treści: `max-width:1160px; margin:0 auto`.
- Padding sekcji: pion `clamp(48px,6vw,82px)`, poziom `clamp(20px,5vw,64px)`.
- Siatki responsywne bez media‑queries: `grid-template-columns: repeat(auto-fit, minmax(min(100%, Npx), 1fr))`.
- Border‑radius: karty 14–18px, panel usług 18px, inputy 11px, pill/CTA 999px.
- Cienie: miękkie, np. `0 30px 70px rgba(0,0,0,0.45)` (duże obrazy), `0 14px 32px rgba(203,166,87,0.32)` (hover CTA).
- Breakpoint nawigacji mobilnej: **< 1024px** (poniżej → hamburger; powyżej → pełne menu).

## Screens / Views (sekcje one‑page)

1. **Sticky Nav** — półprzezroczysty pasek `backdrop-filter:blur(14px)`, tło `rgba(24,20,15,0.82)`.
   Logo (kwadrat 34px z gradientem mosiądzu + litera „R") + „[NAZWA FIRMY]". Linki: Strona główna,
   Usługi, Realizacje, Laser, O firmie, Kontakt + CTA  "wycena". Nad paskiem 3px pasek
   postępu scrolla (gradient mosiądz→cyjan). Aktywna sekcja podświetlana (scroll spy).
   < 1024px: hamburger → rozwijane menu (animacja `menuIn`).

2. **Hero** — układ 2‑kolumnowy (auto‑fit, min 400px). Lewa: pill „Dokładność ponad pośpiech",
   kicker „Remonty · Renowacje · Technologia laserowa", H1 „Precyzja w każdym detalu. / Jakość, która
   zostaje na lata." (druga linia gradient mosiądzu), opis, 2 CTA. Prawa: zdjęcie realizacji
   (parallax na scroll), gradientowe nakładki, badge „PO". Subtelne animowane tło: słoje drewna
   (`grainDrift`), unoszące się cząstki (`floatY`), przesuw wiązki cyjan (`heroSweep`).

3. **Values** — 4 karty (auto‑fit min 240px): „Perfekcyjne wykończenie", „Dbałość o każdy detal",
   „Sprawdzone materiały", „Terminowość i odpowiedzialność". Ikona (line SVG, 42px kafel), tytuł, opis.
   Hover: `translateY(-4px)` + obramowanie mosiądz.

4. **Services** (id `uslugi`) — układ 2‑kol: lewy pionowy rail 5 przycisków‑zakładek, prawy panel
   aktywnej kategorii. Kategorie: Malowanie i przygotowanie powierzchni; Podłogi, schody i prace
   demontażowe; Stolarka, sztukateria i wykończenia; **Laserowe czyszczenie i obróbka** (akcent cyjan
   zamiast mosiądzu); Elewacje i termoizolacja. Panel: nazwa, opis, lista pod‑usług (2‑kol z „ptaszkami"),
   CTA „Zapytaj o tę usługę" → **preselekcja tej usługi w formularzu kontaktu** + scroll do kontaktu.

5. **Realizacje** (id `realizacje`) — zawiera 3 bloki:
   - **Featured** — duże zdjęcie (project‑5) + opis realizacji „Drugie życie drewnianych schodów",
     techniki, 3 chipy jakości.
   - **Metamorfoza (pełnoekranowe „kinowe" tło scrollowane)** — patrz sekcja Interactions.
   - **Before/After** — interaktywny suwak porównania (drag mysz/dotyk + klawiatura), etykiety PRZED/PO.
   - **Galeria** — filtrowana siatka (auto‑fill min 250px), chipy filtrów budowane dynamicznie z tagów
     (Wszystkie, Schody, Malowanie, Wnętrza, Podłogi, Stolarka). Klik → **lightbox** (prev/next,
     klawiatura ←/→/Esc, licznik, kategoria, podpis, focus na przycisku zamknięcia).

6. **Laser** (id `laser`) — ciemniejsza, „techniczna" sekcja (gradient `#141210→#1E1A14`, akcenty cyjan).
   Nagłówek „Laser — precyzja nowej generacji", opis, 4 karty korzyści (cyjan), CTA „Zapytaj o usługę
   laserową". Po prawej **animowana wizualizacja lasera zbudowana z CSS** (nie zdjęcie): deska drewniana
   (gradienty), siatka techniczna, linijka/mierniki (Space Mono), szyna + karetka z głowicą jadącą
   `laserTrack`, wiązka cyjan (`beamFlicker`), punkt kontaktu (`glowPulse`), iskry (`particleUp`),
   linia skanująca (`scanY`). Wszystko wyłączane przez `prefers-reduced-motion` i tweak „motion".

7. **About** (id `ofirmie`) — 2‑kol: placeholder portretu/warsztatu (paskowane tło + podpis mono) +
   tekst osobisty, cytat na obramowaniu mosiądzu, chipy wartości, podpis „— [NAZWA FIRMY]".

8. **Process** — pionowa oś czasu 4 kroki (Kontakt i rozmowa → Oględziny i zakres → Wycena i realizacja
   → Odbiór i efekt). Numerowane węzły 44px na linii gradientu, reveal‑on‑scroll ze stagger.

9. **FAQ** — accordion (7 pytań), jeden otwarty naraz, `aria-expanded`, animowany znak +/–.

10. **Contact** (id `kontakt`) — 2‑kol: formularz (imię*, telefon*, e‑mail, miasto, wybór usługi,
    opis*, preferowany kontakt: radio Telefon/E‑mail/WhatsApp, upload zdjęć — symulowany) + kolumna
    kontaktowa (Zadzwoń `tel:`, Napisz `mailto:`, WhatsApp `wa.me`, obszar działania).
    Walidacja po stronie klienta, sukces = baner + **toast** (auto‑hide ~4.2s) + reset formularza.
    Brak backendu — submit symulowany.

11. **Footer** — logo, opis, social (Facebook/Instagram placeholdery), kolumny Nawigacja/Usługi/Kontakt,
    polityka prywatności, copyright. Tło `#141210`.

12. **Sticky mobile CTA** — < 1024px, po przescrollowaniu ~75% hero: pasek dolny „Zadzwoń" +  "wycena".

## Interactions & Behavior
- **Scroll progress bar** (góra, 3px) — szerokość = postęp scrolla całej strony.
- **Scroll spy** — `IntersectionObserver` (rootMargin `-45% 0px -50% 0px`) ustawia aktywną pozycję nav.
- **Reveal on scroll** — elementy `[data-reveal]` startują `opacity:0; translateY(26px)`, po wejściu w
  viewport → `opacity:1; transform:none` (transition 0.7s), z opcjonalnym `data-reveal-delay` (stagger).
  Wyłączone przy `prefers-reduced-motion`.
- **Hero parallax** — subtelny `translateY` obrazu proporcjonalny do scrolla.
- **Metamorfoza — scroll‑scrubbed, pełnoekranowe tło** (kluczowa animacja): sekcja wysoka `320vh` z
  wewnętrznym `position:sticky; top:0; height:100vh` (pełny viewport). Postęp `p = clamp(-rect.top /
  (rect.height - innerHeight), 0..1)`. 3 etapy (PRZED → W TRAKCIE → PO) jako obrazy: dolna warstwa =
  etap bieżący, górna warstwa (następny etap) odsłaniana `clip-path: inset(0 0 (1-t)*100% 0)` w dół,
  a na krawędzi odsłonięcia jedzie **świecąca linia lasera cyjan**. Etykieta etapu i pasek postępu
  aktualizowane per‑klatkę. Wszystko sterowane scrollem (bez wideo), aktualizacja w `requestAnimationFrame`.
  Technika: „pinned/sticky element + scroll progress → frame scrubbing".
- **Before/After slider** — drag (Pointer Events: mysz+dotyk, `touch-action:none`) + klawiatura
  (←/→ ±4, Home/End), `role="slider"` + `aria-valuenow`. Aktualizacja `clip-path` warstwy „przed"
  imperatywnie (bez re‑renderu).
- **Gallery filter + Lightbox** — filtr po tagach; lightbox z prev/next (zawijanie), klawiatura,
  focus management, klik w tło zamyka, `stopPropagation` na treści.
- **Service tab → form preselect** — klik „Zapytaj o tę usługę" ustawia `<select>` na daną usługę i
  scrolluje do kontaktu.
- **Form** — walidacja: imię (wymagane), telefon (wymagane, ≥7 cyfr), opis (wymagane); e‑mail opcjonalny.
  Błędy inline, focus na pierwszym błędnym polu, sukces → toast + reset. Inputy niekontrolowane
  (odczyt przez `FormData`), by uniknąć re‑renderów per‑keystroke.
- **Smooth scroll** — `window.scrollTo` z offsetem nagłówka (~74px); `behavior:'auto'` gdy reduced‑motion.
- **prefers-reduced-motion** — globalny `@media` skraca animacje/transition; JS pomija reveal/parallax.
  Dodatkowo tweak `motion` (bool) wyłącza dekoracyjny ruch przez `[data-motion="off"] *{animation:none}`.

## State Management
Stany (w prototypie w jednej klasie; w produkcji rozbić na komponenty/hooki):
- `activeSection` (scroll spy), `menuOpen` (nav mobilna), `isNarrow` (< 1024px), `stickyCta`.
- `activeService` (0–4), `filter` (galeria), `openFaq` (index | null).
- `lightboxOpen`, `lightboxIndex` (po przefiltrowanej liście).
- Formularz: `errors {}`, `submitted`, `toast` (auto‑timeout).
- Poza React‑state (imperatywnie, dla wydajności/braku re‑renderów): pasek postępu, parallax,
  before/after (`baPos`), scrub metamorfozy (`_sSeg`, clip/scan/progress), src obrazów lightboxa/scrubu.

## Data (do wyniesienia do tablic/CMS)
- **services[]**: `{ id, name, tagline, accent, iconPaths[], desc, items[] }` (5 kategorii).
- **gallery[]**: `{ id, src, tags[], caption }` (9 pozycji). Filtry generowane z tagów.
- **faqs[]**: `{ q, a }` (7).
- **stages[]** (metamorfoza): `{ src, label }` — obecnie PRZED=project‑1, W TRAKCIE=project‑6, PO=project‑2.
  Kolejność i pliki łatwo wymienne.
- **process** (4 kroki), **values** (4), **laser benefits** (4) — w prototypie jako jawny markup.

## Assets
Zdjęcia to **prawdziwe fotografie realizacji** (renowacje schodów + prace malarskie), dostarczone przez
klienta, w `assets/project-1.jpeg` … `project-9.jpeg` (orientacja pionowa 576×1024 / 768×1024, poza
`project-9` poziomym 1024×768). Użycie:
- Hero: project‑2 (domyślnie; tweak pozwala project‑2/5/8)
- Featured: project‑5
- Before/After: PRZED=project‑1, PO=project‑2
- Metamorfoza: project‑1 → project‑6 → project‑2
- Galeria: wszystkie 9 (tagi: Schody, Malowanie, Wnętrza, Podłogi, Stolarka)
- Portret w „O firmie": brak zdjęcia → placeholder (do podmiany)

Ikony: proste line‑SVG (własne, styl lucide). W produkcji można użyć **lucide-react**.
Placeholdery tekstowe do uzupełnienia: `[NAZWA FIRMY]`, `[NUMER TELEFONU]`, `[ADRES E-MAIL]`,
`[MIASTO / REGION]`, `[FACEBOOK]`, `[INSTAGRAM]`.

## Files
- `IMPLEMENTATION_PROMPT.md` — gotowy prompt do wklejenia w Claude Code (stack, tokeny, typy, komponenty, kryteria).
- `Strona firmowa.dc.html` — źródłowy prototyp (referencja: markup + logika + style inline).
- `Strona firmowa (offline).html` — samodzielna wersja offline (wszystkie assety wbudowane) do podglądu w przeglądarce.
- `assets/project-1.jpeg … project-9.jpeg` — zdjęcia realizacji.
- `screenshots/01..09-*.png` — zrzuty ekranu sekcji (referencja wizualna): hero, wartości, usługi, realizacje, metamorfoza, laser, o firmie, kontakt, footer.

> Uwaga: prototyp używa stylów inline i jednego komponentu. W docelowym repo zastosuj system tokenów
> (Tailwind config / CSS variables) z powyższej tabeli kolorów i skali typografii, oraz rozbij na komponenty.
