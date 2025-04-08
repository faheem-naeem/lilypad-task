<?php

namespace App\Http\Services;

use App\Models\Feedback;

class FeedbackService
{
    public function store(array $data)
    {
        return Feedback::create($data);
    }

    public function getRecent($request)
    {
        $query = Feedback::query()->latest();

        if($request->has('rating') && !is_null($request->get('rating'))){
            $query->where('rating', $request->get('rating'));
        }

        return $query->take(config('constants.feedback_limit'), )->get();
    }
}
