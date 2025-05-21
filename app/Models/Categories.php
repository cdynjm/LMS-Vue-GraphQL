<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Http\Controllers\AESCipher;

class Categories extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'id',
        'category',
        'parentID',
    ];

    public function getEncryptedIdAttribute(): string
    {
        return app(AESCipher::class)->encrypt((string) $this->attributes['id']);
    }
}
