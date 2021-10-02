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
        Tag::create(['name' => 'javascript', 'description' => 'One of the 3 core technologies of the web, JavaScript can now be found almost anywhere you find code. JavaScript developers move fast and push software development forward; they can be as opinionated as the frameworks they use']);
        Tag::create(['name' => 'webdev', 'description' =>'General web developement tag']);
        Tag::create(['name' => 'react', 'description' => 'Official tag for Facebook\'s React JavaScript library for building user interfaces']);
        Tag::create(['name' => 'css', 'description' => 'Cascading Style Sheets (CSS) is a simple language for adding style (e.g., fonts, colors, spacing) to HTML documents. It describes how HTML']);
        Tag::create(['name' => 'tutorial', 'description' => 'Tutorial is a general purpose tag. We welcome all types of tutorial - code related or not! It\'s all about learning, and using tutorials to teach']);
        Tag::create(['name' => 'php', 'description' => 'Home for all the PHP-related posts']);
        Tag::create(['name' => 'laravel', 'description' => 'Laravel framework']);
        Tag::create(['name' => 'wordpress', 'description' => 'Wordpress']);
        Tag::create(['name' => 'vscode', 'description' => 'Visual studio code']);
        Tag::create(['name' => 'technology', 'description' => 'All tech topics']);
    }
}
