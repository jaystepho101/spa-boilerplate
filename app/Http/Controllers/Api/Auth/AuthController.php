<?php

namespace App\Http\Controllers\Api\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Support\Facades\Auth;
use Validator;

class AuthController extends Controller
{

  public function register(Request $request)
  {

      $v = validator($request->only('email', 'name', 'password', 'password_confirmation'), [
          'name' => 'required|string|max:255',
          'email' => 'required|string|email|max:255|unique:users',
          'password' => 'required|string|min:6|confirmed',
          'password_confirmation' => 'required',
      ]);

      if ($v->fails()) {
          return response()->json($v->errors()->all(), 400);
      }
      $data = request()->only('email','name','password');

      $user = \App\User::create([
          'name' => $data['name'],
          'email' => $data['email'],
          'password' => bcrypt($data['password']),
      ]);

      $client = \Laravel\Passport\Client::where('password_client', 1)->first();

      $request->request->add([
          'grant_type'    => 'password',
          'client_id'     => $client->id,
          'client_secret' => $client->secret,
          'username'      => $data['email'],
          'password'      => $data['password'],
          'scope'         => null,
      ]);

      // Fire off the internal request.
      $proxy = Request::create(
          'oauth/token',
          'POST'
      );

      return \Route::dispatch($proxy);

  }

  public function login(Request $request) {

    $v = validator($request->only('email', 'password'), [
        'email' => 'required|string|email',
        'password' => 'required|string',
    ]);

    if ($v->fails()) {
        return response()->json($v->errors()->all(), 400);
    }

    $client = \Laravel\Passport\Client::where('password_client', 1)->first();

    $request->request->add([
        'grant_type'    => 'password',
        'client_id'     => $client->id,
        'client_secret' => $client->secret,
        'username'      => $request['email'],
        'password'      => $request['password'],
        'scope'         => null,
    ]);

    $proxy = Request::create(
        'oauth/token',
        'POST'
    );

    return \Route::dispatch($proxy);

  }

  public function logout() {
    $user = Auth::user()->token();
    $user->revoke();
    return response()->json('logged out', 200);
  }

}
