function NotFound() {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-blue-600">404!</h1>
          <p className="mt-4 text-xl font-medium">
            Oops! The page you're looking for doesn't exist.
          </p>
          <p className="text-gray-500">
            It looks like you've lost your way. Let's get you back on track.
          </p>
          <div className="mt-6">
            <a
              href="/"
              className="btn btn-primary text-white btn-lg"
            >
              Go Home
            </a>
          </div>
        </div>
      </div>
    );
  }
  
  export default NotFound;
  