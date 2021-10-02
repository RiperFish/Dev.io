<?php

namespace Database\Seeders;

use App\Models\Tag;
use Illuminate\Database\Seeder;

class TagsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Tag::create(['name' => 'javascript']);
        Tag::create(['name' => 'webdev']);
        Tag::create(['name' => 'react']);
        Tag::create(['name' => 'css']);
        Tag::create(['name' => 'tutorial']);
        Tag::create(['name' => 'php']);
        Tag::create(['name' => 'laravel']);
        Tag::create(['name' => 'wordpress']);
        Tag::create(['name' => 'vscode']);
        Tag::create(['name' => 'technology']);
    }
}
