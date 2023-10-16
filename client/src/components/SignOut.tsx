import { SignedOut, useClerk } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Signout() {
  const { signOut } = useClerk();
  const navigate = useNavigate();
  useEffect(() => {
    signOut();
    setTimeout(() => {
      navigate("/");
    }, 5000);
  }, []);
  return (
    <SignedOut>
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: "75vh" }}
      >
        <p className="py-2 fs-3 signout">You just signed out.✈️</p>
        <p className="py-2 fs-5 signout">...redirecting to homepage after 5s</p>
      </div>
    </SignedOut>
  );
}

export default Signout;
