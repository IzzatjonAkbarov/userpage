import React from "react";

const User = () => {
  return (
    <div>
      <div className="h-screen w-full flex items-center justify-center">
        <form className="w-[90%] mx-auto">
          <div className="flex items-center gap-10">
            <div className="mb-5 w-full">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 ">
                Your Name
              </label>
              <input
                type="name"
                id="name"
                className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg   block w-full p-2.5     "
                placeholder="Your Name"
              />
            </div>
            <div className="mb-5 w-full">
              <label
                htmlFor="surname"
                className="block mb-2 text-sm font-medium text-gray-900 ">
                Your surname
              </label>
              <input
                type="surname"
                id="surname"
                className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg   block w-full p-2.5     "
                placeholder="Your surname"
              />
            </div>
          </div>
          <div className="flex items-center gap-10">
            <div className="mb-5 w-full">
              <label
                htmlFor="country"
                className="block mb-2 text-sm font-medium text-gray-900 ">
                Country/Region
              </label>
              <input
                type="text"
                id="country"
                className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg   block w-full p-2.5     "
                placeholder="Your Country"
              />
            </div>
            <div className="mb-5 w-full">
              <label
                htmlFor="town"
                className="block mb-2 text-sm font-medium text-gray-900 ">
                Town city
              </label>
              <input
                type="text"
                id="town"
                className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg   block w-full p-2.5     "
                placeholder="Your Town or city"
              />
            </div>
          </div>
          <div className="flex items-center gap-10">
            <div className="mb-5 w-full">
              <label
                htmlFor="Stateadress"
                className="block mb-2 text-sm font-medium text-gray-900 ">
                State address
              </label>
              <input
                type="text"
                id="Stateadress"
                className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg   block w-full p-2.5     "
                placeholder="State address"
              />
            </div>
            <div className="mb-5 w-full">
              <label
                htmlFor="extra"
                className="block mb-2 text-sm font-medium text-gray-900 ">
                Extra Adress
              </label>
              <input
                type="text"
                id="extra"
                className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg   block w-full p-2.5     "
                placeholder="Extra Adress"
              />
            </div>
          </div>
          <div className="flex items-center gap-10">
            <div className="mb-5 w-full">
              <label
                htmlFor="state"
                className="block mb-2 text-sm font-medium text-gray-900 ">
                Your State
              </label>
              <input
                type="text"
                id="state"
                className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg   block w-full p-2.5     "
                placeholder="Your State"
              />
            </div>
            <div className="mb-5 w-full">
              <label
                htmlFor="Zip"
                className="block mb-2 text-sm font-medium text-gray-900 ">
                Your Zip Adress
              </label>
              <input
                type="number"
                id="Zip"
                className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg   block w-full p-2.5     "
                placeholder="Your Zip Adress"
              />
            </div>
          </div>
          <div className="flex items-center gap-10">
            <div className="mb-5 w-full">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 ">
                Your email adress
              </label>
              <input
                type="email"
                id="email"
                className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg   block w-full p-2.5     "
                placeholder="Your email"
              />
            </div>
            <div className="mb-5 w-full">
              <label
                htmlFor="number"
                className="block mb-2 text-sm font-medium text-gray-900 ">
                Your Number
              </label>
              <input
                type="tel"
                id="number"
                name="+998"
                className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg   block w-full p-2.5     "
                placeholder="Your number"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-[fit] text-white bg-green-700 hover:bg-green-800   font-medium rounded-lg text-sm   px-5 py-2.5 text-center ">
            Click to save changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default User;
