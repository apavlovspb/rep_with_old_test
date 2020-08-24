export class ApiService {
  shortBase = `http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&adress={addressObject}&description={lorem|32}`;
  longBase = `http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&adress={addressObject}&description={lorem|32}`;

  async getResource(url) {
    const res = await fetch(`${url}`);
    if (!res.ok) {
      throw new Error(`Could nt fetch ${url}, resstatus ${res.status}`);
    }
    return await res.json();
  }

  async getTable(dataSize) {
    let data = '';
    if (dataSize === 'shortver') {
      data = this.shortBase;
    } else {
      data = this.longBase;
    }

    return await this.getResource(`${data}`);
  }
}
