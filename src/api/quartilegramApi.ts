import { transformObjectKeys } from '@packages/helpers-rtkit';

import { keysToCamel, keysToSnake } from 'utils';

import regExp from 'constants/regExp';
import BaseRequest from './baseRequest';
import routes from './routes';

export class QartilegramApi extends BaseRequest {
  /** Запрос информации с настройками приложения */
  public getConfig = () => this.GET(routes['getConfig']);

  /** Запрос списка управляющих кампаний */
  public getManagmentCompany = () =>
    this.GET(this.api.ustore + routes['getManagmentCompany']).then((data) => keysToCamel(data));

  /** Получение списка моделей устройств */
  public getDeviceModels = () =>
    this.GET(this.api.hh + routes['getDevicesModel']).then((data) => keysToCamel(data));

  /** Зпрос информации по квартирограмме */
  public getQuartilegram = (companyId, houseId) =>
    this.GET(
      this.api.hh +
        routes['getQuartilegram'].replace(regExp.getQuartilegramParams, (match) => {
          if (match === ':companyId') return companyId;
          if (match === ':houseId') return houseId;
        }),
    ).then((data) => transformObjectKeys(data));

  /** Сохранение отредактированной квартирограммы в режиме редактирования */
  public updateQuartilegram = (formId, data) =>
    this.PUT(this.api.hh + routes['updateQuartilegram'].replace(':id', formId), {
      data: keysToSnake(data),
    }).then((data) => keysToCamel(data));

  /** Создание нововой квартирограммы */
  public createQuartilegram = (formId, data) =>
    this.POST(this.api.hh + routes['createQuartilegram'].replace(':id', formId), {
      data: keysToSnake(data),
    }).then((data) => keysToCamel(data));

  /** Получение списка региональных филиалов */
  public getRF = () =>
    this.GET(this.api.dstore + routes['getRF']).then((data) => keysToCamel(data));

  /** Получение списка межрегиональных филиалов */
  public getMRF = () =>
    this.GET(this.api.dstore + routes['getMRF']).then((data) => keysToCamel(data));

  /** Получение списка временных зон */
  public getTimeZone = () =>
    this.GET(this.api.dstore + routes['getTimeZone']).then((data) => keysToCamel(data));
}

export default new QartilegramApi();
