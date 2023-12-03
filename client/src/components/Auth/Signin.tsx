import { SignIn } from "@clerk/clerk-react";

function Signin() {
  return (
    <div className="d-flex  py-5 gap-2 flex-column justify-content-center align-items-center ">
      <div className="card">
        <ul className="list-group list-group-flush ">
          {" "}
          <li className="list-group-item">Test Account:</li>
          <li className="list-group-item"> Email: yuleidy41@threadedwsw.com</li>
          <li className="list-group-item">liassword: AD123456.</li>
        </ul>
      </div>
      <SignIn />
    </div>
  );
}

export default Signin;
