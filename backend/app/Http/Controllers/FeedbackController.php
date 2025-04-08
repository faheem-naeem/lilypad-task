<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreFeedbackRequest;
use App\Http\Services\FeedbackService;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class FeedbackController extends Controller
{
    protected $feedbackService;

    public function __construct(FeedbackService $feedbackService)
    {
        $this->feedbackService = $feedbackService;
    }

    public function store(StoreFeedbackRequest $request)
    {
        $feedback = $this->feedbackService->store($request->validated());
        return response()->json(['message' => 'Feedback submitted', 'data' => $feedback], Response::HTTP_CREATED);
    }

    public function index(Request $request)
    {
        $feedbacks = $this->feedbackService->getRecent($request);
        return response()->json($feedbacks);
    }
}
