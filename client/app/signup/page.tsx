import React from "react";

export default function signup() {
  return (
    <div className=" min-h-[calc(100vh-7vh)] pt-2">
      <div className="container mx-auto px-8">
        <div className="bg-brown-bg mt-32 p-4 rounded max-w-[500px] mx-auto">
          <h2 className="text-center font-bold py-4">New User Signup</h2>
          <form action="http://localhost:5001/signup" method="post" className="flex flex-col gap-6">
            <input type="text" name="username" placeholder="username" className="form-input" required />
            <input type="password" name="password" placeholder="Password" className="form-input" required />
            <input type="password" name="conPassword" placeholder="Confirm Password" className="form-input" required />
            <input type="textarea" name="address" placeholder="Address" className="form-input" required />
            <div>
              <input type="submit" value="Register" className="cursor-pointer hover:bg-[#e17800] bg-[#e16800] p-4" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
