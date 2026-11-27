#!/usr/bin/env bash

php artisan storage:link || true

# Jalankan migrasi. Jika gagal karena sisa tabel dari deploy sebelumnya, bersihkan dengan migrate:fresh
if ! php artisan migrate --force; then
    echo "Migrasi standar gagal, membersihkan tabel dan migrasi ulang..."
    php artisan migrate:fresh --seed --force
else
    # Jika tabel sudah ada, pastikan seeder data awal tetap terisi jika belum ada
    php artisan db:seed --force || true
fi

exec php artisan serve --host=0.0.0.0 --port="${PORT:-10000}"
