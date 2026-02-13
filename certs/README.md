# Trusted HTTPS for local preview/dev

Этот проект умеет поднимать HTTPS **без предупреждения браузера** через `mkcert`.

## 1) Сгенерировать сертификаты (один раз)

Запусти из `frontend/`:

```powershell
npm run cert:setup
```

Скрипт:
- скачает `mkcert.exe` в `frontend/tools/` (если его нет)
- установит локальный root CA в доверенные (`mkcert -install`)
- сгенерирует `frontend/certs/localhost.pem` и `frontend/certs/localhost-key.pem`

## 2) Запуск HTTPS preview

```powershell
npm run build
npm run preview:https -- --port 5197
```

Открыть: `https://127.0.0.1:5197/`.

> Если сертификат не создан — проект упадёт обратно на self-signed (будет предупреждение). Чтобы было «закрыто», нужен `npm run cert:setup`.
