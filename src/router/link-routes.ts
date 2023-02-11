export interface RouterLink {
  name: string;
  title: string;
  path: string;
}

export const routerLinks: RouterLink[] = [
  { path: "/", name: "home", title: "Inicio" },
  { path: "/about", name: "about", title: "Sobre" },
  { path: "/characters", name: "characters", title: "Personajes" },
];
