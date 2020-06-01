/**
 * TODO переписать env переменные для Requests url для возможности использования из конфигов
 */

export default {
  // eslint-disable-next-line no-undef
  getConfig: __CONFIG_JSON_URL__,

  // Page routes url
  urlFlatgrammsList: '/admin/household/flatgramms/',
  urlPageNew: '/admin/household/flatgramms/new',
  urlPageView: '/admin/household/flatgramms/companies/:companyId/buildings/:buildingId',
  urlPageEdit: '/admin/household/flatgramms/companies/:companyId/buildings/:buildingId/edit',

  // Requests url
  getQuartilegram: '/api/v3/flatgramms/companies/:companyId/buildings/:houseId',
  updateQuartilegram: '/api/v3/flatgramms/:id',
  createQuartilegram: '/api/v3/flatgramms?company_id=:id',
  getManagmentCompany: '/api/v3/companies',
  getDevicesModel: '/api/v3/model_types',
  getRF: '/api/v1/dict/rf',
  getMRF: '/api/v1/dict/mrf',
  getTimeZone: '/api/v1/dict/tz',
};
