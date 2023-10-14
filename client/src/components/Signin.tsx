import { SignIn } from "@clerk/clerk-react";

function Signin() {
  return (
    <div className="d-flex justify-content-center aligh-items-center py-5">
      <SignIn />
    </div>
  );
}

export default Signin;
