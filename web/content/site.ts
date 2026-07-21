import {
  BadgeCheck,
  Building2,
  Clock3,
  Crosshair,
  FlaskConical,
  Focus,
  Frame,
  Layers,
  LayoutGrid,
  Paintbrush,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import type {
  CatalogService,
  CompanyInfo,
  Faq,
  StripFrame,
  GalleryItem,
  LaserBenefit,
  NavItem,
  ProcessStep,
  RenovationStory,
  Service,
  ValueCard,
} from "@/types/content";
import project1 from "@/assets/project-1.jpeg";
import project2 from "@/assets/project-2.jpeg";
import project3 from "@/assets/project-3.jpeg";
import project4 from "@/assets/project-4.jpeg";
import project5 from "@/assets/project-5.jpeg";
import project6 from "@/assets/project-6.jpeg";
import project7 from "@/assets/project-7.jpeg";
import project8 from "@/assets/project-8.jpeg";
import project9 from "@/assets/project-9.jpeg";
import siteSanding from "@/assets/site-sanding.jpeg";
import sitePrimer from "@/assets/site-primer.jpeg";
import siteSkimcoat from "@/assets/site-skimcoat.jpeg";
import siteTreadsProtect from "@/assets/site-treads-protect.jpeg";
import siteCoveredStairs from "@/assets/site-covered-stairs.jpeg";
import siteWallpapering from "@/assets/site-wallpapering.jpeg";
import siteFormwork from "@/assets/site-formwork.jpeg";
import siteGranite from "@/assets/site-granite.jpeg";
import stairsOak from "@/assets/stairs-oak.jpeg";
import stairsOakTurn from "@/assets/stairs-oak-turn.jpeg";
import stairsDark from "@/assets/stairs-dark.jpeg";
import stairsDarkRail from "@/assets/stairs-dark-rail.jpeg";
import stairsWhite from "@/assets/stairs-white.jpeg";
import stairsBlueHall from "@/assets/stairs-blue-hall.jpeg";
import stairsPineWhite from "@/assets/stairs-pine-white.jpeg";
import wallpaperFloral from "@/assets/wallpaper-floral.jpeg";

/*
 * Single source of company data. The fallbacks below are MOCK values —
 * swap them for the real ones here (or override via NEXT_PUBLIC_COMPANY_*
 * env vars) before going live.
 */
export const companyInfo: CompanyInfo = {
  name: process.env.NEXT_PUBLIC_COMPANY_NAME ?? "Laser Point",
  phone: process.env.NEXT_PUBLIC_COMPANY_PHONE ?? "+48 512 400 100",
  email: process.env.NEXT_PUBLIC_COMPANY_EMAIL ?? "kontakt@laserpoint.pl",
  region: process.env.NEXT_PUBLIC_COMPANY_REGION ?? "Poznań",
  facebook: process.env.NEXT_PUBLIC_COMPANY_FACEBOOK ?? "#",
  instagram: process.env.NEXT_PUBLIC_COMPANY_INSTAGRAM ?? "#",
};

/** RFC 3966-safe tel: target — display keeps the spaced number. */
export const companyPhoneHref = `tel:${companyInfo.phone.replace(/\s+/g, "")}`;

export const navItems: NavItem[] = [
  { id: "home", label: "Strona główna" },
  { id: "uslugi", label: "Usługi" },
  { id: "realizacje", label: "Realizacje" },
  { id: "laser", label: "Laser" },
  { id: "ofirmie", label: "O firmie" },
  { id: "kontakt", label: "Kontakt" },
];

export const hero = {
  pill: "Dokładność ponad pośpiech",
  kicker: "Remonty · Renowacje · Technologia laserowa",
  //   keeps Polish one-letter words off line ends on narrow screens.
  headline: "Precyzja w każdym detalu.",
  headlineAccent: "Jakość, która zostaje na lata.",
  lead: "Kompleksowe usługi remontowe, malarskie i renowacyjne wykonywane z wyjątkową dokładnością. Tradycyjne rzemiosło połączone z nowoczesną technologią laserową.",
  ctaPrimary: "Poproś o wycenę",
  ctaSecondary: "Zobacz realizacje",
  image: {
    src: project2,
    alt: "Odnowione drewniane schody z białymi podstopnicami i rzeźbioną poręczą po zakończonej renowacji",
  },
  imageKicker: "Realizacja",
  imageTitle: "Renowacja drewnianych schodów",
  imageBadge: "PO",
} as const;

export const values: ValueCard[] = [
  {
    title: "Perfekcyjne wykończenie",
    description:
      "Każda powierzchnia dopracowana tak, by cieszyła oko również z bliska.",
    icon: BadgeCheck,
  },
  {
    title: "Dbałość o każdy detal",
    description: "Detale, których inni nie zauważają, dla nas są punktem wyjścia.",
    icon: Search,
  },
  {
    title: "Sprawdzone materiały",
    description:
      "Pracujemy na materiałach, którym ufamy i które sprawdziły się w praktyce.",
    icon: ShieldCheck,
  },
  {
    title: "Terminowość i odpowiedzialność",
    description:
      "Ustalony termin traktujemy jak zobowiązanie, a Twój dom jak własny.",
    icon: Clock3,
  },
];

export const services: Service[] = [
  {
    id: "malowanie",
    name: "Malowanie i przygotowanie powierzchni",
    tagline: "Ściany, sufity i podłoża",
    description:
      "Gładkie, trwałe powierzchnie zaczynają się od solidnego przygotowania. Zanim położymy pierwszą warstwę farby, dokładnie przygotowujemy i zabezpieczamy podłoże.",
    items: [
      "Szpachlowanie",
      "Wyrównywanie podłoża",
      "Usuwanie starych powłok",
      "Gruntowanie",
      "Zabezpieczanie wnętrz",
      "Malowanie ścian i sufitów",
    ],
    icon: Paintbrush,
    accent: "brass",
  },
  {
    id: "podlogi",
    name: "Podłogi, schody i prace demontażowe",
    tagline: "Panele, wylewki i schody",
    description:
      "Od demontażu starych warstw po precyzyjny montaż nowych — podłogi i schody, które służą przez lata i dobrze się prezentują.",
    items: [
      "Demontaż paneli, podłóg i wykładzin",
      "Wylewki samopoziomujące",
      "Układanie paneli",
      "Montaż podłóg winylowych",
      "Montaż wykładzin dywanowych",
      "Renowacja schodów",
    ],
    icon: Layers,
    accent: "brass",
  },
  {
    id: "stolarka",
    name: "Stolarka, sztukateria i wykończenia",
    tagline: "Drewno, okna i detale",
    description:
      "Renowacja drewna i detali architektonicznych z poszanowaniem oryginalnego charakteru wnętrza i dbałością o każdy profil.",
    items: [
      "Odnawianie okien i drzwi",
      "Renowacja ościeżnic",
      "Renowacja drewnianej sztukaterii",
      "Odnawianie detali architektonicznych",
      "Lakierowanie natryskowe",
    ],
    icon: Frame,
    accent: "brass",
  },
  {
    id: "laser",
    name: "Laserowe czyszczenie i obróbka materiałów",
    tagline: "Czyszczenie i grawerowanie",
    description:
      "Nowoczesna, bezdotykowa technologia do czyszczenia i precyzyjnej obróbki materiałów — dokładnie i bez agresywnej chemii.",
    items: [
      "Bezdotykowe usuwanie rdzy",
      "Usuwanie farb i zabrudzeń",
      "Czyszczenie metalu",
      "Czyszczenie drewna",
      "Czyszczenie kamienia i cegły",
      "Grawerowanie drewna",
      "Cięcie i precyzyjna obróbka drewna",
    ],
    icon: Focus,
    accent: "laser",
  },
  {
    id: "elewacje",
    name: "Elewacje i termoizolacja",
    tagline: "Fasady i ocieplenia",
    description:
      "Kompleksowe prace zewnętrzne — od naprawy i ocieplenia po estetyczne, odporne na warunki wykończenie elewacji.",
    items: [
      "Mycie elewacji",
      "Naprawa pęknięć",
      "Tynkowanie",
      "Malowanie zewnętrzne",
      "Usuwanie graffiti",
      "Powłoki anty-graffiti",
      "Ocieplenia styropianem lub wełną",
      "Siatka, klej i struktura wykończeniowa",
    ],
    icon: Building2,
    accent: "brass",
  },
];

export const serviceCatalogSection = {
  kicker: "Pełna lista",
  title: "Dwanaście usług, jeden wykonawca",
  description:
    "Od przygotowania podłoża po termoizolację — kompletny zakres prac, które wykonujemy własnym zespołem.",
} as const;

export const serviceCatalog: CatalogService[] = [
  {
    name: "Przygotowanie podłoża",
    description:
      "Szpachlowanie, wyrównywanie i usuwanie starych powłok oraz gruntowanie i zabezpieczanie wnętrz.",
    serviceId: "malowanie",
  },
  {
    name: "Czyszczenie laserowe",
    description:
      "Bezdotykowe, ekologiczne usuwanie rdzy, farb i zabrudzeń z metalu, drewna, kamienia i cegły.",
    serviceId: "laser",
  },
  {
    name: "Renowacja sztukaterii",
    description:
      "Precyzyjne oczyszczanie — także laserem — i odnawianie detali architektonicznych oraz gzymsów, również drewnianych.",
    serviceId: "stolarka",
  },
  {
    name: "Lakierowanie natryskowe",
    description:
      "Gładkie, równomierne wykończenie elementów budowlanych i stolarki — efekt natrysku, nie pędzla.",
    serviceId: "stolarka",
  },
  {
    name: "Odnawianie okien i drzwi",
    description:
      "Kompleksowa renowacja i ponowne lakierowanie stolarki wraz z ościeżnicami.",
    serviceId: "stolarka",
  },
  {
    name: "Malowanie wnętrz",
    description:
      "Malowanie ścian i sufitów w mieszkaniach, domach oraz biurach.",
    serviceId: "malowanie",
  },
  {
    name: "Usuwanie graffiti",
    description:
      "Czyszczenie elewacji z napisów i nakładanie ochronnych powłok anty-graffiti.",
    serviceId: "elewacje",
  },
  {
    name: "Prace demontażowe podłóg",
    description: "Skuwanie i zrywanie starych paneli, podłóg oraz wykładzin.",
    serviceId: "podlogi",
  },
  {
    name: "Wylewki samopoziomujące",
    description:
      "Przygotowanie idealnie równego i gładkiego podłoża pod nowe nawierzchnie.",
    serviceId: "podlogi",
  },
  {
    name: "Montaż podłóg i wykładzin",
    description:
      "Układanie paneli, podłóg winylowych oraz wykładzin dywanowych.",
    serviceId: "podlogi",
  },
  {
    name: "Remonty fasad i elewacji",
    description:
      "Mycie, naprawa pęknięć, tynkowanie oraz malowanie zewnętrzne budynków.",
    serviceId: "elewacje",
  },
  {
    name: "Ocieplenia i termoizolacja",
    description:
      "Kompleksowe docieplanie budynków styropianem lub wełną — z siatką, klejem i strukturą wykończeniową.",
    serviceId: "elewacje",
  },
];

export const processStrip = {
  kicker: "Z placu budowy",
  title: "Proces bez retuszu",
  description:
    "Sześć kadrów prosto z naszych budów — od pierwszego szlifu po montaż kamienia. Przewijaj, aby przejść przez plac budowy.",
  frames: [
    {
      src: siteSanding,
      alt: "Szlifowanie stopni schodów — surowe drewno i wąż odciągu pyłu",
      stage: "Szlifowanie",
      detail: "Stare powłoki schodzą do surowego drewna — stopień po stopniu, z odciągiem pyłu.",
      ratio: "tall",
    },
    {
      src: sitePrimer,
      alt: "Balustrada schodów pomalowana białym podkładem, obok odkurzacz przemysłowy",
      stage: "Podkłady",
      detail: "Balustrada w bieli podkładowej, przeszlifowane drewno gotowe na kolejne warstwy.",
      ratio: "portrait",
    },
    {
      src: siteCoveredStairs,
      alt: "Schody przykryte osłoną na czas malowania klatki schodowej",
      stage: "Zabezpieczenie",
      detail: "Nowe stopnie pod pełną osłoną, aż wyschną świeżo pomalowane ściany.",
      ratio: "portrait",
    },
    {
      src: siteWallpapering,
      alt: "Salon w trakcie tapetowania — złota i błękitna tapeta, drabina malarska",
      stage: "Tapetowanie",
      detail: "Dwa wzory tapet w jednym salonie — dopasowane krawędź do krawędzi.",
      ratio: "wide",
    },
    {
      src: siteFormwork,
      alt: "Szalunek z płyt OSB i zbrojenie nowych schodów zewnętrznych",
      stage: "Konstrukcja",
      detail: "Szalunek i zbrojenie schodów zewnętrznych — beton jeszcze przed nami.",
      ratio: "portrait",
    },
    {
      src: siteGranite,
      alt: "Montaż granitowych płyt na schodach zewnętrznych — pracownik z poziomicą",
      stage: "Montaż kamienia",
      detail: "Granit układany płyta po płycie na gotowej konstrukcji — poziomica nie kłamie.",
      ratio: "portrait",
    },
  ] satisfies StripFrame[],
} as const;

export const featuredProject = {
  kicker: "Wyróżniona realizacja",
  badge: "Renowacja schodów",
  title: "Drugie życie drewnianych schodów",
  description:
    "Kompleksowa renowacja starych schodów — od usunięcia zniszczonych powłok, przez wyrównanie i wzmocnienie stopni, po staranne wykończenie drewna oraz odnowienie balustrady. Efekt, który wygląda jak nowy, a zachowuje charakter oryginału.",
  techniques: "Szlifowanie · Uzupełnianie ubytków · Olejowanie · Renowacja balustrady",
  chips: ["Precyzyjne wykończenie", "Renowacja drewna", "Dbałość o detale"],
  image: {
    src: project5,
    alt: "Renowacja stopni schodów w ciemnym olejowanym drewnie z białymi podstopnicami",
  },
} as const;

export const beforeAfter = {
  kicker: "Metamorfoza",
  title: "Zobacz różnicę",
  description:
    "Ta sama klatka schodowa — przed rozpoczęciem prac i po renowacji. Przeciągnij suwak, aby porównać obie wersje.",
  hint: "Zdjęcia można łatwo podmienić w kodzie realizacji.",
  before: { src: project1, alt: "Schody przed renowacją" },
  after: { src: project2, alt: "Schody po renowacji" },
} as const;

export const renovationStory: RenovationStory = {
  kicker: "Jedna realizacja, trzy akty",
  title: "Ta sama klatka schodowa — od surowych gładzi po śnieżną biel",
  description:
    "Bez wizualizacji i bez retuszu — trzy zdjęcia prosto z naszej budowy. Przewiń w dół, a wiązka przełączy kolejne etapy prac.",
  stages: [
    {
      src: siteSkimcoat,
      alt: "Zabieg schodów pokryty świeżymi gładziami przed malowaniem",
      name: "Surowe podłoże",
      detail:
        "Stopnie i podstopnice wyprowadzone szpachlą — zabieg czeka na pierwsze warstwy bieli.",
    },
    {
      src: siteTreadsProtect,
      alt: "Klatka schodowa w trakcie wykańczania — stopnie pod nakładkami, ściany w gładziach",
      name: "Prace wykończeniowe",
      detail:
        "Stopnie już w bieli — chronią je szare nakładki, a ściany dostają ostatnie łaty gładzi.",
    },
    {
      src: stairsWhite,
      alt: "Białe schody zabiegowe z czarną kutą balustradą po remoncie",
      name: "Efekt końcowy",
      detail:
        "Czysta biel od stopni po sufit, czarna kuta balustrada i doświetlone półpiętro.",
    },
  ],
};

export const gallerySection = {
  kicker: "Portfolio",
  title: "Galeria realizacji",
  allFilterLabel: "Wszystkie",
} as const;

export const gallery: GalleryItem[] = [
  {
    id: "g1",
    src: project1,
    alt: "Schody w trakcie szlifowania stopni",
    caption: "Renowacja schodów — szlifowanie i przygotowanie stopni",
    tags: ["Schody"],
  },
  {
    id: "g2",
    src: project2,
    alt: "Schody po renowacji z naturalnym drewnem i białą stolarką",
    caption: "Schody po renowacji — naturalne drewno i biała stolarka",
    tags: ["Schody", "Stolarka"],
  },
  {
    id: "g3",
    src: project3,
    alt: "Surowe, zniszczone stopnie przed renowacją",
    caption: "Stan przed pracami — surowe, zniszczone stopnie",
    tags: ["Schody"],
  },
  {
    id: "g4",
    src: project4,
    alt: "Schody wykończone w odcieniu jasnego dębu",
    caption: "Schody wykończone w odcieniu jasnego dębu",
    tags: ["Schody", "Podłogi"],
  },
  {
    id: "g5",
    src: project5,
    alt: "Stopnie schodów w ciemnym olejowanym drewnie",
    caption: "Renowacja stopni w ciemnym, olejowanym drewnie",
    tags: ["Schody", "Stolarka"],
  },
  {
    id: "g6",
    src: project6,
    alt: "Malowanie podstopnic i odnawianie balustrady",
    caption: "Malowanie podstopnic i odnawianie balustrady",
    tags: ["Schody", "Malowanie"],
  },
  {
    id: "g7",
    src: project7,
    alt: "Drewniane schody w otwartej zabudowie po renowacji",
    caption: "Renowacja drewnianych schodów w otwartej zabudowie",
    tags: ["Schody", "Wnętrza"],
  },
  {
    id: "g8",
    src: project8,
    alt: "Wykończone stopnie z litego drewna",
    caption: "Precyzyjne wykończenie stopni z litego drewna",
    tags: ["Schody", "Stolarka"],
  },
  {
    id: "g9",
    src: project9,
    alt: "Pomieszczenie po pracach malarskich i tapetowaniu",
    caption: "Prace malarskie i tapetowanie wnętrza",
    tags: ["Malowanie", "Wnętrza"],
  },
  {
    id: "g10",
    src: stairsOak,
    alt: "Schody wykończone winylem w odcieniu jasnego dębu z czarnym pochwytem",
    caption: "Zabiegowe schody w jasnym dębie z czarnym pochwytem",
    tags: ["Schody", "Podłogi"],
  },
  {
    id: "g11",
    src: stairsOakTurn,
    alt: "Zabieg schodów w jasnym dębie widziany z półpiętra",
    caption: "Zabieg w jasnym dębie — widok z półpiętra",
    tags: ["Schody", "Podłogi"],
  },
  {
    id: "g12",
    src: stairsDark,
    alt: "Schody z ciemnymi drewnianymi stopniami i białą balustradą",
    caption: "Ciemne stopnie i biała balustrada po renowacji",
    tags: ["Schody", "Stolarka"],
  },
  {
    id: "g13",
    src: stairsDarkRail,
    alt: "Odnowiona poręcz z litego drewna przy ciemnych stopniach schodów",
    caption: "Poręcz z litego drewna — tuż przed odbiorem",
    tags: ["Schody", "Stolarka"],
  },
  {
    id: "g15",
    src: stairsBlueHall,
    alt: "Klatka schodowa z błękitnymi ścianami i ciemnymi drewnianymi stopniami",
    caption: "Klatka w błękicie — malowanie ścian i renowacja stopni",
    tags: ["Malowanie", "Schody", "Wnętrza"],
  },
  {
    id: "g16",
    src: stairsPineWhite,
    alt: "Sosnowe schody ażurowe z białą balustradą w odnowionym korytarzu",
    caption: "Sosnowe stopnie, biel i nowa podłoga w korytarzu",
    tags: ["Schody", "Wnętrza"],
  },
  {
    id: "g17",
    src: wallpaperFloral,
    alt: "Przedpokój z tapetą w wielkoformatowe kwiaty",
    caption: "Tapeta wielkoformatowa w przedpokoju",
    tags: ["Wnętrza", "Malowanie"],
  },
];

export const laserSection = {
  pill: "Nowa generacja",
  title: "Laser — precyzja nowej generacji",
  description:
    "Nowoczesna technologia umożliwia precyzyjne czyszczenie i obróbkę materiałów bez agresywnej chemii oraz bez nadmiernego naruszania powierzchni.",
  cta: "Zapytaj o usługę laserową",
  visualMode: "TRYB · CZYSZCZENIE DREWNA",
  visualParams: "20 W · FOCUS 0.08 MM",
  rulerStart: "0",
  rulerEnd: "240 mm",
} as const;

export const laserBenefits: LaserBenefit[] = [
  {
    title: "Bezdotykowe czyszczenie",
    description: "Usuwanie zanieczyszczeń bez ścierania zdrowej powierzchni.",
    icon: Sparkles,
  },
  {
    title: "Wysoka precyzja",
    description: "Skupiona wiązka pozwala pracować dokładnie tam, gdzie trzeba.",
    icon: Crosshair,
  },
  {
    title: "Mniej chemii",
    description:
      "Ograniczenie agresywnych środków — czyściej dla materiału i otoczenia.",
    icon: FlaskConical,
  },
  {
    title: "Wszechstronne zastosowanie",
    description:
      "Metal, drewno, kamień czy cegła — jedna technologia, wiele materiałów.",
    icon: LayoutGrid,
  },
];

export const about = {
  kicker: "O firmie",
  title: "Rzemiosło, w którym każdy detal ma znaczenie",
  quote: "„Doświadczenie, cierpliwość i podejście, w którym każdy detal ma znaczenie.”",
  description:
    "To niewielka, rodzinna firma prowadzona przez rzemieślnika, dla którego jakość jest kwestią osobistej odpowiedzialności. Pracujemy spokojnie i uważnie — od starannego przygotowania, przez kontrolę na każdym etapie, po dbałość o porządek i poszanowanie mienia klienta.",
  chips: [
    "Osobista odpowiedzialność",
    "Kontrola jakości",
    "Staranne przygotowanie",
    "Szacunek do Twojego domu",
  ],
  portraitPlaceholder: "PORTRET / ZDJĘCIE\nZ WARSZTATU",
} as const;

export const processSection = {
  kicker: "Jak pracujemy",
  title: "Cztery kroki do gotowego efektu",
} as const;

export const processSteps: ProcessStep[] = [
  {
    index: 1,
    title: "Kontakt i rozmowa",
    description: "Poznajemy Twoje potrzeby, oczekiwania i charakter miejsca.",
  },
  {
    index: 2,
    title: "Oględziny oraz zakres prac",
    description: "Oceniamy stan na miejscu i wspólnie ustalamy zakres realizacji.",
  },
  {
    index: 3,
    title: "Dokładna wycena i realizacja",
    description: "Przejrzysta wycena, a następnie staranne, terminowe wykonanie.",
  },
  {
    index: 4,
    title: "Odbiór oraz efekt końcowy",
    description: "Wspólny odbiór prac i dbałość o porządek po zakończeniu.",
  },
];

export const faqSection = {
  kicker: "Pytania i odpowiedzi",
  title: "Najczęściej zadawane pytania",
} as const;

export const faqs: Faq[] = [
  {
    id: "wycena",
    question: "Jak wygląda wycena?",
    answer:
      "Wstępne oszacowanie przygotowujemy na podstawie opisu zakresu prac i zdjęć. Szczegółową wycenę z oględzinami na miejscu umawiamy indywidualnie.",
  },
  {
    id: "zabezpieczenie",
    question: "Czy zabezpieczacie meble i podłogi?",
    answer:
      "Zawsze. Przed rozpoczęciem prac starannie zabezpieczamy meble, podłogi i elementy, które pozostają w pomieszczeniu.",
  },
  {
    id: "male-naprawy",
    question: "Czy wykonujecie mniejsze naprawy?",
    answer:
      "Tak, podejmujemy się również pojedynczych, mniejszych prac wykończeniowych i drobnych napraw.",
  },
  {
    id: "kilka-prac",
    question: "Czy można zlecić kilka różnych prac podczas jednej realizacji?",
    answer:
      "Oczywiście. Łączenie kilku zakresów w ramach jednej realizacji jest częste i zwykle wygodniejsze dla klienta.",
  },
  {
    id: "materialy-laser",
    question: "Jakie materiały można czyścić laserowo?",
    answer:
      "Między innymi metal, drewno, kamień i cegłę. Dobór parametrów zawsze zależy od materiału i rodzaju zabrudzenia.",
  },
  {
    id: "grawer",
    question: "Czy zajmujecie się obróbką i grawerowaniem drewna?",
    answer:
      "Tak. Oferujemy grawerowanie oraz precyzyjne cięcie i obróbkę drewna z wykorzystaniem technologii laserowej.",
  },
  {
    id: "obszar",
    question: "Na jakim obszarze działa firma?",
    answer: `Nasza baza to ${companyInfo.region} — działamy tu i w najbliższych okolicach. W sprawie realizacji w innych lokalizacjach prosimy o kontakt.`,
  },
];

export const contactSection = {
  kicker: "Kontakt",
  title: "Porozmawiajmy o Twoim projekcie",
  description:
    "Opisz krótko, czego potrzebujesz — odezwiemy się i przygotujemy wycenę.",
  successMessage: "Dziękujemy! Wiadomość została wysłana. Odezwiemy się wkrótce.",
  serviceFallbackOption: "Inne / nie wiem",
} as const;

export const footer = {
  description:
    "Remonty, renowacje i wykończenia wykonywane z wyjątkową dokładnością. Tradycyjne rzemiosło i nowoczesna technologia laserowa.",
  serviceLinks: [
    { id: "uslugi", label: "Malowanie i przygotowanie" },
    { id: "uslugi", label: "Podłogi i schody" },
    { id: "uslugi", label: "Stolarka i wykończenia" },
    { id: "laser", label: "Obróbka laserowa" },
    { id: "uslugi", label: "Elewacje i ocieplenia" },
  ] satisfies NavItem[],
  privacyLabel: "Polityka prywatności",
  copyright: `© ${new Date().getFullYear()} ${companyInfo.name}. Wszelkie prawa zastrzeżone.`,
} as const;
