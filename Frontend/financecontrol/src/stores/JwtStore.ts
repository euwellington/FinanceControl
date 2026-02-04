import type { IJwt } from "@/interfaces/IJwt";
import { jwtDecode } from "jwt-decode";
import { makeAutoObservable, runInAction } from "mobx";

class JwtStore {
  decoded: IJwt | null = null;
  expiresAt: Date | null = null;
  timeLeft: string = ""; // O componente vai apenas ler esta string

  constructor() {
    makeAutoObservable(this);
    this.loadUser();
    this.startCountdown(); // O timer começa aqui e nunca para
  }

  loadUser() {
    const token = localStorage.getItem("@token");
    if (token) {
      try {
        const decodedToken = jwtDecode<IJwt>(token);
        this.decoded = decodedToken;
        if (decodedToken.exp) {
          this.expiresAt = new Date(decodedToken.exp * 1000);
        }
      } catch {
        this.logout();
      }
    }
  }

  private startCountdown() {
    setInterval(() => {
      if (this.expiresAt) {
        const now = new Date().getTime();
        const distance = this.expiresAt.getTime() - now;

        if (distance <= 0) {
          runInAction(() => {
            this.timeLeft = "Expirado";
            this.logout();
          });
          return;
        }

        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // runInAction é necessário para atualizar observáveis dentro de async/timers
        runInAction(() => {
          this.timeLeft = `${minutes}m ${seconds}s`;
        });
      }
    }, 1000);
  }

  logout() {
    localStorage.removeItem("@token");
    this.decoded = null;
    this.expiresAt = null;
    this.timeLeft = "";
    // Se quiser redirecionar: window.location.href = "/login";
  }
}

export default JwtStore;