<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Dotenv\Dotenv;

class C_OPTController extends Controller
{
    public function PostsendOPT(string $indicateur, string $numero)
    {
         $numeroComplet = $indicateur . $numero;
    
        if (!$numeroComplet) {
            return ['error' => 'Le numéro est requis.'];
        }
        if(substr($numeroComplet, 0, 1) === '0' && strlen($numeroComplet) > 1) {
            $numeroComplet = substr($numeroComplet, 1);
        }
        $user = User::where('numero', $numero)->first();
        if (!$user) {
            return ['error' => 'Utilisateur non trouvé.'];
        }
    
        $code = rand(100000, 999999);
        $user->code_verified = $code;
        $user->save();
    
        $payload = [
            "type" => "transactional",
            "unicodeEnabled" => false,
            "sender" => "Spliiit",
            "recipient" =>  $numeroComplet,
            "content" => "Le code à soumettre est " . $code,
            "tag" => "tag1",
            "organisationPrefix" => "Spliiit vous envoie un code de vérification"
        ];
    
        $response = Http::withHeaders([
            'accept' => 'application/json',
            'api-key' => env('TOKEN_BREVO'),
            'content-type' => 'application/json',
        ])->post('https://api.brevo.com/v3/transactionalSMS/sms', $payload);
    
        if ($response->successful()) {
            return ['success' => true];
        } else {
            return ['error' => 'Failed to send OTP', 'details' => $response->body()];
        }
    }


    public function PostverifyOPT(Request $request)
    {
        try {
            $user = User::where('numero', $request->input('numero'))->first();
    
            if (!$user) {
                return response()->json(['error' => 'User not found.'], 404);
            }
    
            $codeInput = $request->input('code_verified');
            $storedCode = $user->code_verified;
            $codeDate = $user->code_date_validated;
    
            if (
                $storedCode !== null &&
                $codeInput !== null &&
                $storedCode == $codeInput &&
                $codeDate !== null &&
                \Carbon\Carbon::parse($codeDate)->diffInMinutes(now()) <= 10
            ) {
                return response()->json(['message' => 'Code valide', 'success' => true], 200);
            }
    
            return response()->json(['error' => 'Code invalide ou expiré.', 'success' => false], 401);
    
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Validation failed: ' . $e->getMessage(),
                'success' => false
            ], 422);
        }
    }
    
}
