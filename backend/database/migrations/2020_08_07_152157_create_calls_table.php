<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCallsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('calls', function (Blueprint $table) {
            $table->id();

            $table->dateTime('date');
            $table->integer('duration');
            $table->enum('type_of_call', ['Incoming', 'Outgoing']);
            $table->integer('call_score');

            $table->unsignedBigInteger('user_id')->nullable();
            $table->unsignedBigInteger('client_id')->nullable();

            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('SET NULL')->onUpdate('CASCADE');
            $table->foreign('client_id')->references('id')->on('clients')->onDelete('SET NULL')->onUpdate('CASCADE');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('calls');
    }
}
