<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->title,
            'short_description' => $this->short_description,
            'my_role' => $this->my_role,
            'external_link' => $this->external_link,
            'main_color' => $this->main_color,
            'secondary_color' => $this->secondary_color,
            'fonts_used' => $this->fonts_used,
            'what_i_did' => $this->what_i_did,
            'technologies_used' => $this->technologies_used,

        ];
    }
}
