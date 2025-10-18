import { loadSettings, saveSettings, type DefaultPostBehavior } from './settings';

// 設定を読み込んでUIに反映
async function restoreOptions() {
  const settings = await loadSettings();

  // 標準の投稿挙動
  const defaultBehavior = document.getElementById('defaultBehavior') as HTMLSelectElement;
  if (defaultBehavior) {
    defaultBehavior.value = settings.defaultPostBehavior;
  }

  // ドメイン別設定
  const amazonDomain = document.getElementById('amazonDomain') as HTMLInputElement;
  if (amazonDomain) {
    amazonDomain.checked = settings.domainSettings.amazon;
  }

  const youtubeDomain = document.getElementById('youtubeDomain') as HTMLInputElement;
  if (youtubeDomain) {
    youtubeDomain.checked = settings.domainSettings.youtube;
  }
}

// 設定を保存
async function saveOptions() {
  const defaultBehavior = document.getElementById('defaultBehavior') as HTMLSelectElement;
  const amazonDomain = document.getElementById('amazonDomain') as HTMLInputElement;
  const youtubeDomain = document.getElementById('youtubeDomain') as HTMLInputElement;

  await saveSettings({
    defaultPostBehavior: defaultBehavior.value as DefaultPostBehavior,
    domainSettings: {
      amazon: amazonDomain.checked,
      youtube: youtubeDomain.checked,
    },
  });

  // 保存完了メッセージを表示
  const status = document.getElementById('status');
  if (status) {
    status.classList.add('show', 'success');
    setTimeout(() => {
      status.classList.remove('show');
    }, 2000);
  }
}

// ページ読み込み時に設定を復元
document.addEventListener('DOMContentLoaded', restoreOptions);

// 設定変更時に自動保存
document.addEventListener('DOMContentLoaded', () => {
  const defaultBehavior = document.getElementById('defaultBehavior');
  const amazonDomain = document.getElementById('amazonDomain');
  const youtubeDomain = document.getElementById('youtubeDomain');

  if (defaultBehavior) {
    defaultBehavior.addEventListener('change', saveOptions);
  }
  if (amazonDomain) {
    amazonDomain.addEventListener('change', saveOptions);
  }
  if (youtubeDomain) {
    youtubeDomain.addEventListener('change', saveOptions);
  }
});
