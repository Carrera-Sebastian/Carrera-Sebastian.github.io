import type { APIRoute } from 'astro';
import localHomeData from '../data/home.json';
import localCareerData from '../data/career.json';
import localTechData from '../data/tech.json';
import { getProjects } from '../utils/projects';
import { pick, type Lang } from '../i18n/ui';

// llms.txt is generated in the site's default language (Spanish); each project
// also lists its English case-study URL.
const LANG: Lang = 'es';
const s = (value: unknown) => pick(value as any, LANG) ?? '';

export const GET: APIRoute = async () => {
  const isApiLive = import.meta.env.PROD;
  const BASE_URL = import.meta.env.PUBLIC_API_BASE_URL;

  let home: any = localHomeData;
  let career: any = localCareerData;
  let tech: any = localTechData;
  // If the remote API is used, its payloads must match the schema in src/data/*.json
  let projects: any[] = getProjects();

  if (isApiLive && BASE_URL) {
    try {
      const [homeRes, careerRes, projectsRes, techRes] = await Promise.all([
        fetch(`${BASE_URL}/home`),
        fetch(`${BASE_URL}/career`),
        fetch(`${BASE_URL}/projects`),
        fetch(`${BASE_URL}/tech`),
      ]);
      if (homeRes.ok) home = await homeRes.json();
      if (careerRes.ok) career = await careerRes.json();
      if (projectsRes.ok) projects = await projectsRes.json();
      if (techRes.ok) tech = await techRes.json();
    } catch (error) {
      console.error('[llms.txt] API fetch failed, falling back to local JSON data', error);
    }
  }

  const siteUrl = (home.siteUrl || 'https://your-domain.com').replace(/\/$/, '');

  const techCategoriesStr = tech.categories
    ? tech.categories
        .map((cat: any) => `- **${s(cat.title)}:** ${cat.skills.map((sk: any) => sk.name).join(', ')}`)
        .join('\n')
    : '';

  const careerStr = Array.isArray(career)
    ? career
        .map((item: any) => `- **${s(item.role)}** — ${item.company} (${s(item.period)})\n  * ${s(item.description)}`)
        .join('\n')
    : '';

  const projectsStr = Array.isArray(projects)
    ? projects
        .map((proj: any) => {
          const links = [
            proj.slug ? `Caso: ${siteUrl}/projects/${proj.slug}/ (EN: ${siteUrl}/en/projects/${proj.slug}/)` : '',
            proj.link ? `Sitio: ${proj.link}` : '',
            proj.repoUrl ? `Código: ${proj.repoUrl}` : '',
          ].filter(Boolean);
          return `- **${proj.title}:** ${s(proj.description)}${links.length ? `\n  * ${links.join(' | ')}` : ''}`;
        })
        .join('\n')
    : '';

  const socialsStr = Array.isArray(home.socials)
    ? home.socials
        .filter((soc: any) => soc.url && soc.url !== '#' && soc.url !== '')
        .map((soc: any) => `- **${soc.name}:** ${soc.url}`)
        .join('\n')
    : '';

  const markdown = `# ${home.name}

> ${s(home.description)}

## Resumen
${home.name} es ${s(home.jobTitle) || 'Ingeniero en Sistemas'}${home.location ? ` con base en ${home.location}` : ''}. ${s(home.description)}

## Idiomas del sitio
- **Español (por defecto):** ${siteUrl}/
- **English:** ${siteUrl}/en/

## Datos clave
${home.location ? `- **Ubicación:** ${home.location}` : ''}
${home.availability ? `- **Disponibilidad:** ${s(home.availability)}` : ''}
- **Portfolio:** ${siteUrl}
${home.resumeUrl ? `- **CV:** ${home.resumeUrl}` : ''}

## Skills y tecnologías
${techCategoriesStr}

## Experiencia y formación
${careerStr}

## Proyectos
${projectsStr}

## Contacto
- **Sitio:** ${siteUrl}
${socialsStr}
`;

  return new Response(markdown.trim() + '\n', {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
