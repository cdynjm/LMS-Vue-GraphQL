<?php

namespace App\Http\Controllers\Admin;

use App\Models\Categories;
use App\Models\CoAuthor;
use App\Models\Files;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Controllers\AESCipher;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Carbon;

class FileController extends Controller
{
    public function __construct(protected AESCipher $aes) {}

    public function index(Request $request)
    {
        return Inertia::render('Admin/Files', [
            'id' => $request->id,
        ]);
    }

    public function createFile(Request $request)
    {
        $timestamp = Carbon::now()->format('YmdHis'); // Shorter format for filenames
        $title = \Str::slug(\Str::limit($request->title, 70));
        $extension = $request->file('file')->getClientOriginalExtension();
        $filename = "{$title}...-{$timestamp}.{$extension}";
        $transferfile = $request->file('file')->storeAs('files', $filename, 'public');

        $file = Files::create([
            'categoryID' => $this->aes->decrypt($request->categoryID),
            'municipalStatus' => $request->municipalStatus,
            'title' => $request->title,
            'authorID' => $this->aes->decrypt($request->author),
            'file' => $filename,
        ]);

        if ($request->coauthor != null) {
            foreach ($request->coauthor as $coAuthor) {
                CoAuthor::create([
                    'fileID' => $file->id,
                    'officialID' => $this->aes->decrypt($coAuthor),
                ]);
            }
        }
    }

    public function createSubcategory(Request $request)
    {
        $request->validate([
            'category' => ['required', 'string', 'max:255'],
        ]);

        Categories::create([
            'category' => $request->category,
            'parentID' => $this->aes->decrypt($request->id),
        ]);
    }

    public function updateSubcategory(Request $request) {
        $request->validate([
            'category' => ['required','string','max:255'],
        ]);

        Categories::where('id', $this->aes->decrypt($request->id))->update([
            'category' => $request->category,
        ]);
    }

    public function deleteSubcategory(Request $request) {
        $category = Categories::where('id', $this->aes->decrypt($request->id))->delete();
    }
}
