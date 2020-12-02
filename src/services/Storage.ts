export default class StorageService {
  private readonly key: string;

  constructor(key: string, initialValue = []) {
    this.key = key;
    const data = localStorage.getItem(this.key);
    if (!data) {
      this.setData(initialValue);
    }
  }

  getData(): Promise<object|string> {
    try {
      const data = localStorage.getItem(this.key);
      if (data) {
        return Promise.resolve((JSON.parse(data)));
      }
      throw new Error('Data not found');
    } catch (e) {
      return Promise.reject(e.message);
    }
  }

  setData(data: object|Array<object>): Promise<object|string> {
    try {
      const stringData = JSON.stringify(data);
      localStorage.setItem(this.key, stringData);
      return Promise.resolve({ message: 'Success' });
    } catch (e) {
      return Promise.reject(e.message);
    }
  }

  clearData(): Promise<object|string> {
    try {
      localStorage.removeItem(this.key);
      return Promise.resolve({ message: 'Success' });
    } catch (e) {
      return Promise.reject(e.message);
    }
  }
}
