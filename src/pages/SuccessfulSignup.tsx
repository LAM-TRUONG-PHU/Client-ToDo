export default function SuccessfulSignup() {
  return (
    <div className="antialiased py-6 mt-10 sm:max-w-xl mx-auto text-center relative">
      <div className="text-color bg-white/[.40] rounded-lg  pb-4 mt-7 text-left">
        <div className="h-4 bg-red-300 bg-opacity-50 rounded-t-md "></div>

        <h2 className="text-center text-2xl pb-2 font-bold text-white">
          Sign Up Successfully
        </h2>
        <p className="text-center text-xl text-white ">
          Please check your{" "}
          <a
            href="https://mail.google.com/mail/u/0/#inbox"
            target="_blank"
            className="hover:underline hover:text-purple-800 text-purple-700 font-semibold"
          >
            email
          </a>{" "}
          to verify your account
        </p>
      </div>
    </div>
  );
}
