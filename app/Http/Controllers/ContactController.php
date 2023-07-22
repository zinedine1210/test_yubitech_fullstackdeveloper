<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Contact;

class ContactController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function getall()
    {
        $contacts = Contact::where("user_id", auth()->user()->id)->latest()->get();
        return response()->json([
            'data' => $contacts,
            'success' => true
        ], 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nama' => 'required|min:5|max:100',
            'dial' => 'required',
            'email' => 'required|email:dns',
            'nomor_telepon' => 'required|numeric|digits_between:10,15'
        ]);

        if($validator->fails()){
            return response()->json($validator->messages(), 422);
        }


        $contact = new Contact([
            'user_id' => auth()->user()->id,
            'nama' => $request->input("nama"),
            'dial' => $request->input("dial"),
            'email' => $request->input("email"),
            'nomor_telepon' => $request->input("nomor_telepon"),
        ]);

        $contact->save();
        
        return response()->json([
            'success' => true,
            'data' => $contact,
            'message' => 'contact created'
        ], 200);
    }


    public function show($id)
    {
        $contact = Contact::find($id);
        return response()->json([
            'success' => true,
            'data' => $contact
        ], 200);
    }

    public function search(Request $request){
        $searchKeyword = $request->input('keyword');
        $contacts = Contact::where("user_id", auth()->user()->id)
            ->where('nama', 'like', "%{$searchKeyword}%")
            ->orWhere('email', 'like', "%{$searchKeyword}%")
            ->latest()
            ->get();

        return response()->json([
            'data' => $contacts,
            'success' => true
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'nama' => 'required|min:5|max:100',
            'dial' => 'required',
            'email' => 'required|email:dns',
            'nomor_telepon' => 'required|numeric|digits_between:10,15'
        ]);

        if($validator->fails()){
            return response()->json($validator->messages(), 422);
        }

        $data = Contact::find($id);
        $data->nama = $request->nama;
        $data->email = $request->email;
        $data->dial = $request->dial;
        $data->nomor_telepon = $request->nomor_telepon;
        $data->save();

        return response()->json([
            'success' => true,
            'message' => 'contact updated!',
            'data' => $data
        ], 200);
    }

    public function destroy($id)
    {
        $contact = Contact::find($id);
        $contact->delete();
        return response()->json([
            'success' => true,
            'message' => "contact deleted!"
        ], 200);
    }
}
