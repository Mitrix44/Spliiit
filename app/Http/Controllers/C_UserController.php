<?php

namespace App\Http\Controllers;

use App\Http\Controllers\C_OPTController;
use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Controllers\Controller;

class C_UserController extends Controller
{
  public function postuser(Request $request)
  {



<<<<<<< HEAD
            if ($user) {
                // Met à jour l'utilisateur existant       
                $user->code_verified = $request->input('code_verified', null);
                $user->code_date_validated = \Carbon\Carbon::createFromFormat('d/m/Y', now()->format('d/m/Y'));
                $user->indicatif_code = $request->input('indicatif_code', $user->indicatif_code);
                // $user->name = $request->input('name', null);
                // $user->surname= $request->input('surname', null);

                $user->save();

                $optController = new C_OPTController();
                
                $result = $optController->PostsendOPT($request->input('indicatif_code'),$request->input('numero'));
               
                if (isset($result['error'])) {
                    return response()->json([
                        'message' => 'User updated but OTP sending failed.',
                        'details' => $result['error']
                    ], 500);
                }
                if($user->name == null && $user->surname == null){
                    return response()->json([
                        'message' => 'User updated successfully but no name or surname provided.',
                        'success' => true,
                        'news'=>true,
                        'numero' => $request->input('numero'),
                    ], 200);
                }

                return response()->json([
                    'message' => 'User updated successfully and OTP sent.',
                    'success' => true,
                    'news'=>false,
                    'numero' => $request->input('numero'),
                ], 200);
            }

            // Sinon création d'un nouvel utilisateur
            $user = User::create([
                'numero' => $request->input('numero'),
                'code_verified' => $request->input('code_verified', null),
                'name' => $request->input('name', null),
                'surname' => $request->input('surname', null),
                'code_date_validated' => \Carbon\Carbon::createFromFormat('d/m/Y', now()->format('d/m/Y')),
                'indicatif_code' => $request->input('indicatif_code'),
            ]);

            $optController = new C_OPTController();
            
            $result = $optController->PostsendOPT($request->input('indicatif_code'),$request->input('numero'));

            if (isset($result['error'])) {
                return response()->json([
                    'message' => 'User created but OTP sending failed.',
                    'details' => $result['error']
                ], 500);
            }

            return response()->json([
                'message' => 'User created successfully and OTP sent.',
                'success' => true,
                'news'=>true,
                'numero' => $user->numero
            ], 201);

        // } catch (\Exception $e) {
        //     return response()->json([
        //         'error' => 'An error occurred while saving user data.',
        //         'success' => false,
        //         'details' => $e->getMessage()
        //     ], 500);
        // }
    
}
public function addnameuser(Request $request)
{
=======
    // Validation possible ici si besoin

    // try {
>>>>>>> cc2601d3f26d6753692cbda924dd563970d4a4d4
    $user = User::where('numero', $request->input('numero'))->first();
    if ($user !== null) {
      // Met à jour l'utilisateur existant       
      $user->code_verified = $request->input('code_verified', null);
      $user->code_date_validated = \Carbon\Carbon::createFromFormat('d/m/Y', now()->format('d/m/Y'));
      $user->indicatif_code = $request->input('indicatif_code', $user->indicatif_code);
      $user->indicatif_code = $request->input('name', null);
      $user->indicatif_code = $request->input('surname', null);

      $user->save();

      $optController = new C_OPTController();

      $result = $optController->PostsendOPT($request->input('indicatif_code'), $request->input('numero'));

      if (isset($result['error'])) {
        return response()->json([
          'message' => 'User updated but OTP sending failed.',
          'details' => $result['error']
        ], 500);
      }

      return response()->json([
        'message' => 'User updated successfully and OTP sent.',
        'success' => true,
        'news' => false,
        'numero' => $request->input('numero'),
      ], 200);
    }

    // Sinon création d'un nouvel utilisateur
    $user = User::create([
      'numero' => $request->input('numero'),
      'code_verified' => $request->input('code_verified', null),
      'code_date_validated' => \Carbon\Carbon::createFromFormat('d/m/Y', now()->format('d/m/Y')),
      'indicatif_code' => $request->input('indicatif_code'),
    ]);

    $optController = new C_OPTController();

    $result = $optController->PostsendOPT($request->input('indicatif_code'), $request->input('numero'));

    if (isset($result['error'])) {
      return response()->json([
        'message' => 'User created but OTP sending failed.',
        'details' => $result['error']
      ], 500);
    }

    return response()->json([
      'message' => 'User created successfully and OTP sent.',
      'success' => true,
      'news' => true,
      'numero' => $user->numero
    ], 201);

    // } catch (\Exception $e) {
    //     return response()->json([
    //         'error' => 'An error occurred while saving user data.',
    //         'success' => false,
    //         'details' => $e->getMessage()
    //     ], 500);
    // }

  }
}
}