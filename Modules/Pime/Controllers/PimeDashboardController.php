<?php

namespace Modules\Pime\Controllers;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Illuminate\Http\Request;

class PimeDashboardController extends Controller
{
    public function __invoke()
    {
        return Inertia::render('Pime/Dashboard');
    }
}
