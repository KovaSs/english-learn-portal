# ПЕРЕМЕННЫЕ ОКРУЖЕНИЯ

Значения вствляются в код при компиляции `webpack`-ом  
в js коде используются так:  
`__NAME_VARIABLE__` двойной `low dash` используется для однозначного понимания, что это переменная времени компиляции

| Names                    |    TypeOf    |  Default   | Description                                                                       |
| ------------------------ | :----------: | :--------: | --------------------------------------------------------------------------------- |
| DEV_HOST                 |    string    |  0.0.0.0   | Хост. Для localhost - webpack не будет открывать порт наружу в локалке            |
| DEV_PORT                 |    number    |    8080    | порт для dev сервера                                                              |
|                          |              |            |                                                                                   |
| NODE_ENV                 | Enum<String> | production | Режим компиляции. <br>Возможные значения: `production`, `development`             |
| REDUX_DEV_TOOLS_ENABLED  |   Boolean    |   false    | Включить redux dev tools                                                          |
| REDUX_LOGGER_ENABLED     |   Boolean    |   false    | Включить вывод логов redux в консоль                                              |
| ANALYTIC_LOGGER          |   Boolean    |   false    | Логи аналитики                                                                    |
| ANALYTIC_SEND            |   Boolean    |   false    | Отправка аналитики                                                                |
| CRASH_ANALYTICS_LOGGER   |   Boolean    |   false    | Логи крешлитики                                                                   |
| CRASH_ANALYTICS_SEND     |   Boolean    |   false    | Отправка событий крешлитики                                                       |
|                          |              |            |                                                                                   |
| WEBPACK_NOTIFIER_ENABLED |   Boolean    |   false    | Нотификация от webpack при ошибке при сборке                                      |
| WEBPACK_DEVTOOL          |    string    |            | source maps docs: [webpack devtool](https://webpack.js.org/configuration/devtool) |
|                          |              |            |                                                                                   |
| SAGA_LOG                 |    string    |            | Включение логирования ошибок при работе с сагами                                  |
| SENTRY_DSN               |    string    |            | https://docs.sentry.io/ настроки sentry                                           |
| VERSION                  |    string    |  UNKNOWN   | Версия приложения                                                                 |
| GIT_BRANCH               |    string    |  UNKNOWN   | git rev-parse --abbrev-ref HEAD                                                   |
| GIT_COMMIT               |    string    |  UNKNOWN   | git rev-parse HEAD - первые 6 символов                                            |
|                          |              |            |

Задание значений, в порядке повышения приоритета (название переменной указывается без `__` ):

1. Значения по умолчанию `webpack/evnironment/`
2. Значения из файла `.env` в корне проекта
3. Максимальный приоритет, перезапишет любые предыдущие способы установки: При запуске в коммандной строке указать пару `ключ=значение`
