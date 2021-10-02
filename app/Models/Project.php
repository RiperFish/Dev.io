<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Project extends Model
{
    use HasFactory;
    // Project structure
    // Title
    // Short description
    // My role
    // External link
    // Colors : Main and secondary
    // Fonts used
    // What i did : in a list
    // Technologies used
    // Project logo to put in hero background 
    protected $fillable = [
        'title','short_description','my_role','external_link','main_color','secondary_color','fonts_used','what_i_did','technologies_used'
    ];

    public function owner()
    {
        return $this->belongsTo(User::class);
    }
}
