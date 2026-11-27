<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('media_partners', function (Blueprint $table) {
            $table->id();
            $table->string('organization_name');
            $table->string('event_name');
            $table->string('contact_wa');
            $table->enum('package_type', ['gratis', 'berbayar', 'kolaborasi']);
            $table->date('event_date')->nullable();
            $table->string('poster_file')->nullable();
            $table->text('notes')->nullable();
            $table->enum('status', ['menunggu', 'disetujui', 'ditolak'])->default('menunggu');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('media_partners');
    }
};
