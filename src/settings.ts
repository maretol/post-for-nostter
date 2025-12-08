// 標準の投稿挙動の型
export type DefaultPostBehavior = 'short' | 'raw' | 'domain_specific';

// ドメイン別の特殊挙動設定
export interface DomainSettings {
  amazon: boolean;
  youtube: boolean;
}

// 設定の型定義
export interface Settings {
  // 標準の投稿挙動（拡張機能のボタンをクリックしたときのシェア挙動）
  defaultPostBehavior: DefaultPostBehavior;
  // 特定のドメインの特殊挙動のオンオフ
  domainSettings: DomainSettings;
}

// デフォルト設定値
export const defaultSettings: Settings = {
  defaultPostBehavior: 'domain_specific',
  domainSettings: {
    amazon: true,
    youtube: true,
  },
};

// 設定を読み込む
export async function loadSettings(): Promise<Settings> {
  return new Promise((resolve) => {
    chrome.storage.sync.get(Object.keys(defaultSettings), (items) => {
      resolve({ ...defaultSettings, ...items } as Settings);
    });
  });
}

// 設定を保存する
export async function saveSettings(settings: Partial<Settings>): Promise<void> {
  return new Promise((resolve) => {
    chrome.storage.sync.set(settings, () => {
      resolve();
    });
  });
}
