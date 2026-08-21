export const languages = {
  es: { label: "ES", name: "Español" },
  en: { label: "EN", name: "English" },
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = "es";

export const otherLang = (lang: Lang): Lang => (lang === "es" ? "en" : "es");

/**
 * Prefixes a site-root path with the locale segment. The default locale (es)
 * has no prefix, so "/" stays "/" and "/projects/cya/" stays as-is.
 */
export function localizedPath(path: string, lang: Lang): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return lang === defaultLang ? clean : `/${lang}${clean}`;
}

export const ui = {
  es: {
    "nav.home": "Inicio",
    "nav.career": "Trayectoria",
    "nav.projects": "Proyectos",
    "nav.skills": "Skills",
    "nav.contact": "Contacto",

    "home.greeting": "Hola, soy",
    "home.resume": "Ver CV",
    "home.resumeHint": "Se abre en Google Drive",

    "career.title": "Trayectoria",
    "career.subtitle":
      "Mi recorrido profesional: roles, formación y los hitos que lo marcaron.",
    "career.all": "Todo",
    "career.work": "Trabajo",
    "career.education": "Formación",

    "projects.title": "Proyectos",
    "projects.subtitle":
      "Proyectos que construí de punta a punta. Entrá al detalle para leer el caso completo y ver capturas.",
    "projects.viewCase": "Ver el caso completo",
    "projects.liveSite": "Sitio en vivo",
    "projects.source": "Código",

    "skills.title": "Skills y herramientas",
    "skills.subtitle":
      "Desglose de mis herramientas y tecnologías, agrupadas por dominio y nivel de manejo.",
    "skills.expert": "Avanzado",
    "skills.proficient": "Intermedio",
    "skills.beginner": "Inicial",

    "contact.title": "Contacto",
    "contact.subtitle":
      "Escribime sin vueltas. Siempre estoy abierto a conversar sobre nuevos proyectos y oportunidades.",
    "contact.connect": "Conectar",
    "contact.preferredLead": "Preferentemente:",
    "contact.preferredOr": "o",
    "contact.preferredTail": "— suelo responder dentro de las 24 horas.",

    "footer.builtUsing": "Hecho con",

    "detail.back": "Volver a proyectos",
    "detail.period": "Período",
    "detail.role": "Rol",
    "detail.platforms": "Plataformas",
    "detail.visitLive": "Ver sitio en vivo",
    "detail.viewSource": "Ver código",
    "detail.screenshots": "Capturas",
    "detail.screenshotAlt": "captura",

    "lang.switchTo": "Ver en inglés",
  },
  en: {
    "nav.home": "Home",
    "nav.career": "Career",
    "nav.projects": "Projects",
    "nav.skills": "Skills",
    "nav.contact": "Contact",

    "home.greeting": "Hello, I'm",
    "home.resume": "View Resume",
    "home.resumeHint": "Opens in Google Drive",

    "career.title": "Career",
    "career.subtitle":
      "A timeline of my professional journey, roles, education, and milestones.",
    "career.all": "All",
    "career.work": "Work",
    "career.education": "Education",

    "projects.title": "Projects",
    "projects.subtitle":
      "Projects I built end to end. Open a case study for the full write-up and screenshots.",
    "projects.viewCase": "View case study",
    "projects.liveSite": "Live site",
    "projects.source": "Source",

    "skills.title": "Skills & Tools",
    "skills.subtitle":
      "Breakdown of my skills and tools, categorized by domain and proficiency.",
    "skills.expert": "Expert",
    "skills.proficient": "Proficient",
    "skills.beginner": "Beginner",

    "contact.title": "Contact Me",
    "contact.subtitle":
      "Feel free to reach out. I'm always open to discussing new projects and opportunities.",
    "contact.connect": "Connect",
    "contact.preferredLead": "Preferred:",
    "contact.preferredOr": "or",
    "contact.preferredTail": "— I typically respond within 24 hours.",

    "footer.builtUsing": "Built using",

    "detail.back": "Back to projects",
    "detail.period": "Period",
    "detail.role": "Role",
    "detail.platforms": "Platforms",
    "detail.visitLive": "Visit live site",
    "detail.viewSource": "View source",
    "detail.screenshots": "Screenshots",
    "detail.screenshotAlt": "screenshot",

    "lang.switchTo": "View in Spanish",
  },
} as const;

export type UIKey = keyof (typeof ui)["es"];

export function useTranslations(lang: Lang) {
  return function t(key: UIKey): string {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}

/**
 * Reads a value from JSON data that may be either a plain value (same in every
 * language) or a per-locale object like { es: "...", en: "..." }.
 */
export function pick<T>(value: T | Record<Lang, T> | undefined, lang: Lang): T | undefined {
  if (value !== null && typeof value === "object" && !Array.isArray(value) && "es" in (value as object)) {
    const localized = value as Record<Lang, T>;
    return localized[lang] ?? localized[defaultLang];
  }
  return value as T | undefined;
}
