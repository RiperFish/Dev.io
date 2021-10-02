<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProjectsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('title')->nullable();
            $table->text('short_description')->nullable();
            $table->string('my_role')->nullable();
            $table->string('external_link')->nullable();
            $table->string('main_color')->nullable();
            $table->string('secondary_color')->nullable();
            $table->string('fonts_used')->nullable();
            $table->string('what_i_did')->nullable();
            $table->string('technologies_used')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('projects');
    }
}
