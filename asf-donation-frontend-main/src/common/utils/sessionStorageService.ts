class sessionStorageService {
  private sessionStorage: Storage = window.sessionStorage;

  constructor() { }

  public setItem<T>(key: string, value: T): void {
    if (value) {
      this.sessionStorage.setItem(key, JSON.stringify(value));
    }
  }

  public getItem<T>(key: string): T | null {
    const value = this.sessionStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }
    return null;
  }

  public removeItem(key: string): void {
    this.sessionStorage.removeItem(key);
  }

  public clear(): void {
    this.sessionStorage.clear();
  }

  public get length(): number {
    return this.sessionStorage.length;
  }
}

export default new sessionStorageService();