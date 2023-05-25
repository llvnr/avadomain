<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Models\User;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group([
    'prefix' => 'avadomain'
], function ($router) {

    Route::post('/checkdomain', function() {

        $domain = request("domain");
    
        // Récupérer l'adresse IP associée au domaine
        $ip = gethostbyname($domain);
        $clientIP = request()->ip();
    
        // $createUtilisation = AvadomainUtilisation::create([
        //     "user_id" => auth()->user()->id,
        //     "ip" => $clientIP,
        //     "domaine" => $domain
        // ]);
    
        // Vérifier si l'adresse IP est celle d'un serveur de noms
        if ($ip == $domain) {
            
            return response()->json([
                "status" => true,
                "result" => "Available"
            ]);
    
        } else {
    
            return response()->json([
                "status" => false,
                "result" => "Not Available"
            ]);
    
        }
    
    });

});

// Route::group([
//     'middleware' => 'api',
//     'prefix' => 'auth'
// ], function ($router) {
//     Route::post('/login', [AuthController::class, 'login']);
//     Route::post('/register', [AuthController::class, 'register']);
//     Route::post('/logout', [AuthController::class, 'logout']);
//     Route::post('/refresh', [AuthController::class, 'refresh']);
//     Route::get('/user-profile', [AuthController::class, 'userProfile']);    
//     Route::post('/check', [AuthController::class, 'check']);
// });