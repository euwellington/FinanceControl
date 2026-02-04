import { makeAutoObservable, reaction } from 'mobx';

class ThemeStore {
  theme: 'light' | 'dark' = 'light'; 

  constructor() {
    makeAutoObservable(this);
    this.loadTheme();

    // Reação automática: Sempre que this.theme mudar, atualiza o HTML
    reaction(
      () => this.theme,
      (theme) => {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(theme);
      },
      { fireImmediately: true } // Executa assim que o app carregar
    );
  }

  loadTheme() {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    if (savedTheme) {
      this.theme = savedTheme;
    } else {
      // Opcional: Checar preferência do sistema caso não haja nada salvo
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.theme = prefersDark ? 'dark' : 'light';
    }
  }

  setTheme(newTheme: 'light' | 'dark') {
    this.theme = newTheme;
    localStorage.setItem('theme', newTheme);
  }

  toggle() {
    this.setTheme(this.theme === 'light' ? 'dark' : 'light');
  }
}

export default ThemeStore;