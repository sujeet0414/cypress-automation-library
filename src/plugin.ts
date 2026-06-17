export interface LibraryPluginOptions {
  baseUrl?: string;
  viewportWidth?: number;
  viewportHeight?: number;
  defaultCommandTimeout?: number;
  video?: boolean;
  screenshotOnRunFailure?: boolean;
}

export interface CypressLibraryConfig {
  baseUrl?: string;
  viewportWidth?: number;
  viewportHeight?: number;
  defaultCommandTimeout?: number;
  video?: boolean;
  screenshotOnRunFailure?: boolean;
  e2e?: Record<string, unknown>;
  [key: string]: unknown;
}

export function registerPlugin<T extends CypressLibraryConfig>(
  config: T,
  options: LibraryPluginOptions = {}
): T {
  return {
    ...config,
    baseUrl: options.baseUrl ?? config.baseUrl,
    viewportWidth: options.viewportWidth ?? config.viewportWidth ?? 1280,
    viewportHeight: options.viewportHeight ?? config.viewportHeight ?? 720,
    defaultCommandTimeout: options.defaultCommandTimeout ?? config.defaultCommandTimeout ?? 10000,
    video: options.video ?? config.video ?? false,
    screenshotOnRunFailure: options.screenshotOnRunFailure ?? config.screenshotOnRunFailure ?? true,
    e2e: {
      ...(config.e2e ?? {}),
    },
  };
}
