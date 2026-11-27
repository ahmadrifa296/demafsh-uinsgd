#!/usr/bin/env sh
set -e

if [ -n "$DB_URL" ]; then
    DB_URL=$(printf '%s' "$DB_URL" | sed 's/-pooler\././')
    export DB_URL
fi
if [ -n "$DB_HOST" ]; then
    DB_HOST=$(printf '%s' "$DB_HOST" | sed 's/-pooler\././')
    export DB_HOST
fi

mkdir -p storage/framework/sessions storage/framework/views storage/framework/cache/data storage/logs bootstrap/cache
php artisan storage:link || true

if ! php artisan migrate --force; then
    echo "Migrasi standar gagal, membersihkan tabel dan migrasi ulang..."
    php artisan migrate:fresh --seed --force
else
    USER_COUNT=$(php -r "require 'vendor/autoload.php'; \$app = require 'bootstrap/app.php'; \$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap(); echo App\Models\User::count();" 2>/dev/null || echo "0")
    if [ "$USER_COUNT" = "0" ]; then
        php artisan db:seed --force
    fi
fi

export PHP_CLI_SERVER_WORKERS=4
exec php artisan serve --host=0.0.0.0 --port="${PORT:-10000}"
