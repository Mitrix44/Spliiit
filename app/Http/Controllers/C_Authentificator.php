<?php

namespace App\Http\Controllers;
use Dotenv\Dotenv;
use Illuminate\Http\Request;
use Sonata\GoogleAuthenticator\GoogleAuthenticator;
use Sonata\GoogleAuthenticator\GoogleQrUrl;

class C_Authentificator extends Controller
{
    private $token;
    private $googleAuthenticator;

    public function __construct()
    {
        $this->token = env('TOKEN_AUTHENTIFICATOR');  
        $this->googleAuthenticator = new GoogleAuthenticator(); 
    }

    public function generateSecret()
    {
        $secret = $this->googleAuthenticator->generateSecret();
        return response()->json(['secret' => $secret]);
    }

    public function generateQrCode(Request $request)
    {
        $secret = $request->input('secret');
        $qrCodeUrl = GoogleQrUrl::generate('MyApp', $secret, 'MyApp');
        return response()->json(['qrCodeUrl' => $qrCodeUrl]);
    }

    public function verifyAuthentication(Request $request)
    {
        $secret = $request->input('secret');
        $code = $request->input('code');

        if (!$this->googleAuthenticator->checkCode($secret, $code)) {
            return response()->json(['error' => 'Code d\'authentification invalide.'], 401);
        }

        return response()->json(['message' => 'Authentification réussie.'], 200);
    }
}