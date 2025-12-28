<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\File;

class StoryUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "caption" => ["string", 'max:50'],
            "image" => File::image()->min(1024)->max(5 * 1024)->dimensions(Rule::dimensions()->minWidth(150)->minHeight(150)->maxWidth(1280)->maxHeight(1280)),
        ];
    }

}
