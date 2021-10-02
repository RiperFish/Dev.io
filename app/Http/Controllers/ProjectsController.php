<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Project;
use App\Http\Resources\ProjectResource;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Redirect;

class ProjectsController extends Controller
{
    //
    public function show()
    {
        $data = Project::all();
        return Inertia::render('Projects', ['data' => $data]);
    }
    public function edit(Project $project)
    {
        return Inertia::render('EditProject', [
            'project' => $project,
        ]);
    }
    public function create()
    {
        return Inertia::render('AddProject');
    }

    public function store()
    {

        Project::create(
            Request::validate([
                'title' => ['required'],
                'short_description' => ['required'],
                'my_role' => ['required'],
                'external_link' => ['required'],
                'main_color' => ['required'],
                'secondary_color' => ['required'],
                'fonts_used' => ['required'],
                'what_i_did' => ['required'],
                'technologies_used' => ['required'],
            ])
        );
        
        return Redirect::route('projects');//->with('success', 'Organization created.');
        //return Redirect::route('users.index');
    }
}
