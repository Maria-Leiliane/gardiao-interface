import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // 1. Tratamos a rota de edição que está causando o erro no deploy
  {
    path: 'habits/editar/:id',
    renderMode: RenderMode.Prerender,
    // Usamos async e a tipagem correta para satisfazer o TypeScript
    getPrerenderParams: async (): Promise<Record<string, string>[]> => {
      return [];
    }
  },

  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
