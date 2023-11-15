import React, { useState, useEffect } from "react";
import axios from "axios";

const NewWalletModal = (props, onUpdate) => {
  const [name, setName] = useState("");
  const [currency, setCurrency] = useState("");

  const showNewWalletModal = () => {
    props.setShowNewWalletModal(false);
    setName("");
    setCurrency("");
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
  }, []);

  //add new wallet
  const handleSubmit = async (e) => {
    const userId = localStorage.getItem("userId");
    axios
      .post("http://localhost:8000/api/wallet/" + userId, {
        name,
        currency,
      })
      .then((res) => {
        console.log(res.data);
        showNewWalletModal(e);
        onUpdate(res.data);
      })
      .catch((err) => console.log(err));
  };

  return props.showNewWalletModal ? (
    <div
      class="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <h2 class="font-semibold">Create a new wallet: </h2>
              </div>

              <div class="form-group mt-2">
                <label>Name:</label>
                <input
                  type="text"
                  class="form-control"
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div class="form-group mt-2 d-flex flex-col">
                <label>Currency:</label>

                <select
                  className="border rounded"
                  onChange={(e) => setCurrency(e.target.value)}
                >
                  <option value={"undefined"}></option>
                  <option value={"ALL"}>ALL</option>
                  <option value={"USD"}>USD</option>
                  <option value={"EUR"}>EURO</option>
                </select>
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                onClick={() => {
                  handleSubmit();
                }}
                type="button"
                class="mt-3 inline-flex w-full justify-center rounded-md  px-3 py-2 text-sm font-semibold bg-indigo-700  text-white shadow-sm hover:bg-indigo-700 ring-1 ring-inset ring-gray-30 sm:mt-0 sm:w-auto sm: ml-2"
              >
                Post
              </button>
              <button
                onClick={(e) => {
                  showNewWalletModal(e);
                }}
                type="button"
                class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default NewWalletModal;
