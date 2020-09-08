export default class GetResource {
  __apiLink =
    'https://rawgit.com/Varinetz/e6cbadec972e76a340c41a65fcc2a6b3/raw/90191826a3bac2ff0761040ed1d95c59f14eaf26/frontend_test_table.json';

  async getResource(url = this.__apiLink) {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`This ${url} incorect, recived ${res.status}`);
    }
    return await res.json();
  }
}
