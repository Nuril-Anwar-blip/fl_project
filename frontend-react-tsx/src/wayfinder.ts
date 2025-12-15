/**
 * Dokumentasi: Utilitas Wayfinder
 * Fungsi: Membantu membangun URL dan definisi rute sederhana untuk penggunaan di front-end.
 * Ekspor: `queryParams`, `applyUrlDefaults`, tipe `RouteQueryOptions`, `RouteDefinition`, `RouteFormDefinition`.
 */
export type RouteQueryOptions = {
  query?: Record<string, string | number | boolean | undefined>;
  mergeQuery?: Record<string, string | number | boolean | undefined>;
};

export type RouteDefinition<TMethods extends readonly string[] | string> = {
  url: string;
  method?: TMethods extends readonly string[] ? TMethods[number] : TMethods;
  methods?: TMethods extends readonly string[] ? TMethods : [TMethods];
};

export type RouteFormDefinition<TMethod extends string> = {
  action: string;
  method: TMethod;
};

export function queryParams(options?: RouteQueryOptions): string {
  const params = new URLSearchParams();
  const source =
    options?.mergeQuery ?? options?.query ?? ({} as Record<string, unknown>);
  Object.entries(source).forEach(([key, value]) => {
    if (value === undefined) return;
    params.append(key, String(value));
  });
  const qs = params.toString();
  return qs ? `?${qs}` : '';
}

export function applyUrlDefaults<T extends Record<string, any>>(args: T): T {
  return args;
}
