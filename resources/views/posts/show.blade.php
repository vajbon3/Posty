@extends("layouts.app")

@section("content")
    <div class="flex justify-center">
        <div class="w-8/12 bg-white p-6 rounded-lg">
            <x-Post :post="$post" />
        </div>
    </div>
    <script src="/js/likes.js"></script>
@endsection
