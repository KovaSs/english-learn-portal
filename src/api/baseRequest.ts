import axios from 'axios';

import { uuid } from 'utils';

interface ApiUrls {
  [key: string]: string;
}

class BaseRequest {
  public api: ApiUrls;
  public cancelToken;
  private CustomAxios;
  private config;
  constructor(options?) {
    this.api = {
      ustore: '',
      hh: '',
      dstore: '',
    };

    this.config = {
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Accept-Language': 'ru',
      },
    };

    this.cancelToken = axios.CancelToken;

    this.config = { ...this.config, ...options };

    this.CustomAxios = axios.create(this.config);

    this.CustomAxios.interceptors.response.use(
      (response) => (response?.data?.data ? response.data.data : response),
      (error) => Promise.reject(error.response || error.message),
    );
  }

  private request = <T>(method: string, url: string, config: T) =>
    this.CustomAxios({ ...config, method, url, ...{ headers: { 'X-Request-Id': uuid() } } });

  /** Установка и получение доменов запросов из config.json */
  public setApi = (api: ApiUrls) => (this.api = { ...this.api, ...api });
  public getApi = () => this.api;

  /** Формироване запросов с уникальными xRequestId */
  public GET = (url: string, config?) => this.request('get', url, config);
  public POST = (url: string, config?) => this.request('post', url, config);
  public PUT = (url: string, config?) => this.request('put', url, config);
  public PATCH = (url: string, config?) => this.request('patch', url, config);
  public DELETE = (url: string, config?) => this.request('delete', url, config);
}

export default BaseRequest;
