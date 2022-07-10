export type ConditionalPluginInput = {
  is_small_screen: boolean;
  sidebar_shown: boolean;
  settings_shown: boolean;
  subtheme_name: string;
  subtheme_mode: SubthemeModeType;
};

export type Plugin = (input: ConditionalPluginInput) => Promise<void>;
